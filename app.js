(() => {
  'use strict';

  const STORAGE_KEY = 'train-log-state-v1';
  const VERSION = '2.4';

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
    ,{id:'flat_db_press',name:'平板哑铃卧推',group:'胸',equipment:'哑铃',muscles:['胸','三头','肩'],primary:'胸大肌',secondary:'肱三头肌、前三角',tips:['肩胛后缩下沉','哑铃沿胸部两侧稳定下放','推起时保持前臂接近垂直'],mistakes:['肩部前顶','哑铃碰撞','下放失控'],rest:'2–3 分钟'}
    ,{id:'decline_press',name:'下斜卧推',group:'胸',equipment:'杠铃/哑铃',muscles:['胸','三头'],primary:'胸大肌下部',secondary:'肱三头肌',tips:['固定肩胛','控制下放','稳定推起'],mistakes:['弹胸','肩膀前顶','重量过大'],rest:'2–3 分钟'}
    ,{id:'chest_dip',name:'双杠臂屈伸（胸）',group:'胸',equipment:'自重',muscles:['胸','三头'],primary:'胸大肌',secondary:'肱三头肌、前三角',tips:['身体略前倾','肩胛保持稳定','在肩部舒适范围下降'],mistakes:['耸肩','下降过深','摆动借力'],rest:'2–3 分钟'}
    ,{id:'deadlift',name:'传统硬拉',group:'背',equipment:'杠铃',muscles:['背','腿','臀'],primary:'后链肌群',secondary:'背阔肌、前臂',tips:['杠铃贴近小腿','背部保持中立','脚蹬地与伸髋同步'],mistakes:['弓背','杠铃离身体过远','顶端过度后仰'],rest:'2–4 分钟'}
    ,{id:'barbell_row',name:'杠铃俯身划船',group:'背',equipment:'杠铃',muscles:['背','二头'],primary:'背阔肌、上背',secondary:'肱二头肌',tips:['髋部后移稳定躯干','杠铃拉向腹部','控制下放'],mistakes:['身体甩动','耸肩','腰背失稳'],rest:'2–3 分钟'}
    ,{id:'one_arm_db_row',name:'单臂哑铃划船',group:'背',equipment:'哑铃',muscles:['背','二头'],primary:'背阔肌',secondary:'上背、肱二头肌',tips:['躯干稳定','肘向髋部方向拉','顶端短暂停顿'],mistakes:['扭转身体','耸肩','用手臂硬拉'],rest:'90–150 秒'}
    ,{id:'tbar_row',name:'T杠划船',group:'背',equipment:'T杠/器械',muscles:['背','二头'],primary:'上背、背阔肌',secondary:'肱二头肌',tips:['胸椎稳定','肘部向后拉','回程控制'],mistakes:['腰部摆动','耸肩','拉程过短'],rest:'2–3 分钟'}
    ,{id:'face_pull',name:'绳索面拉',group:'肩',equipment:'绳索',muscles:['肩','背'],primary:'三角肌后束',secondary:'肩袖、上背',tips:['拉向眉眼高度','肘部向外打开','肩胛稳定'],mistakes:['身体后仰','耸肩','重量过大'],rest:'60–120 秒'}
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
    {id:'incline_twist_crunch',name:'上斜卷腹转体',group:'腹',equipment:'上斜凳',muscles:['腹'],primary:'腹直肌、腹斜肌',secondary:'髋屈肌群',tips:['固定下肢并保持骨盆稳定','卷起时加入小幅躯干旋转','左右交替并控制回程'],mistakes:['大幅扭腰','用手拉头','只转肩不收腹'],rest:'45–90 秒'},
    {id:'weighted_russian_twist',name:'负重俄罗斯转体',group:'腹',equipment:'哑铃/杠铃片',muscles:['腹'],primary:'腹斜肌',secondary:'腹直肌、髋屈肌群',tips:['躯干微后倾并收紧核心','负重在身体两侧可控移动','骨盆尽量保持稳定'],mistakes:['只甩手不转躯干','含胸塌腰','重量过大导致失控'],rest:'45–90 秒'},
    {id:'hammer_one_arm_row',name:'单手悍马机划船',group:'背',equipment:'悍马机',muscles:['背','二头'],primary:'背阔肌、上背',secondary:'肱二头肌、三角肌后束',tips:['胸部贴稳靠垫','先让肩胛下沉再把肘部拉向后方','顶端停顿后控制回程'],mistakes:['身体旋转借力','耸肩','用手臂硬拽'],rest:'90–150 秒'},
    {id:'assisted_pullup',name:'引体向上辅助',group:'背',equipment:'辅助引体机',muscles:['背','二头'],primary:'背阔肌',secondary:'肱二头肌、前臂',tips:['选择能完成标准全程的辅助重量','先下沉肩胛再屈肘上拉','控制下降到手臂接近伸直'],mistakes:['耸肩','摆动身体','辅助过大导致背部不发力'],rest:'90–150 秒'},
    {id:'goblet_squat',name:'哑铃酒杯深蹲',group:'腿',equipment:'哑铃',muscles:['腿','臀'],primary:'股四头肌、臀大肌',secondary:'核心、内收肌',tips:['哑铃贴近胸前','膝盖与脚尖方向一致','保持全脚掌受力下蹲'],mistakes:['脚跟抬起','膝盖内扣','身体过度前倾'],rest:'90–150 秒'},
    {id:'reverse_hack_squat',name:'俯卧反向哈克深蹲',group:'腿',equipment:'哈克机',muscles:['腿','臀'],primary:'臀大肌、股四头肌',secondary:'腘绳肌',tips:['面向器械站稳，肩背贴靠垫','髋膝同时屈曲下降','脚掌稳定推起并充分伸髋'],mistakes:['腰背松散','膝盖内扣','下降过快'],rest:'2–3 分钟'},
    {id:'triceps_rope_overhead',name:'绳索过顶臂屈伸',group:'三头',equipment:'绳索',muscles:['三头'],primary:'肱三头肌长头',secondary:'核心',tips:['上臂尽量固定','肘部朝前上方','伸肘到底后控制回程'],mistakes:['肘部外张','腰椎反弓','身体前后摆动'],rest:'60–120 秒'},
    {id:'triceps_kickback',name:'哑铃俯身臂屈伸',group:'三头',equipment:'哑铃',muscles:['三头'],primary:'肱三头肌',secondary:'后肩',tips:['上臂抬到与躯干接近一线并固定','只通过伸肘把哑铃向后送','顶端夹紧三头后慢慢回程'],mistakes:['上臂上下摆动','重量过大甩动','含胸弓背'],rest:'60–90 秒'},
    {id:'bench_dip',name:'凳上臂屈伸',group:'三头',equipment:'训练凳',muscles:['三头'],primary:'肱三头肌',secondary:'胸大肌、三角肌前束',tips:['双手稳定撑在凳沿','肩部保持下沉并控制下降幅度','伸肘回到起始位置'],mistakes:['肩膀前顶','下降过深','身体离凳过远'],rest:'60–120 秒'},
    {id:'single_arm_pushdown',name:'单臂绳索下压',group:'三头',equipment:'绳索',muscles:['三头'],primary:'肱三头肌',secondary:'前臂',tips:['上臂贴近身体固定','单侧伸肘到底并停顿','左右使用相同节奏'],mistakes:['肩膀内旋代偿','身体侧倾','上臂前后摆动'],rest:'60–90 秒'}
  );


  // V2.4 全动作实用讲解：保留原 UI，只升级文字内容。
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
      '坐稳后先锁住大腿垫，脚掌踩实；握距略宽于肩，胸口轻抬，核心收紧，身体只允许轻微后倾。',
      '起始先做“肩胛下沉”：不要急着弯肘，先把肩膀远离耳朵，让背阔肌进入受力状态。',
      '随后把肘部向身体两侧、向下拉，想象“肘去找裤兜”，把杆拉向锁骨下方/上胸位置。',
      '最低点停 0.5–1 秒，胸口保持抬起，肩膀不要前顶；不要为了碰胸把身体大幅后仰。',
      '回程慢慢伸直手臂，让肩胛自然上旋，感受背阔肌被拉长；但不要完全松肩、让配重猛撞。'
    ],mistakes:[
      '❌ 拉到颈后：会迫使肩关节进入不自然位置，直接改为拉向上胸。',
      '❌ 身体后仰太多变成“半划船”：重量通常过大，应减重后让躯干更稳定。',
      '❌ 全程只弯手肘：先做肩胛下沉，再让肘部向下走，背部发力会更明显。',
      '❌ 耸肩、头往前伸、手腕折弯；这些都会让斜方肌上束和前臂抢力。',
      '回程不要直接放掉配重；最上方仍保持核心稳定和肩关节可控。'
    ]},
    face_pull:{tips:[
      '滑轮调到鼻子到额头高度，使用绳索；站稳后核心收紧，身体可轻微后倾，但不要用体重向后倒。',
      '先让肩胛保持稳定，再把绳索拉向眉眼/额头区域；肘部向外打开，前臂在末端尽量与地面接近水平。',
      '末端想象把绳索两端拉到耳朵两侧，同时做轻微外旋，重点感受三角肌后束和肩袖。',
      '顶端停 1 秒，肩膀保持远离耳朵；回程缓慢伸直手臂，让后肩充分拉长。',
      '重量宁轻勿重，面拉的目标是轨迹和肩胛控制，不是追求大重量。'
    ],mistakes:[
      '❌ 把绳索拉到胸口：会更像高位划船，失去面拉对后肩和肩袖的刺激。',
      '❌ 身体大幅后仰借力：说明重量过大，应立即减重。',
      '❌ 耸肩、肘部下沉：肘应向外打开，肩膀始终保持下沉。',
      '❌ 回程过快或肩膀完全被拉向前；全程保持肩胛可控。',
      '❌ 手腕向内折、绳索两端没有拉开，会让动作末端外旋不足。'
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
  const GYM_QUERY={bench_press:'barbell bench press',incline_db_press:'dumbbell incline bench press',incline_machine_press:'lever incline chest press',pec_deck:'lever seated fly',cable_fly:'cable middle fly',triceps_pushdown:'cable pushdown',overhead_triceps:'cable overhead triceps extension',lateral_raise:'dumbbell lateral raise',pullup:'pull-up',lat_pulldown:'cable lat pulldown',machine_row:'lever seated row',cable_row:'cable seated row',reverse_pec_deck:'lever seated reverse fly',barbell_curl:'barbell curl',hammer_curl:'dumbbell hammer curl',smith_shoulder_press:'smith shoulder press',reverse_fly:'dumbbell reverse fly',hack_squat:'sled hack squat',rdl:'barbell romanian deadlift',leg_curl:'lever lying leg curl',calf_raise:'standing calf raise',hanging_leg_raise:'hanging leg raise',cable_crunch:'cable kneeling crunch',incline_press_any:'dumbbell incline bench press',pulldown_any:'cable lat pulldown',crunch_combo:'crunch',machine_press:'lever chest press',bulgarian_split_squat:'split squat',biceps_curl:'dumbbell biceps curl',triceps_pressdown:'cable pushdown',front_raise:'barbell front raise',barbell_shoulder_press:'barbell standing wide military press',shrug:'dumbbell shrug',flat_db_press:'dumbbell bench press',decline_press:'barbell decline bench press',chest_dip:'chest dip',deadlift:'barbell deadlift',barbell_row:'barbell bent over row',one_arm_db_row:'dumbbell one arm bent-over row',tbar_row:'t-bar row',face_pull:'cable standing face pull with rope',arnold_press:'dumbbell arnold press',upright_row:'cable upright row',back_squat:'barbell full squat',leg_press:'sled 45 leg press',leg_extension:'lever leg extension',preacher_curl:'barbell preacher curl',cable_curl:'cable curl',skull_crusher:'barbell lying triceps extension',close_grip_bench:'barbell close-grip bench press',plank:'front plank',wrist_curl:'barbell wrist curl',treadmill_run:'run',incline_walk:'walking on incline treadmill',elliptical:'walk elliptical cross trainer',stationary_bike:'stationary bike run',stair_climber:'walking on stepmill',db_shoulder_press:'dumbbell seated shoulder press',machine_crunch:'lever seated crunch',sit_up:'3/4 sit-up',leg_raise:'lying leg raise flat bench',butterfly_crunch:'3/4 sit-up',lying_leg_raise:'lying leg raise flat bench',incline_twist_crunch:'twisting crunch',weighted_russian_twist:'weighted russian twist',hammer_one_arm_row:'lever one arm bent over row',assisted_pullup:'assisted pull-up',goblet_squat:'dumbbell goblet squat',reverse_hack_squat:'sled hack squat',triceps_rope_overhead:'cable overhead triceps extension',triceps_kickback:'dumbbell kickback',bench_dip:'bench dip',single_arm_pushdown:'cable one arm tricep pushdown'};
  const GYM_DIRECT={bench_press:'videos/0025-EIeI8Vf.gif',back_squat:'videos/0043-qXTaZnJ.gif',pullup:'videos/0652-lBDjFxJ.gif',lateral_raise:'videos/0334-DsgkuIt.gif',db_shoulder_press:'videos/0405-znQUdHY.gif',reverse_pec_deck:'videos/0602-myfUsKf.gif',elliptical:'videos/2141-rjtuP6X.gif',sit_up:'videos/0001-2gPfomN.gif',machine_crunch:'videos/1452-Wgaz7pm.gif',barbell_shoulder_press:'videos/1457-Kyd9Rz5.gif',assisted_pullup:'videos/0017-kiJ4Z2K.gif',leg_raise:'videos/0620-WhuFnR7.gif',lying_leg_raise:'videos/0620-WhuFnR7.gif',goblet_squat:'videos/1760-yn8yg1r.gif',leg_extension:'videos/0585-my33uHU.gif'};
  const GYM_GROUP_FALLBACK={胸:'videos/0025-EIeI8Vf.gif',背:'videos/0652-lBDjFxJ.gif',肩:'videos/0334-DsgkuIt.gif',腿:'videos/0043-qXTaZnJ.gif',臀:'videos/0043-qXTaZnJ.gif',二头:'videos/0405-znQUdHY.gif',三头:'videos/0025-EIeI8Vf.gif',腹:'videos/0001-2gPfomN.gif',小腿:'videos/0043-qXTaZnJ.gif',有氧:'videos/2141-rjtuP6X.gif'};
  const GYM_MAP_KEY='train-log-gym-media-map-v24';let persistedGymMap={};try{persistedGymMap=JSON.parse(localStorage.getItem(GYM_MAP_KEY)||'{}')||{};}catch(e){}const saveGymMap=()=>{try{localStorage.setItem(GYM_MAP_KEY,JSON.stringify(persistedGymMap));}catch(e){}};
  const VIDEO_MAP={};
  let gymIndexPromise=null; const gymCache={};
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
  if(Array.isArray(state.plans)&&state.plans.length) PLAN=state.plans; else state.plans=PLAN;
  let page = 'home';
  let timerInterval = null;
  let restRemaining = 0;
  let activeExerciseFilter = '全部';
  let historyMode = 'list';
  let dataTab = 'body';
  let dietBatch = 0;
  let dietMode = state.settings.dietMode || 'training';
  let pendingFreeWorkout=false;

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
  function allExercises(){return [...EXERCISES,...(state?.customExercises||[])];}
  function exercise(id){ return allExercises().find(x=>x.id===id) || {id,name:id,group:'其他',muscles:['其他'],primary:'其他',secondary:'',tips:[],mistakes:[],rest:'60–120 秒'}; }
  function planById(id){ return PLAN.find(p=>p.id===id); }
  function formatDate(dateStr){ if(!dateStr)return ''; const d=new Date(`${dateStr}T00:00:00`); return `${d.getMonth()+1}月${d.getDate()}日`; }
  function formatDateTime(ts){ const d=new Date(ts); return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function durationText(ms){ const min=Math.max(1,Math.round(ms/60000)); if(min<60)return `${min} 分钟`; return `${Math.floor(min/60)}小时 ${min%60}分钟`; }
  function sinceText(ts){ if(!ts)return '暂无训练记录'; const ms=Date.now()-new Date(ts).getTime(); const h=Math.max(0,Math.floor(ms/3600000)); if(h<1)return `${Math.floor(ms/60000)} 分钟`; if(h<24)return `${h} 小时`; return `${Math.floor(h/24)}天 ${h%24}小时`; }
  function loadState(){ try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw){ const s=JSON.parse(raw); return {...defaultState(),...s}; } }catch(e){} return defaultState(); }
  function saveState(){ state.meta=state.meta||{};state.meta.updatedAt=new Date().toISOString();state.plans=PLAN;localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }

  function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toastEl._t); toastEl._t=setTimeout(()=>toastEl.classList.remove('show'),1800); }
  function openModal(title,html){ modalTitle.textContent=title; modalBody.innerHTML=html; modalBody.scrollTop=0; modal.showModal(); requestAnimationFrame(()=>{modalBody.scrollTop=0;hydrateGymVisuals(modalBody);}); }
  function closeModal(){ modal.classList.remove('tutorial-mode'); if(modal.open)modal.close(); if(pendingFreeWorkout && state.activeWorkout?.planId===null && !(state.activeWorkout.exercises||[]).length){state.activeWorkout=null;pendingFreeWorkout=false;saveState();if(page==='training')renderTraining();} }

  function setPage(next){ page=next; document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page)); render(); window.scrollTo({top:0,behavior:'instant'}); }

  function latestWorkout(){ return [...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt))[0] || null; }
  function nextPlan(){ const last=latestWorkout(); if(!last || !last.planId)return PLAN[0]; const idx=PLAN.findIndex(p=>p.id===last.planId); return PLAN[(idx+1)%PLAN.length]; }
  function totalVolume(w){ return round((w.exercises||[]).flatMap(e=>e.sets||[]).filter(s=>s.done&&!s.warmup).reduce((sum,s)=>sum+(Number(s.weight)||0)*(Number(s.reps)||0)+(s.drops||[]).reduce((a,d)=>a+(Number(d.weight)||0)*(Number(d.reps)||0),0),0),0); }
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
    document.getElementById('topbar-subtitle').textContent = ({home:'私人训练日志',training:'计划与训练',exercises:'动作教学',history:'训练历史',mine:'身体数据与饮食'})[page];
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
        <div class="section-head"><div class="section-title">本周</div><button class="section-link" data-go="history">训练历史</button></div>
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
      <div class="page-title">训练</div><div class="page-subtitle">训练计划和当天训练合在一起，按第 1 → 4 练循环，不绑定星期几。</div>
      <div class="card current-plan"><div class="small muted">建议下一练</div><h2>${esc(next.name)}</h2><div class="small muted">${next.exercises.length} 个动作 · 第 ${next.index} 练</div><button class="primary-btn" style="margin-top:14px" data-start-plan="${next.id}">开始训练</button><button class="secondary-btn neutral free-training-btn" style="margin-top:9px;width:100%" id="free-workout-btn">＋ 自由训练</button></div>
      <section class="section"><div class="section-head"><div class="section-title">四练计划</div></div>${PLAN.map(p=>`<div class="card plan-card"><div class="plan-top"><div class="plan-day">${p.index}</div><div class="plan-info"><strong>${esc(p.name)}</strong><small>${p.exercises.length} 个动作 · ${esc(p.note)}</small></div></div><div class="plan-actions"><button class="secondary-btn neutral" data-view-plan="${p.id}">查看动作</button><button class="secondary-btn" data-start-plan="${p.id}">开始训练</button></div></div>`).join('')}</section>
      <section class="section"><div class="section-head"><div class="section-title">最近训练</div><button class="section-link" data-go="history">查看全部</button></div>${history.length?history.slice(0,3).map(historyItem).join(''):'<div class="card empty">还没有训练记录</div>'}</section>`;
    bindCommon();
    document.querySelectorAll('[data-view-plan]').forEach(b=>b.onclick=()=>showPlan(b.dataset.viewPlan));
    document.getElementById('free-workout-btn').onclick=startFreeWorkout;
  }

  function renderExercisesPage(){
    main.innerHTML=`<div class="page-title">动作</div><div class="page-subtitle">力量 + 有氧动作库；每个动作都可查看 3D 动图、视频讲解、动作要点、常见错误和训练肌群图。</div>${exerciseLibraryHTML()}`;
    bindExerciseLibrary();
  }

  function renderHistoryPage(){
    const history=[...state.workouts].sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    main.innerHTML=`<div class="page-title">历史</div><div class="page-subtitle">列表和日历两种方式查看训练。</div>
      <div class="tabs"><button class="tab ${historyMode==='list'?'active':''}" data-history-mode="list">列表</button><button class="tab ${historyMode==='calendar'?'active':''}" data-history-mode="calendar">日历</button></div>
      <div id="history-content">${historyMode==='list'?(history.length?`<div class="list">${history.map(historyItem).join('')}</div>`:'<div class="card empty">暂无训练历史</div>'):calendarHTML(history)}</div>`;
    document.querySelectorAll('[data-history-mode]').forEach(b=>b.onclick=()=>{historyMode=b.dataset.historyMode;renderHistoryPage();});
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
    document.querySelectorAll('[data-cal-date]').forEach(b=>b.onclick=()=>showCalendarDay(b.dataset.calDate));
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
      <div class="page-title">我的</div><div class="page-subtitle">身体数据、力量趋势、饮食推荐和设置。</div>
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
      c.innerHTML=`<div class="card"><div class="tabs"><button class="tab ${dietMode==='training'?'active':''}" data-diet="training">训练日</button><button class="tab ${dietMode==='rest'?'active':''}" data-diet="rest">休息日</button></div>${dietHTML(dietMode)}</div>`;document.querySelectorAll('[data-diet]').forEach(b=>b.onclick=()=>{dietMode=b.dataset.diet;state.settings.dietMode=dietMode;saveState();renderMine();});document.getElementById('shuffle-diet').onclick=()=>{dietBatch=(dietBatch+1)%DIET_MENUS.length;renderMine();};
    } else {
      c.innerHTML=`<section class="section"><div class="card"><div class="stat-row"><span>默认组间休息</span><button class="pill blue" id="rest-setting">${state.settings.restSeconds} 秒</button></div><div class="stat-row"><span>训练记录</span><strong>${state.workouts.length} 次</strong></div><div class="stat-row"><span>数据保存</span><strong>本机保存</strong></div></div></section><div class="backup-grid"><button class="primary-btn" id="export-btn">一键备份</button><button class="secondary-btn neutral" id="import-btn">一键恢复</button></div><input id="import-file" type="file" accept="application/json,.json" hidden><div class="note" style="margin-top:12px">数据保存在当前手机。建议每周或重要训练后点一次“一键备份”，换手机或清理浏览器数据后可用备份文件一键恢复。</div>`;document.getElementById('rest-setting').onclick=showRestSetting;document.getElementById('export-btn').onclick=exportData;document.getElementById('import-btn').onclick=()=>document.getElementById('import-file').click();document.getElementById('import-file').onchange=e=>importDataFile(e.target.files?.[0]);
    }
    if(c && !c.innerHTML.trim()){dataTab='body';setTimeout(()=>{if(page==='mine')renderMine();},0);}
  }

  const DIET_MENUS=[
    {breakfast:'鸡蛋2个 + 燕麦牛奶碗 + 香蕉',lunch:'黑椒鸡腿饭 + 西兰花胡萝卜',snack:'希腊酸奶 + 香蕉/饭团',dinner:'番茄牛肉饭 + 清炒时蔬'},
    {breakfast:'全麦吐司鸡蛋三明治 + 牛奶',lunch:'照烧鸡胸饭 + 菠菜菌菇',snack:'酸奶 + 面包 + 乳清（蛋白不足时）',dinner:'清蒸鱼 + 米饭 + 炒青菜'},
    {breakfast:'燕麦鸡蛋饼 + 牛奶 + 苹果',lunch:'土豆炖牛肉 + 米饭 + 生菜',snack:'香蕉 + 无糖酸奶',dinner:'虾仁炒蛋 + 米饭 + 西兰花'},
    {breakfast:'鸡蛋2个 + 豆浆 + 全麦面包 + 香蕉',lunch:'香煎牛排/瘦牛肉 + 米饭 + 彩椒',snack:'饭团 + 牛奶',dinner:'鸡胸肉意面 + 大份蔬菜'}
  ];
  function dietHTML(mode){
    const d=DIET[mode], menu=DIET_MENUS[dietBatch%DIET_MENUS.length];
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
    const s=document.getElementById('exercise-search'); if(s)s.oninput=()=>{ const q=s.value.trim().toLowerCase(); document.getElementById('exercise-list').innerHTML=allExercises().filter(e=>(activeExerciseFilter==='全部'||e.group===activeExerciseFilter)&&e.name.toLowerCase().includes(q)).map(exerciseListItem).join('')||'<div class="empty">没有找到这个动作</div>'; document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial)); };
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

  function exerciseVisual(ex){const direct=GYM_DIRECT[ex.id]||persistedGymMap[ex.id]||'';const src=direct?`${GYM_BASE}/${String(direct).replace(/^\.\//,'')}`:'';return `<div class="gym-media-shell"><img class="gym-gif" data-gym-id="${ex.id}" ${src?`src="${src}"`:''} alt="${esc(ex.name)}" loading="lazy" decoding="async" draggable="false"><span class="gym-loading">动作加载中</span></div>`;}
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
  function attachGymSources(img,path){const rel=String(path||'').replace(/^\.\//,'');if(!rel)return;const sources=[`${GYM_BASE}/${rel}`,`https://cdn.statically.io/gh/hasaneyldrm/exercises-dataset/${GYM_SHA}/${rel}`,`https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/${GYM_SHA}/${rel}`];let i=0;img.classList.remove('no-media');img.onload=()=>img.closest('.gym-media-shell')?.classList.add('loaded');img.onerror=()=>{i++;if(i<sources.length)setTimeout(()=>img.src=sources[i],250*i);else{img.classList.add('no-media');img.closest('.gym-media-shell')?.classList.add('failed');}};img.src=sources[0];}
  async function hydrateGymVisuals(root=document){const imgs=[...root.querySelectorAll('img.gym-gif:not([data-hydrated])')];await Promise.all(imgs.map(async img=>{img.dataset.hydrated='1';const ex=exercise(img.dataset.gymId),rec=await gymRecord(ex);const path=rec?.gif_url||rec?.video||rec?.gif||(rec?.media_id?`videos/${rec.media_id}.gif`:'');if(path)attachGymSources(img,path);else img.closest('.gym-media-shell')?.classList.add('failed');}));}
  function canonicalMuscles(text=''){const t=text;const out=[];const add=x=>{if(!out.includes(x))out.push(x)};if(/胸|上胸/.test(t))add('胸大肌');if(/背阔|背/.test(t))add('背阔肌');if(/斜方/.test(t))add('斜方肌');if(/三角肌前|前三角/.test(t))add('三角肌前束');if(/三角肌中|中束/.test(t))add('三角肌中束');if(/三角肌后|后肩/.test(t))add('三角肌后束');if(/肱二头|二头/.test(t))add('肱二头肌');if(/肱三头|三头/.test(t))add('肱三头肌');if(/前臂|肱桡/.test(t))add('前臂肌群');if(/腹直|核心|腹/.test(t))add('腹直肌');if(/股四头/.test(t))add('股四头肌');if(/腘绳/.test(t))add('腘绳肌群');if(/臀大|臀/.test(t))add('臀大肌');if(/腓肠|比目鱼|小腿/.test(t))add('腓肠肌');return out;}
  function muscleMap(ex){
    const pri=canonicalMuscles(ex.primary||ex.group),sec=canonicalMuscles(ex.secondary||'').filter(x=>!pri.includes(x)),all=new Set([...pri,...sec]);
    const col=n=>pri.includes(n)?'#ff1f26':sec.includes(n)?'#ff9f1a':'transparent',txt=n=>pri.includes(n)?'#e71920':'#ef8d00';
    const frontShapes={
      '胸大肌':'M246 103 Q285 82 324 103 L318 135 Q285 150 252 135Z',
      '上胸':'M248 102 Q285 84 322 102 L316 119 Q285 130 254 119Z',
      '三角肌前束':'M232 94 Q246 78 257 91 L254 126 237 136Z M313 91 Q324 78 338 94 L333 136 316 126Z',
      '三角肌中束':'M230 93 Q244 78 257 92 L252 130 234 138Z M313 92 Q326 78 340 93 L336 138 318 130Z',
      '肱二头肌':'M218 134 L235 132 230 183 214 181Z M340 132 L357 134 361 181 345 183Z',
      '前臂肌群':'M215 181 L231 184 226 213 211 207Z M344 184 L360 181 364 207 349 213Z',
      '腹直肌':'M268 143 Q285 136 302 143 L301 211 Q285 220 269 211Z',
      '腹斜肌':'M252 145 L270 147 267 211 250 202Z M300 147 L318 145 320 202 303 211Z',
      '股四头肌':'M252 215 L281 218 276 320 249 316Z M289 218 L318 215 321 316 294 320Z',
      '胫骨前肌':'M254 323 L274 325 268 397 252 397Z M296 325 L316 323 318 397 302 397Z',
      '腓肠肌':'M253 327 L275 329 269 395 252 395Z M295 329 L317 327 319 395 302 395Z'
    };
    const backShapes={
      '斜方肌':'M455 95 Q495 77 535 95 L527 150 Q495 163 463 150Z',
      '三角肌后束':'M447 93 Q460 78 473 92 L470 132 452 139Z M517 92 Q530 78 543 93 L538 139 520 132Z',
      '背阔肌':'M457 126 L479 136 476 205 452 187Z M511 136 L533 126 538 187 514 205Z',
      '菱形肌':'M478 111 L495 96 512 111 505 151 485 151Z',
      '肱三头肌':'M418 136 L435 133 430 184 414 182Z M555 133 L572 136 576 182 560 184Z',
      '臀大肌':'M465 200 Q495 182 525 200 L524 242 Q495 255 466 242Z',
      '腘绳肌群':'M464 244 L492 244 489 319 462 316Z M498 244 L526 244 528 316 501 319Z',
      '腓肠肌':'M464 322 L489 324 484 397 464 397Z M501 324 L526 322 527 397 507 397Z'
    };
    const shapeSvg=(obj)=>Object.entries(obj).filter(([n])=>all.has(n)).map(([n,d])=>`<path d="${d}" fill="${col(n)}" stroke="#fff" stroke-width="1.1"/>`).join('');
    const lab=(n,x1,y1,x2,y2,side)=>all.has(n)?`<g><path d="M${x1} ${y1} L${side==='l'?x2+24:x2-24} ${y2} L${x2} ${y2}" fill="none" stroke="${txt(n)}" stroke-width="1.6"/><circle cx="${x1}" cy="${y1}" r="2.8" fill="${txt(n)}"/><text x="${side==='l'?x2-6:x2+6}" y="${y2+5}" text-anchor="${side==='l'?'end':'start'}" font-size="13" font-weight="700" fill="${txt(n)}">${n}</text></g>`:'';
    const labels=[['胸大肌',285,112,118,100,'l'],['上胸',285,108,118,100,'l'],['三角肌前束',242,108,118,76,'l'],['三角肌中束',242,108,118,76,'l'],['肱二头肌',223,156,118,146,'l'],['前臂肌群',220,195,118,194,'l'],['腹直肌',285,176,118,232,'l'],['腹斜肌',258,177,118,232,'l'],['股四头肌',263,266,118,284,'l'],['胫骨前肌',262,356,118,350,'l'],['斜方肌',495,114,642,88,'r'],['三角肌后束',530,112,642,110,'r'],['背阔肌',469,164,642,154,'r'],['菱形肌',495,127,642,140,'r'],['肱三头肌',424,156,642,188,'r'],['臀大肌',495,219,642,224,'r'],['腘绳肌群',514,276,642,278,'r'],['腓肠肌',514,356,642,350,'r']];
    return `<div class="heatmap-wrap formal"><svg viewBox="0 0 760 455" class="heatmap-svg"><rect width="760" height="455" rx="22" fill="#fff"/><image href="assets/body-front-base.png" x="225" y="18" width="120" height="412" preserveAspectRatio="xMidYMid meet"/><image href="assets/body-back-base.png" x="435" y="18" width="122" height="412" preserveAspectRatio="xMidYMid meet"/><g>${shapeSvg(frontShapes)}${shapeSvg(backShapes)}</g>${labels.map(x=>lab(...x)).join('')}</svg><div class="heatmap-legend"><span><i class="red"></i>主要训练肌群</span><span><i class="orange"></i>辅助训练肌群</span><span><i class="gray"></i>非主要肌群</span></div></div>`;
  }

  function videoHTML(ex){
    const tips=(ex.tips||[]).slice(0,3);
    const dur=Math.max(18,Math.min(42,18+tips.length*6));
    return `<div class="local-video" data-local-video="${ex.id}" data-duration="${dur}">
      <div class="local-video-stage">
        <div class="local-video-gif">${exerciseVisual(ex)}</div>
        <div class="local-video-shade"></div>
        <button class="local-video-play" type="button" aria-label="播放中文短视频">▶</button>
        <div class="local-video-caption"><strong>${esc(ex.name)}</strong><span>${esc(tips[0]||'保持动作稳定，控制节奏')}</span></div>
        <div class="local-video-time">00:${String(dur).padStart(2,'0')}</div>
      </div>
      <div class="local-video-note">TRAIN LOG 中文短教学 · ${dur} 秒 · 应用内播放</div>
    </div>`;
  }

  function bindLocalTutorialVideos(root=document){
    root.querySelectorAll('.local-video').forEach(card=>{
      const btn=card.querySelector('.local-video-play'),cap=card.querySelector('.local-video-caption span'),time=card.querySelector('.local-video-time');
      if(!btn||btn.dataset.bound)return;btn.dataset.bound='1';
      const ex=exercise(card.dataset.localVideo),tips=(ex.tips||[]).slice(0,3),total=Number(card.dataset.duration)||24;
      btn.onclick=()=>{
        if(card._timer){clearInterval(card._timer);card._timer=null;btn.textContent='▶';card.classList.remove('playing');return;}
        card.classList.add('playing');btn.textContent='Ⅱ';let left=total,idx=0;if(cap)cap.textContent=tips[0]||'保持动作稳定，控制节奏';if(time)time.textContent=`00:${String(left).padStart(2,'0')}`;
        card._timer=setInterval(()=>{left--;if(time)time.textContent=`00:${String(Math.max(0,left)).padStart(2,'0')}`;const next=Math.floor((total-left)/(total/Math.max(1,tips.length)));if(tips.length&&next!==idx&&next<tips.length){idx=next;cap.textContent=tips[idx];}if(left<=0){clearInterval(card._timer);card._timer=null;btn.textContent='↻';card.classList.remove('playing');}},1000);
      };
    });
  }

  function numberedList(items,kind='blue'){return `<div class="learn-list ${kind}">${(items||[]).map((x,i)=>`<div class="learn-item"><span>${i+1}</span><p>${esc(x)}</p></div>`).join('')}</div>`;}
  function showTutorial(id){const ex=exercise(id);modal.classList.add('tutorial-mode');openModal(ex.name,`<div class="learn-stack"><section class="learn-card navy"><div class="learn-no blue">01</div><h2>3D 动图</h2><p class="learn-desc">循环查看完整动作轨迹；右下角可全屏查看。</p><div class="learn-media white zoomable-gym">${exerciseVisual(ex)}<button class="gym-fullscreen-btn" data-gym-fullscreen="${ex.id}" aria-label="全屏查看">↗</button></div></section><section class="learn-card navy"><div class="learn-no blue">02</div><h2>视频讲解</h2><p class="learn-desc">短、直接，训练时快速复习动作重点。</p>${videoHTML(ex)}</section><section class="learn-card navy"><div class="learn-no blue">03</div><h2>动作要点</h2>${numberedList(ex.tips,'blue')}</section><section class="learn-card navy"><div class="learn-no orange">04</div><h2>常见错误</h2>${numberedList(ex.mistakes,'orange')}</section><section class="learn-card navy"><div class="learn-no orange">05</div><h2>训练肌群图</h2><p class="learn-desc">红色为主要训练肌群，橙色为辅助训练肌群。</p><div class="learn-media heat">${muscleMap(ex)}</div></section></div>`);requestAnimationFrame(()=>{modalBody.scrollTop=0;hydrateGymVisuals(modalBody);bindLocalTutorialVideos(modalBody);modalBody.querySelectorAll('[data-gym-fullscreen]').forEach(b=>b.onclick=e=>{e.stopPropagation();openGymFullscreen(b.dataset.gymFullscreen);});});}

  function openGymFullscreen(id){
    const ex=exercise(id),recPath=GYM_DIRECT[ex.id]||persistedGymMap[ex.id]||'';
    const layer=document.createElement('div');layer.className='gym-fullscreen-layer';layer.innerHTML=`<button class="gym-fullscreen-close" aria-label="关闭">×</button><div class="gym-fullscreen-stage"><img class="gym-fullscreen-img" alt="${esc(ex.name)}" draggable="false"></div><div class="gym-fullscreen-hint">双指缩放 · 双击恢复</div>`;document.body.appendChild(layer);
    const img=layer.querySelector('img'),close=()=>layer.remove();layer.querySelector('.gym-fullscreen-close').onclick=close;
    (async()=>{const rec=await gymRecord(ex);const path=rec?.gif_url||recPath;if(path)attachGymSources(img,path);})();
    let scale=1,tx=0,ty=0,startDist=0,startScale=1,startX=0,startY=0,startTx=0,startTy=0;
    const apply=()=>img.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`;
    const dist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
    layer.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=dist(e.touches);startScale=scale;e.preventDefault();}else if(e.touches.length===1&&scale>1){startX=e.touches[0].clientX;startY=e.touches[0].clientY;startTx=tx;startTy=ty;e.preventDefault();}},{passive:false});
    layer.addEventListener('touchmove',e=>{if(e.touches.length===2&&startDist){scale=clamp(startScale*dist(e.touches)/startDist,1,4);apply();e.preventDefault();}else if(e.touches.length===1&&scale>1){tx=startTx+e.touches[0].clientX-startX;ty=startTy+e.touches[0].clientY-startY;apply();e.preventDefault();}},{passive:false});
    layer.addEventListener('touchend',e=>{if(e.touches.length<2)startDist=0;});
    let lastTap=0;layer.addEventListener('touchend',()=>{const n=Date.now();if(n-lastTap<280){scale=1;tx=ty=0;apply();}lastTap=n;});
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
  render();
})();
