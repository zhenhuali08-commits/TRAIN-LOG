(function(global){
  'use strict';

  const CONFIG_URL='./exercise-muscle-mappings.json?v=3.4.3';
  const HOST_SELECTOR='[data-muscle-map]:not([data-muscle-map-ready])';
  const SVG_NS='http://www.w3.org/2000/svg';
  const EXPECTED_TEMPLATE_HASH='301CB13731FC3902E6F7C072EE3B1515859FB58A1BFD48E08B85CE577D04F697';
  let resourcesPromise=null;
  let hydrateQueued=false;

  function escapeAttr(value){
    return String(value==null?'':value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function bytesToHex(buffer){return Array.from(new Uint8Array(buffer),byte=>byte.toString(16).padStart(2,'0')).join('').toUpperCase();}
  async function sha256(buffer){
    if(!global.crypto||!global.crypto.subtle) return '';
    return bytesToHex(await global.crypto.subtle.digest('SHA-256',buffer));
  }

  function validateResources(config,template,hash){
    const errors=[];
    const paths=new Set(Array.from(template.querySelectorAll('path.muscle-block'),path=>path.id));
    const exerciseEntries=Object.entries(config.exercises||{});
    if(hash&&hash!==(config.templateSha256||EXPECTED_TEMPLATE_HASH)) errors.push(`人体模板哈希不匹配：${hash}`);
    if(config.templateSha256!==EXPECTED_TEMPLATE_HASH) errors.push('映射表未绑定已锁定的人体模板哈希');
    if(paths.size!==90) errors.push(`人体模板肌肉 path 数量应为 90，当前为 ${paths.size}`);
    if(exerciseEntries.length!==config.expectedExerciseCount||exerciseEntries.length!==73) errors.push(`动作映射应为 73 个，当前为 ${exerciseEntries.length}`);
    Object.entries(config.regions||{}).forEach(([regionId,region])=>{
      if(!paths.has(region.target)) errors.push(`${regionId} 的引线目标不存在：${region.target}`);
      (region.paths||[]).forEach(pathId=>{if(!paths.has(pathId)) errors.push(`${regionId} 引用了不存在的 path：${pathId}`);});
    });
    exerciseEntries.forEach(([exerciseId,exercise])=>{
      const primary=new Set(exercise.primary||[]);
      (exercise.secondary||[]).forEach(regionId=>{if(primary.has(regionId)) errors.push(`${exerciseId} 的主辅肌群重复：${regionId}`);});
      [...(exercise.primary||[]),...(exercise.secondary||[])].forEach(regionId=>{if(!config.regions[regionId]) errors.push(`${exerciseId} 引用了未定义肌群：${regionId}`);});
    });
    return {ok:errors.length===0,errors,exerciseCount:exerciseEntries.length,pathCount:paths.size,hash};
  }

  async function loadResources(){
    if(resourcesPromise) return resourcesPromise;
    resourcesPromise=(async()=>{
      const configResponse=await fetch(CONFIG_URL,{cache:'force-cache'});
      if(!configResponse.ok) throw new Error(`肌群映射加载失败：${configResponse.status}`);
      const config=await configResponse.json();
      const templateResponse=await fetch(config.template,{cache:'force-cache'});
      if(!templateResponse.ok) throw new Error(`人体模板加载失败：${templateResponse.status}`);
      const bytes=await templateResponse.arrayBuffer();
      const hash=await sha256(bytes);
      const parsed=new DOMParser().parseFromString(new TextDecoder().decode(bytes),'image/svg+xml');
      const template=parsed.documentElement;
      if(template.nodeName.toLowerCase()!=='svg'||parsed.querySelector('parsererror')) throw new Error('人体模板 SVG 无法解析');
      const validation=validateResources(config,template,hash);
      if(!validation.ok) throw new Error(validation.errors.join('；'));
      return {config,template,validation};
    })().catch(error=>{resourcesPromise=null;throw error;});
    return resourcesPromise;
  }

  function createSvgNode(name,attributes){
    const node=document.createElementNS(SVG_NS,name);
    Object.entries(attributes||{}).forEach(([key,value])=>node.setAttribute(key,String(value)));
    return node;
  }
  function orderedActiveRegions(exercise,config){
    const result=[];
    const seen=new Set();
    [['primary',exercise.primary||[]],['secondary',exercise.secondary||[]]].forEach(([level,ids])=>ids.forEach(regionId=>{
      if(seen.has(regionId)||!config.regions[regionId]) return;
      seen.add(regionId);
      result.push({id:regionId,level,...config.regions[regionId]});
    }));
    return result;
  }
  function colorTemplate(svg,exercise,config){
    const colors=config.colors;
    svg.querySelectorAll('path.muscle-block').forEach(path=>{path.style.fill=colors.inactive;path.removeAttribute('data-active-level');});
    (exercise.secondary||[]).forEach(regionId=>{
      const region=config.regions[regionId];
      if(region) region.paths.forEach(pathId=>{const path=svg.getElementById(pathId);if(path){path.style.fill=colors.secondary;path.setAttribute('data-active-level','secondary');}});
    });
    (exercise.primary||[]).forEach(regionId=>{
      const region=config.regions[regionId];
      if(region) region.paths.forEach(pathId=>{const path=svg.getElementById(pathId);if(path){path.style.fill=colors.primary;path.setAttribute('data-active-level','primary');}});
    });
  }
  function distributeLabels(items,minY,maxY){
    if(!items.length) return items;
    const gap=Math.min(50,(maxY-minY)/Math.max(1,items.length-1));
    const sorted=items.slice().sort((a,b)=>a.anchorY-b.anchorY);
    sorted.forEach((item,index)=>{item.labelY=Math.max(minY,Math.min(maxY,item.anchorY));if(index&&item.labelY<sorted[index-1].labelY+gap)item.labelY=sorted[index-1].labelY+gap;});
    const overflow=sorted[sorted.length-1].labelY-maxY;
    if(overflow>0) sorted.forEach(item=>{item.labelY-=overflow;});
    for(let index=sorted.length-2;index>=0;index--){if(sorted[index].labelY>sorted[index+1].labelY-gap)sorted[index].labelY=sorted[index+1].labelY-gap;}
    const underflow=minY-sorted[0].labelY;
    if(underflow>0) sorted.forEach(item=>{item.labelY+=underflow;});
    return sorted;
  }
  function appendLabels(svg,regions,config){
    const group=createSvgNode('g',{'class':'heatmap-labels','aria-hidden':'true'});
    svg.appendChild(group);
    const items=[];
    regions.forEach(region=>{
      const target=svg.getElementById(region.target);
      if(!target||typeof target.getBBox!=='function') return;
      const box=target.getBBox();
      const targetMatrix=target.getCTM();
      const rootMatrix=svg.getCTM();
      const point=svg.createSVGPoint();
      // getCTM() on a descendant includes the root SVG's responsive viewBox
      // scale. Convert that matrix back into the frozen template's own
      // 940x740 coordinate system before drawing callouts into the SVG.
      // Otherwise the anchors drift upward/left whenever the card is scaled.
      point.x=box.x+box.width*.88;point.y=box.y+box.height/2;
      let rootPoint=point;
      if(targetMatrix&&rootMatrix){
        try{rootPoint=point.matrixTransform(rootMatrix.inverse().multiply(targetMatrix));}
        catch(_){rootPoint=point.matrixTransform(targetMatrix);}
      }else if(targetMatrix) rootPoint=point.matrixTransform(targetMatrix);
      items.push({...region,anchorX:rootPoint.x,anchorY:rootPoint.y});
    });
    ['front','back'].forEach(side=>{
      distributeLabels(items.filter(item=>item.side===side),145,610).forEach(item=>{
        const primary=item.level==='primary';
        const color=primary?config.colors.primary:config.colors.secondary;
        const labelX=side==='front'?430:915;
        const lineEndX=side==='front'?414:Math.max(720,915-item.label.length*16-16);
        const bendX=side==='front'?Math.max(item.anchorX+25,360):Math.min(item.anchorX+35,lineEndX-18);
        const label=createSvgNode('g',{'class':`heatmap-label ${primary?'is-primary':'is-secondary'}`});
        label.append(
          createSvgNode('path',{d:`M ${item.anchorX.toFixed(1)} ${item.anchorY.toFixed(1)} L ${bendX.toFixed(1)} ${item.labelY.toFixed(1)} L ${lineEndX.toFixed(1)} ${item.labelY.toFixed(1)}`,fill:'none',stroke:color,'stroke-width':'1.6','vector-effect':'non-scaling-stroke'}),
          createSvgNode('circle',{cx:item.anchorX.toFixed(1),cy:item.anchorY.toFixed(1),r:'3.1',fill:'#fff',stroke:color,'stroke-width':'1.6','vector-effect':'non-scaling-stroke'})
        );
        const text=createSvgNode('text',{x:labelX,y:item.labelY+5,fill:color,'text-anchor':side==='front'?'start':'end'});
        text.textContent=item.label;
        label.appendChild(text);
        group.appendChild(label);
      });
    });
  }

  function renderHost(host,resources){
    if(host.hasAttribute('data-muscle-map-ready')) return;
    const exerciseId=host.getAttribute('data-muscle-map')||'';
    const exercise=resources.config.exercises[exerciseId];
    const loading=host.querySelector('.muscle-map-loading');
    if(!exercise){
      if(loading) loading.innerHTML='<span class="muscle-map-empty">该自定义动作暂未设置训练肌群</span>';
      host.setAttribute('data-muscle-map-ready','empty');
      return;
    }
    const svg=resources.template.cloneNode(true);
    svg.removeAttribute('width');svg.removeAttribute('height');
    svg.setAttribute('class','heatmap-svg anatomy-svg frozen-anatomy-template');
    svg.setAttribute('aria-label',`${exercise.name}训练肌群图`);
    colorTemplate(svg,exercise,resources.config);
    if(loading) loading.replaceWith(svg); else host.prepend(svg);
    appendLabels(svg,orderedActiveRegions(exercise,resources.config),resources.config);
    host.setAttribute('data-muscle-map-ready','true');
  }
  async function hydrate(root=document){
    const hosts=[];
    if(root&&root.matches&&root.matches(HOST_SELECTOR)) hosts.push(root);
    if(root&&root.querySelectorAll) hosts.push(...root.querySelectorAll(HOST_SELECTOR));
    if(!hosts.length) return [];
    try{
      const resources=await loadResources();
      hosts.forEach(host=>renderHost(host,resources));
      return hosts;
    }catch(error){
      hosts.forEach(host=>{
        const loading=host.querySelector('.muscle-map-loading');
        if(loading) loading.innerHTML='<span class="muscle-map-empty">训练肌群图加载失败，请重新打开</span>';
        host.setAttribute('data-muscle-map-ready','error');
      });
      console.error('[TRAIN LOG] muscle map:',error);
      return [];
    }
  }
  function scheduleHydrate(){
    if(hydrateQueued) return;
    hydrateQueued=true;
    Promise.resolve().then(()=>{hydrateQueued=false;hydrate(document);});
  }
  function render({exerciseId='',name=''}={}){
    scheduleHydrate();
    return `<div class="heatmap-wrap formal layered anatomy-fixed-v35" data-muscle-map="${escapeAttr(exerciseId)}" data-muscle-name="${escapeAttr(name)}"><div class="muscle-map-loading" aria-live="polite"><span>训练肌群图加载中</span></div><div class="heatmap-legend"><span><i style="background:#ff3b30"></i>主要训练肌群</span><span><i style="background:#ff9f0a"></i>辅助训练肌群</span><span><i style="background:#d2d8e0"></i>非主要肌群</span></div></div>`;
  }
  function validate(){return loadResources().then(resources=>({...resources.validation,templateFrozen:true}));}

  const observer=new MutationObserver(mutations=>{
    const hasNewHost=mutations.some(mutation=>Array.from(mutation.addedNodes).some(node=>
      node.nodeType===1&&((node.matches&&node.matches(HOST_SELECTOR))||(node.querySelector&&node.querySelector(HOST_SELECTOR)))
    ));
    if(hasNewHost) scheduleHydrate();
  });
  if(document.documentElement) observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scheduleHydrate,{once:true}); else scheduleHydrate();
  loadResources().catch(()=>{});
  global.TrainLogMuscleMap=Object.freeze({render,hydrate,validate,templateHash:EXPECTED_TEMPLATE_HASH});
})(window);
