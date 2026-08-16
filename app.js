(() => {
  'use strict';

  const STORAGE_KEY = 'train-log-state-v1';
  const VERSION = '3.0';

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
    {id:'lat_pulldown',name:'高位下拉',group:'背',equipment:'器械',muscles:['背','二头'],primary:'背阔肌',secondary:'菱形肌、中下斜方肌、三角肌后束、肱二头肌、前臂肌群',tips:['胸口略抬，肩胛先下沉','把手拉向上胸区域','回程时让背阔肌充分伸展但保持控制'],mistakes:['身体后仰幅度过大','拉到颈后','耸肩并用手臂硬拉'],rest:'90–150 秒'},
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
    ,{id:'flat_db_press',name:'平板哑铃卧推',group:'胸',equipment:'哑铃',muscles:['胸','三头','肩'],primary:'胸大肌',secondary:'肱三头肌、前三角',tips:['肩胛后缩下沉','哑铃沿胸部两侧稳定下放','推起时保持前臂接近垂直'],mistakes:['肩部前顶','哑铃碰撞','下放失控'],rest:'2–3 分钟'}
    ,{id:'decline_press',name:'下斜卧推',group:'胸',equipment:'杠铃/哑铃',muscles:['胸','三头'],primary:'胸大肌下部',secondary:'肱三头肌',tips:['固定肩胛','控制下放','稳定推起'],mistakes:['弹胸','肩膀前顶','重量过大'],rest:'2–3 分钟'}
    ,{id:'chest_dip',name:'双杠臂屈伸（胸）',group:'胸',equipment:'自重',muscles:['胸','三头'],primary:'胸大肌',secondary:'肱三头肌、前三角',tips:['身体略前倾','肩胛保持稳定','在肩部舒适范围下降'],mistakes:['耸肩','下降过深','摆动借力'],rest:'2–3 分钟'}
    ,{id:'deadlift',name:'传统硬拉',group:'背',equipment:'杠铃',muscles:['背','腿','臀'],primary:'后链肌群',secondary:'背阔肌、前臂',tips:['杠铃贴近小腿','背部保持中立','脚蹬地与伸髋同步'],mistakes:['弓背','杠铃离身体过远','顶端过度后仰'],rest:'2–4 分钟'}
    ,{id:'barbell_row',name:'杠铃俯身划船',group:'背',equipment:'杠铃',muscles:['背','二头'],primary:'背阔肌、上背',secondary:'肱二头肌',tips:['髋部后移稳定躯干','杠铃拉向腹部','控制下放'],mistakes:['身体甩动','耸肩','腰背失稳'],rest:'2–3 分钟'}
    ,{id:'one_arm_db_row',name:'单臂哑铃划船',group:'背',equipment:'哑铃',muscles:['背','二头'],primary:'背阔肌',secondary:'上背、肱二头肌',tips:['躯干稳定','肘向髋部方向拉','顶端短暂停顿'],mistakes:['扭转身体','耸肩','用手臂硬拉'],rest:'90–150 秒'}
    ,{id:'tbar_row',name:'T杠划船',group:'背',equipment:'T杠/器械',muscles:['背','二头'],primary:'上背、背阔肌',secondary:'肱二头肌',tips:['胸椎稳定','肘部向后拉','回程控制'],mistakes:['腰部摆动','耸肩','拉程过短'],rest:'2–3 分钟'}
    ,{id:'face_pull',name:'绳索面拉',group:'肩',equipment:'绳索',muscles:['肩','背'],primary:'三角肌后束',secondary:'肩袖外旋肌、菱形肌、中下斜方肌',tips:['拉向眉眼高度','肘部向外打开','肩胛稳定'],mistakes:['身体后仰','耸肩','重量过大'],rest:'60–120 秒'}
    ,{id:'arnold_press',name:'阿诺德推举',group:'肩',equipment:'哑铃',muscles:['肩','三头'],primary:'三角肌',secondary:'肱三头肌',tips:['控制旋转','核心收紧','动作连贯'],mistakes:['腰部后仰','旋转过快','下放过深'],rest:'90–150 秒'}
    ,{id:'upright_row',name:'绳索直立划船',group:'肩',equipment:'绳索',muscles:['肩'],primary:'三角肌中束',secondary:'斜方肌',tips:['肘部引导动作','重量适中','保持肩部舒适'],mistakes:['拉得过高造成不适','耸肩','身体摆动'],rest:'60–120 秒'}
    ,{id:'back_squat',name:'杠铃深蹲',group:'腿',equipment:'杠铃',muscles:['腿','臀'],primary:'股四头肌、臀大肌',secondary:'核心',tips:['脚掌稳定','膝盖与脚尖同向','躯干保持稳定'],mistakes:['膝内扣','脚跟抬起','塌腰'],rest:'2–4 分钟'}
    ,{id:'leg_press',name:'腿举',group:'腿',equipment:'器械',muscles:['腿','臀'],primary:'股四头肌',secondary:'臀大肌',tips:['腰背贴靠','膝盖与脚尖同向','控制下放'],mistakes:['膝盖内扣','过度锁膝','骨盆卷起'],rest:'2–3 分钟'}
    ,{id:'leg_extension',name:'腿屈伸',group:'腿',equipment:'器械',muscles:['腿'],primary:'股四头肌',secondary:'',tips:['轴心对准膝关节','顶端收缩','控制回程'],mistakes:['甩动配重','抬臀','过度锁膝'],rest:'60–120 秒'}
    ,{id:'hip_thrust',name:'杠铃臀推',group:'臀',equipment:'杠铃',muscles:['臀','腿'],primary:'臀大肌',secondary:'腘绳肌',tips:['下巴微收','顶端骨盆后倾','脚掌稳定'],mistakes:['腰椎过伸','脚位不当','顶端不收臀'],rest:'2–3 分钟'}
    ,{id:'cable_kickback',name:'绳索后踢腿',group:'臀',equipment:'绳索',muscles:['臀'],primary:'臀大肌',secondary:'核心',tips:['核心稳定','髋部伸展发力','控制回程'],mistakes:['腰部摆动','动作过快','髋部旋转'],rest:'60–120 秒'}
    ,{id:'preacher_curl',name:'牧师凳弯举',group:'二头',equipment:'杠铃/哑铃',muscles:['二头'],primary:'肱二头肌',secondary:'肱肌',tips:['上臂贴垫','控制下放','底部不过度锁肘'],mistakes:['肩部前顶','弹起重量','下放过快'],rest:'60–120 秒'}
    ,{id:'cable_curl',name:'绳索弯举',group:'二头',equipment:'绳索',muscles:['二头'],primary:'肱二头肌',secondary:'前臂',tips:['上臂稳定','保持张力','顶端收缩'],mistakes:['身体摇摆','肘部乱动','重量过大'],rest:'60–120 秒'}
    ,{id:'skull_crusher',name:'仰卧臂屈伸',group:'三头',equipment:'EZ杠/哑铃',muscles:['三头'],primary:'肱三头肌',secondary:'',tips:['上臂相对固定','控制下降','伸肘发力'],mistakes:['肘部外翻','动作过快','肩部代偿'],rest:'60–120 秒'}
    ,{id:'close_grip_bench',name:'窄握卧推',group:'三头',equipment:'杠铃',muscles:['三头','胸'],primary:'肱三头肌',secondary:'胸大肌',tips:['握距略窄于常规卧推','肘部自然','稳定推起'],mistakes:['握距过窄伤腕','肘部外张','弹胸'],rest:'2–3 分钟'}
    ,{id:'plank',name:'平板支撑',group:'腹',equipment:'自重',muscles:['腹'],primary:'核心肌群',secondary:'臀部、肩',tips:['身体保持直线','收紧腹臀','正常呼吸'],mistakes:['塌腰','撅臀','憋气'],rest:'45–90 秒'}
    ,{id:'ab_wheel',name:'健腹轮',group:'腹',equipment:'健腹轮',muscles:['腹'],primary:'腹直肌、核心',secondary:'背阔肌',tips:['骨盆轻后倾','逐渐延伸','核心控制回程'],mistakes:['塌腰','过度追求幅度','快速回弹'],rest:'60–120 秒'}
    ,{id:'wrist_curl',name:'腕弯举',group:'前臂',equipment:'哑铃/杠铃',muscles:['前臂'],primary:'腕屈肌群',secondary:'',tips:['前臂固定','只活动手腕','控制全程'],mistakes:['借力甩动','幅度失控','重量过大'],rest:'45–90 秒'}
    ,{id:'treadmill_run',name:'跑步',group:'有氧',equipment:'跑步机/户外',muscles:['有氧'],primary:'心肺',secondary:'下肢',tips:['先热身再提速','保持可控节奏','逐步增加时长'],mistakes:['突然冲刺','步幅过大','疲劳时硬撑'],rest:'',type:'cardio',metric:'min'}
    ,{id:'incline_walk',name:'坡度走',group:'有氧',equipment:'跑步机',muscles:['有氧'],primary:'心肺、臀腿',secondary:'小腿',tips:['选择可持续坡度','身体保持直立','避免一直扶把手'],mistakes:['坡度过高导致动作变形','全程扶把','速度过快'],rest:'',type:'cardio',metric:'min'}
    ,{id:'elliptical',name:'椭圆机',group:'有氧',equipment:'椭圆机',muscles:['有氧'],primary:'心肺',secondary:'全身',tips:['保持均匀节奏','脚掌贴稳踏板','阻力循序渐进'],mistakes:['身体左右摇摆','只靠手臂','阻力过大'],rest:'',type:'cardio',metric:'min'}
    ,{id:'stationary_bike',name:'动感单车/自行车',group:'有氧',equipment:'单车',muscles:['有氧'],primary:'心肺',secondary:'大腿',tips:['调整座椅高度','保持稳定踏频','逐步增加阻力'],mistakes:['座位过低','膝盖内扣','一开始阻力过大'],rest:'',type:'cardio',metric:'min'}
    ,{id:'rowing_machine',name:'划船机',group:'有氧',equipment:'划船机',muscles:['有氧','背','腿'],primary:'心肺、全身',secondary:'背部、腿部',tips:['腿-髋-手依次发力','回程顺序相反','保持节奏'],mistakes:['只用手拉','弓背','回程过急'],rest:'',type:'cardio',metric:'min'}
    ,{id:'stair_climber',name:'登阶机',group:'有氧',equipment:'登阶机',muscles:['有氧','腿','臀'],primary:'心肺、臀腿',secondary:'小腿',tips:['身体直立','步幅稳定','循序增加速度'],mistakes:['趴在扶手','步幅过小','速度过快'],rest:'',type:'cardio',metric:'min'}
    ,{id:'jump_rope',name:'跳绳',group:'有氧',equipment:'跳绳',muscles:['有氧','小腿'],primary:'心肺',secondary:'小腿、前臂',tips:['轻柔落地','手腕带绳','保持节奏'],mistakes:['跳得过高','全臂甩绳','硬地长时间冲量'],rest:'',type:'cardio',metric:'min'}
    ,{id:'swimming',name:'游泳',group:'有氧',equipment:'泳池',muscles:['有氧','全身'],primary:'心肺、全身',secondary:'肩背',tips:['根据泳姿控制节奏','注意呼吸','逐步增加持续时间'],mistakes:['疲劳仍强撑','呼吸节奏紊乱','忽略热身'],rest:'',type:'cardio',metric:'min'}

  ];

  // V2.3 动作库调整
  const REMOVED_EXERCISE_IDS=new Set(['hip_thrust','cable_kickback','ab_wheel','rowing_machine','jump_rope','swimming']);
  for(let i=EXERCISES.length-1;i>=0;i--) if(REMOVED_EXERCISE_IDS.has(EXERCISES[i].id)) EXERCISES.splice(i,1);
  const renameExercise=(id,name)=>{const e=EXERCISES.find(x=>x.id===id);if(e)e.name=name;};
  renameExercise('incline_walk','爬坡走');renameExercise('reverse_pec_deck','蝴蝶机反向飞鸟');renameExercise('leg_extension','坐姿腿屈伸');
  EXERCISES.push(
    {id:'db_shoulder_press',name:'哑铃推肩',group:'肩',equipment:'哑铃',muscles:['肩','三头'],primary:'三角肌前束、中束',secondary:'肱三头肌',tips:['坐稳并让背部贴靠靠垫','哑铃从肩部两侧稳定向上推起','顶端不要猛锁肘，控制下放'],mistakes:['腰部过度反弓','耸肩抢力','哑铃下放过深造成肩部不适'],rest:'90–150 秒'},
    {id:'machine_crunch',name:'器械卷腹',group:'腹',equipment:'器械',muscles:['腹'],primary:'腹直肌',secondary:'腹斜肌',tips:['调整座椅与胸垫使轴心舒适','用腹部卷曲躯干而不是用手臂拉','顶端收紧腹部后控制回程'],mistakes:['用手臂硬拉把手','只做髋屈没有卷腹','回程完全放松撞配重'],rest:'60–90 秒'},
    {id:'sit_up',name:'仰卧起坐',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌',secondary:'髋屈肌群',tips:['屈膝仰卧并保持足底稳定','先收紧腹部再抬起躯干','控制回程，不要直接砸回地面'],mistakes:['双手猛拉颈部','借惯性弹起','腰部不适仍追求过大幅度'],rest:'45–90 秒'},
    {id:'leg_raise',name:'抬腿',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌下部',secondary:'髋屈肌群',tips:['腰背保持稳定','抬腿时轻微卷动骨盆','下降到腰部仍能贴稳的位置'],mistakes:['塌腰','甩腿借力','下降过低导致腰椎代偿'],rest:'45–90 秒'},
    {id:'butterfly_crunch',name:'平板蝴蝶收腹',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌',secondary:'腹斜肌',tips:['脚掌相对、双膝自然打开','呼气时卷起上背让肋骨靠近骨盆','动作幅度以腹部持续收缩为准'],mistakes:['用颈部带动','双腿用力夹紧','快速弹起回落'],rest:'45–90 秒'},
    {id:'lying_leg_raise',name:'仰卧抬腿',group:'腹',equipment:'自重',muscles:['腹'],primary:'腹直肌下部',secondary:'髋屈肌群',tips:['仰卧并让腰背保持稳定','双腿并拢抬起至可控高度','下放时速度更慢'],mistakes:['腰部离地','膝盖随意弯曲借力','下放失控'],rest:'45–90 秒'},
    {id:'incline_twist_crunch',name:'上斜卷腹转体',group:'腹',equipment:'上斜凳',muscles:['腹'],primary:'腹斜肌',secondary:'腹直肌、髋屈肌群',tips:['固定下肢并保持骨盆稳定','卷起时加入小幅躯干旋转','左右交替并控制回程'],mistakes:['大幅扭腰','用手拉头','只转肩不收腹'],rest:'45–90 秒'},
    {id:'weighted_russian_twist',name:'负重俄罗斯转体',group:'腹',equipment:'哑铃/杠铃片',muscles:['腹'],primary:'腹斜肌',secondary:'腹直肌、髋屈肌群',tips:['躯干微后倾并收紧核心','负重在身体两侧可控移动','骨盆尽量保持稳定'],mistakes:['只甩手不转躯干','含胸塌腰','重量过大导致失控'],rest:'45–90 秒'},
    {id:'hammer_one_arm_row',name:'单手悍马机划船',group:'背',equipment:'悍马高位划船机',muscles:['背','二头'],primary:'背阔肌、菱形肌、中下斜方肌',secondary:'三角肌后束、肱二头肌、前臂肌群',tips:['胸部贴稳靠垫','先让肩胛下沉再把肘部拉向后方','顶端停顿后控制回程'],mistakes:['身体旋转借力','耸肩','用手臂硬拽'],rest:'90–150 秒'},
    {id:'assisted_pullup',name:'引体向上辅助',group:'背',equipment:'辅助引体机',muscles:['背','二头'],primary:'背阔肌',secondary:'肱二头肌、前臂',tips:['选择能完成标准全程的辅助重量','先下沉肩胛再屈肘上拉','控制下降到手臂接近伸直'],mistakes:['耸肩','摆动身体','辅助过大导致背部不发力'],rest:'90–150 秒'},
    {id:'goblet_squat',name:'哑铃酒杯深蹲',group:'腿',equipment:'哑铃',muscles:['腿','臀'],primary:'股四头肌、臀大肌',secondary:'核心、内收肌',tips:['哑铃贴近胸前','膝盖与脚尖方向一致','保持全脚掌受力下蹲'],mistakes:['脚跟抬起','膝盖内扣','身体过度前倾'],rest:'90–150 秒'},
    {id:'reverse_hack_squat',name:'俯卧反向哈克深蹲',group:'腿',equipment:'哈克机',muscles:['腿','臀'],primary:'臀大肌、股四头肌',secondary:'腘绳肌',tips:['面向器械站稳，肩背贴靠垫','髋膝同时屈曲下降','脚掌稳定推起并充分伸髋'],mistakes:['腰背松散','膝盖内扣','下降过快'],rest:'2–3 分钟'},
    {id:'triceps_rope_overhead',name:'绳索过顶臂屈伸',group:'三头',equipment:'绳索',muscles:['三头'],primary:'肱三头肌长头',secondary:'核心',tips:['上臂尽量固定','肘部朝前上方','伸肘到底后控制回程'],mistakes:['肘部外张','腰椎反弓','身体前后摆动'],rest:'60–120 秒'},
    {id:'triceps_kickback',name:'哑铃俯身臂屈伸',group:'三头',equipment:'哑铃',muscles:['三头'],primary:'肱三头肌',secondary:'后肩',tips:['上臂抬到与躯干接近一线并固定','只通过伸肘把哑铃向后送','顶端夹紧三头后慢慢回程'],mistakes:['上臂上下摆动','重量过大甩动','含胸弓背'],rest:'60–90 秒'},
    {id:'bench_dip',name:'凳上臂屈伸',group:'三头',equipment:'训练凳',muscles:['三头'],primary:'肱三头肌',secondary:'胸大肌、三角肌前束',tips:['双手稳定撑在凳沿','肩部保持下沉并控制下降幅度','伸肘回到起始位置'],mistakes:['肩膀前顶','下降过深','身体离凳过远'],rest:'60–120 秒'},
    {id:'single_arm_pushdown',name:'单臂绳索下压',group:'三头',equipment:'绳索',muscles:['三头'],primary:'肱三头肌',secondary:'前臂',tips:['上臂贴近身体固定','单侧伸肘到底并停顿','左右使用相同节奏'],mistakes:['肩膀内旋代偿','身体侧倾','上臂前后摆动'],rest:'60–90 秒'}
  );


  // V2.5 全动作实用讲解：保留原 UI，只升级文字内容。
  const GUIDE_SPECIAL={
    bench_press:{tips:[
      '准备：躺平后眼睛正对杠铃杆，双脚全脚掌踩实地面；肩胛骨向后、向下收紧，肩膀牢牢锁在凳面，只让胸部自然抬高，下背保留自然空隙。',
      '握距：杠铃下放到胸口时，让前臂从正面看基本垂直地面；拇指完整环握杠铃，手腕尽量叠在肘关节正上方。',
      '出杠：深吸气并收紧核心，手臂伸直把杠铃平稳移出支架；出杠过程中不要耸肩，也不要先把肩胛松开。',
      '📥 下放：吸气并缓慢下放，杠铃落点在下胸/乳头线略下方；肘部相对躯干外展约 45°，不要打开到 90°。',
      '📥 下放：全程控制杠铃，不砸胸、不反弹；轻触胸部即可，最低点保持肩胛继续收紧。',
      '📤 推起：保持腹压，胸部与三头协同发力，把杠铃向上并略向头侧推回起始轨迹；肩膀不要向前跑。',
      '📤 顶端：肘关节伸直到稳定位置即可，不需要用力“顶死”关节；稳定后呼气，再开始下一次。'
    ],mistakes:[
      '肩胛骨全程固定，不随杠铃前后晃动；一旦肩膀前顶，胸肌张力会下降，肩前侧压力会明显增大。',
      '肘角尽量维持约 45°，避免大角度开肘；尤其疲劳时不要为了硬推重量把肘完全打开。',
      '双脚持续踩实地面，臀部保持接触凳面；不要抬脚、蹬凳子或用臀部弹起帮助杠铃离胸。',
      '呼吸节奏：下放前吸气并建立腹压，推起阶段短暂憋气稳定核心，越过最难点后再呼气。',
      '❌ 禁忌：过度反弓腰、砸胸反弹、手腕严重后折、耸肩、杠铃落到脖子附近、疲劳时强行锁死肘关节。'
    ]},
    lat_pulldown:{tips:[
      '准备：调好大腿垫并坐稳，双脚全脚掌踩实；采用正握，握距约为肩宽的 1.2–1.5 倍，手腕保持中立。',
      '姿势：核心收紧、胸口轻抬，躯干只向后倾约 10°–20°；头部与脊柱保持一线，不仰头迎杆。',
      '启动：手臂伸直时先让肩胛下沉，使肩膀远离耳朵；随后把肘部向身体两侧、向下带动，不要先用二头弯举。',
      '下拉：把宽杆拉向锁骨下方/上胸，前臂尽量位于手腕下方；最低点停 0.5–1 秒，感受背阔肌收紧。',
      '回程：吸气并用 2–3 秒缓慢伸肘，让肩胛自然上旋、背阔肌充分拉长；最上方仍保持躯干稳定，不让配重撞击。'
    ],mistakes:[
      '把杆拉到颈后：肩关节和颈部会进入不利位置；宽杆只拉向上胸。',
      '身体大幅后仰并前后摆动，动作变成划船；这通常说明重量过大。',
      '先弯肘、只用手臂拉，肩胛没有先下沉，导致二头和前臂提前力竭。',
      '耸肩、头向前伸或手腕折弯；疲劳时更要保持肩膀远离耳朵。',
      '回程直接放掉配重，或为了碰胸把杆硬拉得过低、肘部过度向后跑。'
    ]},
    face_pull:{tips:[
      '准备：把滑轮调到眼睛至额头高度并装上绳索，采用前后站姿；核心与臀部收紧，肋骨不要外翻。',
      '握法：双手握住绳索两端，手腕保持中立；起始手臂伸直但肩膀不耸起，身体只允许很小的后倾。',
      '拉动：肘部向外、向后打开，把绳索中心拉向鼻梁/眉眼位置；不要把肘夹在身体两侧。',
      '末端：把绳索两端分到耳朵两侧，前臂接近竖直并完成肩关节外旋；停 1 秒，感受后束、肩袖和肩胛之间收紧。',
      '回程：用 2–3 秒缓慢伸直手臂，肩胛自然前伸但仍可控；选择能全程保持轨迹的轻至中等重量。'
    ],mistakes:[
      '绳索拉到胸口、肘部贴身下沉，动作变成高位划船，后束和肩袖刺激明显下降。',
      '身体大幅后仰、屈膝弹动或用体重把绳索甩回来；应立即减轻重量。',
      '全程耸肩，或末端头向前探去“碰绳”；保持颈部中立、肩膀远离耳朵。',
      '只把绳索拉近脸部，却没有把两端向耳侧分开，导致末端外旋不足。',
      '回程突然放掉配重，肩膀被绳索猛拽向前；离心阶段必须持续控制。'
    ]},
    incline_twist_crunch:{tips:[
      '准备：选择中等上斜角度，双脚或小腿固定在支架上；骨盆保持稳定，腰背自然贴近凳面。',
      '手位：双手轻放耳侧或胸前，不要十指交叉抱头；下巴与胸口之间保留一个拳头的距离。',
      '卷起：呼气并先让肋骨靠近骨盆，把肩胛骨卷离凳面；腹部已经收紧后，再让胸廓小幅转向对侧髋部。',
      '顶端：转体来自胸廓与躯干，不是只转头或甩手；左右交替，每次在腹斜肌收紧处短暂停顿。',
      '回程：吸气并缓慢展开躯干，直到肩背轻触凳面；腹部仍保持张力，不要让腰椎在底部过度反弓。'
    ],mistakes:[
      '先用髋屈肌坐起，到了顶端才突然扭一下肩膀；应先卷腹，再完成小幅转体。',
      '双手拉头、下巴死贴胸口或只转颈部，容易造成颈部不适。',
      '借助惯性快速弹起、左右甩动，腹肌没有持续承受张力。',
      '追求过大的腰椎旋转幅度；转体应由胸廓带动，并始终保持骨盆稳定。',
      '凳面过陡或下降过深，导致腰椎反弓、下背疼痛；降低坡度并缩小幅度。'
    ]},
    hammer_one_arm_row:{tips:[
      '调节：坐稳后让工作侧手臂伸直时把手位于前上方；大腿垫压稳双腿，双脚踩实，非工作手握住固定把手。',
      '起始：胸口自然抬起、核心收紧，肩胛可向前上方自然伸展，但肩膀不要耸到耳边；手腕保持中立。',
      '拉动：先让肩胛下沉并后收，再沿器械弧线把肘部向下、向后拉向同侧肋骨；想象用肘带动，不用手臂硬拽。',
      '顶端：把手接近上腹/下胸区域时停 0.5–1 秒，胸口和骨盆都保持正对前方，不为追求幅度扭转身体。',
      '回程：用 2–3 秒缓慢伸直手臂，让背阔肌和上背充分拉长；肩关节仍保持可控，不让杠片撞击。'
    ],mistakes:[
      '座椅或大腿垫高度不合适，导致起始够不到把手、顶端肘部轨迹过高或过低。',
      '身体向工作侧旋转、后仰或借腰发力；单臂训练时胸口和骨盆更要保持稳定。',
      '耸肩起拉，肘部没有沿器械弧线向下后方移动，斜方肌上束和二头过度抢力。',
      '只想着把手拉近，用手腕弯曲和二头弯举代替肩胛、背部发力。',
      '回程幅度太短或直接放掉重量，失去背部拉长和离心控制。'
    ]},
    incline_walk:{tips:[
      '先以平地慢走热身 3–5 分钟，再逐渐提高坡度；常用坡度可从 6%–10% 起步，适应后再到 10%–15%。',
      '速度以能连续维持、仍可稳定呼吸为准；不要为了数字把速度调到必须扶把手才能跟上的程度。',
      '站在跑带中央，身体从脚踝到头部保持自然直立；视线看前方，不低头盯脚。',
      '脚掌完整落在跑带上，步幅自然；主动用臀部向后下方蹬地，感受臀腿持续发力。',
      '手臂自然摆动，除短暂调节机器外尽量不扶把手；结束前逐步降低坡度和速度 2–3 分钟。'
    ],mistakes:[
      '❌ 双手长期吊在把手上：会显著降低真实坡度刺激，也容易形成弯腰姿势。',
      '❌ 坡度和速度同时过高：出现身体前趴、步幅凌乱时，应先降速度或坡度。',
      '❌ 全程踮脚走：小腿容易过早疲劳，应让脚掌自然完整着地。',
      '❌ 低头看脚或圆背含胸；保持头部中立、胸口自然打开。',
      '出现膝、跟腱或足底疼痛时不要硬撑，降低坡度或结束本组。'
    ]}
  };
  function genericGuide(ex){
    const pri=ex.primary||ex.group,eq=ex.equipment||'器械/身体';
    if(ex.type==='cardio')return {tips:[
      `热身：先用较低强度 3–5 分钟，让呼吸和下肢逐步进入状态，再开始记录正式分钟数。`,
      `节奏：保持可以连续维持的速度/阻力；如果必须扶把手、含胸或动作明显变形，强度已经过高。`,
      `姿势：头部中立、躯干稳定，脚掌按器械正常轨迹发力；不要为了速度刻意跨大步或踮脚。`,
      `进阶：每次只增加一个变量——时间、速度、坡度或阻力，优先保证能稳定完成整段训练。`,
      `结束：最后 2–3 分钟逐步降低强度，让心率和呼吸平稳下来再离开器械。`
    ],mistakes:[
      `❌ 没热身直接冲高强度，前几分钟心率过快、后半程完全掉速。`,
      `❌ 长时间扶器械或把身体重量压在扶手上，实际训练强度会被大幅削弱。`,
      `❌ 同时把速度、坡度/阻力全部拉高，动作一乱就失去训练意义。`,
      `❌ 出现膝、踝、腰背异常疼痛、头晕或胸闷仍继续硬撑。`,
      `记录以实际完成的 min 为准，不为了凑时间牺牲姿势和安全。`
    ]};
    if(ex.group==='胸')return {tips:[
      `准备：使用${eq}前先把肩胛骨向后、向下收紧，胸口自然抬起；双脚/下肢稳定，肩膀不要耸起。`,
      `底部：让前臂和手腕尽量保持在受力线上，下降到胸肌明显拉伸且肩前侧不夹痛的位置。`,
      `发力：想象“上臂向身体中线夹”，由${pri}带动，而不是只用手臂把重量顶出去。`,
      `节奏：下放 2–3 秒，底部不反弹；推/夹起时稳定加速，顶端保留一点肘部余量。`,
      `全程：肩胛不要在每次推起时向前跑，胸肌失去张力时就应该结束该组。`
    ],mistakes:[
      `❌ 肩膀前顶或耸肩，胸部还没发力肩前侧先疼。`,
      `❌ 下放太快、砸到底部再反弹；重量再大也不算有效重复。`,
      `❌ 手腕严重后折、肘部轨迹忽内忽外。`,
      `❌ 为追求幅度把肩关节拉到明显不舒服的位置。`,
      `❌ 最后几次靠臀部、腰部或身体弹动完成，应减重或结束该组。`
    ]};
    if(ex.group==='背')return {tips:[
      `准备：握好${eq}后先把胸口轻抬、核心收紧；肩膀远离耳朵，避免一开始就耸肩。`,
      `启动：先让肩胛下沉/后收，再让肘部移动；想象“用肘拉”，不要只想着手把重量拉过来。`,
      `发力：根据动作把肘拉向髋部或身体后方，顶端感受${pri}收紧，不用为了更远而扭腰。`,
      `回程：手臂逐渐伸展，让背部充分拉长，但肩关节仍保持可控，不直接被重量拽走。`,
      `躯干：除动作本身允许的轻微前后角度外，整组保持一致，不用甩身体制造惯性。`
    ],mistakes:[
      `❌ 先弯手肘、后动肩胛，结果二头和前臂先力竭。`,
      `❌ 耸肩、头向前伸，斜方肌上束抢走大部分负荷。`,
      `❌ 身体大幅后仰/旋转，把划船或下拉做成全身甩动。`,
      `❌ 回程直接放掉重量，失去背部离心控制。`,
      `❌ 为了更重把动作幅度缩得很短；宁愿减重也要保持稳定全程。`
    ]};
    if(ex.group==='肩')return {tips:[
      `准备：核心和臀部先收紧，胸廓保持中立；肩膀自然下沉，不要为了举高而耸肩。`,
      `轨迹：让肘部带动重量沿肩关节最舒服的平面移动，手腕保持中立，避免突然旋转。`,
      `发力：重点感受${pri}，重量只需要大到能保持稳定轨迹，不追求用身体摆动完成。`,
      `顶端：到达目标高度即可，不用强行超过肩部舒适范围；保持 0.5 秒再控制回程。`,
      `回程：慢慢下降，让三角肌持续承受张力，不让哑铃/绳索自由坠落。`
    ],mistakes:[
      `❌ 耸肩抢力，斜方肌上束先酸而目标三角肌没感觉。`,
      `❌ 腰部后仰或膝盖弹动，用全身惯性把重量甩上去。`,
      `❌ 为了“举得更高”进入肩关节夹挤或疼痛角度。`,
      `❌ 手腕折弯、肘部位置反复变化，受力线不稳定。`,
      `❌ 重量过大导致回程失控；肩部动作优先轨迹和控制。`
    ]};
    if(['腿','臀','小腿'].includes(ex.group))return {tips:[
      `准备：使用${eq}前先确定脚距和脚尖方向，整只脚掌踩稳；核心收紧，脊柱保持自然中立。`,
      `下降：髋和膝按动作要求同步屈曲，膝盖始终跟随脚尖方向，不让膝盖突然内扣。`,
      `发力：从脚掌稳定位置向地面发力，重点感受${pri}；不要靠弹底或快速反弹通过最难点。`,
      `幅度：下降到能维持骨盆和腰背稳定的位置即可，深度不是越大越好。`,
      `顶端：站起/伸展到身体稳定即可，不需要猛锁膝或用腰部过度后仰。`
    ],mistakes:[
      `❌ 膝盖内扣、脚跟抬起或足弓塌陷，说明脚位/重量需要调整。`,
      `❌ 底部放松后反弹，关节承受冲击而目标肌群张力下降。`,
      `❌ 腰背圆曲或过度反弓，尤其疲劳时仍硬做深幅度。`,
      `❌ 左右明显偏重，一侧先起、一侧先塌。`,
      `❌ 顶端猛锁膝/过度挺腰；完成动作后保持关节有控制。`
    ]};
    if(ex.group==='二头')return {tips:[
      `准备：站/坐稳，肩膀下沉，上臂靠近身体或支撑面；手腕保持中立。`,
      `发力：以屈肘为主让${pri}收缩，上臂尽量不向前甩，顶端短暂停顿。`,
      `下放：用 2–3 秒慢慢伸肘，直到二头充分拉长但肘关节不被硬锁死。`,
      `握法：握柄保持稳定，不用手腕“卷”重量；前臂只是传递力量。`,
      `最后几次可以变慢，但不要靠腰部后仰完成。`
    ],mistakes:[`❌ 身体前后摆动借力。`,`❌ 肘部不断向前跑，把动作变成前平举。`,`❌ 手腕向后折或主动屈腕。`,`❌ 下放直接掉下去，没有离心。`,`❌ 为追重量只做上半程。`]};
    if(ex.group==='三头')return {tips:[
      `准备：核心稳定，肩膀下沉；上臂先固定在动作要求的位置，再开始伸肘。`,
      `发力：只让肘关节伸展，想象前臂绕肘部转动，顶端把${pri}完全收紧。`,
      `回程：缓慢屈肘到三头有明显拉伸的位置，上臂位置不要跟着大幅移动。`,
      `手腕：保持中立，绳索动作可在末端自然分开，但不要靠翻腕制造“假幅度”。`,
      `重量：选择能让肘部稳定的重量；三头已经无法伸肘时不要用肩和躯干继续压。`
    ],mistakes:[`❌ 上臂前后摆动，动作变成肩关节发力。`,`❌ 肘部明显外翻或位置不断变化。`,`❌ 身体压绳/后仰借力。`,`❌ 顶端手腕乱翻、肘关节猛锁死。`,`❌ 回程过快，配重直接撞回。`]};
    if(ex.group==='腹')return {tips:[
      `准备：先让肋骨向下、骨盆保持中立或轻微后倾，腰背处于可控位置。`,
      `发力：想象“肋骨靠近骨盆”，由${pri}主动缩短，而不是只抬头、甩腿或做髋屈。`,
      `呼吸：收缩时主动呼气，把腹部收紧；回程吸气但不要完全失去核心张力。`,
      `幅度：只做到腰背仍能稳定的位置，追求腹部收缩而不是动作越大越好。`,
      `节奏：每次重复都慢下来，顶端停顿一下再回程，避免惯性。`
    ],mistakes:[`❌ 双手拉脖子或下巴死贴胸口。`,`❌ 甩腿、弹起、靠惯性完成。`,`❌ 腰部明显离地/塌腰仍继续增加幅度。`,`❌ 只做髋屈，腹部几乎没有卷曲。`,`❌ 速度太快，一组做完只喘但腹肌没有持续张力。`]};
    return {tips:[`准备：先把${eq}调整到适合自己的位置，第一组用轻重量确认轨迹。`,`发力：把注意力放在${pri}，最难点不靠甩动通过。`,`回程：至少控制 2 秒，保持肌肉张力。`,`呼吸：发力前吸气稳定核心，越过最难点后呼气。`,`幅度：只做能稳定控制、关节舒适的有效范围。`],mistakes:[`❌ 重量过大导致动作变形。`,`❌ 回程直接放掉重量。`,`❌ 关节进入明显疼痛角度。`,`❌ 身体摆动借力。`,`❌ 为凑次数牺牲动作质量。`]};
  }

  EXERCISES.forEach(ex=>{const g=GUIDE_SPECIAL[ex.id]||genericGuide(ex);ex.tips=g.tips;ex.mistakes=g.mistakes;});

  let PLAN = [
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

  const GYM_SHA='7455efae41b330c265e7cd4b78dfa848e7ce5ebd';
  const GYM_BASE=`https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@${GYM_SHA}`;
  const GYM_DATA_URL=`${GYM_BASE}/data/exercises.json`;
  const GYM_QUERY={bench_press:'barbell bench press',incline_db_press:'dumbbell incline bench press',incline_machine_press:'lever incline chest press',pec_deck:'lever seated fly',cable_fly:'cable middle fly',triceps_pushdown:'cable pushdown',overhead_triceps:'cable overhead triceps extension',lateral_raise:'dumbbell lateral raise',pullup:'pull-up',lat_pulldown:'cable pulldown pro lat bar',machine_row:'lever seated row',cable_row:'cable seated row',reverse_pec_deck:'lever seated reverse fly',barbell_curl:'barbell curl',hammer_curl:'dumbbell hammer curl',smith_shoulder_press:'smith shoulder press',reverse_fly:'dumbbell reverse fly',hack_squat:'sled hack squat',rdl:'barbell romanian deadlift',leg_curl:'lever lying leg curl',calf_raise:'standing calf raise',hanging_leg_raise:'hanging leg raise',cable_crunch:'cable kneeling crunch',incline_press_any:'dumbbell incline bench press',pulldown_any:'cable pulldown pro lat bar',crunch_combo:'crunch',machine_press:'lever chest press',bulgarian_split_squat:'split squat',biceps_curl:'dumbbell biceps curl',triceps_pressdown:'cable pushdown',front_raise:'barbell front raise',barbell_shoulder_press:'barbell standing wide military press',shrug:'dumbbell shrug',flat_db_press:'dumbbell bench press',decline_press:'barbell decline bench press',chest_dip:'chest dip',deadlift:'barbell deadlift',barbell_row:'barbell bent over row',one_arm_db_row:'dumbbell one arm bent-over row',tbar_row:'t-bar row',face_pull:'cable standing rear delt row with rope',arnold_press:'dumbbell arnold press',upright_row:'cable upright row',back_squat:'barbell full squat',leg_press:'sled 45 leg press',leg_extension:'lever leg extension',preacher_curl:'barbell preacher curl',cable_curl:'cable curl',skull_crusher:'barbell lying triceps extension',close_grip_bench:'barbell close-grip bench press',plank:'front plank',wrist_curl:'barbell wrist curl',treadmill_run:'run',incline_walk:'walking on incline treadmill',elliptical:'walk elliptical cross trainer',stationary_bike:'stationary bike run',stair_climber:'walking on stepmill',db_shoulder_press:'dumbbell seated shoulder press',machine_crunch:'lever seated crunch',sit_up:'3/4 sit-up',leg_raise:'lying leg raise flat bench',butterfly_crunch:'3/4 sit-up',lying_leg_raise:'lying leg raise flat bench',incline_twist_crunch:'incline twisting sit-up',weighted_russian_twist:'weighted russian twist',hammer_one_arm_row:'lever one arm lateral high row',assisted_pullup:'assisted pull-up',goblet_squat:'dumbbell goblet squat',reverse_hack_squat:'sled hack squat',triceps_rope_overhead:'cable overhead triceps extension',triceps_kickback:'dumbbell kickback',bench_dip:'bench dip',single_arm_pushdown:'cable one arm tricep pushdown'};
  const GYM_DIRECT={bench_press:'videos/0025-EIeI8Vf.gif',incline_db_press:'videos/0314-ns0SIbU.gif',incline_machine_press:'videos/1299-jHAnWmT.gif',pec_deck:'videos/0596-v3xmPAR.gif',cable_fly:'videos/0188-xLYSdtg.gif',triceps_pushdown:'videos/0201-3ZflifB.gif',overhead_triceps:'videos/0194-2IxROQ1.gif',lateral_raise:'videos/0334-DsgkuIt.gif',pullup:'videos/0652-lBDjFxJ.gif',lat_pulldown:'videos/0197-qdRxqCj.gif',machine_row:'videos/1350-7I6LNUG.gif',cable_row:'videos/0861-fUBheHs.gif',reverse_pec_deck:'videos/0602-myfUsKf.gif',barbell_curl:'videos/0031-25GPyDY.gif',hammer_curl:'videos/0313-slDvUAU.gif',smith_shoulder_press:'videos/0766-903mzG8.gif',reverse_fly:'videos/0383-EAs3xL9.gif',hack_squat:'videos/0743-Qa55kX1.gif',rdl:'videos/0085-wQ2c4XD.gif',leg_curl:'videos/0586-17lJ1kr.gif',calf_raise:'videos/1372-8ozhUIZ.gif',hanging_leg_raise:'videos/0472-I3tsCnC.gif',cable_crunch:'videos/0175-WW95auq.gif',incline_press_any:'videos/0314-ns0SIbU.gif',pulldown_any:'videos/0197-qdRxqCj.gif',crunch_combo:'videos/0972-tZkGYZ9.gif',machine_press:'videos/0577-T0yTjgW.gif',bulgarian_split_squat:'videos/0987-arsYEd3.gif',biceps_curl:'videos/0294-NbVPDMW.gif',triceps_pressdown:'videos/0201-3ZflifB.gif',front_raise:'videos/0041-b2Uoz54.gif',barbell_shoulder_press:'videos/1457-Kyd9Rz5.gif',shrug:'videos/0406-NJzBsGJ.gif',flat_db_press:'videos/0289-SpYC0Kp.gif',decline_press:'videos/0033-GrO65fd.gif',chest_dip:'videos/0251-9WTm7dq.gif',deadlift:'videos/0032-ila4NZS.gif',barbell_row:'videos/0027-eZyBC3j.gif',one_arm_db_row:'videos/0292-C0MA9bC.gif',tbar_row:'videos/1349-BgljGjd.gif',face_pull:'videos/0233-ZfyAGhK.gif',arnold_press:'videos/2137-Xy4jlWA.gif',upright_row:'videos/0246-cALKspW.gif',back_squat:'videos/0043-qXTaZnJ.gif',leg_press:'videos/0739-10Z2DXU.gif',leg_extension:'videos/0585-my33uHU.gif',preacher_curl:'videos/0070-qOgPVf6.gif',cable_curl:'videos/0868-G08RZcQ.gif',skull_crusher:'videos/0061-iZop9xO.gif',close_grip_bench:'videos/0030-J6Dx1Mu.gif',plank:'videos/0464-CosupLu.gif',wrist_curl:'videos/0126-82LxxkW.gif',treadmill_run:'videos/0685-oLrKqDH.gif',incline_walk:'videos/3666-rjiM4L3.gif',elliptical:'videos/2141-rjtuP6X.gif',stationary_bike:'videos/2138-H1PESYI.gif',stair_climber:'videos/2311-j9Q5crt.gif',db_shoulder_press:'videos/0405-znQUdHY.gif',machine_crunch:'videos/1452-Wgaz7pm.gif',sit_up:'videos/0001-2gPfomN.gif',leg_raise:'videos/0620-WhuFnR7.gif',butterfly_crunch:'videos/0001-2gPfomN.gif',lying_leg_raise:'videos/0620-WhuFnR7.gif',incline_twist_crunch:'videos/0495-9ZGZuOD.gif',weighted_russian_twist:'videos/0846-fZFZ704.gif',hammer_one_arm_row:'videos/1356-OIFMAp1.gif',assisted_pullup:'videos/0017-kiJ4Z2K.gif',goblet_squat:'videos/1760-yn8yg1r.gif',reverse_hack_squat:'videos/0743-Qa55kX1.gif',triceps_rope_overhead:'videos/0194-2IxROQ1.gif',triceps_kickback:'videos/0333-W6PxUkg.gif',bench_dip:'videos/0129-RrLske5.gif',single_arm_pushdown:'videos/1723-qRZ5S1N.gif'};
  const GYM_GROUP_FALLBACK={胸:'videos/0025-EIeI8Vf.gif',背:'videos/0652-lBDjFxJ.gif',肩:'videos/0334-DsgkuIt.gif',腿:'videos/0043-qXTaZnJ.gif',臀:'videos/0043-qXTaZnJ.gif',二头:'videos/0405-znQUdHY.gif',三头:'videos/0025-EIeI8Vf.gif',腹:'videos/0001-2gPfomN.gif',小腿:'videos/0043-qXTaZnJ.gif',有氧:'videos/2141-rjtuP6X.gif'};
  const GYM_MAP_KEY='train-log-gym-media-map-v27';let persistedGymMap={};try{persistedGymMap=JSON.parse(localStorage.getItem(GYM_MAP_KEY)||'{}')||{};}catch(e){}const saveGymMap=()=>{try{localStorage.setItem(GYM_MAP_KEY,JSON.stringify(persistedGymMap));}catch(e){}};
  const VIDEO_MAP={
    bench_press:{bvid:'BV1zv4y1V7ks',author:'ALEX健身频道',duration:624,title:'杠铃卧推（详细教程）'},
    incline_db_press:{bvid:'BV1Dg4y1d75K',author:'ALEX健身频道',duration:562,title:'上斜哑铃卧推'},
    incline_machine_press:{bvid:'BV1di42197hF',author:'ALEX健身频道',duration:391,title:'上斜器械推胸'},
    pec_deck:{bvid:'BV1Lg4y1A7tY',author:'ALEX健身频道',duration:568,title:'坐姿蝴蝶机夹胸'},
    cable_fly:{bvid:'BV1W8411Y7Nx',author:'ALEX健身频道',duration:607,title:'龙门架绳索夹胸'},
    triceps_pushdown:{bvid:'BV1fjMyzZEt5',author:'ALEX健身频道',duration:405,title:'肱三头肌绳索下压'},
    overhead_triceps:{bvid:'BV1wm6dBFEd8',author:'ALEX健身频道',duration:341,title:'过头臂屈伸'},
    lateral_raise:{bvid:'BV1n8411j7uE',author:'ALEX健身频道',duration:787,title:'哑铃侧平举'},
    pullup:{bvid:'BV1TG4y1F7m1',author:'ALEX健身频道',duration:472,title:'引体向上'},
    lat_pulldown:{bvid:'BV1oa4y1z73J',author:'ALEX健身频道',duration:336,title:'高位下拉'},
    machine_row:{bvid:'BV1m2421L7tw',author:'ALEX健身频道',duration:454,title:'器械坐姿划船'},
    cable_row:{bvid:'BV1y14y1X7by',author:'ALEX健身频道',duration:639,title:'坐姿绳索划船'},
    reverse_pec_deck:{bvid:'BV1huHNzMEhC',author:'大志的健身课堂',duration:101,title:'蝴蝶机反向飞鸟'},
    barbell_curl:{bvid:'BV1dP4y1D7Uc',author:'ALEX健身频道',duration:579,title:'杠铃弯举'},
    hammer_curl:{bvid:'BV19a4y1q7Q3',author:'UP健身',duration:25,title:'哑铃锤式弯举'},
    smith_shoulder_press:{bvid:'BV1eV4y1h74Y',author:'ALEX健身频道',duration:582,title:'史密斯推肩'},
    reverse_fly:{bvid:'BV1Sy421i79H',author:'ALEX健身频道',duration:440,title:'哑铃俯身反向飞鸟'},
    hack_squat:{bvid:'BV13j411B7Xu',author:'ALEX健身频道',duration:533,title:'哈克深蹲'},
    rdl:{bvid:'BV1Zt421g7p5',author:'凯圣王',duration:691,title:'罗马尼亚硬拉'},
    leg_curl:{bvid:'BV1Hx4y1Y7TN',author:'ALEX健身频道',duration:478,title:'腿弯举'},
    calf_raise:{bvid:'BV1N7411i7Jq',author:'FE健身干货百科书',duration:315,title:'小腿提踵训练'},
    hanging_leg_raise:{bvid:'BV1A22EY7Eog',author:'ALEX健身频道',duration:254,title:'悬垂举腿'},
    cable_crunch:{bvid:'BV1jxc1e2ELU',author:'ALEX健身频道',duration:401,title:'龙门架绳索卷腹'},
    incline_press_any:{bvid:'BV1ip4y1N7tG',author:'ALEX健身频道',duration:351,title:'上斜卧推'},
    machine_press:{bvid:'BV1AC411x7np',author:'ALEX健身频道',duration:346,title:'器械坐姿推胸'},
    pulldown_any:{bvid:'BV1oa4y1z73J',author:'ALEX健身频道',duration:336,title:'引体向上／高位下拉参考'},
    bulgarian_split_squat:{bvid:'BV12M411L7k8',author:'ALEX健身频道',duration:541,title:'保加利亚分腿蹲'},
    biceps_curl:{bvid:'BV1anmCYNEbK',author:'ALEX健身频道',duration:495,title:'哑铃二头弯举'},
    triceps_pressdown:{bvid:'BV1fjMyzZEt5',author:'ALEX健身频道',duration:405,title:'三头绳索下压'},
    crunch_combo:{bvid:'BV1WD421G7Lb',author:'跟练健身Online',duration:86,title:'仰卧两头起 V-Up'},
    front_raise:{bvid:'BV1hZ421N7aE',author:'ALEX健身频道',duration:523,title:'杠铃前平举'},
    barbell_shoulder_press:{bvid:'BV1iG411e7xW',author:'ALEX健身频道',duration:579,title:'杠铃推肩'},
    shrug:{bvid:'BV1FV411m7aT',author:'豹哥健身',duration:355,title:'杠铃耸肩'},
    flat_db_press:{bvid:'BV1LM411z7sS',author:'ALEX健身频道',duration:740,title:'平板哑铃卧推'},
    decline_press:{bvid:'BV1HXXsBBEiE',author:'凯圣王',duration:933,title:'下斜卧推'},
    chest_dip:{bvid:'BV1bL411Z7RU',author:'FitMen六六',duration:64,title:'双杠臂屈伸（胸）'},
    deadlift:{bvid:'BV1MA411U7Cn',author:'ALEX健身频道',duration:505,title:'传统硬拉'},
    barbell_row:{bvid:'BV17Y4y1Q7PJ',author:'ALEX健身频道',duration:529,title:'杠铃俯身划船'},
    one_arm_db_row:{bvid:'BV1mzZiYNEjj',author:'大志的健身课堂',duration:117,title:'单臂哑铃划船'},
    tbar_row:{bvid:'BV1bG4y1J7mj',author:'ALEX健身频道',duration:491,title:'T 杠划船'},
    face_pull:{bvid:'BV1pe41127xk',author:'ALEX健身频道',duration:512,title:'绳索面拉'},
    arnold_press:{bvid:'BV1xeRoYEE6e',author:'大志的健身课堂',duration:70,title:'阿诺德推举'},
    upright_row:{bvid:'BV19U4y1a76N',author:'19347978894',duration:27,title:'绳索直立划船'},
    back_squat:{bvid:'BV1kM411F7G7',author:'ALEX健身频道',duration:690,title:'杠铃深蹲'},
    leg_press:{bvid:'BV1gs4y167gt',author:'ALEX健身频道',duration:668,title:'腿举／倒蹬'},
    leg_extension:{bvid:'BV1Pj411y7fy',author:'ALEX健身频道',duration:450,title:'坐姿腿屈伸'},
    preacher_curl:{bvid:'BV1GN4y1Q75g',author:'ALEX健身频道',duration:427,title:'牧师凳弯举'},
    cable_curl:{bvid:'BV1vm421p749',author:'ALEX健身频道',duration:357,title:'绳索弯举'},
    skull_crusher:{bvid:'BV1pD421H7zw',author:'凯圣王',duration:626,title:'仰卧臂屈伸'},
    close_grip_bench:{bvid:'BV14m421E71T',author:'凯圣王',duration:589,title:'窄握卧推'},
    plank:{bvid:'BV14w411V7Yj',author:'凯圣王',duration:330,title:'平板支撑'},
    wrist_curl:{bvid:'BV1vb411A7c3',author:'掰手腕的废柴大叔',duration:62,title:'腕弯举'},
    treadmill_run:{bvid:'BV13L4y1u7fz',author:'跑步的子章老师',duration:331,title:'跑步姿势教学'},
    incline_walk:{bvid:'BV14u4m1M7d3',author:'叶的冒险',duration:58,title:'跑步机爬坡走'},
    elliptical:{bvid:'BV11t411w78E',author:'健身教练刘远',duration:148,title:'椭圆机正确使用方法'},
    stationary_bike:{bvid:'BV1fos5etEAE',author:'YPOO易跑',duration:1250,title:'动感单车新手教学'},
    stair_climber:{bvid:'BV1FJkJB8ELG',author:'梅川芝士',duration:155,title:'爬楼机使用指南'},
    db_shoulder_press:{bvid:'BV1Z841187pJ',author:'ALEX健身频道',duration:751,title:'哑铃推肩'},
    machine_crunch:{bvid:'BV1cGSDYrEP7',author:'ALEX健身频道',duration:403,title:'器械坐姿卷腹'},
    sit_up:{bvid:'BV1Tt4y1b7CH',author:'不爱笑的白客',duration:46,title:'仰卧起坐'},
    leg_raise:{bvid:'BV18d4y137pp',author:'唐叔健身',duration:135,title:'抬腿动作讲解'},
    butterfly_crunch:{bvid:'BV1H2DaYbEpz',author:'略知一二的一二',duration:31,title:'蝴蝶收腹'},
    lying_leg_raise:{bvid:'BV1R64y1H7Gv',author:'人民的健身教练',duration:47,title:'仰卧抬腿'},
    incline_twist_crunch:{bvid:'BV1eW411r7Xz',author:'YouthOnem',duration:204,title:'斜板卷腹转体'},
    weighted_russian_twist:{bvid:'BV16PUSYPEVK',author:'跟练健身Online',duration:101,title:'哑铃负重俄罗斯转体'},
    hammer_one_arm_row:{bvid:'BV1av4y1n7Kk',author:'健身亮哥668',duration:8,title:'单手悍马机划船'},
    assisted_pullup:{bvid:'BV16T4y1a7Wh',author:'Oh是Connie呀',duration:107,title:'辅助引体向上'},
    goblet_squat:{bvid:'BV1TT4y1p7YR',author:'凯圣王',duration:496,title:'哑铃酒杯深蹲'},
    reverse_hack_squat:{bvid:'BV11k4y127f2',author:'Nikko大宁',duration:133,title:'俯卧反向哈克深蹲'},
    triceps_rope_overhead:{bvid:'BV1wm6dBFEd8',author:'ALEX健身频道',duration:341,title:'绳索过顶臂屈伸'},
    triceps_kickback:{bvid:'BV1sw411G7jY',author:'凯圣王',duration:361,title:'哑铃俯身臂屈伸'},
    bench_dip:{bvid:'BV1jMSYYnE4Q',author:'Ariel_宇',duration:11,title:'凳上臂屈伸'},
    single_arm_pushdown:{bvid:'BV1nQ4y1K7d5',author:'长风万钧',duration:47,title:'单臂绳索下压'}
  };
  const BILIBILI_COVER_BASE='https://i0.hdslb.com/bfs/archive/';
  const BILIBILI_COVERS={lateral_raise:'fef5a5187b709d76692502190efda94b20fc37b4.jpg',bench_press:'f8bda2da2822225ade65d47a60eb4768c9f42e90.jpg',pec_deck:'34bc75e751b7b297aa59581f63d4a6189b24e316.jpg',cable_row:'ef0a041b1a04cad8294eecefa45ea6e4a982c600.jpg',reverse_pec_deck:'91843880fa34c9b593e32e2eebb17b6d03197be6.jpg',machine_row:'2f3adfd6b5eb9edce229933b32e432534b597da6.jpg',cable_fly:'4c2dab4209f276d07bf4ecbac87f648b05616525.jpg',pullup:'4508edea441b4b6c4caceb63f1ae9690120097ce.jpg',calf_raise:'80185cb7cde43c8d42d9e2c905301f809c3fecab.jpg',bulgarian_split_squat:'ea3ab0170f0ea7017f42760b13a03f5d1de84bb1.jpg',lat_pulldown:'4a68d20bbc774ccee2b2ae8d9627c822739a5f45.jpg',hack_squat:'402cf2265b67dd8a49c605c92cdc38153547b6a3.jpg',tbar_row:'b6865253315ab916d854316cf1a9d25dce6af3fe.jpg',chest_dip:'7b7eaec3b514fe67974d01f344bddf5cba353eba.jpg',barbell_shoulder_press:'12d998578cf5c0752d119fb91a875bd6c5a19309.jpg',front_raise:'19711bc78ee58e65949dc12fe7da68d4e94d232f.jpg',flat_db_press:'b5aaa6250bae92fd0c86cb954a4d33a8ae74121c.jpg',smith_shoulder_press:'0cf948b02785fc957f8e8205cfd40c3fad2b93f6.jpg',biceps_curl:'786ff8839cdc1448bbfe167762ccd48e8e3d7b48.jpg',hanging_leg_raise:'0a6fe2b1601df365ae2f9898ebc9cca9848acd07.jpg',incline_db_press:'6a41da7c7446a2b10bc55da1654bcc9d10830292.jpg',overhead_triceps:'1d4094d0553056a88c883fb726143fdc571aa11f.jpg',face_pull:'4f1344bbf04f539f423c9637f4c3ed93d0267a0f.jpg',incline_machine_press:'8432de217d440bfba1bbc4c3885ccba4af8f9810.jpg',leg_curl:'a79e3726a8358f992f356ee64932b1931bc63990.jpg',triceps_pushdown:'6db4e40dfa340a3801e3f8047e718f6f33c7b590.jpg',barbell_curl:'9e6c81f8f9ee37f317d754722de942c7f8a39bb8.jpg',incline_press_any:'e9834cbad16cc41b114d240324c5c3f189413e40.jpg',reverse_fly:'37dfde7d25f622f0daf69050a5750f8cd35361f7.jpg',stair_climber:'871640d4a208f088e3148c43673d77a0b73ef04a.jpg',triceps_pressdown:'6db4e40dfa340a3801e3f8047e718f6f33c7b590.jpg',weighted_russian_twist:'7912a03a3dcab3e355582cea5e61662d5b91292c.jpg',skull_crusher:'6cfc45274619b7d956e34504520f4416c69b9667.jpg',incline_walk:'5bea29f5eb42f17daa99502f05bdf5be293ef183.jpg',single_arm_pushdown:'eda1f6d139ad22c07af28428a5e04f77cffc40d2.jpg',upright_row:'906198d2c7a9320fec4280ae6c9c32963b565747.png',decline_press:'fbf76c2cb1dda1777118471b92e9766723c93a91.jpg',cable_crunch:'cd353bc561ebb57b36ae797eee651e34afd7b2b7.jpg',preacher_curl:'d5a43d3c6689abbdf0bdc92eb7ea2153c420835c.jpg',stationary_bike:'11d85fdef99962c8f7bf28d34250eecfeacfd0fb.jpg',leg_extension:'a5a2683d1010a615b602fd4b705cfef0c28a1489.jpg',one_arm_db_row:'77d07529bcc516116500429bf930b3b4205b9263.jpg',hammer_curl:'bd28c2ef1771dd32f1707b7703dfc82e81b9d9b4.jpg',reverse_hack_squat:'4a1f744380cbd200366563c319bc5fe4072417f9.jpg',crunch_combo:'9fc51b4f708d06e83558340c55600fae085c77fd.jpg',shrug:'a93cad94de9c610d5584e7fdd861b6995c42527c.png',lying_leg_raise:'90861388f6c342a071dfe1d78d520e09091b0c52.jpg',arnold_press:'b8cf15422fcd696bb4920d68a6d4545a6fbf6d62.jpg',elliptical:'f345bb1d2dda0a88768715ce6ebe2e58afbe8d0d.jpg',butterfly_crunch:'fcebc0b97a3180341c0d12071d5df161d4e375c1.jpg',pulldown_any:'4a68d20bbc774ccee2b2ae8d9627c822739a5f45.jpg',barbell_row:'3087ee9d1339543e04a8007a28914155fb5d5064.jpg',treadmill_run:'ad527dd78e0451213784d2dbdd733c708b8cdaaa.jpg',back_squat:'c0385d00ba1e97569d81a104ca1535668b9ffe08.jpg',bench_dip:'7e9fa030a452b627878a898f09eabc52ea02f2e9.jpg',machine_press:'db7fa1cd33d863b53c25feb5f238822ae6b4943f.jpg',machine_crunch:'68bcd88d1ae4001423b3821c713d0f054d0056ce.jpg',incline_twist_crunch:'77a28b9e3c7f3a3586d866d45641b3efa8b373d5.jpg',assisted_pullup:'e3e0edb952bf000a2977c5475e0c04495364bfad.jpg',rdl:'0f64d22d1d526b544ffc71f093b26d2e9ab16e28.jpg',wrist_curl:'avsas_i181030txjplqpkcl58q31d7kv9827kk_0004.jpg',sit_up:'92903114f8c4bdd7362750194fcd0133ffa634d9.jpg',cable_curl:'8bed1eadfd7075b2c86d7bdb102c03ed66259097.jpg',db_shoulder_press:'8dd14ef399ef6a25c39c5c23fdd80cc02b034bb9.jpg',leg_raise:'80daefc1b4dc65837e082a5a95cca89182d47bcc.jpg',leg_press:'187f4aa21c9bdb02d571a4f4aa2ef9fc2a75e213.jpg',triceps_rope_overhead:'1d4094d0553056a88c883fb726143fdc571aa11f.jpg',deadlift:'8975647ceb5c35a79afd23622687efa0b804549a.jpg',goblet_squat:'b66a52125f947a4ce7f81ee478bc5434b012f253.jpg',hammer_one_arm_row:'e68e53afab1a507378df4054738686ef6e8d58ef.jpg',plank:'0da2378d19743b5b62752c47131a880c65ad401b.jpg',triceps_kickback:'094d4162db4484b23aebabaac432fac9490224e4.jpg',close_grip_bench:'f3adc2c30afa17dfe126933b257c121bcf8cabb3.jpg'};
  let gymIndexPromise=null; const gymCache={}; let gymVisibilityObserver=null;
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
    plans:JSON.parse(JSON.stringify(PLAN)),
    meta:{updatedAt:new Date().toISOString()},
    wellness:{sleep:3,energy:3,soreness:2,updated:today()},
    settings:{restSeconds:120,dietMode:'training'},customExercises:[]
  });

  let state = loadState();
  // V2.5: tolerate older/local backups with missing collection fields so Mine never renders blank.
  state.bodyMetrics=Array.isArray(state.bodyMetrics)?state.bodyMetrics:[];
  state.workouts=Array.isArray(state.workouts)?state.workouts:[];
  state.customExercises=Array.isArray(state.customExercises)?state.customExercises:[];
  state.settings={...defaultState().settings,...(state.settings||{})};
  state.wellness={...defaultState().wellness,...(state.wellness||{})};
  if(Array.isArray(state.plans)&&state.plans.length) PLAN=state.plans; else state.plans=PLAN;
  let page = 'home';
  let timerInterval = null;
  let restRemaining = 0;
  let activeExerciseFilter = '全部';
  let recordMonthOpen = false;
  let recordYear = null;
  let selectedRecordMonth = null;
  let dataTab = 'body';
  let dietBatch = 0;
  let dietMode = state.settings.dietMode || 'training';
  let pendingFreeWorkout=false;

  const main = document.getElementById('main');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalSheet = modal.querySelector('.modal-sheet');
  const toastEl = document.getElementById('toast');

  function uid(){ return (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function esc(v=''){ return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
  function num(v){ const n=parseFloat(v); return Number.isFinite(n)?n:null; }
  function round(v,d=1){ const p=10**d; return Math.round(v*p)/p; }
  function allExercises(){return [...EXERCISES,...(state?.customExercises||[])];}
  function exercise(id){ return allExercises().find(x=>x.id===id) || {id,name:id,group:'其他',muscles:['其他'],primary:'其他',secondary:'',tips:[],mistakes:[],rest:'60–120 秒'}; }
  function planById(id){ return PLAN.find(p=>p.id===id); }
  function formatDate(dateStr){ if(!dateStr)return ''; const d=new Date(`${dateStr}T00:00:00`); return `${d.getMonth()+1}月${d.getDate()}日`; }
  function formatDateTime(ts){ const d=new Date(ts); return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function currentDateLabel(){const d=new Date(),week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];return `${d.getMonth()+1}月${d.getDate()}日${week[d.getDay()]}`;}
  function pageIntro(title,subtitle,actions=''){return `<div class="page-intro"><div class="page-intro-copy"><div class="page-title">${esc(title)}</div><div class="page-subtitle">${esc(subtitle)}</div></div>${actions?`<div class="page-intro-actions">${actions}</div>`:''}</div>`;}
  function scheduleDateRefresh(){const now=new Date(),next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,2);setTimeout(()=>{if(page==='home')renderHome();scheduleDateRefresh();},Math.max(1000,next-now));}
  function durationText(ms){ const min=Math.max(1,Math.round(ms/60000)); if(min<60)return `${min} 分钟`; return `${Math.floor(min/60)}小时 ${min%60}分钟`; }
  function sinceText(ts){ if(!ts)return '暂无训练记录'; const ms=Date.now()-new Date(ts).getTime(); const h=Math.max(0,Math.floor(ms/3600000)); if(h<1)return `${Math.floor(ms/60000)} 分钟`; if(h<24)return `${h} 小时`; return `${Math.floor(h/24)}天 ${h%24}小时`; }
  function loadState(){ try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw){ const s=JSON.parse(raw); return {...defaultState(),...s}; } }catch(e){} return defaultState(); }
  function saveState(){ state.meta=state.meta||{};state.meta.updatedAt=new Date().toISOString();state.plans=PLAN;localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }

  function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toastEl._t); toastEl._t=setTimeout(()=>toastEl.classList.remove('show'),1800); }
  function resetModalScroll(){
    [modalSheet,modalBody,modal].forEach(el=>{if(el){el.scrollTop=0;el.scrollLeft=0;}});
    if(modalSheet?.scrollTo)modalSheet.scrollTo(0,0);
  }
  function cleanupTutorialMedia(root=modalBody){
    if(!root)return;
    exitVideoFullscreen();
    root.querySelectorAll('.local-video').forEach(card=>{
      if(card._timer){clearInterval(card._timer);card._timer=null;}
    });
    root.querySelectorAll('iframe.bilibili-player').forEach(frame=>{
      try{frame.src='about:blank';}catch(e){}
      frame.remove();
    });
  }
  function openModal(title,html){
    cleanupTutorialMedia();
    modalTitle.textContent=title;
    modalBody.innerHTML=html;
    resetModalScroll();
    modal.showModal();
    resetModalScroll();
    requestAnimationFrame(()=>{resetModalScroll();hydrateGymVisuals(modalBody);});
  }
  function closeModal(){ cleanupTutorialMedia();modal.classList.remove('tutorial-mode'); if(modal.open)modal.close(); if(pendingFreeWorkout && state.activeWorkout?.planId===null && !(state.activeWorkout.exercises||[]).length){state.activeWorkout=null;pendingFreeWorkout=false;saveState();if(page==='training')renderTraining();} requestAnimationFrame(()=>hydrateGymVisuals(main,{force:true})); }

  function setPage(next){ page=next; document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page)); render(); window.scrollTo({top:0,behavior:'instant'}); }

  function latestWorkout(){ return [...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt))[0] || null; }
  function nextPlan(){ const last=latestWorkout(); if(!last || !last.planId)return PLAN[0]; const idx=PLAN.findIndex(p=>p.id===last.planId); return PLAN[(idx+1)%PLAN.length]; }
  function totalVolume(w){ return round((w.exercises||[]).flatMap(e=>e.sets||[]).filter(s=>s.done&&!s.warmup).reduce((sum,s)=>sum+(Number(s.weight)||0)*(Number(s.reps)||0)+(s.drops||[]).reduce((a,d)=>a+(Number(d.weight)||0)*(Number(d.reps)||0),0),0),0); }
  function workingSets(w){ return (w.exercises||[]).flatMap(e=>e.sets||[]).filter(s=>s.done&&!s.warmup).length; }
  function weeklyWorkouts(){ const now=new Date(); const day=(now.getDay()+6)%7; const start=new Date(now); start.setHours(0,0,0,0); start.setDate(now.getDate()-day); return state.workouts.filter(w=>new Date(w.endedAt)>=start); }
  function lastBody(){ return [...(Array.isArray(state.bodyMetrics)?state.bodyMetrics:[])].sort((a,b)=>new Date(b.date)-new Date(a.date))[0] || null; }
  function sevenDayAvgWeight(){ const cutoff=Date.now()-7*86400000; const a=(Array.isArray(state.bodyMetrics)?state.bodyMetrics:[]).filter(m=>m.weight&&new Date(`${m.date}T23:59:59`).getTime()>=cutoff).map(m=>Number(m.weight)); if(!a.length)return null; return round(a.reduce((x,y)=>x+y,0)/a.length,1); }
  function weightChart(){
    const pts=[...(Array.isArray(state.bodyMetrics)?state.bodyMetrics:[])].filter(m=>num(m.weight)!==null&&m.date).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(-30);
    if(pts.length<2)return '<div class="chart-empty">至少记录 2 次体重后显示趋势图。<br>建议尽量在早晨固定条件记录。</div>';
    const values=pts.map(p=>Number(p.weight)),min=Math.min(...values)-.5,max=Math.max(...values)+.5,w=320,h=150,pad=20,span=Math.max(1,max-min);
    const xy=pts.map((p,i)=>[pad+i*(w-2*pad)/(pts.length-1),h-pad-(Number(p.weight)-min)/span*(h-2*pad)]);
    const path=xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="体重趋势"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#e7e9ee"/><path d="${path}" fill="none" stroke="#1677ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#fff" stroke="#1677ff" stroke-width="2"/><text x="${p[0]}" y="${p[1]-8}" text-anchor="middle" font-size="8" fill="#707681">${values[i]}</text>`).join('')}</svg>`;
  }
  function strengthStats(){
    const map={};
    (Array.isArray(state.workouts)?state.workouts:[]).forEach(w=>(w.exercises||[]).forEach(entry=>{
      const done=(entry.sets||[]).filter(s=>s.done&&!s.warmup&&num(s.weight)!==null);
      if(!done.length)return;
      const id=entry.exerciseId;
      if(!map[id])map[id]={id,name:entry.customName||exercise(id).name,sessions:0,bestWeight:0};
      map[id].sessions++;
      map[id].bestWeight=Math.max(map[id].bestWeight,...done.map(s=>Number(s.weight)||0));
    }));
    return Object.values(map).sort((a,b)=>b.sessions-a.sessions||b.bestWeight-a.bestWeight);
  }
  function showStrength(id){
    const records=[];
    [...(Array.isArray(state.workouts)?state.workouts:[])].sort((a,b)=>new Date(a.endedAt)-new Date(b.endedAt)).forEach(w=>{
      const entry=(w.exercises||[]).find(x=>x.exerciseId===id);
      if(entry&&(entry.sets||[]).some(s=>s.done))records.push({date:w.endedAt,sets:(entry.sets||[]).filter(s=>s.done)});
    });
    const ex=exercise(id),best=records.length?Math.max(...records.flatMap(r=>r.sets.map(s=>Number(s.weight)||0))):0;
    openModal(ex.name,`<div class="card"><div class="stat-row"><span>训练次数</span><strong>${records.length}</strong></div><div class="stat-row"><span>最高工作重量</span><strong>${best} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">历史</div><div class="list">${records.slice().reverse().map(r=>`<div class="list-item"><div class="grow"><strong>${formatDateTime(r.date)}</strong><small>${esc(setSummary(r.sets,ex))}</small></div></div>`).join('')}</div></section>`);
  }
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
      (Array.isArray(state.workouts)?state.workouts:[]).forEach(w=>{
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
  function showRecoveryDetail(){
    const r=recovery();
    openModal('体力恢复',`<div class="card flat"><div class="stat-row"><span>当前恢复</span><strong>${r.score}% · ${esc(r.label)}</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">评分依据</div><div class="card flat">${r.items.map(([name,value,adjustment])=>`<div class="stat-row"><span>${esc(name)}</span><strong>${esc(value)}${adjustment&&String(value)!==String(adjustment)?` · ${adjustment>0?'+':''}${adjustment}`:''}</strong></div>`).join('')}</div></section><div class="note">恢复评分结合训练间隔、上次训练时长与疲劳，以及今天的睡眠、精神和酸痛感受。</div>`);
  }
  function showWellness(){
    const w=state.wellness;
    const options=(selected)=>[1,2,3,4,5].map(v=>`<option value="${v}" ${Number(selected)===v?'selected':''}>${v}</option>`).join('');
    openModal('更新今日状态',`<div class="form-grid"><div class="field"><label>睡眠感受（1–5）</label><select id="wellness-sleep">${options(w.sleep)}</select></div><div class="field"><label>精神状态（1–5）</label><select id="wellness-energy">${options(w.energy)}</select></div><div class="field full"><label>肌肉酸痛（1=轻，5=重）</label><select id="wellness-soreness">${options(w.soreness)}</select></div></div><button class="primary-btn" id="save-wellness" style="margin-top:14px">保存今日状态</button>`);
    document.getElementById('save-wellness').onclick=()=>{
      state.wellness={sleep:Number(document.getElementById('wellness-sleep').value),energy:Number(document.getElementById('wellness-energy').value),soreness:Number(document.getElementById('wellness-soreness').value),updated:today()};
      saveState();closeModal();renderHome();toast('今日状态已更新');
    };
  }
  function bestPreviousExercise(exId,excludeId=null){
    const ws=[...state.workouts].filter(w=>w.id!==excludeId).sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    for(const w of ws){ const e=(w.exercises||[]).find(x=>x.exerciseId===exId); if(e && e.sets.some(s=>s.done))return {workout:w,entry:e}; }
    return null;
  }
  function setSummary(sets, ex=null){ const done=sets.filter(s=>s.done); if(ex?.type==='cardio') return done.map(s=>`${s.minutes||s.reps||0} min`).join(' / '); return done.map(s=>`${s.weight||0}×${s.reps||0}`).join(' / '); }
  function progressionMessage(we){
    const plan=planById(state.activeWorkout?.planId || '');
    const spec=plan?.exercises.find(x=>x[0]===we.exerciseId);
    if(!spec)return '';
    const [,targetSets,minRep,maxRep]=spec;
    const done=we.sets.filter(s=>s.done&&!s.warmup);
    if(done.length<targetSets)return `目标 ${targetSets} 组 × ${minRep}–${maxRep} 次`;
    const allTop=done.slice(0,targetSets).every(s=>Number(s.reps)>=maxRep);
    if(allTop)return '🎯 已达到次数区间上限；下次可考虑小幅加重。';
    return `继续当前重量，优先把有效组逐步推进到 ${maxRep} 次。`;
  }

  function render(){
    document.getElementById('topbar-subtitle').textContent = ({home:'私人训练日志',training:'计划与训练',exercises:'动作教学',history:'训练记录',mine:'身体数据与饮食'})[page];
    if(page==='home')renderHome();
    if(page==='training')renderTraining();
    if(page==='exercises')renderExercisesPage();
    if(page==='history')renderHistoryPage();
    if(page==='mine')renderMine();
    requestAnimationFrame(()=>hydrateGymVisuals(main));
  }

  function renderHome(){
    const r=recovery(), last=latestWorkout(), next=nextPlan(), body=lastBody(), week=weeklyWorkouts(), avg=sevenDayAvgWeight(), muscles=muscleRecovery();
    const avgMuscle=Math.round(Object.values(muscles).reduce((a,b)=>a+b,0)/Object.values(muscles).length);
    main.innerHTML=`
      ${pageIntro('今天',currentDateLabel())}
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
        <div class="section-head"><div class="section-title">下一练</div><button class="section-link" data-go="training">查看计划</button></div>
        <div class="card next-card" data-start-plan="${next.id}">
          <div class="next-index">${next.index}</div><div class="next-info"><strong>${esc(next.name)}</strong><small>${next.exercises.length} 个动作 · ${next.note}</small></div><div class="arrow">›</div>
        </div>
        <button class="primary-btn" style="margin-top:10px" data-start-plan="${next.id}">开始训练</button>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">身体</div><button class="section-link" data-go="mine">记录数据</button></div>
        <div class="grid2 equal-metrics">
          <div class="card metric-card"><small>当前体重</small><strong>${body?.weight?body.weight+' kg':'—'}</strong><div class="metric-delta">7 日平均 ${avg?avg+' kg':'暂无'}</div></div>
          <div class="card metric-card"><small>体脂率</small><strong>${body?.bodyFat?body.bodyFat+'%':'—'}</strong><div class="metric-delta muted">主要看长期趋势</div></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">本周</div><button class="section-link" data-go="history">训练记录</button></div>
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
    const next=nextPlan();
    main.innerHTML=`
      ${pageIntro('训练','训练计划和当天训练合在一起，按第 1 → 4 练循环，不绑定星期几。')}
      <div class="card current-plan"><div class="small muted">建议下一练</div><h2>${esc(next.name)}</h2><div class="small muted">${next.exercises.length} 个动作 · 第 ${next.index} 练</div><button class="primary-btn" style="margin-top:14px" data-start-plan="${next.id}">开始训练</button><button class="secondary-btn neutral free-training-btn" style="margin-top:9px;width:100%" id="free-workout-btn">＋ 自由训练</button></div>
      <section class="section"><div class="section-head"><div class="section-title">四练计划</div></div>${PLAN.map(p=>`<div class="card plan-card"><div class="plan-top"><div class="plan-day">${p.index}</div><div class="plan-info"><strong>${esc(p.name)}</strong><small>${p.exercises.length} 个动作 · ${esc(p.note)}</small></div></div><div class="plan-actions"><button class="secondary-btn neutral" data-view-plan="${p.id}">查看动作</button><button class="secondary-btn" data-start-plan="${p.id}">开始训练</button></div></div>`).join('')}</section>
      <section class="section"><div class="section-head"><div class="section-title">最近训练</div><button class="section-link" data-go="history">查看全部</button></div>${history.length?history.slice(0,3).map(historyItem).join(''):'<div class="card empty">还没有训练记录</div>'}</section>`;
    bindCommon();
    document.querySelectorAll('[data-view-plan]').forEach(b=>b.onclick=()=>showPlan(b.dataset.viewPlan));
    document.getElementById('free-workout-btn').onclick=startFreeWorkout;
  }

  function renderExercisesPage(){
    main.innerHTML=`${pageIntro('动作','力量 + 有氧动作库；每个动作都可查看 3D 动图、视频讲解、动作要点、常见错误和训练肌群图。')}<div class="page-scroll-content">${exerciseLibraryHTML()}</div>`;
    bindExerciseLibrary();
  }

  function renderHistoryPage(){
    const history=[...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    const months=availableRecordMonths(history),latest=months[0]||monthKey(new Date());
    if(!selectedRecordMonth||!months.includes(selectedRecordMonth))selectedRecordMonth=latest;
    if(!recordYear)recordYear=Number(selectedRecordMonth.slice(0,4));
    const selectedHistory=history.filter(w=>monthKey(w.endedAt)===selectedRecordMonth);
    const [selectedYear,selectedMonth]=selectedRecordMonth.split('-').map(Number);
    main.innerHTML=`<div class="page-intro record-intro">
        <div class="record-title-row"><div class="page-intro-copy"><div class="page-title">记录</div><div class="page-subtitle">按月份查看每次训练，快速回顾训练表现。</div></div><button class="record-stats-btn" id="record-stats-btn">统计</button></div>
        <button class="record-month-trigger" id="record-month-trigger" aria-expanded="${recordMonthOpen}"><span>${selectedYear}年${selectedMonth}月</span><i>${recordMonthOpen?'⌃':'⌄'}</i></button>
        ${recordMonthOpen?recordMonthPanel(months,recordYear):''}
      </div>
      <div id="history-content" class="page-scroll-content">${selectedHistory.length?`<div class="record-month-heading"><strong>${selectedMonth}月</strong><span>${selectedHistory.length} 次训练</span></div><div class="list">${selectedHistory.map(historyItem).join('')}</div>`:'<div class="card empty">这个月还没有训练记录</div>'}</div>`;
    document.getElementById('record-month-trigger').onclick=()=>{recordMonthOpen=!recordMonthOpen;renderHistoryPage();};
    document.getElementById('record-stats-btn').onclick=showRecordStats;
    document.querySelectorAll('[data-record-year]').forEach(b=>b.onclick=()=>{recordYear=Number(b.dataset.recordYear);recordMonthOpen=true;renderHistoryPage();});
    document.querySelectorAll('[data-record-month]').forEach(b=>b.onclick=()=>{selectedRecordMonth=b.dataset.recordMonth;recordYear=Number(selectedRecordMonth.slice(0,4));recordMonthOpen=false;renderHistoryPage();});
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
  }

  function monthKey(value){const d=value instanceof Date?value:new Date(value);return Number.isNaN(d.getTime())?today().slice(0,7):`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
  function availableRecordMonths(history=state.workouts){return [...new Set(history.map(w=>monthKey(w.endedAt)))].sort().reverse();}
  function recordMonthPanel(months,year){
    const years=[...new Set(months.map(k=>Number(k.slice(0,4))))].sort((a,b)=>b-a),shownYears=years.length?years:[new Date().getFullYear()];
    if(!shownYears.includes(year))year=shownYears[0];
    return `<div class="record-month-panel"><div class="record-year-tabs">${shownYears.map(y=>`<button class="${y===year?'active':''}" data-record-year="${y}">${y}年</button>`).join('')}</div><div class="record-month-grid">${Array.from({length:12},(_,i)=>{const key=`${year}-${String(i+1).padStart(2,'0')}`,enabled=months.includes(key);return `<button ${enabled?'':'disabled'} class="${enabled?'available':''} ${key===selectedRecordMonth?'active':''}" ${enabled?`data-record-month="${key}"`:''}>${i+1}月</button>`;}).join('')}</div></div>`;
  }

  function showRecordStats(){
    const history=[...state.workouts].filter(w=>w.endedAt),durationMinutes=history.reduce((sum,w)=>sum+Math.max(0,new Date(w.endedAt)-new Date(w.startedAt))/60000,0);
    const groups={};history.forEach(w=>(w.exercises||[]).forEach(e=>{const count=(e.sets||[]).filter(s=>s.done&&!s.warmup).length;if(count){const group=exercise(e.exerciseId).group||'其他';groups[group]=(groups[group]||0)+count;}}));
    const groupEntries=Object.entries(groups).sort((a,b)=>b[1]-a[1]),maxGroup=Math.max(1,...groupEntries.map(x=>x[1]));
    openModal('记录统计',`<div class="record-summary-grid"><div><strong>${history.length}</strong><span>训练次数</span></div><div><strong>${durationMinutes>=60?round(durationMinutes/60,1)+'h':Math.round(durationMinutes)+'min'}</strong><span>训练时长</span></div><div><strong>${history.reduce((n,w)=>n+workingSets(w),0)}</strong><span>有效组</span></div><div><strong>${Math.round(history.reduce((n,w)=>n+totalVolume(w),0)).toLocaleString()}</strong><span>训练容量 kg</span></div></div><section class="section record-stat-section"><div class="section-title">部位分布</div><div class="card flat">${groupEntries.length?groupEntries.map(([g,n])=>`<div class="record-part-row"><span>${esc(g)}</span><div><i style="width:${Math.round(n/maxGroup*100)}%"></i></div><strong>${n}组</strong></div>`).join(''):'<div class="empty">完成训练后自动生成统计</div>'}</div></section><div class="info-note">统计根据已完成的训练组自动汇总，热身组不计入有效组。</div>`);
  }

  function calendarHTML(history){
    const now=new Date(), y=now.getFullYear(), m=now.getMonth(); const first=new Date(y,m,1); const days=new Date(y,m+1,0).getDate(); const offset=(first.getDay()+6)%7;
    const byDate={}; history.forEach(w=>{const d=(w.endedAt||'').slice(0,10);(byDate[d] ||= []).push(w);});
    const cells=[]; for(let i=0;i<offset;i++)cells.push('<div class="cal-cell blank"></div>');
    for(let d=1;d<=days;d++){const key=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;const list=byDate[key]||[];cells.push(`<button class="cal-cell ${list.length?'trained':''} ${key===today()?'today':''}" data-cal-date="${key}"><span>${d}</span>${list.length?`<i>${list.length}</i>`:''}</button>`);}
    return `<div class="card calendar"><div class="cal-title">${y}年${m+1}月</div><div class="cal-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div><div class="cal-grid">${cells.join('')}</div></div>`;
  }
  function showCalendarDay(date){const list=state.workouts.filter(w=>(w.endedAt||'').slice(0,10)===date);if(list.length===1){showWorkoutDetail(list[0].id);return;}openModal(formatDate(date),list.length?list.map(historyItem).join(''):'<div class="empty">这一天没有训练</div>');document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));}

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
    const ex=exercise(we.exerciseId), prev=bestPreviousExercise(we.exerciseId,wId(state.activeWorkout)), cardio=ex.type==='cardio';
    return `<section class="training-exercise" data-ex-index="${idx}">
      <div class="training-exercise-head"><div class="exercise-thumb">${exerciseVisual(ex)}</div><div class="grow"><strong>${esc(ex.name)}</strong><small>${esc(ex.primary||ex.group)}${ex.rest?' · '+esc(ex.rest):''}</small>${prev?`<div class="last-result">上次：${esc(setSummary(prev.entry.sets,ex))}</div>`:''}</div><button class="exercise-menu-btn" data-ex-menu="${idx}" aria-label="动作菜单"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8 3.5-2.1-.8a6.3 6.3 0 0 0-.7-1.7l.9-2-2-2-2 .9a6.3 6.3 0 0 0-1.7-.7L12 3h-2.8l-.8 2.1a6.3 6.3 0 0 0-1.7.7l-2-.9-2 2 .9 2a6.3 6.3 0 0 0-.7 1.7L1 12v2.8l2.1.8c.2.6.4 1.2.7 1.7l-.9 2 2 2 2-.9c.5.3 1.1.6 1.7.7l.8 2.1H12l.8-2.1c.6-.2 1.2-.4 1.7-.7l2 .9 2-2-.9-2c.3-.5.6-1.1.7-1.7l2.1-.8V12Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></button></div>
      <div class="set-head ${cardio?'cardio':''}"><span>组</span>${cardio?'<span>min</span>':'<span>kg</span><span>次数</span>'}<span>完成</span><span></span></div>
      <div class="set-rows">${we.sets.map((s,si)=>setRowHTML(ex,s,si)).join('')}</div>
      <div class="progression">${progressionMessage(we)}</div>
      <button class="text-btn" data-add-set="${idx}">＋ 添加一组</button>
    </section>`;
  }
  function setRowHTML(ex,s,si){const cardio=ex.type==='cardio';const main=`<div class="set-row ${cardio?'cardio-row':''}" data-set-row="${si}"><button class="set-index ${s.warmup?'warm':''}" data-warmup="${si}">${s.warmup?'热':si+1}</button>${cardio?`<input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-field="minutes" data-set="${si}" value="${esc(s.minutes??s.reps??'')}">`:`<input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-field="weight" data-set="${si}" value="${esc(s.weight??'')}"><input class="set-input ${s.done?'completed-input':''}" inputmode="numeric" data-field="reps" data-set="${si}" value="${esc(s.reps??'')}">`}<button class="set-done ${s.done?'done':''}" data-done="${si}">${s.done?'✓':'○'}</button><button class="dots-btn" data-set-menu="${si}">•••</button></div>`;const drops=(s.drops||[]).map((d,di)=>`<div class="drop-row"><span class="drop-label">递${di+1}</span><input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-drop-field="weight" data-drop="${di}" data-set="${si}" value="${esc(d.weight??'')}"><input class="set-input ${s.done?'completed-input':''}" inputmode="numeric" data-drop-field="reps" data-drop="${di}" data-set="${si}" value="${esc(d.reps??'')}"><button class="drop-plus" data-copy-drop="${si}:${di}">＋</button><button class="drop-delete" data-delete-drop="${si}:${di}">×</button></div>`).join('');return `<div class="set-block">${main}${drops}</div>`;}

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
    if(!['body','strength','diet','settings'].includes(dataTab)) dataTab='body';
    const body=lastBody(), avg=sevenDayAvgWeight();
    main.innerHTML=`
      ${pageIntro('我的','身体数据、力量趋势、饮食推荐和设置。')}
      <div class="tabs"><button class="tab ${dataTab==='body'?'active':''}" data-mine-tab="body">身体数据</button><button class="tab ${dataTab==='strength'?'active':''}" data-mine-tab="strength">力量趋势</button><button class="tab ${dataTab==='diet'?'active':''}" data-mine-tab="diet">饮食</button><button class="tab ${dataTab==='settings'?'active':''}" data-mine-tab="settings">设置</button></div>
      <div id="mine-content"></div>`;
    document.querySelectorAll('[data-mine-tab]').forEach(b=>b.onclick=()=>{dataTab=b.dataset.mineTab;renderMine();});
    const c=document.getElementById('mine-content');
    if(dataTab==='body'){
      c.innerHTML=`<div class="grid2 equal-metrics"><div class="card metric-card"><small>最新体重</small><strong>${body?.weight?body.weight+' kg':'—'}</strong><div class="metric-delta">7 日平均 ${avg?avg+' kg':'—'}</div></div><div class="card metric-card"><small>腰围</small><strong>${body?.waist?body.waist+' cm':'—'}</strong><div class="metric-delta muted">每周固定条件记录</div></div></div>
      <section class="section"><div class="section-head"><div class="section-title">体重趋势</div><button class="section-link" id="add-body-btn">＋ 记录</button></div><div class="card"><div class="chart">${weightChart()}</div></div></section>
      <section class="section"><div class="section-title" style="margin-bottom:10px">最近记录</div><div class="list">${[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(m=>`<button class="list-item" style="width:100%;text-align:left" data-edit-body="${m.id}"><div class="grow"><strong>${formatDate(m.date)}</strong><small>${[m.bodyFat?`体脂 ${m.bodyFat}%`:null,m.skeletalMuscle?`骨骼肌 ${m.skeletalMuscle}kg`:null,m.waist?`腰围 ${m.waist}cm`:null].filter(Boolean).join(' · ')||'身体记录'}</small></div><strong>${m.weight?m.weight+' kg':'—'}</strong></button>`).join('')}</div></section>`;
      document.getElementById('add-body-btn').onclick=()=>showBodyForm();document.querySelectorAll('[data-edit-body]').forEach(b=>b.onclick=()=>showBodyForm(b.dataset.editBody));
    } else if(dataTab==='strength'){
      const stats=strengthStats(); c.innerHTML=stats.length?`<div class="list">${stats.map(s=>`<button class="list-item" style="width:100%;text-align:left" data-strength="${s.id}"><div class="grow"><strong>${esc(s.name)}</strong><small>${s.sessions} 次训练记录</small></div><strong>${s.bestWeight} kg</strong></button>`).join('')}</div>`:'<div class="card empty">完成训练后自动生成力量趋势。</div>';document.querySelectorAll('[data-strength]').forEach(b=>b.onclick=()=>showStrength(b.dataset.strength));
    } else if(dataTab==='diet'){
      c.innerHTML=`<div class="card"><div class="tabs diet-tabs"><button class="tab ${dietMode==='training'?'active':''}" data-diet="training">训练日</button><button class="tab ${dietMode==='rest'?'active':''}" data-diet="rest">休息日</button><button class="tab ${dietMode==='cheat'?'active':''}" data-diet="cheat">放纵餐</button></div>${dietHTML(dietMode)}</div>`;document.querySelectorAll('[data-diet]').forEach(b=>b.onclick=()=>{dietMode=b.dataset.diet;dietBatch=0;state.settings.dietMode=dietMode;saveState();renderMine();});document.getElementById('shuffle-diet').onclick=()=>{const size=dietMode==='cheat'?CHEAT_MENUS.length:(dietMode==='rest'?REST_DIET_MENUS.length:DIET_MENUS.length);dietBatch=(dietBatch+1)%size;renderMine();};
    } else {
      c.innerHTML=`<section class="section"><div class="card"><div class="stat-row"><span>默认组间休息</span><button class="pill blue" id="rest-setting">${state.settings.restSeconds} 秒</button></div><div class="stat-row"><span>训练记录</span><strong>${state.workouts.length} 次</strong></div><div class="stat-row"><span>数据保存</span><strong>本机保存</strong></div></div></section><div class="backup-grid"><button class="backup-action" id="export-btn">一键备份</button><button class="backup-action" id="import-btn">一键恢复</button></div><input id="import-file" type="file" accept="application/json,.json" hidden><div class="note" style="margin-top:12px">数据保存在当前手机。建议每周或重要训练后点一次“一键备份”，换手机或清理浏览器数据后可用备份文件一键恢复。</div>`;document.getElementById('rest-setting').onclick=showRestSetting;document.getElementById('export-btn').onclick=exportData;document.getElementById('import-btn').onclick=()=>document.getElementById('import-file').click();document.getElementById('import-file').onchange=e=>importDataFile(e.target.files?.[0]);
    }
    if(c && !c.innerHTML.trim()){dataTab='body';setTimeout(()=>{if(page==='mine')renderMine();},0);}
  }

  const TRAINING_BREAKFASTS=['鸡蛋2个 + 燕麦牛奶碗 + 香蕉','全麦吐司鸡蛋三明治 + 牛奶 + 蓝莓','燕麦鸡蛋饼 + 无糖酸奶 + 苹果','鸡蛋2个 + 豆浆 + 全麦面包 + 香蕉','牛肉蔬菜卷饼 + 牛奶','鸡丝粥 + 水煮蛋2个 + 玉米','低脂火腿贝果 + 希腊酸奶','虾仁鸡蛋面 + 一份水果'];
  const TRAINING_LUNCHES=['黑椒鸡腿饭 + 西兰花胡萝卜','照烧鸡胸饭 + 菠菜菌菇','土豆炖牛肉 + 米饭 + 生菜','香煎牛排饭 + 彩椒芦笋','番茄牛腩饭 + 清炒菜心','咖喱鸡肉饭 + 水煮青菜','虾仁滑蛋饭 + 凉拌黄瓜','三文鱼杂粮饭 + 西兰花','青椒牛肉盖饭 + 菌菇','鸡胸肉意面 + 蔬菜沙拉','瘦肉豆腐煲 + 米饭 + 时蔬','清蒸鱼 + 米饭 + 蒜蓉生菜'];
  const TRAINING_SNACKS=['香蕉 + 希腊酸奶','饭团 + 牛奶','全麦面包 + 乳清蛋白','香蕉 + 花生酱吐司','低脂酸奶 + 麦片 + 蓝莓','玉米 + 鸡蛋 + 无糖豆浆','贝果半个 + 牛奶','苹果 + 酸奶 + 一小把坚果'];
  const TRAINING_DINNERS=['番茄牛肉饭 + 清炒时蔬','清蒸鱼 + 米饭 + 炒青菜','虾仁炒蛋 + 米饭 + 西兰花','鸡胸肉意面 + 大份蔬菜','黑椒牛柳饭 + 芦笋','照烧三文鱼 + 土豆泥 + 沙拉','冬瓜虾仁汤 + 瘦肉炒饭','香菇滑鸡饭 + 菜心','牛肉荞麦面 + 青菜','鸡腿肉藜麦饭 + 烤蔬菜','番茄鸡蛋牛肉面 + 凉拌菠菜','豆腐蒸肉饼 + 米饭 + 菌菇'];
  const REST_BREAKFASTS=['鸡蛋2个 + 无糖酸奶 + 蓝莓','牛奶燕麦碗 + 坚果 + 苹果','全麦吐司鸡蛋三明治 + 黑咖啡','豆浆 + 水煮蛋2个 + 小份玉米','虾仁蒸蛋 + 紫薯','希腊酸奶水果碗 + 鸡蛋2个','牛肉蔬菜卷 + 无糖豆浆','鸡胸肉生菜三明治 + 牛奶'];
  const REST_LUNCHES=['清蒸鱼 + 半碗米饭 + 大份蔬菜','香煎鸡腿肉 + 杂粮饭 + 西兰花','番茄炖牛腩 + 菌菇青菜','虾仁豆腐煲 + 半碗米饭','黑椒牛肉 + 彩椒 + 小份土豆','鸡胸肉荞麦面 + 大份青菜','三文鱼沙拉 + 南瓜','瘦肉炒菌菇 + 杂粮饭','冬瓜排骨汤 + 凉拌蔬菜','清炒虾仁 + 蒸蛋 + 小份米饭','牛肉豆腐锅 + 生菜','白切鸡 + 糙米饭 + 菜心'];
  const REST_SNACKS=['无糖酸奶 + 蓝莓','牛奶 + 水煮蛋','苹果 + 一小把坚果','乳清蛋白 + 无糖豆浆','低脂奶酪 + 小番茄','希腊酸奶 + 奇异果','鸡蛋 + 黄瓜条','毛豆 + 无糖茶'];
  const REST_DINNERS=['虾仁炒蛋 + 西兰花 + 小份米饭','清蒸鲈鱼 + 菌菇青菜','鸡胸肉沙拉 + 烤南瓜','番茄牛肉汤 + 炒时蔬','香煎三文鱼 + 芦笋','豆腐蒸肉饼 + 凉拌菠菜','鸡腿肉炒彩椒 + 菜花','牛肉荞麦面 + 双份青菜','虾仁冬瓜汤 + 蒸蛋','瘦肉菌菇煲 + 生菜','白灼虾 + 豆腐 + 时蔬','鸡胸肉蔬菜卷 + 无糖酸奶'];
  function buildDietMenus(breakfasts,lunches,snacks,dinners,count=32){return Array.from({length:count},(_,i)=>({breakfast:breakfasts[i%breakfasts.length],lunch:lunches[(i*5+1)%lunches.length],snack:snacks[(i*3+2)%snacks.length],dinner:dinners[(i*7+3)%dinners.length]}));}
  const DIET_MENUS=buildDietMenus(TRAINING_BREAKFASTS,TRAINING_LUNCHES,TRAINING_SNACKS,TRAINING_DINNERS);
  const REST_DIET_MENUS=buildDietMenus(REST_BREAKFASTS,REST_LUNCHES,REST_SNACKS,REST_DINNERS);
  const CHEAT_MENUS=[
    {name:'重庆火锅局',main:'麻辣牛油锅 + 肥牛卷 + 鲜毛肚 + 虾滑 + 嫩牛肉',side:'土豆片、贡菜、豆皮、菌菇拼盘',treat:'冰粉或红糖糍粑 + 冰镇酸梅汤'},
    {name:'炸鸡汉堡快乐餐',main:'双层芝士牛肉堡 + 香辣炸鸡翅',side:'海盐薯条 + 玉米杯或蔬菜沙拉',treat:'香草冰淇淋或奶昔'},
    {name:'披萨意面组合',main:'榴莲披萨或超级至尊披萨 + 黑椒牛柳意面',side:'烤鸡翅 + 凯撒沙拉',treat:'提拉米苏 + 冰柠檬茶'},
    {name:'韩式烤肉大餐',main:'五花肉 + 牛肋条 + 调味牛肉 + 芝士烤鸡',side:'石锅拌饭、泡菜、烤蘑菇和生菜',treat:'韩式刨冰或香蕉牛奶'},
    {name:'日式烧肉寿司',main:'和牛烧肉拼盘 + 三文鱼寿司 + 鳗鱼饭',side:'天妇罗、味噌汤、海藻沙拉',treat:'抹茶大福或北海道冰淇淋'},
    {name:'川湘下饭菜',main:'水煮牛肉 + 辣子鸡 + 小炒黄牛肉',side:'干锅花菜 + 一大碗米饭',treat:'桂花酒酿小圆子或冰豆花'},
    {name:'广式茶点畅吃',main:'虾饺 + 烧卖 + 叉烧包 + 豉汁蒸排骨',side:'干炒牛河或腊味煲仔饭',treat:'杨枝甘露 + 蛋挞'},
    {name:'东北烧烤夜宵',main:'羊肉串 + 牛肉串 + 烤鸡翅 + 烤生蚝',side:'烤茄子、烤韭菜、炒方便面',treat:'冰汽水 + 烤面包片'},
    {name:'经典西餐大餐',main:'黑椒肉眼牛排 + 奶油培根意面',side:'焗土豆泥 + 蒜香面包 + 时蔬',treat:'熔岩巧克力蛋糕'},
    {name:'港式烧味甜品',main:'蜜汁叉烧 + 烧鸭 + 油鸡三拼饭',side:'咖喱鱼蛋 + 椒盐鱿鱼',treat:'双皮奶或芒果西米露'},
    {name:'潮汕牛肉火锅',main:'吊龙 + 五花趾 + 匙仁 + 手打牛肉丸',side:'粿条、炸腐皮、生菜和白萝卜',treat:'普宁豆干 + 冰柠茶'},
    {name:'北京烤鸭宴',main:'烤鸭半只 + 荷叶饼 + 甜面酱',side:'鸭架椒盐或鸭架汤 + 京酱肉丝',treat:'驴打滚或豌豆黄'},
    {name:'新疆大盘鸡',main:'大盘鸡 + 宽皮带面',side:'烤羊肉串 + 凉拌皮辣红',treat:'新疆酸奶 + 哈密瓜'},
    {name:'云南菌子锅',main:'土鸡菌菇火锅 + 牛肝菌炒饭',side:'包浆豆腐 + 凉拌米线',treat:'泡鲁达或鲜花饼'},
    {name:'贵州酸汤鱼',main:'酸汤江团鱼 + 肥牛',side:'豆腐、土豆、娃娃菜和米饭',treat:'糍粑冰粉'},
    {name:'海南椰子鸡',main:'椰子鸡锅 + 文昌鸡',side:'煲仔饭、马蹄、竹荪和蔬菜',treat:'清补凉'},
    {name:'泰式海鲜盛宴',main:'冬阴功海鲜锅 + 咖喱蟹',side:'菠萝炒饭 + 炭烤猪颈肉',treat:'芒果糯米饭 + 泰式奶茶'},
    {name:'越南街头风味',main:'火车头牛肉河粉 + 香茅烤肉',side:'越南春卷 + 甘蔗虾',treat:'滴漏咖啡或椰子咖啡'},
    {name:'新加坡南洋餐',main:'海南鸡饭 + 黑胡椒螃蟹',side:'叻沙 + 咖椰吐司',treat:'斑斓蛋糕 + 薏米水'},
    {name:'马来西亚肉骨茶',main:'肉骨茶 + 干锅肉骨茶',side:'油条、卤豆腐和鸡油饭',treat:'白咖啡 + 榴莲泡芙'},
    {name:'印度咖喱大餐',main:'黄油鸡咖喱 + 烤羊排',side:'蒜香烤饼 + 印度香米饭',treat:'芒果拉西 + 印度奶球'},
    {name:'墨西哥塔可派对',main:'牛肉塔可 + 芝士鸡肉卷饼',side:'玉米片配鳄梨酱 + 墨西哥辣味饭',treat:'肉桂吉事果'},
    {name:'美式烟熏烧烤',main:'烟熏牛胸肉 + 烤猪肋排',side:'通心粉芝士 + 薯角 + 凉拌卷心菜',treat:'苹果派 + 可乐'},
    {name:'德式烤猪肘',main:'脆皮烤猪肘 + 德式香肠拼盘',side:'酸菜、土豆泥和黑麦面包',treat:'黑森林蛋糕'},
    {name:'西班牙海鲜饭',main:'藏红花海鲜饭 + 伊比利亚火腿',side:'蒜香虾 + 西班牙土豆蛋饼',treat:'巴斯克芝士蛋糕'},
    {name:'法式小酒馆',main:'红酒炖牛肉 + 香煎鸭胸',side:'奶油焗土豆 + 法棍',treat:'焦糖布丁'},
    {name:'意式肉酱盛宴',main:'千层面 + 松露蘑菇披萨',side:'炸鱿鱼圈 + 芝士焗饭',treat:'开心果冰淇淋'},
    {name:'土耳其烤肉拼盘',main:'烤羊肉 + 烤牛肉 + 鸡肉沙威玛',side:'皮塔饼、鹰嘴豆泥和烤蔬菜',treat:'土耳其米布丁'},
    {name:'希腊海边餐',main:'烤羊排 + 海鲜烩饭',side:'希腊沙拉 + 皮塔饼配酸奶黄瓜酱',treat:'蜂蜜坚果酸奶'},
    {name:'俄式暖胃餐',main:'俄式炖牛肉 + 奶油蘑菇鸡',side:'红菜汤 + 土豆饼',treat:'蜂蜜蛋糕'},
    {name:'大阪街头小吃',main:'大阪烧 + 章鱼烧 + 炒面',side:'炸串拼盘 + 玉子烧',treat:'抹茶圣代'},
    {name:'日式拉面套餐',main:'豚骨叉烧拉面 + 溏心蛋',side:'煎饺 + 炸鸡块',treat:'草莓大福'},
    {name:'日式咖喱炸物',main:'厚切炸猪排咖喱饭',side:'可乐饼 + 唐扬鸡块 + 卷心菜丝',treat:'红豆鲷鱼烧'},
    {name:'韩式部队锅',main:'芝士部队锅 + 辛拉面',side:'海鲜煎饼 + 炸紫菜卷',treat:'年糕华夫饼 + 梨汁'},
    {name:'韩式炸鸡双拼',main:'蜂蜜芥末炸鸡 + 甜辣炸鸡',side:'芝士年糕 + 鱼饼汤',treat:'雪花冰'},
    {name:'湘西烧烤小龙虾',main:'蒜蓉小龙虾 + 麻辣小龙虾',side:'烤排骨、烤牛油和炒米粉',treat:'冰镇绿豆沙'},
    {name:'江浙本帮菜',main:'红烧肉 + 油爆虾 + 腌笃鲜',side:'葱油拌面 + 酒香草头',treat:'桂花糖藕'},
    {name:'南京鸭血粉丝',main:'全套鸭血粉丝汤 + 锅贴',side:'盐水鸭 + 鸭油烧饼',treat:'梅花糕'},
    {name:'武汉过早组合',main:'热干面 + 三鲜豆皮 + 牛肉粉',side:'面窝 + 糯米鸡',treat:'米酒蛋花'},
    {name:'西安碳水盛宴',main:'肉夹馍 + 油泼面 + 羊肉泡馍',side:'凉皮 + 烤肉串',treat:'冰峰汽水 + 桂花糕'},
    {name:'兰州牛肉面',main:'加肉加蛋牛肉面 + 大宽面',side:'手抓羊肉 + 凉拌牛腱',treat:'甜醅子奶茶'},
    {name:'河南烩面水席',main:'羊肉烩面 + 锅贴',side:'小酥肉 + 洛阳燕菜',treat:'杏仁茶'},
    {name:'山东鲁菜硬菜',main:'九转大肠 + 糖醋鲤鱼 + 葱烧海参',side:'鲅鱼水饺',treat:'拔丝地瓜'},
    {name:'福建海味宴',main:'佛跳墙 + 海蛎煎 + 荔枝肉',side:'沙茶面 + 五香卷',treat:'花生汤 + 芋泥'},
    {name:'台湾夜市套餐',main:'大鸡排 + 卤肉饭 + 蚵仔煎',side:'盐酥鸡 + 炸甜不辣',treat:'珍珠奶茶 + 凤梨酥'},
    {name:'澳门葡式风味',main:'葡国鸡 + 非洲鸡 + 猪扒包',side:'咖喱鱼蛋 + 焗饭',treat:'葡式蛋挞 + 木糠布甸'},
    {name:'成都串串香',main:'牛肉串串 + 掌中宝 + 郡肝 + 脑花',side:'冒菜、苕粉和蛋炒饭',treat:'红糖冰粉'},
    {name:'螺蛳粉加满料',main:'加腐竹、鸭脚、卤蛋和炸蛋的螺蛳粉',side:'炸猪脚 + 凉拌木耳',treat:'冰豆浆'},
    {name:'长沙夜宵局',main:'口味虾 + 臭豆腐 + 糖油粑粑',side:'小炒黄牛肉 + 猪油拌粉',treat:'紫苏桃子姜'},
    {name:'甜品下午茶',main:'草莓奶油蛋糕 + 可颂三明治',side:'巴斯克芝士蛋糕 + 马卡龙',treat:'焦糖拿铁或厚乳奶茶'}
  ];
  function dietHTML(mode){
    if(mode==='cheat'){
      const menu=CHEAT_MENUS[dietBatch%CHEAT_MENUS.length];
      return `<div class="small muted">今天想吃点好的</div><div class="cheat-hero"><span>本次推荐</span><strong>${esc(menu.name)}</strong></div><div class="section-head" style="margin-top:18px"><strong>具体放纵餐推荐</strong><button class="section-link" id="shuffle-diet">换一批</button></div>${[['主角',menu.main],['搭配',menu.side],['甜品/饮品',menu.treat]].map(([n,t])=>`<div class="meal"><strong>${n}</strong><p>${esc(t)}</p></div>`).join('')}<div class="note" style="margin-top:12px">放纵餐按一顿来享受就好，挑自己真正想吃的，不需要为了“补偿”额外挨饿或疯狂加练。</div>`;
    }
    const d=DIET[mode],menus=mode==='rest'?REST_DIET_MENUS:DIET_MENUS,menu=menus[dietBatch%menus.length];
    return `<div class="small muted">${d.label}目标</div><div class="diet-macro"><div><strong>${d.kcal}</strong><small>kcal</small></div><div><strong>${d.protein}g</strong><small>蛋白质</small></div><div><strong>${d.fat}g</strong><small>脂肪</small></div><div><strong>${d.carbs}g</strong><small>碳水</small></div></div>
      <div class="section-head" style="margin-top:18px"><strong>今日具体饮食推荐</strong><button class="section-link" id="shuffle-diet">换一批</button></div>
      ${[['早餐',menu.breakfast],['午餐',menu.lunch],['训练前/加餐',menu.snack],['晚餐',menu.dinner]].map(([n,t])=>`<div class="meal"><strong>${n}</strong><p>${t}</p></div>`).join('')}
      <div class="note" style="margin-top:12px">按当前计划保持蛋白质约 150g/天。训练日碳水更高以支持训练表现；休息日适度降低碳水。份量以你的总热量目标为准，可按体重、腰围和训练表现每两周调整。</div>`;
  }

  function exerciseLibraryHTML(){
    const groups=['全部','胸','背','肩','腿','臀','二头','三头','腹','小腿','前臂','有氧'];
    const list=allExercises().filter(e=>activeExerciseFilter==='全部'||e.group===activeExerciseFilter);
    return `<div class="search"><input id="exercise-search" placeholder="搜索动作名称"></div><div class="filter-chips">${groups.map(g=>`<button class="chip ${activeExerciseFilter===g?'active':''}" data-filter="${g}">${g}</button>`).join('')}</div><div class="section"><div id="exercise-list" class="list">${list.map(exerciseListItem).join('')}</div></div>`;
  }
  function exerciseListItem(e){ return `<button class="list-item tutorial-card" style="width:100%;text-align:left" data-tutorial="${e.id}"><div class="muscle-icon visual">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><p>${esc(e.primary)} · ${esc(e.equipment)}${e.type==='cardio'?' · min':''}</p></div><span class="pill blue">讲解</span></button>`; }
  function bindExerciseLibrary(){
    document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();activeExerciseFilter=b.dataset.filter;renderExercisesPage();});
    document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial));
    const list=document.getElementById('exercise-list');hydrateGymVisuals(list);
    const s=document.getElementById('exercise-search'); if(s)s.oninput=()=>{ const q=s.value.trim().toLowerCase(); list.innerHTML=allExercises().filter(e=>(activeExerciseFilter==='全部'||e.group===activeExerciseFilter)&&e.name.toLowerCase().includes(q)).map(exerciseListItem).join('')||'<div class="empty">没有找到这个动作</div>'; document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial)); hydrateGymVisuals(list); };
  }

  function bindCommon(){
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setPage(b.dataset.go));
    document.querySelectorAll('[data-start-plan]').forEach(b=>b.onclick=()=>startPlan(b.dataset.startPlan));
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
  }

  function startPlan(planId){
    if(state.activeWorkout){toast('已有进行中的训练');setPage('training');return;}
    const p=planById(planId); if(!p)return;
    state.activeWorkout={id:uid(),planId:p.id,name:p.name,startedAt:new Date().toISOString(),exercises:p.exercises.map(([id,sets,min,max])=>({exerciseId:id,target:{sets,min,max},sets:Array.from({length:sets},()=>({weight:'',reps:'',minutes:'',warmup:false,done:false,drops:[]}))}))};
    saveState(); setPage('training');
  }
  function startFreeWorkout(){ state.activeWorkout={id:uid(),planId:null,name:'自由训练',startedAt:new Date().toISOString(),exercises:[]}; pendingFreeWorkout=true;saveState();renderTraining();showAddExercise(); }

  function bindActiveWorkout(){
    document.querySelectorAll('.training-exercise').forEach(section=>{
      const ei=Number(section.dataset.exIndex);
      section.querySelectorAll('input[data-field]').forEach(inp=>inp.onchange=()=>{const si=Number(inp.dataset.set),field=inp.dataset.field;state.activeWorkout.exercises[ei].sets[si][field]=inp.value;saveState();});
      section.querySelectorAll('input[data-drop-field]').forEach(inp=>inp.onchange=()=>{const si=Number(inp.dataset.set),di=Number(inp.dataset.drop),field=inp.dataset.dropField;state.activeWorkout.exercises[ei].sets[si].drops[di][field]=inp.value;saveState();});
      section.querySelectorAll('[data-done]').forEach(btn=>btn.onclick=()=>{const si=Number(btn.dataset.done),set=state.activeWorkout.exercises[ei].sets[si];set.done=!set.done;saveState();if(set.done)startRest();else renderActiveWorkout();});
      section.querySelectorAll('[data-warmup]').forEach(btn=>btn.onclick=()=>{const si=Number(btn.dataset.warmup),set=state.activeWorkout.exercises[ei].sets[si];set.warmup=!set.warmup;saveState();renderActiveWorkout();});
      section.querySelectorAll('[data-set-menu]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();showSetMenu(ei,Number(btn.dataset.setMenu),btn);});
      section.querySelectorAll('[data-copy-drop]').forEach(btn=>btn.onclick=()=>{const [si,di]=btn.dataset.copyDrop.split(':').map(Number);const s=state.activeWorkout.exercises[ei].sets[si];const src=s.drops[di];s.drops.splice(di+1,0,{weight:src.weight,reps:src.reps});saveState();renderActiveWorkout();});section.querySelectorAll('[data-delete-drop]').forEach(btn=>btn.onclick=()=>{const [si,di]=btn.dataset.deleteDrop.split(':').map(Number);state.activeWorkout.exercises[ei].sets[si].drops.splice(di,1);saveState();renderActiveWorkout();});
    });
    document.querySelectorAll('[data-add-set]').forEach(b=>b.onclick=()=>{const we=state.activeWorkout.exercises[Number(b.dataset.addSet)],last=we.sets[we.sets.length-1]||{};we.sets.push({weight:last.weight||'',reps:last.reps||'',minutes:last.minutes||'',warmup:false,done:false,drops:(last.drops||[]).map(d=>({...d}))});saveState();renderActiveWorkout();});
    document.querySelectorAll('[data-ex-menu]').forEach(b=>b.onclick=e=>{e.stopPropagation();showExerciseMenu(Number(b.dataset.exMenu),b);});
    document.getElementById('add-exercise-btn').onclick=showAddExercise;document.getElementById('finish-workout-btn').onclick=finishWorkoutPrompt;document.getElementById('cancel-workout-btn').onclick=finishOrCancel;
    if(restRemaining>0){document.getElementById('timer-skip')?.addEventListener('click',()=>{restRemaining=0;clearInterval(timerInterval);renderActiveWorkout();});document.getElementById('timer-plus')?.addEventListener('click',()=>{restRemaining+=30;const el=document.getElementById('rest-timer');if(el)el.textContent=fmtTimer(restRemaining);});}
  }
  function closePopover(){document.querySelectorAll('.action-popover').forEach(x=>x.remove());}
  function showPopover(anchor,items){closePopover();const pop=document.createElement('div');pop.className='action-popover';pop.innerHTML=items.map((it,i)=>`<button class="${it.danger?'danger':''}" data-pop="${i}">${it.label}</button>`).join('');document.body.appendChild(pop);const r=anchor.getBoundingClientRect(),w=Math.min(250,window.innerWidth-24);pop.style.width=w+'px';pop.style.left=Math.max(12,Math.min(window.innerWidth-w-12,r.right-w))+'px';pop.style.top=Math.min(window.innerHeight-pop.offsetHeight-12,r.bottom+6)+'px';pop.querySelectorAll('[data-pop]').forEach(b=>b.onclick=e=>{e.stopPropagation();const it=items[Number(b.dataset.pop)];closePopover();it.run();});setTimeout(()=>document.addEventListener('click',closePopover,{once:true}),0);}
  function showSetMenu(ei,si,anchor){const we=state.activeWorkout.exercises[ei],s=we.sets[si],ex=exercise(we.exerciseId);showPopover(anchor,[{label:'复制本组',run:()=>{we.sets.splice(si+1,0,JSON.parse(JSON.stringify({...s,done:false})));saveState();renderActiveWorkout();}},...(ex.type==='cardio'?[]:[{label:'递减组',run:()=>{s.drops=s.drops||[];const src=s.drops.length?s.drops[s.drops.length-1]:s;s.drops.push({weight:src.weight||'',reps:src.reps||''});saveState();renderActiveWorkout();}}]),{label:'删除本组',danger:true,run:()=>{we.sets.splice(si,1);saveState();renderActiveWorkout();}}]);}
  function showExerciseMenu(ei,anchor){const we=state.activeWorkout.exercises[ei],ex=exercise(we.exerciseId);showPopover(anchor,[{label:'动作讲解',run:()=>showTutorial(ex.id)},{label:'动作排序',run:()=>showReorderExercises()},{label:'动作替换',run:()=>showReplaceExercise(ei)},{label:'删除动作',danger:true,run:()=>{state.activeWorkout.exercises.splice(ei,1);saveState();renderActiveWorkout();}}]);}
  function showReorderExercises(){openModal('动作排序',`<div class="reorder-list">${state.activeWorkout.exercises.map((we,i)=>`<div class="reorder-item"><span>☰</span><strong>${esc(exercise(we.exerciseId).name)}</strong><div><button data-move-up="${i}">↑</button><button data-move-down="${i}">↓</button></div></div>`).join('')}</div>`);document.querySelectorAll('[data-move-up]').forEach(b=>b.onclick=()=>moveExercise(Number(b.dataset.moveUp),-1));document.querySelectorAll('[data-move-down]').forEach(b=>b.onclick=()=>moveExercise(Number(b.dataset.moveDown),1));}
  function moveExercise(i,d){const a=state.activeWorkout.exercises,j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];saveState();showReorderExercises();}
  function showReplaceExercise(ei){openModal('替换动作',`<div class="list">${allExercises().map(e=>`<button class="list-item" data-replace-id="${e.id}"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><small>${e.group} · ${e.equipment}</small></div></button>`).join('')}</div>`);document.querySelectorAll('[data-replace-id]').forEach(b=>b.onclick=()=>{state.activeWorkout.exercises[ei].exerciseId=b.dataset.replaceId;saveState();closeModal();renderActiveWorkout();});}

  function showAddExercise(){const addPickedExercise=id=>{const e=exercise(id);state.activeWorkout.exercises.push({exerciseId:e.id,target:null,sets:[{weight:'',reps:'',minutes:'',warmup:false,done:false,drops:[]}]});pendingFreeWorkout=false;saveState();closeModal();renderActiveWorkout();};const bind=()=>document.querySelectorAll('[data-pick-ex]').forEach(b=>b.onclick=()=>addPickedExercise(b.dataset.pickEx));const draw=(q='')=>{const box=document.getElementById('modal-ex-list');box.innerHTML=allExercises().filter(x=>x.name.includes(q)).map(x=>`<button class="list-item" style="width:100%;text-align:left" data-pick-ex="${x.id}"><div class="exercise-thumb">${exerciseVisual(x)}</div><div class="grow"><strong>${esc(x.name)}</strong><small>${x.group} · ${x.equipment||'自定义'}</small></div><span class="pill blue">添加</span></button>`).join('');hydrateGymVisuals(box);bind();};openModal('添加动作',`<button class="custom-exercise-entry" id="new-custom-exercise">＋ 自定义动作</button><div class="search"><input id="modal-ex-search" placeholder="搜索动作"></div><div id="modal-ex-list" class="list"></div>`);draw();document.getElementById('modal-ex-search').oninput=e=>draw(e.target.value.trim());document.getElementById('new-custom-exercise').onclick=()=>{openModal('新建自定义动作',`<div class="form-grid"><div class="field full"><label>动作名称</label><input id="custom-name" placeholder="例如：单臂器械推胸"></div><div class="field"><label>部位</label><select id="custom-group"><option>胸</option><option>背</option><option>肩</option><option>腿</option><option>臀</option><option>二头</option><option>三头</option><option>腹</option><option>小腿</option><option>有氧</option></select></div><div class="field"><label>器械</label><input id="custom-equipment" placeholder="器械/哑铃/自重"></div></div><button class="primary-btn" id="save-custom-ex" style="margin-top:14px">保存并加入训练</button>`);document.getElementById('save-custom-ex').onclick=()=>{const name=document.getElementById('custom-name').value.trim();if(!name){toast('先填写动作名称');return;}const group=document.getElementById('custom-group').value,equipment=document.getElementById('custom-equipment').value.trim()||'自定义',ex={id:'custom_'+uid(),name,group,equipment,muscles:[group],primary:group,secondary:'',tips:['使用你熟悉的标准动作轨迹','保持稳定并控制全程','记录适合自己的重量和次数'],mistakes:['不要为了重量牺牲动作控制','出现疼痛时停止并调整','避免明显借力'],rest:group==='有氧'?'':'60–120 秒',type:group==='有氧'?'cardio':'strength',metric:group==='有氧'?'min':undefined,custom:true};state.customExercises=state.customExercises||[];state.customExercises.push(ex);saveState();addPickedExercise(ex.id);};};}

  function finishWorkoutPrompt(){
    const w=state.activeWorkout; if(!w)return; const done=workingSets(w); if(done===0){toast('至少完成一组再结束训练');return;}
    openModal('完成训练',`<div class="card flat"><div class="stat-row"><span>训练时间</span><strong>${durationText(Date.now()-new Date(w.startedAt).getTime())}</strong></div><div class="stat-row"><span>有效组</span><strong>${done} 组</strong></div><div class="stat-row"><span>训练容量</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">今天训练感觉</div><div class="grid3"><button class="secondary-btn neutral feeling" data-feeling="3">一般</button><button class="secondary-btn neutral feeling" data-feeling="4">不错</button><button class="secondary-btn feeling" data-feeling="5">很棒</button></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">整体疲劳</div><div class="grid3"><button class="secondary-btn neutral fatigue" data-fatigue="low">低</button><button class="secondary-btn neutral fatigue" data-fatigue="medium">中</button><button class="secondary-btn neutral fatigue" data-fatigue="high">高</button></div></div><button class="primary-btn" id="confirm-finish">保存训练</button>`);
    let feeling=4,fatigue='medium'; document.querySelectorAll('.feeling').forEach(b=>b.onclick=()=>{feeling=Number(b.dataset.feeling);document.querySelectorAll('.feeling').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');}); document.querySelectorAll('.fatigue').forEach(b=>b.onclick=()=>{fatigue=b.dataset.fatigue;document.querySelectorAll('.fatigue').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');});
    document.getElementById('confirm-finish').onclick=()=>completeWorkout(feeling,fatigue);
  }
  function completeWorkout(feeling,fatigue){
    const w=state.activeWorkout; w.endedAt=new Date().toISOString();w.feeling=feeling;w.fatigue=fatigue;w.exercises=w.exercises.map(e=>({...e,sets:e.sets.filter(s=>s.done||s.weight||s.reps||s.minutes)})); state.workouts.push(w);state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);setPage('history');toast('训练已保存');
  }
  function finishOrCancel(){
    openModal('结束当前训练',`<div class="note">未完成的训练也可以继续保留。只有选择“取消本次训练”才会删除当前进度。</div><button class="primary-btn" style="margin-top:14px" id="keep-training">继续训练</button><button class="secondary-btn danger" style="width:100%;margin-top:8px" id="cancel-current">取消本次训练</button>`);
    document.getElementById('keep-training').onclick=closeModal;document.getElementById('cancel-current').onclick=()=>{state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);renderTraining();toast('已取消本次训练');};
  }

  function showPlan(id){ const p=planById(id); if(!p)return; openModal(`第 ${p.index} 练 · ${p.name}`,`<div class="card flat plan-edit-list">${p.exercises.map(([eid,sets,min,max],i)=>{const e=exercise(eid);return `<div class="exercise-row plan-edit-row"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow plan-ex-copy"><strong>${esc(e.name)}</strong><small>${e.group} · ${e.primary}</small></div><span class="pill">${sets}×${min}–${max}</span><div class="plan-mini-actions"><button data-plan-up="${i}">↑</button><button data-plan-down="${i}">↓</button><button data-plan-replace="${i}">替</button><button data-plan-delete="${i}">×</button></div></div>`;}).join('')}</div><button class="secondary-btn neutral" style="width:100%;margin-top:10px" id="plan-add-action">＋ 添加动作</button><button class="primary-btn" style="margin-top:10px" id="modal-start-plan">开始训练</button>`);document.getElementById('modal-start-plan').onclick=()=>{closeModal();startPlan(id);};document.getElementById('plan-add-action').onclick=()=>showPlanExercisePicker(p,'add');document.querySelectorAll('[data-plan-up]').forEach(b=>b.onclick=()=>movePlanExercise(p,Number(b.dataset.planUp),-1));document.querySelectorAll('[data-plan-down]').forEach(b=>b.onclick=()=>movePlanExercise(p,Number(b.dataset.planDown),1));document.querySelectorAll('[data-plan-delete]').forEach(b=>b.onclick=()=>{p.exercises.splice(Number(b.dataset.planDelete),1);saveState();showPlan(p.id);});document.querySelectorAll('[data-plan-replace]').forEach(b=>b.onclick=()=>showPlanExercisePicker(p,'replace',Number(b.dataset.planReplace))); }
  function movePlanExercise(p,i,d){const j=i+d;if(j<0||j>=p.exercises.length)return;[p.exercises[i],p.exercises[j]]=[p.exercises[j],p.exercises[i]];saveState();showPlan(p.id);}
  function showPlanExercisePicker(p,mode,index=null){openModal(mode==='add'?'添加动作':'替换动作',`<div class="search"><input id="plan-pick-search" placeholder="搜索动作"></div><div id="plan-pick-list" class="list"></div>`);const draw=(q='')=>{document.getElementById('plan-pick-list').innerHTML=allExercises().filter(e=>e.name.includes(q)).map(e=>`<button class="list-item" data-plan-pick="${e.id}"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><small>${e.group} · ${e.equipment}</small></div></button>`).join('');hydrateGymVisuals(document.getElementById('plan-pick-list'));document.querySelectorAll('[data-plan-pick]').forEach(b=>b.onclick=()=>{if(mode==='add')p.exercises.push([b.dataset.planPick,1,8,12]);else{const old=p.exercises[index];p.exercises[index]=[b.dataset.planPick,old[1],old[2],old[3]];}saveState();showPlan(p.id);});};draw();document.getElementById('plan-pick-search').oninput=e=>draw(e.target.value.trim());}

  function exerciseVisual(ex,{priority=false}={}){
    const path=GYM_DIRECT[ex.id]||persistedGymMap[ex.id]||'';
    const src=priority&&path?`${GYM_BASE}/${String(path).replace(/^\.\//,'')}`:'';
    return `<div class="gym-media-shell${priority?' priority':''}"><img class="gym-gif" data-gym-id="${ex.id}" data-gym-path="${esc(path)}" data-gym-priority="${priority?'1':'0'}" ${src?`src="${src}"`:''} alt="${esc(ex.name)}" loading="${priority?'eager':'lazy'}" decoding="async" ${priority?'fetchpriority="high"':''} draggable="false"><span class="gym-loading">动作加载中</span></div>`;
  }
  async function loadGymIndex(force=false){if(force)gymIndexPromise=null;if(!gymIndexPromise)gymIndexPromise=fetch(GYM_DATA_URL,{cache:'force-cache'}).then(r=>r.ok?r.json():Promise.reject()).catch(()=>[]);return gymIndexPromise;}
  function norm(s=''){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function pickGymRecord(list,ex,q){
    const named=list.map(x=>({x,n:norm(x.name)}));
    if(ex.id==='lat_pulldown'){
      const bad=/behind|rear|reverse|underhand|supinat|one arm|single arm|close grip|narrow/;
      return named.filter(o=>o.n.includes('pulldown')&&o.n.includes('cable')&&!bad.test(o.n)).sort((a,b)=>(/lat pulldown/.test(b.n)?4:0)+(/seated/.test(b.n)?2:0)-((/lat pulldown/.test(a.n)?4:0)+(/seated/.test(a.n)?2:0)))[0]?.x;
    }
    if(ex.id==='face_pull'){
      const bad=/seated|supinat/;
      return named.filter(o=>o.n.includes('face pull')&&!bad.test(o.n)).sort((a,b)=>(/standing/.test(b.n)?3:0)+(/rope/.test(b.n)?2:0)-((/standing/.test(a.n)?3:0)+(/rope/.test(a.n)?2:0)))[0]?.x;
    }
    if(ex.id==='incline_walk') return named.find(o=>o.n.includes('walking')&&o.n.includes('incline')&&o.n.includes('treadmill'))?.x||named.find(o=>o.n.includes('incline')&&o.n.includes('treadmill'))?.x;
    return named.find(o=>o.n===q)?.x||named.find(o=>o.n.includes(q))?.x||named.find(o=>q.includes(o.n))?.x;
  }
  async function gymRecord(ex){const saved=GYM_DIRECT[ex.id]||persistedGymMap[ex.id];if(saved)return {gif_url:saved};if(gymCache[ex.id])return gymCache[ex.id];try{const list=await loadGymIndex(),q=norm(GYM_QUERY[ex.id]||({胸:'barbell bench press',背:'cable lat pulldown',肩:'dumbbell lateral raise',腿:'barbell full squat',二头:'dumbbell biceps curl',三头:'cable pushdown',腹:'3/4 sit-up',小腿:'standing calf raise',有氧:'walk elliptical cross trainer'}[ex.group]||''));if(q){const rec=pickGymRecord(list,ex,q);if(rec?.gif_url){persistedGymMap[ex.id]=rec.gif_url;saveGymMap();gymCache[ex.id]=rec;return rec;}}}catch(err){console.warn('Gym Visual index load failed',err);}const fallback=GYM_GROUP_FALLBACK[ex.group]||GYM_GROUP_FALLBACK.肩;return {gif_url:fallback,fallback:true};}
  function attachGymSources(img,path){
    const rel=String(path||'').replace(/^\.\//,'');if(!rel)return;
    const sources=[`${GYM_BASE}/${rel}`,`https://cdn.statically.io/gh/hasaneyldrm/exercises-dataset/${GYM_SHA}/${rel}`,`https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/${GYM_SHA}/${rel}`];
    let i=0;const shell=img.closest('.gym-media-shell');
    img.dataset.activePath=rel;img.classList.remove('no-media');shell?.classList.remove('failed');
    img.onload=()=>{if(img.dataset.activePath===rel)shell?.classList.add('loaded');};
    img.onerror=()=>{if(img.dataset.activePath!==rel)return;i++;if(i<sources.length)setTimeout(()=>{if(img.dataset.activePath===rel)img.src=sources[i];},180*i);else{img.classList.add('no-media');shell?.classList.add('failed');}};
    const current=img.getAttribute('src')||'';
    if(current&&current.includes(rel)){if(img.complete&&img.naturalWidth)shell?.classList.add('loaded');return;}
    img.src=sources[0];
  }
  function suspendGymImage(img){
    if(img._gymSuspendTimer){clearTimeout(img._gymSuspendTimer);img._gymSuspendTimer=null;}
    img.onload=null;img.onerror=null;img.dataset.activePath='';img.removeAttribute('src');
    img.closest('.gym-media-shell')?.classList.remove('loaded');
  }
  function ensureGymObserver(){
    if(gymVisibilityObserver||!('IntersectionObserver' in window))return gymVisibilityObserver;
    gymVisibilityObserver=new IntersectionObserver(entries=>entries.forEach(({target:img,isIntersecting})=>{
      img.dataset.gymVisible=isIntersecting?'1':'0';
      if(isIntersecting){if(img._gymSuspendTimer)clearTimeout(img._gymSuspendTimer);img._gymSuspendTimer=null;const path=img.dataset.gymPath;if(path&&!img.getAttribute('src'))attachGymSources(img,path);}
      else if(img.dataset.gymPriority!=='1'){img._gymSuspendTimer=setTimeout(()=>{if(img.dataset.gymVisible!=='1')suspendGymImage(img);},500);}
    }),{root:null,rootMargin:'180px 0px',threshold:.01});
    return gymVisibilityObserver;
  }
  function suspendGymVisuals(root=document){
    root.querySelectorAll('img.gym-gif').forEach(img=>{gymVisibilityObserver?.unobserve(img);suspendGymImage(img);delete img.dataset.hydrated;});
  }
  async function hydrateGymVisuals(root=document,{force=false}={}){
    const imgs=[...root.querySelectorAll('img.gym-gif')].filter(img=>force||!img.dataset.hydrated);
    await Promise.all(imgs.map(async img=>{
      img.dataset.hydrated='1';const ex=exercise(img.dataset.gymId);let path=img.dataset.gymPath;
      if(!path){const rec=await gymRecord(ex);path=rec?.gif_url||rec?.video||rec?.gif||(rec?.media_id?`videos/${rec.media_id}.gif`:'');if(path)img.dataset.gymPath=path;}
      if(!path){img.closest('.gym-media-shell')?.classList.add('failed');return;}
      if(img.dataset.gymPriority==='1'){attachGymSources(img,path);return;}
      const observer=ensureGymObserver();
      if(observer){observer.observe(img);const rect=img.getBoundingClientRect();if(rect.bottom>=-180&&rect.top<=window.innerHeight+180)attachGymSources(img,path);}
      else attachGymSources(img,path);
    }));
  }
  function canonicalMuscles(text=''){
    const t=String(text),out=[],add=x=>{if(!out.includes(x))out.push(x)};
    if(/胸|上胸/.test(t))add('胸大肌');
    if(/背阔/.test(t))add('背阔肌');
    if(/上背|菱形/.test(t))add('菱形肌');
    if(/上背|斜方/.test(t))add('斜方肌');
    if(/竖脊|下背|后链/.test(t))add('竖脊肌');
    if(/三角肌前|前三角/.test(t))add('三角肌前束');
    if(/三角肌中|中束/.test(t))add('三角肌中束');
    if(/三角肌后|后肩/.test(t))add('三角肌后束');
    if(/肩袖|冈下|小圆/.test(t))add('肩袖外旋肌');
    if(/三角肌(?!前|中|后)|(^|[、， ])肩($|[、， ])/.test(t)){add('三角肌前束');add('三角肌中束');}
    if(/肱二头|二头|肱肌/.test(t))add('肱二头肌');
    if(/肱三头|三头/.test(t))add('肱三头肌');
    if(/前臂|肱桡|腕屈/.test(t))add('前臂肌群');
    if(/腹直|核心|腹/.test(t))add('腹直肌');
    if(/腹斜|核心/.test(t))add('腹斜肌');
    if(/髋屈/.test(t))add('髋屈肌群');
    if(/股四头/.test(t))add('股四头肌');
    if(/内收/.test(t))add('内收肌群');
    if(/腘绳|后链/.test(t))add('腘绳肌群');
    if(/臀大|臀|后链/.test(t))add('臀大肌');
    if(/腓肠|比目鱼|小腿|足踝/.test(t))add('腓肠肌');
    if(/下肢|大腿|腿部/.test(t))add('股四头肌');
    if(/全身/.test(t)){add('背阔肌');add('股四头肌');add('臀大肌');}
    if(/背/.test(t)&&!out.some(x=>['背阔肌','菱形肌','斜方肌','竖脊肌'].includes(x)))add('背阔肌');
    return out;
  }
  function muscleMap(ex){
    const pri=canonicalMuscles(ex.primary||ex.group),sec=canonicalMuscles(ex.secondary||'').filter(x=>!pri.includes(x));
    const color=n=>pri.includes(n)?'#f5222d':'#ff9f1a';
    const specs={
      '胸大肌':{side:'front',anchor:[520,214],paths:['M440 184 C460 166 491 164 524 186 L522 246 C492 260 461 251 442 232Z','M529 186 C562 164 594 166 616 184 L614 232 C592 251 560 260 530 246Z']},
      '三角肌前束':{side:'front',anchor:[408,208],paths:['M405 178 C412 151 430 145 452 164 L449 222 C437 243 421 253 407 245Z','M608 164 C630 145 648 151 655 178 L653 245 C638 253 622 243 611 222Z']},
      '三角肌中束':{side:'front',anchor:[409,197],paths:['M404 173 C412 150 431 144 453 164 L448 218 C435 240 419 248 406 238Z','M607 164 C629 144 648 150 656 173 L654 238 C641 248 625 240 612 218Z']},
      '肱二头肌':{side:'front',anchor:[389,300],paths:['M381 252 C396 245 411 254 414 278 L402 346 C389 353 377 344 374 326Z','M646 252 C661 245 676 254 680 278 L687 326 C683 344 672 353 659 346Z']},
      '前臂肌群':{side:'front',anchor:[367,397],paths:['M365 334 C380 326 397 337 399 358 L380 472 C365 475 351 461 352 444Z','M662 337 C679 326 695 334 708 358 L721 444 C722 461 708 475 693 472Z']},
      '腹直肌':{side:'front',anchor:[526,348],paths:['M486 255 C511 246 540 246 565 255 L568 421 C556 442 542 451 527 446 C512 451 497 442 485 421Z']},
      '腹斜肌':{side:'front',anchor:[469,365],paths:['M450 276 C466 267 483 280 486 304 L482 431 C466 437 451 423 444 402Z','M568 304 C571 280 588 267 604 276 L610 402 C603 423 588 437 572 431Z']},
      '髋屈肌群':{side:'front',anchor:[500,463],paths:['M472 431 L514 445 L505 508 L474 487Z','M540 445 L582 431 L580 487 L549 508Z']},
      '股四头肌':{side:'front',anchor:[481,574],paths:['M457 448 C481 438 510 448 519 477 L507 650 C492 678 470 676 455 651Z','M535 477 C544 448 573 438 597 448 L599 651 C584 676 562 678 547 650Z']},
      '内收肌群':{side:'front',anchor:[520,560],paths:['M500 455 L523 474 L514 626 L492 584Z','M531 474 L554 455 L562 584 L540 626Z']},
      '斜方肌':{side:'back',anchor:[1027,207],paths:['M967 152 C992 134 1011 132 1027 157 C1043 132 1062 134 1087 152 L1092 271 L1027 318 L962 271Z']},
      '菱形肌':{side:'back',anchor:[1027,257],paths:['M987 210 L1027 180 L1067 210 L1055 307 L999 307Z']},
      '背阔肌':{side:'back',anchor:[976,354],paths:['M959 266 C978 258 1001 276 1008 307 L1003 421 C984 438 964 423 950 397Z','M1046 307 C1053 276 1076 258 1095 266 L1104 397 C1090 423 1070 438 1051 421Z']},
      '竖脊肌':{side:'back',anchor:[1027,379],paths:['M1008 307 L1025 319 L1020 451 L1004 423Z','M1029 319 L1046 307 L1050 423 L1034 451Z']},
      '三角肌后束':{side:'back',anchor:[929,205],paths:['M904 175 C913 151 934 146 961 165 L957 223 C945 244 925 253 909 241Z','M1093 165 C1120 146 1141 151 1150 175 L1145 241 C1129 253 1109 244 1097 223Z']},
      '肩袖外旋肌':{side:'back',anchor:[972,242],paths:['M948 205 C961 194 982 199 994 216 L989 274 C972 286 954 278 945 258Z','M1060 216 C1072 199 1093 194 1106 205 L1109 258 C1100 278 1082 286 1065 274Z']},
      '肱三头肌':{side:'back',anchor:[906,301],paths:['M891 253 C907 245 924 255 929 280 L918 351 C904 359 890 347 886 328Z','M1125 280 C1130 255 1147 245 1163 253 L1168 328 C1164 347 1150 359 1136 351Z']},
      '臀大肌':{side:'back',anchor:[1072,442],paths:['M958 385 C984 366 1014 373 1025 406 L1022 512 C998 535 972 527 958 500Z','M1029 406 C1040 373 1070 366 1096 385 L1096 500 C1082 527 1056 535 1032 512Z']},
      '腘绳肌群':{side:'back',anchor:[1073,580],paths:['M969 503 C993 492 1016 509 1019 539 L1012 663 C993 678 975 664 966 641Z','M1035 539 C1038 509 1061 492 1085 503 L1088 641 C1079 664 1061 678 1042 663Z']},
      '腓肠肌':{side:'back',anchor:[1073,729],paths:['M968 660 C989 650 1009 667 1013 696 L1007 804 C994 829 976 821 967 798Z','M1041 696 C1045 667 1065 650 1086 660 L1087 798 C1078 821 1060 829 1047 804Z']}
    };
    const active=[...new Set([...pri,...sec])].filter(n=>specs[n]);
    const shapes=active.flatMap(n=>specs[n].paths.map(d=>`<path d="${d}" fill="${color(n)}" fill-opacity=".94" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`)).join('');
    const labelsFor=side=>{
      const items=active.filter(n=>specs[n].side===side).sort((a,b)=>specs[a].anchor[1]-specs[b].anchor[1]);
      if(!items.length)return '';
      const minY=150,maxY=820,gap=74;
      const ys=items.map(n=>Math.max(minY,Math.min(maxY,specs[n].anchor[1])));
      for(let i=1;i<ys.length;i++)ys[i]=Math.max(ys[i],ys[i-1]+gap);
      if(ys.at(-1)>maxY){const shift=ys.at(-1)-maxY;for(let i=0;i<ys.length;i++)ys[i]-=shift;}
      return items.map((n,i)=>{const [ax,ay]=specs[n].anchor,c=color(n),left=side==='front',elbow=left?300:1235,end=left?185:1350,textX=left?165:1370,anchor=left?'end':'start';return `<g class="heatmap-label"><path d="M${ax} ${ay} L${elbow} ${ys[i]} L${end} ${ys[i]}" fill="none" stroke="${c}" stroke-width="3"/><circle cx="${ax}" cy="${ay}" r="6" fill="#fff" stroke="${c}" stroke-width="3"/><text x="${textX}" y="${ys[i]+11}" text-anchor="${anchor}" fill="${c}">${n}</text></g>`;}).join('');
    };
    return `<div class="heatmap-wrap formal v26"><svg viewBox="0 0 1536 1024" class="heatmap-svg" role="img" aria-label="${esc(ex.name)}训练肌群图"><image href="assets/heatmap-neutral-v2.png" x="0" y="0" width="1536" height="1024" preserveAspectRatio="xMidYMid meet"/><g>${shapes}</g>${labelsFor('front')}${labelsFor('back')}</svg><div class="heatmap-legend"><span><i class="red"></i>主要训练肌群</span><span><i class="orange"></i>辅助训练肌群</span><span><i class="gray"></i>非主要肌群</span></div></div>`;
  }

  function formatVideoDuration(seconds){
    const total=Math.max(0,Number(seconds)||0),hours=Math.floor(total/3600),minutes=Math.floor((total%3600)/60),secs=total%60;
    return hours?`${hours}:${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`:`${minutes}:${String(secs).padStart(2,'0')}`;
  }

  function videoHTML(ex){
    const video=VIDEO_MAP[ex.id];
    if(!video)return `<div class="video-unavailable"><strong>暂无对应视频</strong><span>3D 动图、动作要点和常见错误仍可正常查看。</span></div>`;
    const dur=formatVideoDuration(video.duration),cover=BILIBILI_COVERS[ex.id]?`${BILIBILI_COVER_BASE}${BILIBILI_COVERS[ex.id]}`:'';
    return `<div class="local-video" data-local-video="${ex.id}" data-bvid="${video.bvid}">
      <div class="local-video-stage">
        <div class="bilibili-cover-wrap">${cover?`<img class="bilibili-cover" src="${cover}" alt="${esc(ex.name)}视频讲解封面" loading="eager" decoding="async" fetchpriority="high" referrerpolicy="no-referrer">`:''}</div>
        <div class="local-video-shade"></div>
        <button class="local-video-play" type="button" aria-label="播放${esc(ex.name)}中文教学视频"><span>▶</span></button>
        <div class="local-video-time">${dur}</div>
      </div>
      <div class="local-video-note">${esc(video.author)} · ${dur} · ${esc(video.title)}</div>
    </div>`;
  }

  let activeVideoStage=null;
  function videoScreenControlsHTML(){return `<div class="video-screen-controls" aria-label="视频全屏控制"><button type="button" data-video-screen aria-label="全屏播放" title="全屏播放"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg></button></div>`;}
  async function exitVideoFullscreen(requestExit=true){
    const stage=activeVideoStage;activeVideoStage=null;
    if(stage)stage.classList.remove('video-force-fullscreen');
    document.body.classList.remove('video-fullscreen-open');
    if(requestExit){try{if(document.fullscreenElement&&document.exitFullscreen)await document.exitFullscreen();else if(document.webkitFullscreenElement&&document.webkitExitFullscreen)document.webkitExitFullscreen();}catch(e){}}
  }
  async function enterVideoFullscreen(stage){
    if(!stage)return;
    if(activeVideoStage===stage){await exitVideoFullscreen();return;}
    if(activeVideoStage&&activeVideoStage!==stage)await exitVideoFullscreen();
    activeVideoStage=stage;stage.classList.add('video-force-fullscreen');document.body.classList.add('video-fullscreen-open');
    try{if(!document.fullscreenElement&&!document.webkitFullscreenElement){if(stage.requestFullscreen)await stage.requestFullscreen({navigationUI:'hide'});else if(stage.webkitRequestFullscreen)stage.webkitRequestFullscreen();}}catch(e){}
  }
  function bindVideoScreenControls(stage){stage.querySelectorAll('[data-video-screen]').forEach(btn=>btn.onclick=e=>{e.preventDefault();e.stopPropagation();enterVideoFullscreen(stage);});}
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&activeVideoStage)exitVideoFullscreen(false);});
  document.addEventListener('webkitfullscreenchange',()=>{if(!document.webkitFullscreenElement&&!document.fullscreenElement&&activeVideoStage)exitVideoFullscreen(false);});

  function bindLocalTutorialVideos(root=document){
    root.querySelectorAll('.local-video').forEach(card=>{
      const btn=card.querySelector('.local-video-play'),stage=card.querySelector('.local-video-stage');
      if(!btn||btn.dataset.bound)return;btn.dataset.bound='1';
      btn.addEventListener('click',()=>{
        if(card.classList.contains('playing')||!stage)return;
        const bvid=card.dataset.bvid;
        if(!/^BV[0-9A-Za-z]{10}$/.test(bvid||'')){toast('视频地址无效');return;}
        card.classList.add('playing');
        stage.innerHTML=`<div class="video-loading" aria-live="polite"><span></span>正在加载视频…</div><iframe class="bilibili-player" title="${esc(exercise(card.dataset.localVideo).name)}视频讲解" src="https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&page=1&autoplay=1&danmaku=0&high_quality=1" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${videoScreenControlsHTML()}`;
        const frame=stage.querySelector('.bilibili-player');
        frame.addEventListener('load',()=>{stage.querySelector('.video-loading')?.remove();},{once:true});
        setTimeout(()=>stage.querySelector('.video-loading')?.remove(),8000);
        bindVideoScreenControls(stage);
      });
    });
  }

  function numberedList(items,kind='blue'){return `<div class="learn-list ${kind}">${(items||[]).map((x,i)=>`<div class="learn-item"><span>${i+1}</span><p>${esc(String(x).replace(/^\s*[❌✖✕×]\s*/u,''))}</p></div>`).join('')}</div>`;}
  function resetTutorialScroll(){
    // .modal-sheet is the real scrolling element. iOS may restore it after the dialog opens,
    // so reset again after layout and media hydration settle.
    resetModalScroll();
    requestAnimationFrame(()=>{resetModalScroll();requestAnimationFrame(resetModalScroll);});
    setTimeout(resetModalScroll,50);
    setTimeout(resetModalScroll,180);
  }
  function showTutorial(id){
    const ex=exercise(id);modal.classList.add('tutorial-mode');
    if(modal.open){resetModalScroll();modal.close();}
    suspendGymVisuals(main);
    openModal(ex.name,`<div class="learn-stack"><section class="learn-card navy"><div class="learn-no blue">01</div><h2>3D 动图</h2><p class="learn-desc">循环查看完整动作轨迹。</p><div class="learn-media white">${exerciseVisual(ex,{priority:true})}</div></section><section class="learn-card navy"><div class="learn-no blue">02</div><h2>视频讲解</h2><p class="learn-desc">短、直接，训练时快速复习动作重点。</p>${videoHTML(ex)}</section><section class="learn-card navy"><div class="learn-no blue">03</div><h2>动作要点</h2>${numberedList(ex.tips,'blue')}</section><section class="learn-card navy"><div class="learn-no orange">04</div><h2>常见错误</h2>${numberedList(ex.mistakes,'orange')}</section><section class="learn-card navy"><div class="learn-no orange">05</div><h2>训练肌群图</h2><p class="learn-desc">红色为主要训练肌群，橙色为辅助训练肌群。</p><div class="learn-media heat">${muscleMap(ex)}</div></section></div>`);
    resetTutorialScroll();
    hydrateGymVisuals(modalBody).finally(resetTutorialScroll);
    bindLocalTutorialVideos(modalBody);
  }

  function showWorkoutDetail(id){
    const w=state.workouts.find(x=>x.id===id); if(!w)return; openModal(w.name,`<div class="card"><div class="stat-row"><span>日期</span><strong>${formatDateTime(w.endedAt)}</strong></div><div class="stat-row"><span>训练时间</span><strong>${durationText(new Date(w.endedAt)-new Date(w.startedAt))}</strong></div><div class="stat-row"><span>有效组</span><strong>${workingSets(w)} 组</strong></div><div class="stat-row"><span>训练容量</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">训练内容</div>${(w.exercises||[]).map(e=>`<div class="card flat history-ex"><div class="exercise-thumb">${exerciseVisual(exercise(e.exerciseId))}</div><div><strong>${esc(e.customName || exercise(e.exerciseId).name)}</strong><div class="small muted" style="margin-top:6px">${esc(setSummary(e.sets,exercise(e.exerciseId)))}</div></div></div>`).join('')}</section><button class="secondary-btn danger" style="width:100%" id="delete-workout">删除这次训练</button>`); document.getElementById('delete-workout').onclick=()=>{state.workouts=state.workouts.filter(x=>x.id!==id);saveState();closeModal();render();toast('训练记录已删除');};
  }

  function showRestSetting(){ openModal('默认组间休息',`<div class="form-grid"><div class="field full"><label>秒</label><input id="rest-seconds" type="number" min="30" max="300" step="15" value="${state.settings.restSeconds}"></div></div><button class="primary-btn" style="margin-top:14px" id="save-rest">保存</button>`);document.getElementById('save-rest').onclick=()=>{state.settings.restSeconds=clamp(Number(document.getElementById('rest-seconds').value)||120,30,300);saveState();closeModal();renderMine();}; }
  function exportData(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`train-log-backup-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
  async function importDataFile(file){
    if(!file)return;
    try{
      const text=await file.text(),incoming=JSON.parse(text);
      if(!incoming || !Array.isArray(incoming.workouts) || !Array.isArray(incoming.bodyMetrics))throw new Error('invalid');
      const ok=confirm(`恢复这个备份？\n训练记录：${incoming.workouts.length} 次\n身体记录：${incoming.bodyMetrics.length} 条\n\n当前本机数据会被替换。`);
      if(!ok)return;
      state={...defaultState(),...incoming,version:VERSION};
      if(Array.isArray(incoming.plans)&&incoming.plans.length)PLAN=JSON.parse(JSON.stringify(incoming.plans));
      saveState();render();toast('备份恢复完成');
    }catch(e){toast('备份文件无效或已损坏');}
  }

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
    const started=new Date(Date.now()-60*60000),ended=new Date(); const w={id:uid(),planId:null,name:'快速记录',startedAt:started.toISOString(),endedAt:ended.toISOString(),feeling:4,fatigue:'medium',exercises:entries.map(e=>{if(e.customName){ if(!EXERCISES.find(x=>x.id===e.exerciseId))EXERCISES.push({id:e.exerciseId,name:e.customName,group:'其他',equipment:'自定义',muscles:['其他'],primary:'自定义',secondary:'',tips:[],mistakes:[],rest:'60–120 秒'});}return e;})}; state.workouts.push(w);saveState();closeModal();setPage('history');toast(`已保存 ${entries.length} 个动作`);
  }

  // PWA app-like interaction: block text selection/context menu and browser pinch zoom while preserving inputs.
  document.addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea'))e.preventDefault();});
  document.addEventListener('selectstart',e=>{if(!e.target.closest('input,textarea'))e.preventDefault();});
  document.addEventListener('gesturestart',e=>e.preventDefault(),{passive:false});
  let lastTouchEnd=0;document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastTouchEnd<=300&&!e.target.closest('input,textarea'))e.preventDefault();lastTouchEnd=now;},{passive:false});

  document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setPage(b.dataset.page));
  document.getElementById('modal-close').onclick=closeModal;
  modal.addEventListener('click',e=>{ if(e.target===modal)closeModal(); });

  if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&page==='home')renderHome();});
  scheduleDateRefresh();
  render();
})();
