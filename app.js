(() => {
  'use strict';

  const STORAGE_KEY = 'train-log-state-v1';
  const VERSION = 1;

  const EXERCISES = [
    {id:'bench_press',name:'杠铃卧推',group:'胸',equipment:'杠铃',muscles:['胸','三头','肩'],primary:'胸大肌',secondary:'肱三头肌、三角肌前束',tips:['肩胛骨向后下方收紧并稳定贴住凳面','双脚踩稳地面，保持躯干稳定','杠铃下降至胸部附近后平稳推起，不要弹胸'],mistakes:['肩膀前顶、肩胛失去稳定','手腕过度后折','为了重量牺牲下放控制'],rest:'2–3 分钟'},
    {id:'incline_db_press',name:'上斜哑铃卧推',group:'胸',equipment:'哑铃',muscles:['胸','三头','肩'],primary:'上胸',secondary:'肱三头肌、三角肌前束',tips:['凳面保持适度上斜，不必过高','肩胛后缩下沉，哑铃沿上胸两侧下放','推起时保持手腕与前臂基本垂直'],mistakes:['凳面太陡导致肩部代偿','哑铃碰撞并失去控制','下放过浅'],rest:'2–3 分钟'},
    {id:'incline_machine_press',name:'上斜器械推胸',group:'胸',equipment:'器械',muscles:['胸','三头','肩'],primary:'上胸',secondary:'三头、前三角',tips:['调整座椅使把手对准上胸区域','肩胛稳定，胸部主动发力','顶端不要猛锁肘'],mistakes:['座椅高度不合适','肩膀耸起','回程过快'],rest:'90–150 秒'},
    {id:'pec_deck',name:'蝴蝶机夹胸',group:'胸',equipment:'器械',muscles:['胸'],primary:'胸大肌',secondary:'前三角',tips:['胸口抬起、肩胛稳定','肘部保持自然弯曲','夹到胸前后短暂停顿，再控制打开'],mistakes:['用手臂甩动','肩膀前顶','回程过度拉伸'],rest:'60–120 秒'},
    {id:'cable_fly',name:'绳索夹胸',group:'胸',equipment:'绳索',muscles:['胸'],primary:'胸大肌',secondary:'前三角',tips:['前后站姿保持稳定','肘角度基本固定，像抱住物体一样向中线合拢','全程保持胸肌张力'],mistakes:['重量过大导致身体前后晃动','肘部反复屈伸变成推举','肩膀耸起'],rest:'60–120 秒'},
    {id:'triceps_pushdown',name:'绳索下压',group:'三头',equipment:'绳索',muscles:['三头'],primary:'肱三头肌',secondary:'前臂',tips:['上臂贴近身体并尽量固定','肘部伸展到底后短暂停顿','回程控制到前臂接近水平'],mistakes:['上臂前后摆动','身体压绳借力','手腕乱翻'],rest:'60–120 秒'},
    {id:'overhead_triceps',name:'过顶臂屈伸',group:'三头',equipment:'绳索/哑铃',muscles:['三头'],primary:'肱三头肌长头',secondary:'核心',tips:['肘部指向前上方并尽量固定','核心收紧，避免腰部过度反弓','在舒适范围内充分屈伸肘关节'],mistakes:['肘部大幅外张','腰椎代偿','下放失控'],rest:'60–120 秒'},
    {id:'lateral_raise',name:'哑铃侧平举',group:'肩',equipment:'哑铃',muscles:['肩'],primary:'三角肌中束',secondary:'斜方肌',tips:['身体保持稳定，肩膀自然下沉','手肘微弯，向身体两侧抬起','抬至肩部附近即可，控制下放'],mistakes:['耸肩抢力','大幅摆动身体','为了抬高而旋转手腕'],rest:'60–120 秒'},
    {id:'pullup',name:'引体向上',group:'背',equipment:'自重',muscles:['背','二头'],primary:'背阔肌、上背',secondary:'肱二头肌、前臂',tips:['先稳定肩胛，再让胸口靠近横杆方向','避免耸肩，保持躯干稳定','控制下放到肩胛仍可控的位置'],mistakes:['只用手臂拉','大幅摆腿借力','快速坠落下放'],rest:'2–3 分钟'},
    {id:'lat_pulldown',name:'高位下拉',group:'背',equipment:'器械',muscles:['背','二头'],primary:'背阔肌',secondary:'肱二头肌、上背',tips:['胸口略抬，肩胛先下沉','把手拉向上胸区域','回程时让背阔肌充分伸展但保持控制'],mistakes:['身体后仰幅度过大','拉到颈后','耸肩并用手臂硬拉'],rest:'90–150 秒'},
    {id:'machine_row',name:'器械划船',group:'背',equipment:'器械',muscles:['背','二头'],primary:'上背、背阔肌',secondary:'肱二头肌、后肩',tips:['先保持胸椎稳定，再向后收肩胛','肘部沿目标肌群合适轨迹向后拉','回程不要含胸塌腰'],mistakes:['身体前后甩动','手腕过度弯曲','肩膀耸起'],rest:'90–150 秒'},
    {id:'cable_row',name:'坐姿/绳索划船',group:'背',equipment:'绳索',muscles:['背','二头'],primary:'背阔肌、菱形肌',secondary:'后肩、肱二头肌',tips:['躯干保持稳定，先收肩胛再拉肘','拉向腹部或下胸附近','回程让肩胛自然前伸但不要塌腰'],mistakes:['身体大幅后仰','耸肩','拉程过短'],rest:'90–150 秒'},
    {id:'reverse_pec_deck',name:'反向蝴蝶机',group:'肩',equipment:'器械',muscles:['肩','背'],primary:'三角肌后束',secondary:'菱形肌、中下斜方肌',tips:['胸口贴稳靠垫或保持躯干固定','手臂向外展开，重点感受后肩','动作幅度以肩部舒适为前提'],mistakes:['肩胛夹得过多导致上背抢力','耸肩','重量过大甩动'],rest:'60–120 秒'},
    {id:'barbell_curl',name:'杠铃弯举',group:'二头',equipment:'杠铃',muscles:['二头'],primary:'肱二头肌',secondary:'肱肌、前臂',tips:['上臂靠近身体并尽量固定','肘关节屈曲带动杠铃上移','下放到肘部接近伸直并保持控制'],mistakes:['腰部后仰借力','肘部向前冲','下放过快'],rest:'60–120 秒'},
    {id:'hammer_curl',name:'锤式弯举',group:'二头',equipment:'哑铃',muscles:['二头'],primary:'肱肌、肱桡肌',secondary:'肱二头肌',tips:['掌心相对保持中立握法','上臂尽量固定','可双臂同时或交替完成'],mistakes:['肩膀抬起','身体摆动','手腕折弯'],rest:'60–120 秒'},
    {id:'smith_shoulder_press',name:'史密斯推肩',group:'肩',equipment:'史密斯机',muscles:['肩','三头'],primary:'三角肌前束、中束',secondary:'肱三头肌',tips:['调整座椅使推起轨迹自然','核心收紧、肩胛稳定','下放到肩关节舒适范围再推起'],mistakes:['下放过深造成不适','腰部过度反弓','耸肩'],rest:'2–3 分钟'},
    {id:'reverse_fly',name:'反向飞鸟',group:'肩',equipment:'哑铃/绳索',muscles:['肩','背'],primary:'三角肌后束',secondary:'上背',tips:['躯干稳定，手肘微弯','向身体两侧打开手臂','用后肩带动而不是甩动重量'],mistakes:['耸肩','重量过大','肩胛过度夹紧替代后肩'],rest:'60–120 秒'},
    {id:'hack_squat',name:'哈克深蹲',group:'腿',equipment:'器械',muscles:['腿','臀'],primary:'股四头肌',secondary:'臀大肌、内收肌',tips:['双脚位置以膝髋舒适为准','下蹲时膝盖与脚尖方向一致','保持足底稳定，推起时不要突然锁膝'],mistakes:['膝盖明显内扣','脚跟抬起','为了重量缩短过多幅度'],rest:'2–3 分钟'},
    {id:'rdl',name:'罗马尼亚硬拉',group:'腿',equipment:'杠铃/哑铃',muscles:['腿','臀','背'],primary:'腘绳肌、臀大肌',secondary:'竖脊肌',tips:['膝盖保持轻微弯曲，髋部向后移动','负重贴近腿部移动','感到大腿后侧充分拉伸后伸髋站起'],mistakes:['变成深蹲','背部失去中立','杠铃离身体过远'],rest:'2–3 分钟'},
    {id:'leg_curl',name:'腿弯举',group:'腿',equipment:'器械',muscles:['腿'],primary:'腘绳肌',secondary:'小腿',tips:['调整器械轴心与膝关节位置','髋部保持稳定','屈膝到舒适范围后控制回程'],mistakes:['臀部离开靠垫','快速弹起','重量过大缩短幅度'],rest:'60–120 秒'},
    {id:'calf_raise',name:'小腿训练',group:'小腿',equipment:'器械/自重',muscles:['小腿'],primary:'腓肠肌、比目鱼肌',secondary:'足踝稳定肌',tips:['下降时让踝关节在可控范围充分背屈','顶端充分跖屈并短暂停顿','保持身体稳定，不要弹跳'],mistakes:['只做半程','快速弹动','膝踝位置失控'],rest:'60–120 秒'},
    {id:'hanging_leg_raise',name:'悬垂举腿',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌、髋屈肌群',secondary:'前臂',tips:['先稳定肩胛和躯干','卷动骨盆而不是只抬腿','避免身体前后摆荡'],mistakes:['借惯性甩腿','腰椎过度反弓','肩膀完全松掉'],rest:'60–120 秒'},
    {id:'cable_crunch',name:'绳索卷腹',group:'腹',equipment:'绳索',muscles:['腹'],primary:'腹直肌',secondary:'腹斜肌',tips:['固定髋部，主要让躯干屈曲','想象肋骨向骨盆靠近','回程保持腹部张力'],mistakes:['用手臂下拉绳索','只做髋屈','重量过大导致动作变形'],rest:'60–120 秒'},
    {id:'incline_press_any',name:'上斜杠铃/哑铃卧推',group:'胸',equipment:'杠铃/哑铃',muscles:['胸','三头','肩'],primary:'上胸',secondary:'三头、前三角',tips:['肩胛后缩下沉并保持稳定','选择能让上胸发力且肩部舒适的凳面角度','控制下放，稳定推起'],mistakes:['凳面过陡','肩部前顶','动作幅度忽大忽小'],rest:'2–3 分钟'},
    {id:'machine_press',name:'器械推胸',group:'胸',equipment:'器械',muscles:['胸','三头','肩'],primary:'胸大肌',secondary:'三头、前三角',tips:['调整座位使把手与胸部高度合适','肩胛稳定贴靠','回程控制，不让配重撞击'],mistakes:['座椅位置不合适','耸肩','快速回程'],rest:'90–150 秒'},
    {id:'pulldown_any',name:'引体向上/高位下拉',group:'背',equipment:'自重/器械',muscles:['背','二头'],primary:'背阔肌',secondary:'上背、二头',tips:['优先保持肩胛稳定','用肘部向身体两侧/下方移动的感觉带动动作','动作全程控制'],mistakes:['只用手臂','耸肩','大幅摆动'],rest:'90–180 秒'},
    {id:'bulgarian_split_squat',name:'保加利亚分腿蹲',group:'腿',equipment:'哑铃/自重',muscles:['腿','臀'],primary:'股四头肌、臀大肌',secondary:'内收肌、核心',tips:['前脚踩稳，找到可保持平衡的站距','下蹲时前膝与脚尖方向一致','用前腿发力站起'],mistakes:['站距过窄导致失衡','膝盖内扣','后腿发力过多'],rest:'90–150 秒'},
    {id:'biceps_curl',name:'二头弯举',group:'二头',equipment:'哑铃/器械',muscles:['二头'],primary:'肱二头肌',secondary:'肱肌、前臂',tips:['上臂尽量固定','完整控制屈伸','选择能保持动作标准的重量'],mistakes:['身体摆动','肘部前移过多','下放失控'],rest:'60–120 秒'},
    {id:'triceps_pressdown',name:'三头下压',group:'三头',equipment:'绳索/直杆',muscles:['三头'],primary:'肱三头肌',secondary:'前臂',tips:['上臂稳定','肘部完全伸展后短暂停顿','控制回程'],mistakes:['身体压杆','肘部乱跑','重量过大'],rest:'60–120 秒'},
    {id:'crunch_combo',name:'两头起/卷腹',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌',secondary:'髋屈肌群',tips:['先让腹部收紧再完成动作','避免颈部过度用力','每次重复保持相似幅度'],mistakes:['用惯性甩动','拉扯颈部','腰部不适仍强行大幅度'],rest:'45–90 秒'},
    {id:'front_raise',name:'杠铃前平举',group:'肩',equipment:'杠铃',muscles:['肩'],primary:'三角肌前束',secondary:'中束、上胸',tips:['双脚自然站立与肩同宽','采用全握，手腕保持中立','核心收紧，抬至肩部附近即可'],mistakes:['身体后仰借力','手腕过度弯曲','耸肩抢力'],rest:'60–120 秒'},
    {id:'barbell_shoulder_press',name:'杠铃推肩',group:'肩',equipment:'杠铃',muscles:['肩','三头'],primary:'三角肌前束、中束',secondary:'肱三头肌',tips:['握距让前臂在底部接近垂直','核心和臀部收紧保持躯干稳定','杠铃沿自然轨迹推过头顶'],mistakes:['腰部过度后仰','杠铃远离身体','手腕过度后折'],rest:'2–3 分钟'},
    {id:'shrug',name:'哑铃/杠铃耸肩',group:'背',equipment:'哑铃/杠铃',muscles:['背'],primary:'斜方肌上束',secondary:'肩胛提肌',tips:['手臂自然垂直，肩膀向上提','顶端短暂停顿','控制下降，不做大幅绕肩'],mistakes:['用手臂弯举','大幅绕肩','身体弹动'],rest:'60–120 秒'}
  ];

  const PLAN = [
    {id:'p1',index:1,name:'胸 + 三头 + 侧肩',note:'第 1 练',exercises:[
      ['bench_press',3,6,10],['incline_db_press',3,8,12],['pec_deck',2,10,15],['cable_fly',2,12,15],['triceps_pushdown',3,8,12],['overhead_triceps',2,10,15],['lateral_raise',3,12,20]
    ]},
    {id:'p2',index:2,name:'背 + 二头 + 后肩',note:'第 2 练',exercises:[
      ['pullup',3,6,10],['lat_pulldown',3,8,12],['machine_row',3,8,12],['cable_row',2,10,15],['reverse_pec_deck',3,12,20],['barbell_curl',3,8,12],['hammer_curl',2,10,15]
    ]},
    {id:'p3',index:3,name:'肩 + 腿 + 腹',note:'第 3 练',exercises:[
      ['smith_shoulder_press',3,6,10],['lateral_raise',3,12,20],['reverse_fly',2,12,20],['hack_squat',3,6,10],['rdl',3,8,12],['leg_curl',2,10,15],['calf_raise',3,10,15],['hanging_leg_raise',3,8,15],['cable_crunch',3,10,15]
    ]},
    {id:'p4',index:4,name:'目标身材强化',note:'上半身强化 + 少量腿 + 腹',exercises:[
      ['incline_press_any',3,8,12],['machine_press',2,10,12],['pulldown_any',3,8,12],['cable_row',2,10,12],['lateral_raise',3,15,20],['bulgarian_split_squat',2,8,12],['leg_curl',2,10,15],['biceps_curl',2,10,15],['triceps_pressdown',2,10,15],['crunch_combo',3,10,20]
    ]}
  ];

  const DIET = {
    training:{label:'训练日',kcal:2400,protein:150,fat:65,carbs:300},
    rest:{label:'休息日',kcal:2200,protein:150,fat:70,carbs:240},
    meals:[
      ['早餐','鸡蛋 2 个 + 燕麦 60 g + 牛奶 250–300 ml + 香蕉 1 根'],
      ['午餐','熟米饭 250–300 g + 鸡肉/牛肉 180–200 g + 蔬菜约 300 g'],
      ['训练前 1–2 小时','香蕉 + 酸奶/面包/饭团；条件允许再补 20–30 g 蛋白质'],
      ['晚餐','熟米饭 200–250 g + 牛肉/鱼/虾/鸡肉 180–200 g + 大量蔬菜'],
      ['蛋白质不足时','乳清蛋白 25–30 g 作为补充']
    ]
  };

  const defaultState = () => ({
    version:VERSION,
    profile:{age:29,height:null,goal:'恢复力量与肌肉状态，同时缓慢降低体脂；重点发展肩、上胸、背部和手臂。'},
    bodyMetrics:[{id:uid(),date:today(),weight:72,bodyFat:18,skeletalMuscle:31.7,leanMass:59,waist:null}],
    workouts:[],
    activeWorkout:null,
    wellness:{sleep:3,energy:3,soreness:2,updated:today()},
    settings:{restSeconds:120,dietMode:'training'},
    sync:{lastSynced:null}
  });

  let state = loadState();
  let page = 'home';
  let timerInterval = null;
  let restRemaining = 0;
  let activeExerciseFilter = '全部';
  let trainingTab = 'current';
  let dataTab = 'body';
  let dietMode = state.settings.dietMode || 'training';

  const main = document.getElementById('main');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const toastEl = document.getElementById('toast');

  function uid(){ return (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function esc(v=''){ return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
  function num(v){ const n=parseFloat(v); return Number.isFinite(n)?n:null; }
  function round(v,d=1){ const p=10**d; return Math.round(v*p)/p; }
  function exercise(id){ return EXERCISES.find(x=>x.id===id) || {id,name:id,group:'其他',muscles:['其他'],tips:[],mistakes:[],rest:'60–120 秒'}; }
  function planById(id){ return PLAN.find(p=>p.id===id); }
  function formatDate(dateStr){ if(!dateStr)return ''; const d=new Date(`${dateStr}T00:00:00`); return `${d.getMonth()+1}月${d.getDate()}日`; }
  function formatDateTime(ts){ const d=new Date(ts); return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function durationText(ms){ const min=Math.max(1,Math.round(ms/60000)); if(min<60)return `${min} 分钟`; return `${Math.floor(min/60)}小时 ${min%60}分钟`; }
  function sinceText(ts){ if(!ts)return '暂无训练记录'; const ms=Date.now()-new Date(ts).getTime(); const h=Math.max(0,Math.floor(ms/3600000)); if(h<1)return `${Math.floor(ms/60000)} 分钟`; if(h<24)return `${h} 小时`; return `${Math.floor(h/24)}天 ${h%24}小时`; }
  function loadState(){ try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw){ const s=JSON.parse(raw); return {...defaultState(),...s}; } }catch(e){} return defaultState(); }
  function saveState({sync=true}={}){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); if(sync) queueSync(); }
  let syncTimer;
  function queueSync(){ clearTimeout(syncTimer); syncTimer=setTimeout(syncRemote,900); }
  async function syncRemote(){
    try{
      const res=await fetch('/api/state',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({state})});
      if(!res.ok) return;
      state.sync.lastSynced=new Date().toISOString();
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    }catch(e){}
  }
  async function hydrateRemote(){
    try{
      const res=await fetch('/api/state',{headers:{'accept':'application/json'}});
      if(!res.ok)return;
      const data=await res.json();
      if(data && data.state && Array.isArray(data.state.workouts)){
        const localUpdated=latestStateTime(state); const remoteUpdated=latestStateTime(data.state);
        if(remoteUpdated>localUpdated){ state={...defaultState(),...data.state}; saveState({sync:false}); render(); }
      }
    }catch(e){}
  }
  function latestStateTime(s){
    const dates=[...(s.workouts||[]).map(w=>w.endedAt||w.startedAt),...(s.bodyMetrics||[]).map(m=>m.date)].filter(Boolean).map(x=>new Date(x).getTime()).filter(Number.isFinite);
    return dates.length?Math.max(...dates):0;
  }

  function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toastEl._t); toastEl._t=setTimeout(()=>toastEl.classList.remove('show'),1800); }
  function openModal(title,html){ modalTitle.textContent=title; modalBody.innerHTML=html; modal.showModal(); }
  function closeModal(){ if(modal.open)modal.close(); }

  function setPage(next){ page=next; document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page)); render(); window.scrollTo({top:0,behavior:'instant'}); }

  function latestWorkout(){ return [...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt))[0] || null; }
  function nextPlan(){ const last=latestWorkout(); if(!last || !last.planId)return PLAN[0]; const idx=PLAN.findIndex(p=>p.id===last.planId); return PLAN[(idx+1)%PLAN.length]; }
  function totalVolume(w){ return round((w.exercises||[]).flatMap(e=>e.sets||[]).filter(s=>s.done&&!s.warmup).reduce((sum,s)=>sum+(Number(s.weight)||0)*(Number(s.reps)||0),0),0); }
  function workingSets(w){ return (w.exercises||[]).flatMap(e=>e.sets||[]).filter(s=>s.done&&!s.warmup).length; }
  function weeklyWorkouts(){ const now=new Date(); const day=(now.getDay()+6)%7; const start=new Date(now); start.setHours(0,0,0,0); start.setDate(now.getDate()-day); return state.workouts.filter(w=>new Date(w.endedAt)>=start); }
  function lastBody(){ return [...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date))[0] || null; }
  function sevenDayAvgWeight(){ const cutoff=Date.now()-7*86400000; const a=state.bodyMetrics.filter(m=>m.weight&&new Date(`${m.date}T23:59:59`).getTime()>=cutoff).map(m=>Number(m.weight)); if(!a.length)return null; return round(a.reduce((x,y)=>x+y,0)/a.length,1); }
  function recovery(){
    const last=latestWorkout();
    if(!last)return {score:100,label:'体力充沛',base:100,items:[['暂无近期训练','按完全恢复显示',0]]};
    const hours=(Date.now()-new Date(last.endedAt).getTime())/3600000;
    let base=hours<12?30:hours<24?50:hours<36?70:hours<48?85:100;
    const items=[['距离上次训练',sinceText(last.endedAt),base]];
    let score=base;
    const duration=(new Date(last.endedAt)-new Date(last.startedAt))/60000;
    if(duration>90){score-=5;items.push(['上次训练 > 90 分钟','-5%',-5]);}
    if(last.fatigue==='high'){score-=10;items.push(['上次主观疲劳较高','-10%',-10]);}
    if(last.fatigue==='medium'){score-=4;items.push(['上次主观疲劳中等','-4%',-4]);}
    const sleep=Number(state.wellness.sleep||3), energy=Number(state.wellness.energy||3), soreness=Number(state.wellness.soreness||2);
    const sleepAdj={1:-10,2:-5,3:0,4:3,5:5}[sleep]||0; score+=sleepAdj; if(sleepAdj)items.push(['今日睡眠感受',`${sleep}/5`,sleepAdj]);
    const energyAdj={1:-10,2:-5,3:0,4:3,5:5}[energy]||0; score+=energyAdj; if(energyAdj)items.push(['今日精神状态',`${energy}/5`,energyAdj]);
    const sorenessAdj={1:2,2:0,3:-3,4:-7,5:-10}[soreness]||0; score+=sorenessAdj; if(sorenessAdj)items.push(['今日酸痛感',`${soreness}/5`,sorenessAdj]);
    score=Math.round(clamp(score,0,100));
    const label=score>=90?'体力充沛':score>=75?'状态良好':score>=55?'有些疲劳':score>=30?'建议轻量':'建议恢复';
    return {score,label,base,items};
  }
  function muscleRecovery(){
    const groups=['胸','背','肩','二头','三头','腿','臀','腹'];
    const results={};
    groups.forEach(g=>{
      let latest=null, sets=0;
      state.workouts.forEach(w=>{
        let hit=0;
        (w.exercises||[]).forEach(we=>{ const ex=exercise(we.exerciseId); if(ex.muscles.includes(g)) hit += (we.sets||[]).filter(s=>s.done&&!s.warmup).length; });
        if(hit && (!latest || new Date(w.endedAt)>new Date(latest.endedAt))){ latest=w; sets=hit; }
      });
      if(!latest){results[g]=100;return;}
      const h=(Date.now()-new Date(latest.endedAt).getTime())/3600000;
      const target=sets>=8?60:sets>=5?52:44;
      results[g]=Math.round(clamp((h/target)*100,10,100));
    });
    return results;
  }
  function bestPreviousExercise(exId,excludeId=null){
    const ws=[...state.workouts].filter(w=>w.id!==excludeId).sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    for(const w of ws){ const e=(w.exercises||[]).find(x=>x.exerciseId===exId); if(e && e.sets.some(s=>s.done))return {workout:w,entry:e}; }
    return null;
  }
  function setSummary(sets){ return sets.filter(s=>s.done).map(s=>`${s.weight||0}×${s.reps||0}`).join(' / '); }
  function progressionMessage(we){
    const plan=planById(state.activeWorkout?.planId || '');
    const spec=plan?.exercises.find(x=>x[0]===we.exerciseId);
    if(!spec)return '';
    const [,targetSets,minRep,maxRep]=spec;
    const done=we.sets.filter(s=>s.done&&!s.warmup);
    if(done.length<targetSets)return `目标 ${targetSets} 组 × ${minRep}–${maxRep} 次`;
    const allTop=done.slice(0,targetSets).every(s=>Number(s.reps)>=maxRep && (s.rir===''||s.rir==null||Number(s.rir)>=1));
    if(allTop)return '🎯 已达到次数区间上限；下次可考虑小幅加重。';
    return `继续当前重量，优先把有效组逐步推进到 ${maxRep} 次。`;
  }

  function render(){
    document.getElementById('topbar-subtitle').textContent = ({home:'私人训练日志',training:'记录每一组',plan:'每周 4 练',data:'看长期趋势',mine:'计划与设置'})[page];
    if(page==='home')renderHome();
    if(page==='training')renderTraining();
    if(page==='plan')renderPlan();
    if(page==='data')renderData();
    if(page==='mine')renderMine();
  }

  function renderHome(){
    const r=recovery(), last=latestWorkout(), next=nextPlan(), body=lastBody(), week=weeklyWorkouts(), avg=sevenDayAvgWeight(), muscles=muscleRecovery();
    const avgMuscle=Math.round(Object.values(muscles).reduce((a,b)=>a+b,0)/Object.values(muscles).length);
    main.innerHTML=`
      <div class="page-title">今天</div>
      <div class="page-subtitle">打开就知道：恢复怎样、上次练了什么、下一练是什么。</div>
      <section class="card hero-card" id="recovery-card">
        <div class="hero-kicker">↻ 体力恢复</div>
        <div class="hero-row">
          <div><div class="recovery-value">${r.score}<span>%</span></div><div class="recovery-label">${r.label}</div></div>
          <div class="ring" style="--progress:${r.score}%"><div class="ring-inner"><strong>${avgMuscle}%</strong><small>肌群平均</small></div></div>
        </div>
        <div class="hero-meta">
          <div><span>距离上次健身</span><strong>${last?sinceText(last.endedAt):'暂无记录'}</strong></div>
          <div><span>上次训练</span><strong>${last?esc(last.name):'开始你的第一练'}</strong></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">下一练</div><button class="section-link" data-go="plan">查看计划</button></div>
        <div class="card next-card" data-start-plan="${next.id}">
          <div class="next-index">${next.index}</div><div class="next-info"><strong>${esc(next.name)}</strong><small>${next.exercises.length} 个动作 · ${next.note}</small></div><div class="arrow">›</div>
        </div>
        <button class="primary-btn" style="margin-top:10px" data-start-plan="${next.id}">开始训练</button>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">身体</div><button class="section-link" data-go="data">记录数据</button></div>
        <div class="grid2">
          <div class="card metric-card"><small>当前体重</small><strong>${body?.weight?body.weight+' kg':'—'}</strong><div class="metric-delta">7 日平均 ${avg?avg+' kg':'暂无'}</div></div>
          <div class="card metric-card"><small>体脂率</small><strong>${body?.bodyFat?body.bodyFat+'%':'—'}</strong><div class="metric-delta muted">主要看长期趋势</div></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">本周</div><button class="section-link" data-go="training">训练历史</button></div>
        <div class="card">
          <div class="stat-row"><span>力量训练</span><strong>${week.length} / 4</strong></div>
          <div class="progress-bar"><i style="width:${clamp(week.length/4*100,0,100)}%"></i></div>
          <div class="stat-row"><span>完成有效组</span><strong>${week.reduce((s,w)=>s+workingSets(w),0)} 组</strong></div>
          <div class="stat-row"><span>训练容量</span><strong>${Math.round(week.reduce((s,w)=>s+totalVolume(w),0)).toLocaleString()} kg</strong></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">肌群恢复</div><button class="section-link" id="wellness-btn">更新今日状态</button></div>
        <div class="card">${Object.entries(muscles).map(([g,v])=>`<div class="muscle-row"><span>${g}</span><div class="progress-bar"><i style="width:${v}%"></i></div><strong>${v}%</strong></div>`).join('')}</div>
      </section>
    `;
    bindCommon();
    document.getElementById('recovery-card').onclick=showRecoveryDetail;
    document.getElementById('wellness-btn').onclick=showWellness;
  }

  function renderTraining(){
    if(state.activeWorkout){ renderActiveWorkout(); return; }
    const history=[...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    main.innerHTML=`
      <div class="page-title">训练</div><div class="page-subtitle">像备忘录一样快，但每一组都能被统计。</div>
      <div class="tabs"><button class="tab ${trainingTab==='current'?'active':''}" data-training-tab="current">快速开始</button><button class="tab ${trainingTab==='library'?'active':''}" data-training-tab="library">动作库</button><button class="tab ${trainingTab==='history'?'active':''}" data-training-tab="history">历史</button></div>
      <div id="training-content"></div>
    `;
    document.querySelectorAll('[data-training-tab]').forEach(b=>b.onclick=()=>{trainingTab=b.dataset.trainingTab;renderTraining();});
    const c=document.getElementById('training-content');
    if(trainingTab==='current'){
      const next=nextPlan();
      c.innerHTML=`
        <div class="card">
          <div class="small muted">建议下一练</div><h2 style="margin:6px 0 4px">${esc(next.name)}</h2><div class="small muted">${next.exercises.length} 个动作 · 按顺序循环，不绑定星期几</div>
          <button class="primary-btn" style="margin-top:16px" data-start-plan="${next.id}">开始第 ${next.index} 练</button>
          <button class="secondary-btn neutral" style="width:100%;margin-top:8px" id="free-workout-btn">自由训练</button>
        </div>
        <div class="section"><div class="section-head"><div class="section-title">最近训练</div></div>${history.length?history.slice(0,5).map(historyItem).join(''):'<div class="card empty"><strong>还没有训练记录</strong>完成一次训练后会显示在这里。</div>'}</div>
      `;
      bindCommon(); document.getElementById('free-workout-btn').onclick=startFreeWorkout;
    } else if(trainingTab==='history'){
      c.innerHTML=history.length?`<div class="list">${history.map(historyItem).join('')}</div>`:'<div class="card empty"><strong>暂无历史</strong>开始第一练后，训练时间、有效组和容量都会自动保存。</div>';
      document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
    } else {
      c.innerHTML=exerciseLibraryHTML(); bindExerciseLibrary();
    }
  }

  function historyItem(w){
    return `<button class="list-item" style="width:100%;text-align:left" data-history="${w.id}"><div class="next-index" style="width:42px;height:42px">${planById(w.planId)?.index||'•'}</div><div class="grow"><strong>${esc(w.name)}</strong><small>${formatDateTime(w.endedAt)} · ${durationText(new Date(w.endedAt)-new Date(w.startedAt))}</small></div><div><span class="pill blue">${workingSets(w)} 组</span><small style="text-align:right">${Math.round(totalVolume(w)).toLocaleString()}kg</small></div></button>`;
  }

  function renderActiveWorkout(){
    const w=state.activeWorkout; const elapsed=Date.now()-new Date(w.startedAt).getTime();
    main.innerHTML=`
      <div class="workout-head">
        <div class="workout-title">${esc(w.name)}</div><div class="workout-meta"><span id="elapsed">${durationText(elapsed)}</span><span>${workingSets(w)} 有效组</span><span>${Math.round(totalVolume(w)).toLocaleString()} kg</span></div>
        <div class="workout-actions"><button class="secondary-btn" id="add-exercise-btn">＋ 动作</button><button class="secondary-btn" id="cancel-workout-btn">结束/取消</button></div>
      </div>
      <div>${w.exercises.map((we,idx)=>trainingExerciseHTML(we,idx)).join('')}</div>
      <button class="primary-btn" id="finish-workout-btn">完成训练</button>
      ${restRemaining>0?timerHTML():''}
    `;
    bindActiveWorkout();
    clearInterval(timerInterval); timerInterval=setInterval(()=>{ const el=document.getElementById('elapsed'); if(el)el.textContent=durationText(Date.now()-new Date(w.startedAt).getTime()); },30000);
  }

  function trainingExerciseHTML(we,idx){
    const ex=exercise(we.exerciseId), prev=bestPreviousExercise(we.exerciseId,wId(state.activeWorkout));
    return `<section class="training-exercise" data-ex-index="${idx}">
      <div class="training-exercise-head"><div class="exercise-no">${idx+1}</div><div class="grow"><strong>${esc(ex.name)}</strong><small>${esc(ex.primary||ex.group)} · ${esc(ex.rest)}</small>${prev?`<div class="last-result">上次：${esc(setSummary(prev.entry.sets))}</div>`:''}</div><button class="pill blue" data-tutorial="${ex.id}">讲解</button></div>
      <table class="set-table"><thead><tr><th>组</th><th>kg</th><th>次数</th><th>RIR</th><th>完成</th></tr></thead><tbody>${we.sets.map((s,si)=>`<tr><td><button class="pill ${s.warmup?'amber':''}" data-warmup="${si}">${s.warmup?'热':si+1}</button></td><td><input class="set-input" inputmode="decimal" data-field="weight" data-set="${si}" value="${esc(s.weight??'')}"></td><td><input class="set-input" inputmode="numeric" data-field="reps" data-set="${si}" value="${esc(s.reps??'')}"></td><td><input class="set-input rir" inputmode="numeric" data-field="rir" data-set="${si}" value="${esc(s.rir??'')}"></td><td><button class="set-done ${s.done?'done':''}" data-done="${si}">${s.done?'✓':'○'}</button></td></tr>`).join('')}</tbody></table>
      <div class="small ${progressionMessage(we).startsWith('🎯')?'':'muted'}" style="margin:3px 2px 6px">${esc(progressionMessage(we))}</div>
      <div style="display:flex;gap:8px"><button class="add-set" data-add-set="${idx}">＋ 添加一组</button>${prev?`<button class="add-set" data-copy-prev="${idx}">复制上次</button>`:''}</div>
    </section>`;
  }
  function wId(w){return w?.id||null;}

  function timerHTML(){ return `<div class="timer-bar"><div><small>组间休息</small><strong id="rest-timer">${fmtTimer(restRemaining)}</strong></div><div class="grow"></div><button class="timer-btn" id="timer-plus">+30s</button><button class="timer-btn" id="timer-skip">跳过</button></div>`; }
  function fmtTimer(sec){ return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; }
  function startRest(seconds=state.settings.restSeconds){ restRemaining=seconds; renderActiveWorkout(); clearInterval(timerInterval); timerInterval=setInterval(()=>{ restRemaining--; const el=document.getElementById('rest-timer'); if(el)el.textContent=fmtTimer(Math.max(0,restRemaining)); if(restRemaining<=0){clearInterval(timerInterval);toast('休息结束，可以开始下一组');renderActiveWorkout();}},1000); }

  function renderPlan(){
    main.innerHTML=`<div class="page-title">训练计划</div><div class="page-subtitle">不绑定星期几。完成第 1 练后，下一次自动推荐第 2 练。</div>
      <div class="info-note">前 2 周恢复训练时，以“找状态、不拼重量”为原则；动作稳定后再逐渐加量。正式阶段采用每周 4 练循环。</div>
      <section class="section">${PLAN.map(p=>`<div class="card plan-card"><div class="plan-top"><div class="plan-day">${p.index}</div><div class="plan-info"><strong>${esc(p.name)}</strong><small>${p.exercises.length} 个动作 · ${esc(p.note)}</small></div></div><div class="plan-actions"><button class="secondary-btn neutral" data-view-plan="${p.id}">查看动作</button><button class="secondary-btn" data-start-plan="${p.id}">开始训练</button></div></div>`).join('')}</section>`;
    bindCommon(); document.querySelectorAll('[data-view-plan]').forEach(b=>b.onclick=()=>showPlan(b.dataset.viewPlan));
  }

  function renderData(){
    const body=lastBody();
    main.innerHTML=`<div class="page-title">数据</div><div class="page-subtitle">重点看 7 日平均体重、腰围和力量表现，而不是单次体脂秤数字。</div>
      <div class="tabs"><button class="tab ${dataTab==='body'?'active':''}" data-data-tab="body">身体</button><button class="tab ${dataTab==='strength'?'active':''}" data-data-tab="strength">力量</button></div><div id="data-content"></div>`;
    document.querySelectorAll('[data-data-tab]').forEach(b=>b.onclick=()=>{dataTab=b.dataset.dataTab;renderData();});
    const c=document.getElementById('data-content');
    if(dataTab==='body'){
      const avg=sevenDayAvgWeight();
      c.innerHTML=`
        <div class="grid2"><div class="card metric-card"><small>最新体重</small><strong>${body?.weight?body.weight+' kg':'—'}</strong><div class="metric-delta">7 日平均 ${avg?avg+' kg':'—'}</div></div><div class="card metric-card"><small>腰围</small><strong>${body?.waist?body.waist+' cm':'—'}</strong><div class="metric-delta muted">建议固定条件每周测 1 次</div></div></div>
        <section class="section"><div class="section-head"><div class="section-title">体重趋势</div><button class="section-link" id="add-body-btn">＋ 记录</button></div><div class="card"><div class="chart">${weightChart()}</div></div></section>
        <section class="section"><div class="section-head"><div class="section-title">最近记录</div></div><div class="list">${[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(m=>`<button class="list-item" style="width:100%;text-align:left" data-edit-body="${m.id}"><div class="grow"><strong>${formatDate(m.date)}</strong><small>${[m.bodyFat?`体脂 ${m.bodyFat}%`:null,m.skeletalMuscle?`骨骼肌 ${m.skeletalMuscle}kg`:null,m.waist?`腰围 ${m.waist}cm`:null].filter(Boolean).join(' · ')||'身体记录'}</small></div><strong>${m.weight?m.weight+' kg':'—'}</strong></button>`).join('')}</div></section>`;
      document.getElementById('add-body-btn').onclick=()=>showBodyForm(); document.querySelectorAll('[data-edit-body]').forEach(b=>b.onclick=()=>showBodyForm(b.dataset.editBody));
    }else{
      const stats=strengthStats();
      c.innerHTML=stats.length?`<div class="list">${stats.map(s=>`<button class="list-item" style="width:100%;text-align:left" data-strength="${s.id}"><div class="grow"><strong>${esc(s.name)}</strong><small>${s.sessions} 次训练记录</small></div><div style="text-align:right"><strong>${s.bestWeight} kg</strong><small>最高工作重量</small></div></button>`).join('')}</div>`:'<div class="card empty"><strong>还没有力量趋势</strong>完成训练后，这里会自动汇总每个动作的历史重量和次数。</div>';
      document.querySelectorAll('[data-strength]').forEach(b=>b.onclick=()=>showStrength(b.dataset.strength));
    }
  }

  function renderMine(){
    const body=lastBody();
    main.innerHTML=`
      <div class="page-title">我的</div><div class="page-subtitle">TRAIN LOG 的个人设置和定制饮食建议。</div>
      <section class="section"><div class="section-head"><div class="section-title">当前目标</div></div><div class="card"><strong>精壮型身体重组</strong><p class="small muted" style="line-height:1.7;margin-bottom:0">${esc(state.profile.goal)}</p></div></section>
      <section class="section"><div class="section-head"><div class="section-title">健身饮食推荐</div></div><div class="card">
        <div class="tabs"><button class="tab ${dietMode==='training'?'active':''}" data-diet="training">训练日</button><button class="tab ${dietMode==='rest'?'active':''}" data-diet="rest">休息日</button></div>
        ${dietHTML(dietMode)}
      </div></section>
      <section class="section"><div class="section-head"><div class="section-title">设置</div></div><div class="card">
        <div class="stat-row"><span>默认组间休息</span><button class="pill blue" id="rest-setting">${state.settings.restSeconds} 秒</button></div>
        <div class="stat-row"><span>本地数据</span><strong>${state.workouts.length} 次训练 · ${state.bodyMetrics.length} 条身体数据</strong></div>
        <div class="stat-row"><span>云端同步</span><strong>${state.sync.lastSynced?'已连接':'等待 Cloudflare D1'}</strong></div>
      </div></section>
      <section class="section"><button class="secondary-btn neutral" style="width:100%" id="export-btn">导出 JSON 备份</button></section>`;
    document.querySelectorAll('[data-diet]').forEach(b=>b.onclick=()=>{dietMode=b.dataset.diet;state.settings.dietMode=dietMode;saveState();renderMine();});
    document.getElementById('rest-setting').onclick=showRestSetting; document.getElementById('export-btn').onclick=exportData;
  }

  function dietHTML(mode){
    const d=DIET[mode];
    return `<div class="small muted">${d.label}起始目标</div><div class="diet-macro"><div><strong>${d.kcal}</strong><small>kcal</small></div><div><strong>${d.protein}g</strong><small>蛋白质</small></div><div><strong>${d.fat}g</strong><small>脂肪</small></div><div><strong>${d.carbs}g</strong><small>碳水</small></div></div>
      <div class="divider"></div><strong>一天饮食示例</strong>${DIET.meals.map(([n,t])=>`<div class="meal"><strong>${n}</strong><p>${t}</p></div>`).join('')}
      <div class="note" style="margin-top:12px">蛋白质尽量分配到 3–5 餐，每餐约 25–40 g；碳水不需要刻意压低，尤其训练前后要保证足够碳水。乳清只在日常蛋白不足时补充；一水肌酸可按原计划每天 3–5 g。若存在肾脏、肝脏疾病或长期用药，补剂使用前应先咨询医生。</div>`;
  }

  function exerciseLibraryHTML(){
    const groups=['全部','胸','背','肩','腿','二头','三头','腹','小腿'];
    const list=EXERCISES.filter(e=>activeExerciseFilter==='全部'||e.group===activeExerciseFilter);
    return `<div class="search"><input id="exercise-search" placeholder="搜索动作名称"></div><div class="filter-chips">${groups.map(g=>`<button class="chip ${activeExerciseFilter===g?'active':''}" data-filter="${g}">${g}</button>`).join('')}</div><div class="section"><div id="exercise-list" class="list">${list.map(exerciseListItem).join('')}</div></div>`;
  }
  function exerciseListItem(e){ return `<button class="list-item tutorial-card" style="width:100%;text-align:left" data-tutorial="${e.id}"><div class="muscle-icon">${({胸:'◫',背:'↥',肩:'◒',腿:'╱',二头:'⌁',三头:'⌁',腹:'▦',小腿:'│'})[e.group]||'•'}</div><div class="grow"><strong>${esc(e.name)}</strong><p>${esc(e.primary)} · ${esc(e.equipment)}</p></div><span class="pill blue">讲解</span></button>`; }
  function bindExerciseLibrary(){
    document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{activeExerciseFilter=b.dataset.filter;renderTraining();});
    document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial));
    const s=document.getElementById('exercise-search'); if(s)s.oninput=()=>{ const q=s.value.trim().toLowerCase(); document.getElementById('exercise-list').innerHTML=EXERCISES.filter(e=>(activeExerciseFilter==='全部'||e.group===activeExerciseFilter)&&e.name.toLowerCase().includes(q)).map(exerciseListItem).join('')||'<div class="empty">没有找到这个动作</div>'; document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial)); };
  }

  function bindCommon(){
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setPage(b.dataset.go));
    document.querySelectorAll('[data-start-plan]').forEach(b=>b.onclick=()=>startPlan(b.dataset.startPlan));
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
  }

  function startPlan(planId){
    if(state.activeWorkout){toast('已有进行中的训练');setPage('training');return;}
    const p=planById(planId); if(!p)return;
    state.activeWorkout={id:uid(),planId:p.id,name:p.name,startedAt:new Date().toISOString(),exercises:p.exercises.map(([id,sets,min,max])=>({exerciseId:id,target:{sets,min,max},sets:Array.from({length:sets},()=>({weight:'',reps:'',rir:'',warmup:false,done:false}))}))};
    saveState(); setPage('training');
  }
  function startFreeWorkout(){ state.activeWorkout={id:uid(),planId:null,name:'自由训练',startedAt:new Date().toISOString(),exercises:[]}; saveState();renderTraining();showAddExercise(); }

  function bindActiveWorkout(){
    document.querySelectorAll('.training-exercise').forEach(section=>{
      const ei=Number(section.dataset.exIndex);
      section.querySelectorAll('input[data-field]').forEach(inp=>inp.onchange=()=>{ const si=Number(inp.dataset.set), field=inp.dataset.field; state.activeWorkout.exercises[ei].sets[si][field]=inp.value; saveState(); });
      section.querySelectorAll('[data-done]').forEach(btn=>btn.onclick=()=>{ const si=Number(btn.dataset.done), set=state.activeWorkout.exercises[ei].sets[si]; set.done=!set.done; saveState(); if(set.done)startRest(); else renderActiveWorkout(); });
      section.querySelectorAll('[data-warmup]').forEach(btn=>btn.onclick=()=>{ const si=Number(btn.dataset.warmup), set=state.activeWorkout.exercises[ei].sets[si]; set.warmup=!set.warmup; saveState(); renderActiveWorkout(); });
    });
    document.querySelectorAll('[data-add-set]').forEach(b=>b.onclick=()=>{state.activeWorkout.exercises[Number(b.dataset.addSet)].sets.push({weight:'',reps:'',rir:'',warmup:false,done:false});saveState();renderActiveWorkout();});
    document.querySelectorAll('[data-copy-prev]').forEach(b=>b.onclick=()=>copyPrevious(Number(b.dataset.copyPrev)));
    document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial));
    document.getElementById('add-exercise-btn').onclick=showAddExercise;
    document.getElementById('finish-workout-btn').onclick=finishWorkoutPrompt;
    document.getElementById('cancel-workout-btn').onclick=finishOrCancel;
    const plus=document.getElementById('timer-plus'); if(plus)plus.onclick=()=>{restRemaining+=30;document.getElementById('rest-timer').textContent=fmtTimer(restRemaining);};
    const skip=document.getElementById('timer-skip'); if(skip)skip.onclick=()=>{restRemaining=0;clearInterval(timerInterval);renderActiveWorkout();};
  }

  function copyPrevious(index){
    const we=state.activeWorkout.exercises[index], prev=bestPreviousExercise(we.exerciseId,state.activeWorkout.id); if(!prev)return;
    const copy=prev.entry.sets.filter(s=>s.done).map(s=>({weight:s.weight,reps:'',rir:'',warmup:!!s.warmup,done:false})); if(!copy.length)return;
    we.sets=copy; saveState(); renderActiveWorkout(); toast('已带出上次重量');
  }

  function showAddExercise(){
    openModal('添加动作',`<div class="search"><input id="modal-ex-search" placeholder="搜索动作"></div><div id="modal-ex-list" class="list">${EXERCISES.map(e=>`<button class="list-item" style="width:100%;text-align:left" data-pick-ex="${e.id}"><div class="grow"><strong>${esc(e.name)}</strong><small>${e.group} · ${e.equipment}</small></div><span class="pill blue">添加</span></button>`).join('')}</div>`);
    const bind=()=>document.querySelectorAll('[data-pick-ex]').forEach(b=>b.onclick=()=>{const e=exercise(b.dataset.pickEx);state.activeWorkout.exercises.push({exerciseId:e.id,target:null,sets:[{weight:'',reps:'',rir:'',warmup:false,done:false},{weight:'',reps:'',rir:'',warmup:false,done:false},{weight:'',reps:'',rir:'',warmup:false,done:false}]});saveState();closeModal();renderTraining();}); bind();
    document.getElementById('modal-ex-search').oninput=e=>{const q=e.target.value.trim();document.getElementById('modal-ex-list').innerHTML=EXERCISES.filter(x=>x.name.includes(q)).map(x=>`<button class="list-item" style="width:100%;text-align:left" data-pick-ex="${x.id}"><div class="grow"><strong>${esc(x.name)}</strong><small>${x.group} · ${x.equipment}</small></div><span class="pill blue">添加</span></button>`).join('');bind();};
  }

  function finishWorkoutPrompt(){
    const w=state.activeWorkout; if(!w)return; const done=workingSets(w); if(done===0){toast('至少完成一组再结束训练');return;}
    openModal('完成训练',`<div class="card flat"><div class="stat-row"><span>训练时间</span><strong>${durationText(Date.now()-new Date(w.startedAt).getTime())}</strong></div><div class="stat-row"><span>有效组</span><strong>${done} 组</strong></div><div class="stat-row"><span>训练容量</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">今天训练感觉</div><div class="grid3"><button class="secondary-btn neutral feeling" data-feeling="3">一般</button><button class="secondary-btn neutral feeling" data-feeling="4">不错</button><button class="secondary-btn feeling" data-feeling="5">很棒</button></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">整体疲劳</div><div class="grid3"><button class="secondary-btn neutral fatigue" data-fatigue="low">低</button><button class="secondary-btn neutral fatigue" data-fatigue="medium">中</button><button class="secondary-btn neutral fatigue" data-fatigue="high">高</button></div></div><button class="primary-btn" id="confirm-finish">保存训练</button>`);
    let feeling=4,fatigue='medium'; document.querySelectorAll('.feeling').forEach(b=>b.onclick=()=>{feeling=Number(b.dataset.feeling);document.querySelectorAll('.feeling').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');}); document.querySelectorAll('.fatigue').forEach(b=>b.onclick=()=>{fatigue=b.dataset.fatigue;document.querySelectorAll('.fatigue').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');});
    document.getElementById('confirm-finish').onclick=()=>completeWorkout(feeling,fatigue);
  }
  function completeWorkout(feeling,fatigue){
    const w=state.activeWorkout; w.endedAt=new Date().toISOString();w.feeling=feeling;w.fatigue=fatigue;w.exercises=w.exercises.map(e=>({...e,sets:e.sets.filter(s=>s.done||s.weight||s.reps)})); state.workouts.push(w);state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);trainingTab='history';renderTraining();toast('训练已保存');
  }
  function finishOrCancel(){
    openModal('结束当前训练',`<div class="note">未完成的训练也可以继续保留。只有选择“取消本次训练”才会删除当前进度。</div><button class="primary-btn" style="margin-top:14px" id="keep-training">继续训练</button><button class="secondary-btn danger" style="width:100%;margin-top:8px" id="cancel-current">取消本次训练</button>`);
    document.getElementById('keep-training').onclick=closeModal;document.getElementById('cancel-current').onclick=()=>{state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);renderTraining();toast('已取消本次训练');};
  }

  function showPlan(id){ const p=planById(id); if(!p)return; openModal(`第 ${p.index} 练 · ${p.name}`,`<div class="card flat">${p.exercises.map(([id,sets,min,max],i)=>{const e=exercise(id);return `<div class="exercise-row"><div class="exercise-no">${i+1}</div><div><strong>${esc(e.name)}</strong><small>${e.group} · ${e.primary}</small></div><span class="pill">${sets}×${min}–${max}</span></div>`;}).join('')}</div><button class="primary-btn" style="margin-top:12px" id="modal-start-plan">开始训练</button>`); document.getElementById('modal-start-plan').onclick=()=>{closeModal();startPlan(id);}; }

  function showTutorial(id){
    const e=exercise(id); openModal(e.name,`<div class="card" style="background:#101827;color:white"><div class="small" style="color:#8fa8cf">动作学习预览</div><h2 style="margin:7px 0">${esc(e.name)}</h2><div style="display:flex;gap:8px"><span class="pill blue">${e.group}</span><span class="pill">${esc(e.equipment)}</span></div><div style="height:150px;border-radius:16px;background:linear-gradient(145deg,#17243b,#0d1422);margin-top:14px;display:grid;place-items:center;text-align:center;color:#9fb0c9"><div><div style="font-size:44px">◎</div><div class="small">视频 / 3D 教学媒体位<br>第一版先提供动作要点</div></div></div></div>
      <section class="section"><div class="card"><div class="stat-row"><span>主要肌群</span><strong>${esc(e.primary)}</strong></div><div class="stat-row"><span>辅助肌群</span><strong>${esc(e.secondary||'—')}</strong></div><div class="stat-row"><span>建议组间休息</span><strong>${esc(e.rest)}</strong></div></div></section>
      <section class="section"><div class="section-title" style="margin-bottom:10px">动作要点</div><div class="card">${e.tips.map((t,i)=>`<div class="exercise-row"><div class="exercise-no" style="background:#eaf3ff;color:#1677ff">${i+1}</div><div><strong>${esc(t)}</strong></div><div></div></div>`).join('')}</div></section>
      <section class="section"><div class="section-title" style="margin-bottom:10px">常见错误</div><div class="card">${e.mistakes.map(t=>`<div class="meal"><strong style="color:#e24b4b">× ${esc(t)}</strong></div>`).join('')}</div></section>`);
  }

  function showRecoveryDetail(){
    const r=recovery(); openModal('体力恢复',`<div class="card hero-card"><div class="hero-kicker">当前恢复</div><div class="recovery-value" style="margin-top:10px">${r.score}<span>%</span></div><div class="recovery-label">${r.label}</div></div><div class="section"><div class="section-title" style="margin-bottom:10px">为什么是 ${r.score}%？</div><div class="card">${r.items.map(([n,v,a])=>`<div class="stat-row"><span>${esc(n)} · ${esc(v)}</span><strong>${typeof a==='number'&&a!==r.base?(a>0?'+':'')+a+'%':''}</strong></div>`).join('')}</div></div><div class="info-note">这是 TRAIN LOG 的训练日志恢复估算，用训练间隔、上次训练时长/疲劳和你今天的主观状态计算，不是医学指标，也不等同于运动手表基于 HRV、睡眠和心率负荷的算法。</div>`);
  }
  function showWellness(){
    const w=state.wellness; openModal('更新今日状态',`<div class="form-grid"><div class="field full"><label>睡眠感受（1 很差 — 5 很好）</label><input id="well-sleep" type="range" min="1" max="5" value="${w.sleep}"></div><div class="field full"><label>精神状态（1 很差 — 5 很好）</label><input id="well-energy" type="range" min="1" max="5" value="${w.energy}"></div><div class="field full"><label>肌肉酸痛（1 很轻 — 5 很重）</label><input id="well-soreness" type="range" min="1" max="5" value="${w.soreness}"></div></div><button class="primary-btn" style="margin-top:14px" id="save-wellness">保存</button>`); document.getElementById('save-wellness').onclick=()=>{state.wellness={sleep:Number(document.getElementById('well-sleep').value),energy:Number(document.getElementById('well-energy').value),soreness:Number(document.getElementById('well-soreness').value),updated:today()};saveState();closeModal();renderHome();toast('今日状态已更新');};
  }

  function showBodyForm(id=null){
    const m=id?state.bodyMetrics.find(x=>x.id===id):null; openModal(m?'编辑身体数据':'记录身体数据',`<div class="form-grid"><div class="field"><label>日期</label><input id="body-date" type="date" value="${m?.date||today()}"></div><div class="field"><label>体重 kg</label><input id="body-weight" inputmode="decimal" value="${m?.weight??''}"></div><div class="field"><label>体脂率 %</label><input id="body-fat" inputmode="decimal" value="${m?.bodyFat??''}"></div><div class="field"><label>腰围 cm</label><input id="body-waist" inputmode="decimal" value="${m?.waist??''}"></div><div class="field"><label>骨骼肌 kg</label><input id="body-muscle" inputmode="decimal" value="${m?.skeletalMuscle??''}"></div><div class="field"><label>去脂体重 kg</label><input id="body-lean" inputmode="decimal" value="${m?.leanMass??''}"></div></div><button class="primary-btn" style="margin-top:14px" id="save-body">保存</button>${m?'<button class="secondary-btn danger" style="width:100%;margin-top:8px" id="delete-body">删除这条记录</button>':''}`);
    document.getElementById('save-body').onclick=()=>{const obj={id:m?.id||uid(),date:document.getElementById('body-date').value||today(),weight:num(document.getElementById('body-weight').value),bodyFat:num(document.getElementById('body-fat').value),waist:num(document.getElementById('body-waist').value),skeletalMuscle:num(document.getElementById('body-muscle').value),leanMass:num(document.getElementById('body-lean').value)}; if(m)Object.assign(m,obj);else state.bodyMetrics.push(obj); saveState();closeModal();renderData();toast('身体数据已保存');};
    if(m)document.getElementById('delete-body').onclick=()=>{state.bodyMetrics=state.bodyMetrics.filter(x=>x.id!==m.id);saveState();closeModal();renderData();toast('已删除');};
  }

  function weightChart(){
    const pts=[...state.bodyMetrics].filter(m=>m.weight).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(-30); if(pts.length<2)return '<div class="chart-empty">至少记录 2 次体重后显示趋势图。<br>建议尽量在早晨固定条件记录。</div>';
    const values=pts.map(p=>Number(p.weight)), min=Math.min(...values)-.5,max=Math.max(...values)+.5,w=320,h=150,pad=20; const xy=pts.map((p,i)=>[pad+i*(w-2*pad)/(pts.length-1),h-pad-(Number(p.weight)-min)/(max-min)*(h-2*pad)]); const path=xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
    return `<svg viewBox="0 0 ${w} ${h}" aria-label="体重趋势"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#e7e9ee"/><path d="${path}" fill="none" stroke="#1677ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#fff" stroke="#1677ff" stroke-width="2"/><text x="${p[0]}" y="${p[1]-8}" text-anchor="middle" font-size="8" fill="#707681">${values[i]}</text>`).join('')}</svg>`;
  }
  function strengthStats(){
    const map={}; state.workouts.forEach(w=>(w.exercises||[]).forEach(e=>{const done=(e.sets||[]).filter(s=>s.done&&!s.warmup&&num(s.weight)!==null);if(!done.length)return;const id=e.exerciseId;if(!map[id])map[id]={id,name:(e.customName || exercise(id).name),sessions:0,bestWeight:0};map[id].sessions++;map[id].bestWeight=Math.max(map[id].bestWeight,...done.map(s=>Number(s.weight)||0));})); return Object.values(map).sort((a,b)=>b.sessions-a.sessions);
  }
  function showStrength(id){
    const records=[];state.workouts.sort((a,b)=>new Date(a.endedAt)-new Date(b.endedAt)).forEach(w=>{const e=(w.exercises||[]).find(x=>x.exerciseId===id);if(e&&e.sets.some(s=>s.done))records.push({date:w.endedAt,sets:e.sets.filter(s=>s.done)});}); const ex=exercise(id); openModal(ex.name,`<div class="card"><div class="stat-row"><span>训练次数</span><strong>${records.length}</strong></div><div class="stat-row"><span>最高工作重量</span><strong>${Math.max(...records.flatMap(r=>r.sets.map(s=>Number(s.weight)||0)))} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">历史</div><div class="list">${records.slice().reverse().map(r=>`<div class="list-item"><div class="grow"><strong>${formatDateTime(r.date)}</strong><small>${esc(setSummary(r.sets))}</small></div></div>`).join('')}</div></section>`);
  }

  function showWorkoutDetail(id){
    const w=state.workouts.find(x=>x.id===id); if(!w)return; openModal(w.name,`<div class="card"><div class="stat-row"><span>日期</span><strong>${formatDateTime(w.endedAt)}</strong></div><div class="stat-row"><span>训练时间</span><strong>${durationText(new Date(w.endedAt)-new Date(w.startedAt))}</strong></div><div class="stat-row"><span>有效组</span><strong>${workingSets(w)} 组</strong></div><div class="stat-row"><span>训练容量</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">训练内容</div>${(w.exercises||[]).map(e=>`<div class="card flat"><strong>${esc(e.customName || exercise(e.exerciseId).name)}</strong><div class="small muted" style="margin-top:6px">${esc(setSummary(e.sets))}</div></div>`).join('')}</section><button class="secondary-btn danger" style="width:100%" id="delete-workout">删除这次训练</button>`); document.getElementById('delete-workout').onclick=()=>{state.workouts=state.workouts.filter(x=>x.id!==id);saveState();closeModal();render();toast('训练记录已删除');};
  }

  function showRestSetting(){ openModal('默认组间休息',`<div class="form-grid"><div class="field full"><label>秒</label><input id="rest-seconds" type="number" min="30" max="300" step="15" value="${state.settings.restSeconds}"></div></div><button class="primary-btn" style="margin-top:14px" id="save-rest">保存</button>`);document.getElementById('save-rest').onclick=()=>{state.settings.restSeconds=clamp(Number(document.getElementById('rest-seconds').value)||120,30,300);saveState();closeModal();renderMine();}; }
  function exportData(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`train-log-backup-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }

  function showQuickAdd(){
    openModal('快速记录',`<div class="info-note">适合你以前的备忘录习惯：一行一个动作，后面直接写“重量x次数”。例如：<b>卧推 50x10 50x10 60x8</b></div><div class="quick-lines" style="margin-top:12px"><textarea id="quick-text" placeholder="卧推 50x10 50x10 60x8\n高位下拉 35x12 40x10 45x8"></textarea></div><button class="primary-btn" style="margin-top:12px" id="quick-parse">生成训练记录</button>`);
    document.getElementById('quick-parse').onclick=()=>parseQuick(document.getElementById('quick-text').value);
  }
  function parseQuick(text){
    const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean); if(!lines.length){toast('先输入训练内容');return;}
    const entries=[];
    lines.forEach(line=>{
      let matches=[...line.matchAll(/(\d+(?:\.\d+)?)\s*(?:kg)?\s*[x×]\s*(\d+)/gi)];
      const barMatch=[...line.matchAll(/空杆\s*[x×]\s*(\d+)/gi)];
      let stripped=line.replace(/(\d+(?:\.\d+)?)\s*(?:kg)?\s*[x×]\s*(\d+)/gi,'').replace(/空杆\s*[x×]\s*(\d+)/gi,'').trim().replace(/[，,;；]+$/,'').trim();
      const plusReps = !matches.length && !barMatch.length ? stripped.match(/^(.*?)(\d+(?:\s*\+\s*\d+){1,})$/) : null;
      const name=(plusReps?plusReps[1]:stripped).trim();
      let ex=EXERCISES.find(e=>name.includes(e.name)||e.name.includes(name));
      if(!ex && name.includes('卧推'))ex=exercise('bench_press');
      if(!ex && name.includes('下拉'))ex=exercise('lat_pulldown');
      if(!ex && name.includes('划船'))ex=exercise('cable_row');
      if(!ex && name.includes('侧平举'))ex=exercise('lateral_raise');
      if(!ex && name.includes('弯举'))ex=exercise('biceps_curl');
      const parsedSets = [
        ...barMatch.map(m=>({weight:'0',reps:m[1],rir:'',warmup:true,done:true})),
        ...matches.map(m=>({weight:m[1],reps:m[2],rir:'',warmup:false,done:true})),
        ...(plusReps ? plusReps[2].split(/\s*\+\s*/).map(r=>({weight:'',reps:r,rir:'',warmup:false,done:true})) : [])
      ];
      if(parsedSets.length)entries.push({exerciseId:ex?.id||`custom_${uid()}`,customName:ex?null:(name||'自定义动作'),sets:parsedSets});
    });
    if(!entries.length){toast('没有识别到“重量x次数”格式');return;}
    const started=new Date(Date.now()-60*60000),ended=new Date(); const w={id:uid(),planId:null,name:'快速记录',startedAt:started.toISOString(),endedAt:ended.toISOString(),feeling:4,fatigue:'medium',exercises:entries.map(e=>{if(e.customName){ if(!EXERCISES.find(x=>x.id===e.exerciseId))EXERCISES.push({id:e.exerciseId,name:e.customName,group:'其他',equipment:'自定义',muscles:['其他'],primary:'自定义',secondary:'',tips:[],mistakes:[],rest:'60–120 秒'});}return e;})}; state.workouts.push(w);saveState();closeModal();trainingTab='history';setPage('training');toast(`已保存 ${entries.length} 个动作`);
  }

  document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setPage(b.dataset.page));
  document.getElementById('quick-add-btn').onclick=showQuickAdd;
  document.getElementById('modal-close').onclick=closeModal;
  modal.addEventListener('click',e=>{ if(e.target===modal)closeModal(); });

  if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  render();
  hydrateRemote();
})();
