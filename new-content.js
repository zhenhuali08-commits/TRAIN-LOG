// V3.5 additions. The original four plans and 73 exercise records stay in app.js.
(() => {
  const rows = [
    // id, group, equipment, primary regions, secondary regions, Gym Visual id, cues, errors
    ['foam_roll_lats','拉伸','泡沫轴','lats','',null,'侧卧，把泡沫轴放在腋下外侧的背阔肌处','小幅缓慢滚动，避开腋窝和肋骨','直接压在腋窝神经血管处','快速碾压或用力过猛'],
    ['quadruped_t_spine_rotation','拉伸','自重','middle_lower_trapezius,rhomboids','obliques',null,'四足跪稳，一手扶后脑勺','胸椎带动手肘向上转，骨盆保持朝地','用腰椎猛转代替胸椎','支撑肩塌陷'],
    ['cat_cow','拉伸','自重','erector_spinae','rectus_abdominis',null,'双手在肩下、双膝在髋下','呼气拱背，吸气缓慢伸展胸椎','只甩动头颈','为了幅度猛折腰'],
    ['band_shoulder_pass_through','拉伸','弹力带','anterior_deltoids,rotator_cuff','chest',null,'双手宽握弹力带，手肘自然伸直','在肩部舒适范围内缓慢绕过头顶','握距太窄硬拉过肩','耸肩或腰部反弓'],
    ['dead_hang_grip','前臂','单杠','forearms','lats',null,'全握单杠，身体自然垂直','先保持肩部可控，再计时悬垂','肩部疼痛仍硬撑','握力衰竭后突然松手'],
    ['weighted_pullup','背','负重带/单杠','lats','biceps,forearms,rhomboids','0841','先能稳定完成自重引体，再逐步加负重','胸口向杆靠近，控制下放','摆腿蹬起借力','加重后动作幅度明显缩水'],
    ['reverse_grip_cable_pulldown','背','绳索','lats','biceps,forearms','0245','反握把手，胸口略抬','肘部向下后方带动把手靠近上胸','身体大幅后仰','手腕过度折弯'],
    ['reverse_grip_cable_triceps_pushdown','三头','绳索/直杆','triceps','forearms','0207','反握直杆，肘部靠近身体','伸肘下压，顶端停顿后慢慢回程','肩膀向前推杆代替伸肘','手腕后折或甩动躯干'],
    ['dead_bug','腹','自重','rectus_abdominis','obliques,hip_flexors','0276','仰卧收紧腹部，腰背轻贴地','对侧手脚缓慢伸远，骨盆不晃','下肢放太低导致腰离地','同侧手脚一起摆动'],
    ['foam_roll_pecs','拉伸','泡沫轴','chest','anterior_deltoids',null,'侧身把泡沫轴放在胸肌外侧','小范围缓慢放松胸前软组织','直接压锁骨或腋窝','把疼痛当成越痛越有效'],
    ['supine_t_spine_extension','拉伸','泡沫轴','erector_spinae,middle_lower_trapezius','chest',null,'泡沫轴横放上背，双手托住头部','上背缓慢向后伸展，臀部保持着地','把泡沫轴放在腰椎下方','头颈后仰过猛'],
    ['band_shoulder_internal_rotation','肩','弹力带','rotator_cuff','anterior_deltoids',null,'肘屈约 90° 并固定在身体侧边','前臂向腹部内旋，缓慢回到起点','上臂离开身体甩动','用躯干旋转代偿'],
    ['cable_shoulder_external_rotation','肩','绳索','rotator_cuff','rear_deltoids','0235','肘屈约 90° 并贴近身体','前臂缓慢向外旋转，肩膀保持下沉','肘部向外张开','重量太大导致躯干旋转'],
    ['prone_tyw_raise','拉伸','自重','middle_lower_trapezius,rhomboids','rear_deltoids,rotator_cuff',null,'俯卧保持颈背自然，依次摆出 T、Y、W','肩胛向后下轻收，手臂小幅抬离地面','耸肩向耳朵挤','腰部反弓抬起躯干'],
    ['band_high_shoulder_external_rotation','拉伸','弹力带','rotator_cuff','rear_deltoids',null,'双臂抬至肩高、双肘屈约 90°','保持上臂位置，双前臂向后外旋','肘部下掉变成低位肩外旋','腰背反弓借力'],
    ['machine_hanging_leg_raise','腹','悬垂器械','rectus_abdominis','hip_flexors','2963','前臂稳压支撑垫，先固定肩胛','抬腿同时轻卷骨盆，控制下降','只用髋屈肌甩腿','身体来回摆动'],
    ['seated_db_lateral_raise','肩','哑铃','lateral_deltoids','upper_trapezius','0396','坐姿稳住躯干，手肘略弯','向两侧抬到肩高附近，再慢慢下放','借躯干摆动甩起','耸肩抢力'],
    ['kneeling_ab_rollout','腹','健腹轮','rectus_abdominis','lats,obliques','0857','膝盖跪稳，腹部与臀部同时收紧','轮子向前滚到腰背仍能控制的位置','塌腰硬推更远','回程只用手臂拉轮'],
    ['glute_bridge','臀','自重','glutes','hamstrings,rectus_abdominis','3013','仰卧屈膝，脚掌踩稳地面','骨盆微后倾后伸髋，顶端收臀','过度挺腰代替伸髋','脚放得太远导致腿后侧抽筋'],
    ['single_leg_glute_bridge','臀','自重','glutes','hamstrings,obliques','3645','一脚踩地，另一腿伸直','保持骨盆水平，用支撑腿臀部抬髋','骨盆向一侧歪斜','靠腰部反弓抬高'],
    ['machine_hip_thrust','臀','器械','glutes','hamstrings,quads',null,'调整靠垫与髋部位置，双脚踩稳','顶端收臀并保持肋骨下沉','只靠腰椎后仰','脚位让膝盖明显内扣'],
    ['chair_sit_to_stand','腿','椅子/自重','quads,glutes','hamstrings',null,'选择稳定椅子，脚掌与肩同宽','身体稍前倾，从脚底发力站起','借手臂猛推或跌坐','膝盖向内塌'],
    ['chest_supported_row','背','哑铃/上斜凳','lats,rhomboids','rear_deltoids,biceps','0327','胸口贴稳上斜凳，肩膀放松','肘部向后拉，顶端轻收肩胛','胸口离凳甩动','耸肩拉到脖子'],
    ['seated_calf_raise','小腿','器械','calves','', '0594','调整压垫固定大腿，前脚掌踩踏板','脚跟缓慢下降后充分踮起','快速弹动跟腱','只做很小的半程'],
    ['machine_hip_abduction','臀','器械','glutes','', '0597','坐稳并调整挡板贴住大腿外侧','向外打开到舒适范围，再控制合拢','身体后仰甩开挡板','配重回程撞击'],
    ['pause_back_squat','腿','杠铃','quads,glutes','adductors,erector_spinae','0043','下蹲到底部可控位置停顿 1–2 秒','保持腹压与足底稳定后再站起','底部放松塌腰','利用反弹跳过停顿'],
    ['barbell_front_squat','腿','杠铃','quads','glutes,rectus_abdominis','0042','杠铃稳放前三角，肘部朝前抬高','躯干尽量直立，膝盖跟随脚尖','肘部下掉导致杠铃滚落','脚跟抬起或膝盖内扣'],
    ['weighted_plank','腹','负重片','rectus_abdominis,obliques','glutes','2135','先能稳定完成自重平板，再少量加重','负重放在上背，身体保持直线','负重直接压在腰椎','塌腰或抬臀太高'],
    ['cable_lateral_raise','肩','绳索','lateral_deltoids','upper_trapezius','0178','双手交叉握住绳索把手，肩膀自然下沉','手臂沿身体侧面抬至肩高附近','耸肩抢力','躯干摆动甩起'],
    ['single_arm_lat_pulldown','背','绳索','lats','biceps,forearms','3563','单侧肩胛先下沉，身体站稳','肘部向髋侧带动把手下拉','躯干侧弯代偿','只用二头弯曲手臂'],
    ['bodyweight_squat','腿','自重','quads,glutes','adductors',null,'双脚踩稳，膝盖与脚尖方向一致','髋膝一起弯曲下蹲，站起时推地','脚跟离地','膝盖明显内扣'],
    ['standard_pushup','胸','自重','chest','triceps,anterior_deltoids','0662','双手略宽于肩，身体从头到脚成直线','胸部向两手之间下降，再推回','塌腰或抬臀','肘部完全向两侧外翻'],
    ['knee_pushup','胸','自重','chest','triceps,anterior_deltoids','3211','双膝着地，肩髋膝保持一线','胸部缓慢靠近地面，再推回','髋部后移变成跪拜','腰部塌陷'],
    ['incline_pushup','胸','自重/高台','chest','triceps,anterior_deltoids','0493','双手撑稳高台，身体保持直线','胸口靠近台面后推回','台面不稳','耸肩或塌腰'],
    ['prone_reverse_snow_angel','拉伸','自重','middle_lower_trapezius,rhomboids','rear_deltoids',null,'俯卧双臂离地，掌心朝下或朝外','手臂沿身体两侧缓慢画弧到头顶','腰部反弓抬起躯干','耸肩或速度太快'],
    ['bodyweight_reverse_lunge','腿','自重','quads,glutes','hamstrings',null,'一脚后撤并控制双膝弯曲','前脚全掌发力回到站姿','前膝明显内扣','上身摇晃失去平衡'],
    ['bodyweight_good_morning','臀','自重','hamstrings,glutes','erector_spinae',null,'双脚站稳，膝盖略弯','髋部向后推，保持背部自然伸展后站起','弯腰驼背','变成大幅屈膝下蹲'],
    ['bird_dog','腹','自重','rectus_abdominis,obliques','glutes,erector_spinae',null,'四足跪稳，对侧手脚缓慢伸远','骨盆与胸口保持朝地','身体左右摇摆','抬腿过高导致塌腰'],
    ['mountain_climber','腹','自重','rectus_abdominis','hip_flexors,anterior_deltoids','0630','高平板姿势收紧腹部','双腿交替向胸前提膝，呼吸连贯','肩膀垮下去','身体大幅上下弹跳'],
    ['side_plank','腹','自重','obliques','glutes,lateral_deltoids','0705','前臂支撑在肩下，身体侧向成直线','收紧腹斜肌和臀部，保持正常呼吸','臀部下沉','肩膀耸起压迫颈部'],
    ['barbell_hip_thrust','臀','杠铃/长凳','glutes','hamstrings,quads',null,'上背靠凳，杠铃垫好髋部','双脚踩稳，顶端收臀并保持肋骨下沉','用腰椎反弓顶重量','顶端膝盖向内塌'],
    ['worlds_greatest_stretch','拉伸','自重','hip_flexors,adductors','obliques,hamstrings',null,'进入长弓步，手掌撑地','同侧手臂带动胸椎向上旋转，换边重复','前脚脚跟翘起','硬拧腰椎代替胸椎旋转'],
    ['walking_lunge_twist','拉伸','自重','quads,glutes','obliques',null,'向前跨弓步并稳住骨盆','躯干朝前腿一侧缓慢转动，再换腿','前膝内扣','转体时后仰失衡'],
    ['front_back_leg_swing','拉伸','自重','hip_flexors,hamstrings','glutes',null,'手扶固定物，单腿前后摆动','从小幅度开始，骨盆保持正对前方','甩腿过猛','腰部大幅前后摆'],
    ['side_leg_swing','拉伸','自重','adductors,glutes','hip_flexors',null,'手扶固定物，单腿左右摆动','身体保持直立，逐步增加幅度','骨盆跟着扭转','用惯性强行拉到疼痛角度'],
    ['arm_circles','拉伸','自重','anterior_deltoids,lateral_deltoids','rotator_cuff',null,'双臂侧举，小圈逐渐过渡到大圈','顺时针与逆时针都做，肩膀自然下沉','耸肩高速甩臂','肩部疼痛仍扩大幅度'],
    ['standing_trunk_rotation','拉伸','自重','obliques','erector_spinae',null,'双脚站稳，双臂轻放胸前','胸椎带动躯干左右转，骨盆尽量朝前','猛甩腰部','膝盖跟着扭转'],
    ['inchworm','拉伸','自重','hamstrings,rectus_abdominis','anterior_deltoids','3698','屈髋双手走向前方高平板','腹部收紧后手脚缓慢走回','高平板时塌腰','强行锁膝到疼痛'],
    ['hip_90_90_switch','拉伸','自重','glutes,adductors','hip_flexors',null,'坐姿双腿约 90° 弯曲，手可辅助支撑','保持躯干高，双膝缓慢转向另一侧','用腰部猛拧带动','臀部疼痛仍硬压膝盖'],
    ['adductor_rockback','拉伸','自重','adductors','hamstrings',null,'四足跪姿，一腿侧伸并脚掌贴地','髋部缓慢后坐，感受大腿内侧伸展','后坐时腰背塌陷','侧伸腿膝盖扭转'],
    ['knee_to_wall_ankle_mobility','拉伸','自重/墙','calves','quads',null,'脚掌踩稳，脚尖距墙适中','膝盖沿脚尖方向向墙靠近，脚跟不离地','脚跟抬离地面','膝盖向内塌'],
    ['walking_hamstring_sweep','拉伸','自重','hamstrings','calves',null,'一脚向前脚跟着地、脚尖抬起','屈髋让双手沿前腿方向扫过，交替前行','弯腰驼背硬够脚尖','前膝锁死到疼痛'],
    ['wall_calf_stretch','拉伸','墙','calves','', '1377','双手扶墙，一脚后撤，脚跟压地','身体缓慢前移，感受后腿小腿拉伸','后脚脚跟抬起','脚尖向外撇'],
    ['standing_quad_stretch','拉伸','自重','quads','hip_flexors',null,'站稳后握住同侧脚踝','膝盖靠拢，轻收骨盆，感受大腿前侧','腰部过度反弓','强拉脚踝导致膝痛'],
    ['supine_hamstring_stretch','拉伸','自重/拉伸带','hamstrings','calves','1576','仰卧，一腿抬起并扶住大腿或拉伸带','膝盖保持微弯，缓慢靠近身体','骨盆离地','强行锁膝或拉到刺痛'],
    ['half_kneeling_hip_flexor_stretch','拉伸','自重','hip_flexors','quads',null,'半跪姿，先轻收骨盆与臀部','身体小幅前移，感受后侧髋前方拉伸','大幅塌腰前冲','前腿膝盖明显内扣'],
    ['supine_figure_four_stretch','拉伸','自重','glutes','hip_flexors',null,'仰卧把一侧脚踝搭在另一侧大腿上','双手抱住下方大腿，轻轻向胸前靠近','强压上方膝盖','颈肩离地用力'],
    ['butterfly_groin_stretch','拉伸','自重','adductors','hip_flexors','1494','坐姿脚掌相对，背部自然伸展','从髋部轻微前倾，感受大腿内侧','用手猛压膝盖','弓背折腰追求触地'],
    ['doorway_chest_stretch','拉伸','门框','chest','anterior_deltoids',null,'前臂扶门框，肘部在肩附近','身体缓慢前移并微微转开','肩膀前顶到刺痛','扭转腰椎代替胸部打开'],
    ['cross_body_shoulder_stretch','拉伸','自重','rear_deltoids','rotator_cuff',null,'一臂横过胸前，另一臂扶住上臂','肩膀放松，轻拉到肩后侧有牵拉感','直接压肘关节','耸肩或强拉到疼痛'],
    ['overhead_triceps_stretch','拉伸','自重','triceps','lats','0643','一臂屈肘置于头后，另一手轻扶上臂','保持肋骨下沉，感受上臂后侧伸展','猛拽手肘','腰部反弓代偿'],
    ['childs_pose','拉伸','自重','lats,erector_spinae','glutes',null,'跪坐，双手向前伸，臀部向脚跟沉','缓慢呼吸，让上背和背阔肌自然伸展','强压肩部到疼痛','憋气或把腰硬压下去'],
    ['single_knee_to_chest_stretch','拉伸','自重','glutes,erector_spinae','hamstrings',null,'仰卧，一侧膝盖轻抱向胸前','另一腿自然放松，保持骨盆稳定','用力拉到髋部夹痛','抬头耸肩代偿']
  ];
  const regionNames={chest:'胸大肌',anterior_deltoids:'三角肌前束',lateral_deltoids:'三角肌中束',rear_deltoids:'三角肌后束',biceps:'肱二头肌',triceps:'肱三头肌',forearms:'前臂肌群',upper_trapezius:'斜方肌上束',middle_lower_trapezius:'中下斜方肌',rhomboids:'菱形肌',rotator_cuff:'肩袖肌群',lats:'背阔肌',erector_spinae:'竖脊肌',rectus_abdominis:'腹直肌',obliques:'腹斜肌',hip_flexors:'髋屈肌群',quads:'股四头肌',adductors:'内收肌群',glutes:'臀大肌',hamstrings:'腘绳肌',calves:'小腿肌群'};
  const split=x=>x?x.split(','):[];
  const exercises=rows.map(([id,group,equipment,primary,secondary,gymId,cue1,cue2,error1,error2])=>{
    const p=split(primary),s=split(secondary),stretch=group==='拉伸',cardio=group==='有氧';
    return {id,name:window.TRAIN_LOG_NEW_NAMES[id],group,equipment,muscles:[group],primary:p.map(x=>regionNames[x]).join('、'),secondary:s.map(x=>regionNames[x]).join('、'),tips:[cue1,cue2,stretch?'在舒适范围内配合呼吸，左右两侧均衡完成。':cardio?'保持稳定节奏，能控制呼吸时再加快。':'发力与回程都保持控制，按自身能力逐步增加负荷。'],mistakes:[error1,error2,stretch?'出现尖锐疼痛仍继续拉伸。':'重量或速度超过可控范围。'],rest:stretch?'20–40 秒':cardio?'45–90 秒':'60–120 秒',type:cardio?'cardio':stretch?'mobility':'strength',metric:cardio?'min':undefined,gymId,muscleMap:{primary:p,secondary:s}};
  });
  const cardioIds=new Set(['incline_walk','stationary_bike']);
  const day=(name,exerciseIds)=>({name,exercises:exerciseIds.map(x=>typeof x==='string'?(cardioIds.has(x)?[x,1,20,30]:[x,3,8,12]):x)});
  const programs=[
    {id:'lib_foundation_2',name:'零基础全身适应',note:'每周 2 练 · 入门',days:[day('全身 A',['chair_sit_to_stand','incline_pushup','chest_supported_row','glute_bridge','dead_bug']),day('全身 B',['bodyweight_squat','knee_pushup','reverse_grip_cable_pulldown','bodyweight_good_morning','bird_dog'])]},
    {id:'lib_novice_hypertrophy_3',name:'新手科学增肌',note:'每周 3 练 · 全身增肌',days:[day('全身 A',['back_squat','bench_press','lat_pulldown','rdl','plank']),day('全身 B',['barbell_front_squat','db_shoulder_press','chest_supported_row','glute_bridge','dead_bug']),day('全身 C',['leg_press','incline_db_press','pullup','seated_calf_raise','side_plank'])]},
    {id:'lib_weight_loss_3',name:'大体重减脂入门',note:'每周 3 练 · 低冲击',days:[day('力量 A',['chair_sit_to_stand','incline_pushup','machine_row','glute_bridge','dead_bug']),day('有氧 + 核心',['incline_walk','stationary_bike','bird_dog','side_plank']),day('力量 B',['goblet_squat','machine_press','lat_pulldown','seated_calf_raise','plank'])]},
    {id:'lib_body_shape_3',name:'全身塑形训练',note:'每周 3 练 · 全身塑形',days:[day('全身 A',['goblet_squat','flat_db_press','cable_row','glute_bridge','plank']),day('全身 B',['rdl','db_shoulder_press','single_arm_lat_pulldown','machine_hip_abduction','dead_bug']),day('全身 C',['bulgarian_split_squat','incline_db_press','chest_supported_row','seated_db_lateral_raise','side_plank'])]},
    {id:'lib_upper_lower_4',name:'上下肢分化增肌',note:'每周 4 练 · 上下肢',days:[day('上肢 A',['bench_press','lat_pulldown','db_shoulder_press','cable_row','triceps_pushdown','barbell_curl']),day('下肢 A',['back_squat','rdl','leg_extension','leg_curl','seated_calf_raise']),day('上肢 B',['incline_db_press','weighted_pullup','chest_supported_row','seated_db_lateral_raise','reverse_grip_cable_triceps_pushdown','hammer_curl']),day('下肢 B',['barbell_front_squat','barbell_hip_thrust','bulgarian_split_squat','machine_hip_abduction','calf_raise'])]},
    {id:'lib_glutes_legs_3',name:'臀腿强化塑形',note:'每周 3 练 · 臀腿',days:[day('臀腿 A',['barbell_hip_thrust','back_squat','bulgarian_split_squat','machine_hip_abduction','seated_calf_raise']),day('上肢 + 核心',['incline_db_press','lat_pulldown','seated_db_lateral_raise','dead_bug','side_plank']),day('臀腿 B',['rdl','barbell_front_squat','machine_hip_thrust','leg_curl','single_leg_glute_bridge'])]},
    {id:'lib_big_four_4',name:'四大基础力量提升',note:'每周 4 练 · 基础力量',days:[day('深蹲主项',['back_squat','pause_back_squat','leg_press','plank']),day('卧推主项',['bench_press','incline_db_press','barbell_row','triceps_pushdown']),day('硬拉主项',['deadlift','rdl','chest_supported_row','weighted_plank']),day('推举主项',['barbell_shoulder_press','db_shoulder_press','pullup','seated_db_lateral_raise'])]},
    {id:'lib_ppl_6',name:'PPL 六练增肌',note:'每周 6 练 · 推拉腿',days:[day('推 A',['bench_press','incline_db_press','db_shoulder_press','lateral_raise','triceps_pushdown']),day('拉 A',['weighted_pullup','barbell_row','face_pull','barbell_curl','dead_hang_grip']),day('腿 A',['back_squat','rdl','leg_extension','leg_curl','seated_calf_raise']),day('推 B',['machine_press','cable_fly','smith_shoulder_press','cable_lateral_raise','overhead_triceps']),day('拉 B',['reverse_grip_cable_pulldown','chest_supported_row','machine_row','hammer_curl','reverse_fly']),day('腿 B',['barbell_front_squat','barbell_hip_thrust','bulgarian_split_squat','machine_hip_abduction','calf_raise'])]},
    {id:'lib_home_bodyweight_3',name:'居家无器械训练',note:'每周 3 练 · 自重',days:[day('全身 A',['bodyweight_squat','standard_pushup','glute_bridge','bird_dog','mountain_climber']),day('全身 B',['bodyweight_reverse_lunge','incline_pushup','single_leg_glute_bridge','side_plank','inchworm']),day('全身 C',['chair_sit_to_stand','knee_pushup','bodyweight_good_morning','dead_bug','mountain_climber'])]},
    {id:'lib_efficient_fullbody_2',name:'高效率全身训练',note:'每周 2 练 · 全身',days:[day('全身 A',['back_squat','bench_press','chest_supported_row','rdl','plank']),day('全身 B',['deadlift','db_shoulder_press','lat_pulldown','barbell_hip_thrust','dead_bug'])]}
  ];
  window.TRAIN_LOG_NEW_CONTENT={exercises,programs};
})();
