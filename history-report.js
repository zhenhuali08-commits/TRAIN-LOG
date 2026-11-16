(function(global){
  'use strict';
  const FONT='-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif';
  function rounded(ctx,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
  }
  function fillRound(ctx,x,y,w,h,r,color){rounded(ctx,x,y,w,h,r);ctx.fillStyle=color;ctx.fill();}
  function line(ctx,x1,y1,x2,y2,color,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function label(ctx,value,x,y,size=26,color='#0b1935',weight=500,maxWidth){
    ctx.font=weight+' '+size+'px '+FONT;ctx.fillStyle=color;ctx.textBaseline='top';
    let text=String(value||'');if(maxWidth){while(text.length>1&&ctx.measureText(text).width>maxWidth)text=text.slice(0,-2)+'…';}
    ctx.fillText(text,x,y);
  }
  function centeredLabel(ctx,value,x,y,size=26,color='#0b1935',weight=500,maxWidth,align='center'){
    ctx.font=weight+' '+size+'px '+FONT;ctx.fillStyle=color;ctx.textBaseline='middle';ctx.textAlign=align;
    let text=String(value||'');if(maxWidth){while(text.length>1&&ctx.measureText(text).width>maxWidth)text=text.slice(0,-2)+'…';}
    ctx.fillText(text,x,y);ctx.textAlign='start';ctx.textBaseline='top';
  }
  function wrappedLabel(ctx,value,x,y,maxWidth,{size=18,lineHeight=26,maxLines=3,color='#617393',weight=500}={}){
    ctx.font=weight+' '+size+'px '+FONT;ctx.fillStyle=color;ctx.textBaseline='top';
    const words=String(value||'').split('、');let lines=[],current='';
    for(const word of words){const next=current?current+'、'+word:word;if(ctx.measureText(next).width<=maxWidth){current=next;continue;}if(current)lines.push(current);current=word;while(ctx.measureText(current).width>maxWidth&&current.length>1){let part='';for(const character of current){if(ctx.measureText(part+character).width>maxWidth)break;part+=character;}lines.push(part);current=current.slice(part.length);}}
    if(current)lines.push(current);
    if(lines.length>maxLines){lines=lines.slice(0,maxLines);let tail=lines[maxLines-1];while(tail.length>1&&ctx.measureText(tail+'…').width>maxWidth)tail=tail.slice(0,-1);lines[maxLines-1]=tail+'…';}
    lines.forEach((lineText,i)=>ctx.fillText(lineText,x,y+i*lineHeight));
  }
  function decodeImage(src,timeout){
    return new Promise(resolve=>{if(!src)return resolve(null);const image=new Image();let done=false;const finish=value=>{if(done)return;done=true;clearTimeout(timer);resolve(value);};const timer=setTimeout(()=>finish(null),timeout);image.crossOrigin='anonymous';image.onload=()=>finish(image);image.onerror=()=>finish(null);image.src=src;});
  }
  async function loadImage(src,timeout=8000){
    if(!src)return null;
    const source=/^https?:/.test(src)?src+(src.includes('?')?'&':'?')+'share=1':src;
    if(/^https?:|^\.\/assets\//.test(src)){
      let objectUrl='',timer,controller;
      try{
        controller=new AbortController();timer=setTimeout(()=>controller.abort(),timeout);
        const response=await fetch(source,{mode:'cors',cache:'force-cache',signal:controller.signal});
        if(!response.ok)throw new Error('image unavailable');
        objectUrl=URL.createObjectURL(await response.blob());
        const image=await decodeImage(objectUrl,timeout);
        URL.revokeObjectURL(objectUrl);clearTimeout(timer);
        if(image)return image;
      }catch(error){if(objectUrl)URL.revokeObjectURL(objectUrl);clearTimeout(timer);}
    }
    return decodeImage(source,timeout);
  }
  function drawImageInside(ctx,image,x,y,w,h){
    if(!image)return false;const ratio=Math.min(w/image.width,h/image.height),iw=image.width*ratio,ih=image.height*ratio;ctx.drawImage(image,x+(w-iw)/2,y+(h-ih)/2,iw,ih);return true;
  }
  async function create(payload){
    const rows=payload.entries||[],width=940,height=805+rows.length*162;
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
    const bg=ctx.createLinearGradient(0,0,width,height);bg.addColorStop(0,'#f5f9ff');bg.addColorStop(.43,'#d9e8ff');bg.addColorStop(1,'#d1e3ff');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
    ctx.save();ctx.translate(830,65);ctx.rotate(-.54);ctx.fillStyle='rgba(255,255,255,.33)';ctx.beginPath();ctx.ellipse(0,0,480,155,0,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.save();ctx.translate(590,height+90);ctx.rotate(-.3);ctx.strokeStyle='rgba(255,255,255,.72)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,550,180,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    const logo=ctx.createLinearGradient(0,35,0,98);logo.addColorStop(0,'#096aff');logo.addColorStop(1,'#25b8ec');ctx.fillStyle=logo;
    ctx.save();ctx.translate(58,38);ctx.transform(1,0,-.42,1,0,0);fillRound(ctx,0,0,24,55,3,logo);fillRound(ctx,36,0,24,55,3,logo);ctx.restore();
    line(ctx,135,38,135,99,'#6c86af',2);label(ctx,'TRAIN LOG',154,36,37,'#071632',800);label(ctx,'私人训练日志',154,78,22,'#506886',500);
    centeredLabel(ctx,payload.name,55,191,54,'#071637',800,550,'left');
    fillRound(ctx,620,163,275,56,28,'rgba(255,255,255,.54)');line(ctx,645,177,645,204,'#4b75b8',3);centeredLabel(ctx,payload.date,775,191,25,'#173459',650,225);
    fillRound(ctx,55,238,830,375,34,'rgba(255,255,255,.75)');
    fillRound(ctx,82,266,196,48,24,'#e1eaff');centeredLabel(ctx,'▥ 训练概览',180,290,25,'#123467',800,180);
    fillRound(ctx,430,266,196,48,24,'#dce8ff');centeredLabel(ctx,'◎ 肌群分布',528,290,25,'#123467',800,180);
    line(ctx,400,285,400,580,'#d2dff3',2);
    const stats=[['训练时间',payload.duration],['有效组',payload.sets+' 组'],['训练容量',Number(payload.volume||0).toLocaleString()+' kg']];
    stats.forEach((row,i)=>{const y=358+i*78;centeredLabel(ctx,row[0],92,y,25,'#5e7393',500,140,'left');centeredLabel(ctx,row[1],370,y,26,'#081a38',750,150,'right');if(i<2)line(ctx,92,y+39,370,y+39,'#dce6f5',1.5);});
    const primary=(payload.summary?.primary||[]).slice(0,4).join('、')||'暂无映射',secondary=(payload.summary?.secondary||[]).slice(0,3).join('、')||'暂无映射';
    ctx.fillStyle='#4e87fb';ctx.beginPath();ctx.arc(445,352,8,0,Math.PI*2);ctx.fill();label(ctx,'主要肌群',462,334,23,'#172b4c',700);wrappedLabel(ctx,primary,462,371,160,{maxLines:3});
    ctx.fillStyle='#b6c9f3';ctx.beginPath();ctx.arc(445,463,8,0,Math.PI*2);ctx.fill();label(ctx,'次要肌群',462,445,23,'#172b4c',700);wrappedLabel(ctx,secondary,462,482,160,{maxLines:4});
    if(payload.summary?.svg){const svgText=new XMLSerializer().serializeToString(payload.summary.svg);const svg=await loadImage('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgText),5000);if(svg)drawImageInside(ctx,svg,623,312,265,255);}
    fillRound(ctx,55,647,55,55,16,'#82a9f7');centeredLabel(ctx,'◕',82,675,34,'#fff',800);centeredLabel(ctx,'训练内容',125,675,34,'#091b3a',800,170,'left');line(ctx,300,675,720,675,'#a8bce0',2);fillRound(ctx,730,652,155,45,22,'rgba(255,255,255,.55)');centeredLabel(ctx,'共 '+rows.length+' 个动作',807,674,19,'#526b93',650,140);
    const media=await Promise.all(rows.map(row=>loadImage(row.imageUrl,8000)));
    rows.forEach((row,i)=>{const y=727+i*162;fillRound(ctx,55,y,830,139,29,'rgba(255,255,255,.78)');fillRound(ctx,82,y+17,125,105,20,'#edf3fc');if(!drawImageInside(ctx,media[i],86,y+20,117,99)){centeredLabel(ctx,'▥',144,y+70,45,'#8ea9d0',600);}line(ctx,230,y+26,230,y+113,'#cbdcf6',2);centeredLabel(ctx,row.name,264,y+49,30,'#0b1d3d',800,590,'left');centeredLabel(ctx,row.sets,264,y+93,24,'#617697',500,590,'left');});
    label(ctx,'TRAIN LOG · 每一次训练都值得记录',55,height-49,20,'#607a9d',500);
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG export failed')),'image/png'));
  }
  global.TrainLogReportImage=Object.freeze({create});
})(window);
