// Additional plan-library content. The four rotating workouts remain in app.js.
(() => {
  const base=window.TRAIN_LOG_NEW_CONTENT;
  const gifs=window.TRAIN_LOG_NEW_GIFS;
  if(!base||!gifs)return;
  const existingCategories={lib_foundation_2:'基础训练',lib_novice_hypertrophy_3:'基础训练',lib_home_bodyweight_3:'基础训练',lib_efficient_fullbody_2:'基础训练',lib_upper_lower_4:'经典分化',lib_ppl_6:'经典分化',lib_big_four_4:'专业力量',lib_glutes_legs_3:'专项强化',lib_weight_loss_3:'减脂塑形',lib_body_shape_3:'减脂塑形'};
  base.programs.forEach(p=>{p.category=existingCategories[p.id]||p.category||'自定义';});
  const regionNames={chest:'胸大肌',upper_chest:'上胸',lower_chest:'中下胸',anterior_deltoids:'三角肌前束',lateral_deltoids:'三角肌中束',rear_deltoids:'三角肌后束',biceps:'肱二头肌',triceps:'肱三头肌',forearms:'前臂肌群',middle_lower_trapezius:'中下斜方肌',rhomboids:'菱形肌',lats:'背阔肌',erector_spinae:'竖脊肌',rectus_abdominis:'腹直肌',obliques:'腹斜肌',hip_flexors:'髋屈肌群',quads:'股四头肌',adductors:'内收肌群',glutes:'臀大肌',hamstrings:'腘绳肌',calves:'小腿肌群'};
  // id, name, category, equipment, primary, secondary, Gym Visual source id,
  // two cues, two common errors. Specific source matching is recorded in
  // RUNNING_MEDIA_AUDIT.md; a few specialist movements use a close visual.
  const rows=[
    ['ez_bar_curl','EZ 杠弯举','二头','EZ 杠','biceps','forearms','0447','上臂贴近身体；手腕保持自然','用肘屈曲抬杠；缓慢下放','身体后仰甩杠','肘部大幅前移'],
    ['seated_leg_curl','坐姿腿弯举','腿','器械','hamstrings','calves','0599','调整座位使膝关节对准转轴','大腿压稳；屈膝后控制回程','抬臀借力','配重快速撞击'],
    ['straight_arm_pulldown','绳索直臂下压','背','绳索','lats','triceps','0238','髋部微屈；手臂保持接近伸直','肩胛下沉；将把手沿弧线压向大腿','反复弯肘变成三头下压','腰部大幅前后摆动'],
    ['incline_db_curl','上斜哑铃弯举','二头','哑铃/上斜凳','biceps','forearms','0315','背部贴住上斜凳；上臂自然垂下','屈肘举起哑铃；缓慢伸肘下放','肩膀前甩','身体离凳借力'],
    ['incline_barbell_press','上斜杠铃卧推','胸','杠铃','upper_chest','anterior_deltoids,triceps','0047','凳面适度上斜；肩胛后缩下沉','杠铃下降到上胸附近后稳定推起','凳面过陡','杠铃弹胸'],
    ['single_arm_cable_row','单臂绳索划船','背','绳索','lats,rhomboids','biceps','0189','躯干稳定；肩胛先自然前伸','肘向髋部后方拉；两侧同量训练','扭腰甩动','耸肩抢力'],
    ['machine_shoulder_press','器械推肩','肩','器械','anterior_deltoids,lateral_deltoids','triceps','0603','座椅调到把手与肩部相近','手腕中立；向上推至可控范围','腰部过度反弓','下放到肩部疼痛位置'],
    ['single_arm_overhead_triceps','单臂过顶绳索臂屈伸','三头','绳索','triceps','anterior_deltoids','0194','上臂朝上并尽量固定','伸肘后缓慢屈肘；左右交替','肩膀大幅摆动','重量太大导致腰背反弓'],
    ['decline_machine_press','下斜器械推胸','胸','器械','lower_chest','triceps,anterior_deltoids','1300','调整座椅让把手位于中下胸','肩胛稳定；推起后控制回程','耸肩前顶','放任配重撞击'],
    ['dumbbell_rdl','哑铃罗马尼亚硬拉','腿','哑铃','hamstrings,glutes','erector_spinae','1459','膝盖微屈；哑铃贴近双腿','髋部向后推；感受大腿后侧拉伸后站起','弓背够地面','变成下蹲'],
    ['single_leg_rdl','单腿罗马尼亚硬拉','腿','哑铃/自重','hamstrings,glutes','erector_spinae','1757','支撑脚踩稳；骨盆保持水平','髋部后移，后腿与躯干同步前倾','骨盆向一侧打开','弓背或猛甩上身'],
    ['step_up','台阶登阶','腿','台阶/自重','quads,glutes','calves','0431','选择膝髋可控的低台阶','前脚全掌发力站上；慢慢下台','后脚蹬地过多','下台时膝盖内扣'],
    ['weighted_step_up','负重台阶登阶','腿','哑铃/台阶','quads,glutes','calves','0431','先掌握自重登阶再拿轻哑铃','前腿主导上台；身体保持直立','借后腿弹跳','为增重而选过高台阶'],
    ['dumbbell_reverse_lunge','哑铃反向弓步蹲','腿','哑铃','quads,glutes','hamstrings','0381','双手持哑铃；一脚向后跨','前脚踩稳站起；左右交替','跨步过短导致前膝不适','膝盖内扣'],
    ['tibialis_raise','胫骨前肌抬脚','小腿','自重/墙','calves','', '0763','背靠墙或扶稳，脚跟始终着地','脚尖向上抬起后慢慢下降','身体反弹借力','踝关节疼痛仍硬做'],
    ['pallof_press','Pallof 抗旋转推','腹','弹力带/绳索','obliques,rectus_abdominis','glutes','0979','侧身面对拉力方向；骨盆朝前','双手向胸前推远；抵抗躯干旋转','身体跟着拉力扭转','用过重阻力导致耸肩'],
    ['low_box_jump','低箱跳跃','腿','低跳箱','quads,glutes','calves','1374','先确认有跳跃基础且无相关疼痛','轻快起跳；双脚稳稳落在低箱上','追求高度忽略落地','疲劳后继续跳到力竭'],
    ['lateral_step_down','侧向台阶下蹲','腿','低台阶','quads,glutes','calves','1684','单脚站在低台阶边缘','支撑腿缓慢屈膝；另一脚轻触地面','支撑膝向内塌','用落地腿蹬起'],
    ['band_hip_abduction','弹力带髋外展','臀','弹力带','glutes','', '3006','弹力带固定在膝上或踝部','髋部稳定，缓慢向外打开腿','骨盆歪斜','弹力带回弹失控'],
    ['single_leg_balance','单腿站立平衡','小腿','自重','calves,glutes','rectus_abdominis','0020','脚掌均匀受力；微屈支撑膝','保持骨盆水平；需要时扶墙','锁死膝盖','身体大幅摇晃仍不扶稳'],
    ['lateral_lunge','侧向弓步蹲','腿','自重/哑铃','quads,glutes,adductors','hamstrings','1410','向侧方跨步；支撑脚全掌着地','屈髋屈膝后从支撑腿推回','膝盖向内塌','脚跟离地'],
    ['band_lateral_walk','弹力带侧向行走','臀','弹力带','glutes','quads','3006','微屈髋膝；弹力带保持轻张力','小步侧移，膝盖与脚尖同向','拖着脚走','躯干左右大幅摆动'],
    ['side_lying_hip_abduction','侧卧髋外展','臀','自重','glutes','obliques','0710','侧卧使头、躯干和下腿稳定','上腿从髋部抬起；脚尖保持自然','骨盆向后翻','用腰部侧弯代替抬腿'],
    ['single_leg_calf_raise','单腿提踵','小腿','自重/台阶','calves','', '1387','扶稳后单脚前掌踩地','缓慢降跟再踮起；两侧同量','身体弹跳借力','只做很小半程'],
    ['isometric_calf_raise','靠墙等长提踵','小腿','墙/自重','calves','', '1373','双手扶墙保持身体稳定','脚跟抬起到可控高度，按时间静止保持','屏气憋气','脚踝晃动或疼痛仍坚持'],
    ['band_dorsiflexion','弹力带勾脚背','小腿','弹力带','calves','', '1000','坐稳并固定弹力带在前脚掌','将脚背缓慢勾向身体；控制回程','整个腿跟着移动','弹力带回弹撞脚'],
    ['band_ankle_eversion','弹力带踝外翻','小腿','弹力带','calves','', '1368','坐稳并固定小腿；弹力带从脚内侧提供阻力','前脚掌缓慢向外转，再控制回中','整条腿外旋代偿','过大阻力造成踝痛'],
    ['towel_toe_curl','毛巾抓地训练','小腿','毛巾','calves','', '1368','坐姿脚掌平放在毛巾上','脚趾抓住毛巾向脚跟方向收拢','脚踝大幅摆动','脚趾痉挛仍快速硬抓'],
    ['short_foot','足弓短足训练','小腿','自重','calves','', '1368','脚掌贴地，保持脚趾放松','前脚掌向脚跟轻收，抬起足弓并保持','蜷曲脚趾代替足弓发力','脚跟离地'],
    ['back_extension_45','45 度山羊挺身','背','山羊挺身凳','erector_spinae,glutes','hamstrings','0489','髋部位于靠垫外缘；躯干保持自然','从髋部折叠再伸直至身体成线','顶端过度反弓','用甩腰冲起'],
    ['trap_bar_deadlift','陷阱杠硬拉','腿','陷阱杠','quads,glutes','hamstrings,erector_spinae','0811','双脚站在杠中央；握把居中','脚蹬地与伸髋同步，保持背部自然','臀部先冲起','顶端过度后仰'],
    ['nordic_hamstring_eccentric','北欧腘绳肌离心训练','腿','固定脚踝/自重','hamstrings','glutes','0696','脚踝固定可靠；躯干与大腿保持一线','缓慢向前下降，必要时用手撑地缓冲','用腰部折叠代替下降','一次做太多导致强烈酸痛'],
    ['low_pogo_hops','低幅度原地弹跳','小腿','自重','calves','quads','3222','双脚与髋同宽，保持轻微屈膝','以前脚掌轻快弹起并安静落地','落地声音大且膝盖内扣','疲劳后继续追求次数'],
    ['fast_step_up','单腿台阶快速登阶','腿','低台阶','quads,glutes','calves','0431','先能稳定完成普通登阶','快速蹬伸上台，缓慢稳定下台','落地不稳','用过高台阶抢速度'],
    ['dumbbell_split_squat','哑铃分腿蹲','腿','哑铃','quads,glutes','adductors','0410','前后站距适中，双脚踩稳','垂直下蹲再用前脚推地站起','前膝内扣','后脚用力过多'],
    ['medicine_ball_chest_throw','药球前抛','胸','药球','chest,triceps','anterior_deltoids','1302','确认前方安全且有接球伙伴或安全墙面','从胸前快速向前推出药球，充分休息','躯干失控后仰','距离过近造成反弹碰撞'],
    ['cable_glute_kickback','绳索后踢腿','臀','绳索','glutes','hamstrings','0228','脚踝固定绑带；躯干保持稳定','从髋部向后伸腿，缓慢回程','大幅反弓腰部','甩腿或骨盆旋转'],
    ['swimming','游泳','有氧','泳池','lats,quads','chest,glutes,calves','3433','选择熟悉泳姿并逐步延长时长','保持呼吸节奏；疲劳时及时靠边休息','憋气后猛冲','忽略泳池安全与自身疲劳']
  ];
  const mediaNotes={
    single_arm_overhead_triceps:'动图和视频演示双臂过顶动作；单臂训练请按文字要点左右交替。',
    step_up:'动图演示持哑铃登阶；徒手训练保持相同登阶轨迹。',
    tibialis_raise:'动图演示史密斯机脚尖上抬；徒手靠墙训练请按文字要点完成。',
    low_box_jump:'动图演示下箱稳定动作，并非跳上箱；请以视频和文字要点为准。',
    lateral_step_down:'动图演示登阶平衡，并非侧向下阶；请以视频和文字要点为准。',
    band_hip_abduction:'动图演示坐姿弹力带髋外展；站姿版本请以视频和文字要点为准。',
    single_leg_balance:'动图演示平衡板站立；地面单腿站立请按文字要点完成。',
    lateral_lunge:'动图演示杠铃侧弓步；徒手版本保持相同侧向轨迹。',
    band_lateral_walk:'动图演示坐姿弹力带髋外展，并非侧向行走；请以视频和文字要点为准。',
    isometric_calf_raise:'动图演示动态提踵；本动作需按文字要求在踮起位置静止保持。',
    band_dorsiflexion:'动图演示弹力带抗阻脚尖上抬；固定位置请以视频和文字要点为准。',
    band_ankle_eversion:'动图演示踝关节环绕，并非弹力带外翻；请以视频和文字要点为准。',
    towel_toe_curl:'动图演示踝关节环绕，并非毛巾抓地；请以视频和文字要点为准。',
    short_foot:'动图演示踝关节环绕，并非短足训练；请以视频和文字要点为准。',
    nordic_hamstring_eccentric:'动图演示辅助式反向腿弯举；北欧腘绳肌动作请以视频和文字要点为准。',
    low_pogo_hops:'动图演示半蹲跳；低幅弹跳请以视频和文字要点为准。',
    fast_step_up:'动图演示普通登阶；快速版本请以视频和文字要点为准。',
    swimming:'动图演示陆上游泳打腿，并非水中游泳；请以视频教学为准。'
  };
  const split=x=>x?x.split(','):[];
  for(const [id,name,group,equipment,primary,secondary,gymId,cue1,cue2,error1,error2] of rows){
    const p=split(primary),s=split(secondary),cardio=group==='有氧';
    const timed=['single_leg_balance','isometric_calf_raise','short_foot'].includes(id);
    base.exercises.push({id,name,group,equipment,muscles:cardio?['有氧','全身']:[group],primary:cardio?'心肺、全身':p.map(x=>regionNames[x]).join('、'),secondary:cardio?'肩背、臀腿':s.map(x=>regionNames[x]).join('、'),tips:[cue1,cue2,'在可控范围内完成，按个人能力逐步增加训练量。'],mistakes:[error1,error2,'出现明显疼痛仍继续训练。'],rest:cardio?'':'60–120 秒',type:cardio?'cardio':'strength',metric:cardio?'min':timed?'sec':undefined,gymId,mediaNote:mediaNotes[id]||'',muscleMap:{primary:p,secondary:s}});
    gifs[id]=`assets/gym-visual/advanced/${gymId}.gif`;
  }
  // The existing bicycle action keeps its ID and teaching video, but gets a
  // local copy of the matching Gym Visual loop for more reliable loading.
  gifs.stationary_bike='assets/gym-visual/advanced/2138.gif';
  const day=(name,spec)=>({name,exercises:spec.split(' ').filter(Boolean).map(item=>{const [id,sets,min,max]=item.split(':');return [id,Number(sets),Number(min),Number(max)];})});
  const plan=(id,name,category,level,weekly,duration,description,days)=>({id,name,category,level,note:`${level} · 每周 ${weekly} 练 · ${duration} 分钟`,description,days});
  const programs=[
    plan('lib_phul_4','PHUL 力量增肌四分化','专业力量','中级',4,'55–75','力量日与肌肥大日各安排上下肢一次；正式组以动作质量为先。',[
      day('上肢力量','bench_press:4:4:6 weighted_pullup:4:4:6 barbell_row:3:5:8 barbell_shoulder_press:3:5:8 close_grip_bench:2:6:8 ez_bar_curl:2:6:8'),
      day('下肢力量','back_squat:4:4:6 deadlift:2:3:5 leg_press:2:8:10 seated_leg_curl:2:8:10 calf_raise:3:8:12 kneeling_ab_rollout:3:8:12'),
      day('上肢肌肥大','incline_db_press:3:8:12 chest_supported_row:3:8:12 machine_press:2:10:15 lat_pulldown:2:10:15 lateral_raise:3:12:20 reverse_pec_deck:2:12:20 triceps_pushdown:2:10:15 biceps_curl:2:10:15'),
      day('下肢肌肥大','hack_squat:3:8:12 rdl:3:8:12 leg_extension:2:12:15 seated_leg_curl:3:10:15 barbell_hip_thrust:2:8:12 seated_calf_raise:3:12:20 cable_crunch:2:12:15')]),
    plan('lib_phat_5','PHAT 五练进阶体系','专业力量','高级',5,'60–80','高训练量，建议前两周每个动作先减 1 组，确认恢复后再补足。',[
      day('上肢力量','bench_press:3:3:5 barbell_row:3:3:5 barbell_shoulder_press:3:5:8 weighted_pullup:3:5:8 close_grip_bench:2:6:8 barbell_curl:2:6:8'),
      day('下肢力量','back_squat:3:3:5 deadlift:2:3:5 leg_press:2:8:10 seated_leg_curl:2:8:10 calf_raise:3:8:12'),
      day('背肩肌肥大','lat_pulldown:3:8:12 chest_supported_row:3:8:12 cable_row:2:10:15 lateral_raise:3:12:20 reverse_pec_deck:3:12:20 face_pull:2:15:20'),
      day('下肢肌肥大','hack_squat:3:8:12 rdl:3:8:12 leg_extension:2:12:15 seated_leg_curl:3:10:15 barbell_hip_thrust:2:8:12 seated_calf_raise:3:12:20 cable_crunch:2:12:15'),
      day('胸臂肌肥大','incline_db_press:3:8:12 machine_press:3:10:12 cable_fly:2:12:15 ez_bar_curl:3:10:12 incline_db_curl:2:12:15 triceps_pushdown:3:10:15 overhead_triceps:2:12:15')]),
    plan('lib_arnold_6','Arnold Split 六练','经典分化','高级',6,'55–75','胸背、肩臂、腿各练两次；总量较高，恢复不足时减少组数。',[
      day('胸背 A · 力量厚度','bench_press:3:6:8 pullup:3:6:10 incline_db_press:3:8:12 barbell_row:3:8:10 cable_fly:2:12:15 straight_arm_pulldown:2:12:15'),
      day('肩臂 A','db_shoulder_press:3:6:10 lateral_raise:3:12:20 reverse_pec_deck:3:12:20 ez_bar_curl:3:8:12 incline_db_curl:2:10:12 triceps_pushdown:3:10:15 overhead_triceps:2:10:15'),
      day('腿 A · 股四头重点','back_squat:3:6:10 leg_press:3:10:12 leg_extension:2:12:15 rdl:3:8:10 seated_leg_curl:2:10:15 calf_raise:3:12:20'),
      day('胸背 B · 肌肥大','incline_barbell_press:3:8:10 chest_supported_row:3:8:12 machine_press:3:10:12 lat_pulldown:3:10:12 pec_deck:2:12:15 single_arm_cable_row:2:12:15'),
      day('肩臂 B','machine_shoulder_press:3:8:12 cable_lateral_raise:3:12:20 face_pull:2:12:15 preacher_curl:3:10:12 hammer_curl:2:10:12 triceps_pushdown:3:10:15 single_arm_overhead_triceps:2:12:15'),
      day('腿 B · 后侧链重点','hack_squat:3:8:12 rdl:3:8:12 bulgarian_split_squat:2:10:10 barbell_hip_thrust:3:8:12 seated_leg_curl:3:10:15 seated_calf_raise:3:12:20')]),
    plan('lib_bodybuilding_5','传统健美五分化','经典分化','中高级',5,'50–70','胸、背、腿、肩、手臂独立训练日。',[
      day('胸部','bench_press:3:6:8 incline_db_press:3:8:12 decline_machine_press:2:10:12 pec_deck:2:12:15 cable_fly:2:12:15'),
      day('背部','pullup:3:6:10 barbell_row:3:6:10 lat_pulldown:2:10:12 chest_supported_row:2:10:12 straight_arm_pulldown:2:12:15'),
      day('腿部','back_squat:3:6:10 rdl:3:8:10 leg_press:2:10:12 seated_leg_curl:2:10:15 leg_extension:2:12:15 calf_raise:3:12:20'),
      day('肩部','db_shoulder_press:3:8:10 lateral_raise:3:12:20 cable_lateral_raise:2:12:15 reverse_pec_deck:3:12:20 face_pull:2:12:15'),
      day('手臂','ez_bar_curl:3:8:12 incline_db_curl:2:10:12 hammer_curl:2:10:12 close_grip_bench:3:6:10 triceps_pushdown:2:10:15 overhead_triceps:2:10:15')]),
    plan('lib_torso_limbs_4','躯干四肢四分化','经典分化','中级',4,'50–70','躯干与四肢各练两次，兼顾力量与肌肥大。',[
      day('躯干力量','bench_press:3:5:8 weighted_pullup:3:6:8 barbell_row:3:6:8 barbell_shoulder_press:2:6:8 lateral_raise:2:12:15 triceps_pushdown:2:10:12 biceps_curl:2:10:12'),
      day('四肢力量','back_squat:3:5:8 rdl:3:6:8 bulgarian_split_squat:2:8:10 calf_raise:3:8:12 ez_bar_curl:2:8:10 triceps_pushdown:2:8:10 hanging_leg_raise:2:10:12'),
      day('躯干肌肥大','incline_db_press:3:8:12 machine_press:2:10:15 chest_supported_row:3:8:12 lat_pulldown:3:10:12 lateral_raise:3:12:20 reverse_pec_deck:2:12:20'),
      day('四肢肌肥大','hack_squat:3:8:12 leg_press:2:10:15 seated_leg_curl:3:10:15 barbell_hip_thrust:2:8:12 seated_calf_raise:3:12:20 cable_curl:2:10:15 overhead_triceps:2:10:15')]),
    plan('lib_chest_back_4','胸背拮抗四分化','经典分化','中级',4,'50–70','胸部推与背部拉交替安排，优先上半身厚度与宽度。',[
      day('胸背力量','bench_press:3:5:8 barbell_row:3:5:8 incline_db_press:3:8:10 pullup:3:6:10 cable_fly:2:12:15 straight_arm_pulldown:2:12:15'),
      day('腿部与核心','back_squat:3:6:10 rdl:3:8:10 leg_extension:2:12:15 seated_leg_curl:2:10:15 calf_raise:3:12:20 cable_crunch:3:12:15'),
      day('胸背肌肥大','machine_press:3:10:12 chest_supported_row:3:10:12 pec_deck:2:12:15 lat_pulldown:3:10:12 cable_row:2:12:15 reverse_pec_deck:2:15:20'),
      day('肩部与手臂','db_shoulder_press:3:8:12 lateral_raise:3:12:20 reverse_pec_deck:2:12:15 ez_bar_curl:3:8:12 incline_db_curl:2:10:12 triceps_pushdown:3:10:15 overhead_triceps:2:12:15')]),
    plan('lib_strength_cycle_3','基础力量周期三练','专业力量','中级',3,'55–70','以深蹲、卧推、硬拉为主项。逐周小幅加重，动作质量下降时维持重量。',[
      day('深蹲与卧推','back_squat:4:4:6 bench_press:4:4:6 chest_supported_row:3:8:10 leg_curl:2:10:12 plank:3:30:45'),
      day('硬拉与推举','deadlift:3:3:5 barbell_shoulder_press:4:4:6 pullup:3:6:10 bulgarian_split_squat:2:8:10 side_plank:2:30:45'),
      day('技术与辅助','pause_back_squat:3:5:6 incline_db_press:3:8:10 barbell_row:3:6:8 rdl:2:8:10 seated_calf_raise:3:10:15')]),
    plan('lib_upper_chest_3','上胸专项强化','专项强化','中级',3,'50–65','上胸优先；其余肌群保持基础训练量。',[
      day('上胸力量','incline_barbell_press:4:5:8 flat_db_press:3:8:10 lat_pulldown:3:8:12 lateral_raise:2:12:20 triceps_pushdown:2:10:15'),
      day('下肢与背','back_squat:3:6:10 rdl:3:8:10 chest_supported_row:3:8:12 seated_calf_raise:3:12:15 plank:3:30:45'),
      day('上胸肌肥大','incline_db_press:4:8:12 incline_machine_press:3:10:12 cable_fly:2:12:15 face_pull:3:12:20 overhead_triceps:2:10:15')]),
    plan('lib_back_width_3','背阔肌宽度强化','专项强化','中级',3,'50–65','优先垂直拉与背阔肌控制；注意肩胛稳定。',[
      day('背阔力量','pullup:4:5:8 lat_pulldown:3:8:10 straight_arm_pulldown:3:10:12 barbell_curl:2:10:12 dead_hang_grip:2:30:45'),
      day('下肢与推','back_squat:3:6:10 rdl:3:8:10 bench_press:3:6:10 lateral_raise:2:12:20 side_plank:2:30:45'),
      day('背阔肌肥大','single_arm_lat_pulldown:3:10:12 cable_row:3:10:12 machine_row:2:10:12 straight_arm_pulldown:2:12:15 face_pull:2:15:20')]),
    plan('lib_shoulder_3','三角肌专项强化','专项强化','中级',3,'45–60','肩部三束均衡训练，控制负重和肩关节活动范围。',[
      day('推举与前束','barbell_shoulder_press:4:5:8 db_shoulder_press:3:8:10 lateral_raise:3:12:15 face_pull:2:15:20'),
      day('下肢与背','back_squat:3:6:10 rdl:3:8:10 lat_pulldown:3:8:12 chest_supported_row:2:10:12 plank:2:30:45'),
      day('中后束','machine_shoulder_press:3:8:12 cable_lateral_raise:3:12:20 reverse_pec_deck:3:12:20 reverse_fly:2:12:15 face_pull:2:15:20')]),
    plan('lib_arms_3','手臂围度强化','专项强化','中级',3,'45–60','二头与三头各训练两次，保持胸背和腿部基础量。',[
      day('手臂力量','close_grip_bench:3:6:8 ez_bar_curl:3:6:8 overhead_triceps:2:8:12 incline_db_curl:2:8:12 wrist_curl:2:12:15'),
      day('全身基础','back_squat:3:6:10 rdl:3:8:10 bench_press:2:8:10 lat_pulldown:2:8:12 plank:2:30:45'),
      day('手臂肌肥大','triceps_pushdown:3:10:15 preacher_curl:3:10:15 single_arm_overhead_triceps:2:12:15 hammer_curl:2:12:15 cable_curl:2:12:15')]),
    plan('lib_core_3','核心稳定强化','专项强化','全水平',3,'35–50','抗伸展、抗旋转与侧向稳定交替练习。',[
      day('抗伸展','goblet_squat:3:8:12 kneeling_ab_rollout:3:8:12 dead_bug:3:10:10 plank:3:30:45'),
      day('抗旋转','rdl:3:8:10 pallof_press:3:10:12 bird_dog:3:10:10 side_plank:3:30:45'),
      day('动态核心','step_up:3:8:10 cable_crunch:3:12:15 hanging_leg_raise:3:8:12 mountain_climber:3:20:30')]),
    plan('lib_fatloss_preserve_3','减脂保肌力量三练','减脂塑形','中级',3,'45–60','保留复合动作强度，按恢复情况调整有氧量。',[
      day('全身 A','back_squat:3:6:8 bench_press:3:6:10 chest_supported_row:3:8:12 plank:2:30:45'),
      day('全身 B','rdl:3:6:10 db_shoulder_press:3:8:12 lat_pulldown:3:8:12 walking_lunge_twist:2:10:10'),
      day('全身 C','leg_press:3:8:12 incline_db_press:3:8:12 cable_row:3:8:12 stationary_bike:1:15:25')]),
    plan('lib_low_impact_fitness_3','低冲击体能塑形','减脂塑形','入门',3,'35–50','使用可控重量和低冲击有氧，循序增加时长。',[
      day('力量 A','chair_sit_to_stand:3:10:12 incline_pushup:3:8:12 machine_row:3:10:12 glute_bridge:3:12:15'),
      day('低冲击有氧','stationary_bike:1:20:30 bird_dog:2:10:10 side_plank:2:20:30'),
      day('力量 B','goblet_squat:3:8:12 machine_press:3:10:12 lat_pulldown:3:10:12 seated_calf_raise:2:12:15')]),
    plan('rs01_runner_foundation','RS01｜跑者基础力量训练','跑步专项力量','入门',2,'45–55','建立下肢基础力量、单腿稳定性和核心控制。',[
      day('下肢基础力量','goblet_squat:3:10:12 dumbbell_rdl:3:10:12 bulgarian_split_squat:2:8:8 calf_raise:3:12:15 glute_bridge:3:12:15 plank:3:30:45'),
      day('单腿稳定与核心','single_leg_rdl:3:8:8 bodyweight_reverse_lunge:3:10:10 step_up:3:10:10 seated_calf_raise:3:15:15 dead_bug:3:10:10 side_plank:2:30:30')]),
    plan('rs02_5k_10k_power','RS02｜5K/10K速度力量强化','跑步专项力量','中级',2,'50–60','提高下肢最大力量、单腿蹬伸和快速发力能力；跳跃只适合已有基础且无疼痛者。',[
      day('下肢最大力量','back_squat:4:5:6 rdl:3:6:8 bulgarian_split_squat:3:8:8 calf_raise:4:8:12 tibialis_raise:3:15:20 pallof_press:3:10:10'),
      day('单腿爆发与力量','weighted_step_up:3:6:8 dumbbell_reverse_lunge:3:8:8 single_leg_glute_bridge:3:10:10 seated_calf_raise:3:10:12 low_box_jump:3:4:4 kneeling_ab_rollout:3:8:12')]),
    plan('rs03_half_marathon','RS03｜半程马拉松专项力量','跑步专项力量','中高级',2,'45–60','提高长距离跑中的臀腿力量、单腿支撑和核心稳定。',[
      day('臀腿耐力力量','barbell_hip_thrust:3:8:10 hack_squat:3:8:10 rdl:3:8:10 seated_leg_curl:3:10:12 calf_raise:3:12:15 cable_crunch:3:12:15'),
      day('单腿控制与稳定','bulgarian_split_squat:3:8:8 single_leg_rdl:3:8:8 lateral_step_down:2:10:10 seated_calf_raise:3:12:15 band_hip_abduction:2:15:15 bird_dog:3:10:10')]),
    plan('rs04_marathon_endurance','RS04｜全程马拉松耐力力量','跑步专项力量','中高级',2,'40–55','提高重复负荷耐受；高跑量备赛时可减少组数。',[
      day('全身耐力力量','leg_press:3:10:12 dumbbell_rdl:3:10:10 bulgarian_split_squat:2:10:10 seated_leg_curl:3:12:12 calf_raise:3:15:15 plank:3:45:45'),
      day('跑者抗疲劳力量','weighted_step_up:3:10:10 bodyweight_reverse_lunge:2:10:10 single_leg_glute_bridge:3:12:12 seated_calf_raise:3:15:15 tibialis_raise:2:20:20 side_plank:3:30:45')]),
    plan('rs05_hip_stability','RS05｜臀部与髋关节稳定强化','跑步专项力量','全水平',2,'40–50','强化臀大肌、臀中肌与髋部控制。',[
      day('臀大肌强化','barbell_hip_thrust:4:8:12 rdl:3:8:10 single_leg_glute_bridge:3:10:10 cable_glute_kickback:3:12:12 machine_hip_abduction:3:15:15 pallof_press:2:12:12'),
      day('髋关节稳定','bulgarian_split_squat:3:8:8 single_leg_rdl:3:10:10 lateral_lunge:3:10:10 band_lateral_walk:3:12:12 side_lying_hip_abduction:2:15:15 side_plank:3:30:30')]),
    plan('rs06_calf_ankle','RS06｜小腿、跟腱与足踝强化','跑步专项力量','全水平',2,'35–45','循序增加小腿和足踝负荷；已有跟腱或足底疼痛时先评估。',[
      day('小腿与跟腱周围肌群','calf_raise:4:8:12 seated_calf_raise:4:10:15 single_leg_calf_raise:2:10:10 tibialis_raise:3:15:20 isometric_calf_raise:3:30:30 single_leg_balance:3:30:30'),
      day('足踝控制','single_leg_calf_raise:3:10:12 seated_calf_raise:3:12:15 band_dorsiflexion:3:15:15 band_ankle_eversion:2:15:15 towel_toe_curl:2:15:15 short_foot:3:20:20')]),
    plan('rs07_posterior_chain','RS07｜后侧链与腘绳肌强化','跑步专项力量','中高级',2,'45–55','强化臀大肌、腘绳肌与髋伸力量；北欧训练先从低组数开始。',[
      day('后侧链力量','rdl:4:6:8 barbell_hip_thrust:3:8:10 leg_curl:3:10:12 back_extension_45:2:12:12 seated_calf_raise:3:12:15 dead_bug:3:10:10'),
      day('单腿后侧链控制','trap_bar_deadlift:3:5:6 single_leg_rdl:3:8:8 bodyweight_reverse_lunge:3:8:8 nordic_hamstring_eccentric:2:3:5 seated_leg_curl:2:12:12 side_plank:2:40:40')]),
    plan('rs08_hill_power','RS08｜上坡与爆发力专项训练','跑步专项力量','高级',2,'45–60','爆发动作每组充分休息，落地质量下降就停止。',[
      day('下肢最大力量','trap_bar_deadlift:4:4:5 back_squat:3:5:5 weighted_step_up:3:6:6 barbell_hip_thrust:3:6:8 calf_raise:3:8:10 pallof_press:2:10:10'),
      day('爆发与弹性力量','low_box_jump:3:4:4 low_pogo_hops:3:10:10 fast_step_up:3:5:5 dumbbell_split_squat:3:6:6 medicine_ball_chest_throw:3:6:6 single_leg_calf_raise:3:10:10')]),
    plan('rs09_inseason_maintenance','RS09｜马拉松赛季力量维持','跑步专项力量','中高级','1–2','25–40','高跑量期间保留基础力量；第 2 练可选。比赛前几天避免新的重腿或高强度离心训练。',[
      day('全身力量维持','goblet_squat:2:6:8 rdl:2:6:8 bulgarian_split_squat:2:6:6 calf_raise:2:10:10 seated_calf_raise:2:12:12 plank:2:30:30'),
      day('可选 · 核心与关节稳定','single_leg_glute_bridge:2:10:10 band_lateral_walk:2:12:12 step_up:2:8:8 tibialis_raise:2:15:15 bird_dog:2:10:10 side_plank:2:30:30')])
  ];
  base.programs.push(...programs);
})();
