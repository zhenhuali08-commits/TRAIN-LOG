(() => {
  'use strict';

  const STORAGE_KEY = 'train-log-state-v1';
  const VERSION = '3.2';
  const DB_NAME = 'train-log-indexeddb';
  const DB_VERSION = 1;
  const DB_STORES = ['workouts','exercises','plans','body_metrics','settings','backup_meta'];

  const EXERCISES = [
    {id:'bench_press',name:'????',group:'?',equipment:'??',muscles:['?','??','?'],primary:'???',secondary:'??????????',tips:['????????????????','?????????????','???????????????????'],mistakes:['???????????','??????','??????????'],rest:'2?3 ??'},
    {id:'incline_db_press',name:'??????',group:'?',equipment:'??',muscles:['?','??','?'],primary:'??',secondary:'??????????',tips:['?????????????','????????????????','??????????????'],mistakes:['??????????','?????????','????'],rest:'2?3 ??'},
    {id:'incline_machine_press',name:'??????',group:'?',equipment:'??',muscles:['?','??','?'],primary:'??',secondary:'??????',tips:['?????????????','???????????','???????'],mistakes:['???????','????','????'],rest:'90?150 ?'},
    {id:'pec_deck',name:'?????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'???',tips:['?????????','????????','???????????????'],mistakes:['?????','????','??????'],rest:'60?120 ?'},
    {id:'cable_fly',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'???',tips:['????????','????????????????????','????????'],mistakes:['????????????','??????????','????'],rest:'60?120 ?'},
    {id:'triceps_pushdown',name:'????',group:'??',equipment:'??',muscles:['??'],primary:'????',secondary:'??',tips:['???????????','???????????','???????????'],mistakes:['??????','??????','????'],rest:'60?120 ?'},
    {id:'overhead_triceps',name:'?????',group:'??',equipment:'??/??',muscles:['??'],primary:'??????',secondary:'??',tips:['????????????','?????????????','?????????????'],mistakes:['??????','????','????'],rest:'60?120 ?'},
    {id:'lateral_raise',name:'?????',group:'?',equipment:'??',muscles:['?'],primary:'?????',secondary:'???',tips:['?????????????','????????????','?????????????'],mistakes:['????','??????','?????????'],rest:'60?120 ?'},
    {id:'pullup',name:'????',group:'?',equipment:'??',muscles:['?','??'],primary:'??????',secondary:'???????',tips:['????????????????','???????????','?????????????'],mistakes:['?????','??????','??????'],rest:'2?3 ??'},
    {id:'lat_pulldown',name:'????',group:'?',equipment:'??',muscles:['?','??'],primary:'???',secondary:'?????????????????????????',tips:['??????????','????????','????????????????'],mistakes:['????????','????','????????'],rest:'90?150 ?'},
    {id:'machine_row',name:'????',group:'?',equipment:'??',muscles:['?','??'],primary:'??????',secondary:'???????',tips:['??????????????','??????????????','????????'],mistakes:['??????','??????','????'],rest:'90?150 ?'},
    {id:'cable_row',name:'??/????',group:'?',equipment:'??',muscles:['?','??'],primary:'???????',secondary:'???????',tips:['??????????????','?????????','??????????????'],mistakes:['??????','??','????'],rest:'90?150 ?'},
    {id:'reverse_pec_deck',name:'?????',group:'?',equipment:'??',muscles:['?','?'],primary:'?????',secondary:'?????????',tips:['?????????????','?????????????','????????????'],mistakes:['????????????','??','??????'],rest:'60?120 ?'},
    {id:'barbell_curl',name:'????',group:'??',equipment:'??',muscles:['??'],primary:'????',secondary:'?????',tips:['???????????','???????????','??????????????'],mistakes:['??????','?????','????'],rest:'60?120 ?'},
    {id:'hammer_curl',name:'????',group:'??',equipment:'??',muscles:['??'],primary:'??????',secondary:'????',tips:['??????????','??????','??????????'],mistakes:['????','????','????'],rest:'60?120 ?'},
    {id:'smith_shoulder_press',name:'?????',group:'?',equipment:'????',muscles:['?','??'],primary:'????????',secondary:'????',tips:['???????????','?????????','?????????????'],mistakes:['????????','??????','??'],rest:'2?3 ??'},
    {id:'reverse_fly',name:'????',group:'?',equipment:'??/??',muscles:['?','?'],primary:'?????',secondary:'??',tips:['?????????','?????????','????????????'],mistakes:['??','????','??????????'],rest:'60?120 ?'},
    {id:'hack_squat',name:'????',group:'?',equipment:'??',muscles:['?','?'],primary:'????',secondary:'???????',tips:['???????????','????????????','????????????????'],mistakes:['??????','????','??????????'],rest:'2?3 ??'},
    {id:'rdl',name:'??????',group:'?',equipment:'??/??',muscles:['?','?','?'],primary:'???????',secondary:'???',tips:['???????????????','????????','???????????????'],mistakes:['????','??????','???????'],rest:'2?3 ??'},
    {id:'leg_curl',name:'???',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'??',tips:['????????????','??????','????????????'],mistakes:['??????','????','????????'],rest:'60?120 ?'},
    {id:'calf_raise',name:'????',group:'??',equipment:'??/??',muscles:['??'],primary:'????????',secondary:'?????',tips:['????????????????','???????????','???????????'],mistakes:['????','????','??????'],rest:'60?120 ?'},
    {id:'hanging_leg_raise',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'????????',secondary:'??',tips:['????????','??????????','????????'],mistakes:['?????','??????','??????'],rest:'60?120 ?'},
    {id:'cable_crunch',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'???',tips:['????????????','?????????','????????'],mistakes:['???????','????','??????????'],rest:'60?120 ?'},
    {id:'incline_press_any',name:'????/????',group:'?',equipment:'??/??',muscles:['?','??','?'],primary:'??',secondary:'??????',tips:['???????????','??????????????????','?????????'],mistakes:['????','????','????????'],rest:'2?3 ??'},
    {id:'machine_press',name:'????',group:'?',equipment:'??',muscles:['?','??','?'],primary:'???',secondary:'??????',tips:['??????????????','??????','???????????'],mistakes:['???????','??','????'],rest:'90?150 ?'},
    {id:'pulldown_any',name:'????/????',group:'?',equipment:'??/??',muscles:['?','??'],primary:'???',secondary:'?????',tips:['????????','????????/???????????','??????'],mistakes:['????','??','????'],rest:'90?180 ?'},
    {id:'bulgarian_split_squat',name:'???????',group:'?',equipment:'??/??',muscles:['?','?'],primary:'????????',secondary:'??????',tips:['???????????????','????????????','???????'],mistakes:['????????','????','??????'],rest:'90?150 ?'},
    {id:'biceps_curl',name:'????',group:'??',equipment:'??/??',muscles:['??'],primary:'????',secondary:'?????',tips:['??????','??????','????????????'],mistakes:['????','??????','????'],rest:'60?120 ?'},
    {id:'triceps_pressdown',name:'????',group:'??',equipment:'??/??',muscles:['??'],primary:'????',secondary:'??',tips:['????','???????????','????'],mistakes:['????','????','????'],rest:'60?120 ?'},
    {id:'crunch_combo',name:'???/??',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'????',tips:['???????????','????????','??????????'],mistakes:['?????','????','??????????'],rest:'45?90 ?'},
    {id:'front_raise',name:'?????',group:'?',equipment:'??',muscles:['?'],primary:'?????',secondary:'?????',tips:['??????????','???????????','?????????????'],mistakes:['??????','??????','????'],rest:'60?120 ?'},
    {id:'barbell_shoulder_press',name:'????',group:'?',equipment:'??',muscles:['?','??'],primary:'????????',secondary:'????',tips:['????????????','?????????????','???????????'],mistakes:['??????','??????','??????'],rest:'2?3 ??'},
    {id:'shrug',name:'??/????',group:'?',equipment:'??/??',muscles:['?'],primary:'?????',secondary:'????',tips:['????????????','??????','???????????'],mistakes:['?????','????','????'],rest:'60?120 ?'}
    ,{id:'flat_db_press',name:'??????',group:'?',equipment:'??',muscles:['?','??','?'],primary:'???',secondary:'????????',tips:['??????','???????????','???????????'],mistakes:['????','????','????'],rest:'2?3 ??'}
    ,{id:'decline_press',name:'????',group:'?',equipment:'??/??',muscles:['?','??'],primary:'?????',secondary:'????',tips:['????','????','????'],mistakes:['??','????','????'],rest:'2?3 ??'}
    ,{id:'chest_dip',name:'????????',group:'?',equipment:'??',muscles:['?','??'],primary:'???',secondary:'????????',tips:['?????','??????','?????????'],mistakes:['??','????','????'],rest:'2?3 ??'}
    ,{id:'deadlift',name:'????',group:'?',equipment:'??',muscles:['?','?','?'],primary:'????',secondary:'??????',tips:['??????','??????','????????'],mistakes:['??','???????','??????'],rest:'2?4 ??'}
    ,{id:'barbell_row',name:'??????',group:'?',equipment:'??',muscles:['?','??'],primary:'??????',secondary:'????',tips:['????????','??????','????'],mistakes:['????','??','????'],rest:'2?3 ??'}
    ,{id:'one_arm_db_row',name:'??????',group:'?',equipment:'??',muscles:['?','??'],primary:'???',secondary:'???????',tips:['????','???????','??????'],mistakes:['????','??','?????'],rest:'90?150 ?'}
    ,{id:'tbar_row',name:'T???',group:'?',equipment:'T?/??',muscles:['?','??'],primary:'??????',secondary:'????',tips:['????','?????','????'],mistakes:['????','??','????'],rest:'2?3 ??'}
    ,{id:'face_pull',name:'????',group:'?',equipment:'??',muscles:['?','?'],primary:'?????',secondary:'???????????????',tips:['??????','??????','????'],mistakes:['????','??','????'],rest:'60?120 ?'}
    ,{id:'arnold_press',name:'?????',group:'?',equipment:'??',muscles:['?','??'],primary:'???',secondary:'????',tips:['????','????','????'],mistakes:['????','????','????'],rest:'90?150 ?'}
    ,{id:'upright_row',name:'??????',group:'?',equipment:'??',muscles:['?'],primary:'?????',secondary:'???',tips:['??????','????','??????'],mistakes:['????????','??','????'],rest:'60?120 ?'}
    ,{id:'back_squat',name:'????',group:'?',equipment:'??',muscles:['?','?'],primary:'????????',secondary:'??',tips:['????','???????','??????'],mistakes:['???','????','??'],rest:'2?4 ??'}
    ,{id:'leg_press',name:'??',group:'?',equipment:'??',muscles:['?','?'],primary:'????',secondary:'???',tips:['????','???????','????'],mistakes:['????','????','????'],rest:'2?3 ??'}
    ,{id:'leg_extension',name:'???',group:'?',equipment:'??',muscles:['?'],primary:'????',secondary:'',tips:['???????','????','????'],mistakes:['????','??','????'],rest:'60?120 ?'}
    ,{id:'hip_thrust',name:'????',group:'?',equipment:'??',muscles:['?','?'],primary:'???',secondary:'???',tips:['????','??????','????'],mistakes:['????','????','?????'],rest:'2?3 ??'}
    ,{id:'cable_kickback',name:'?????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'??',tips:['????','??????','????'],mistakes:['????','????','????'],rest:'60?120 ?'}
    ,{id:'preacher_curl',name:'?????',group:'??',equipment:'??/??',muscles:['??'],primary:'????',secondary:'??',tips:['????','????','???????'],mistakes:['????','????','????'],rest:'60?120 ?'}
    ,{id:'cable_curl',name:'????',group:'??',equipment:'??',muscles:['??'],primary:'????',secondary:'??',tips:['????','????','????'],mistakes:['????','????','????'],rest:'60?120 ?'}
    ,{id:'skull_crusher',name:'?????',group:'??',equipment:'EZ?/??',muscles:['??'],primary:'????',secondary:'',tips:['??????','????','????'],mistakes:['????','????','????'],rest:'60?120 ?'}
    ,{id:'close_grip_bench',name:'????',group:'??',equipment:'??',muscles:['??','?'],primary:'????',secondary:'???',tips:['?????????','????','????'],mistakes:['??????','????','??'],rest:'2?3 ??'}
    ,{id:'plank',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'????',secondary:'????',tips:['??????','????','????'],mistakes:['??','??','??'],rest:'45?90 ?'}
    ,{id:'ab_wheel',name:'???',group:'?',equipment:'???',muscles:['?'],primary:'??????',secondary:'???',tips:['?????','????','??????'],mistakes:['??','??????','????'],rest:'60?120 ?'}
    ,{id:'wrist_curl',name:'???',group:'??',equipment:'??/??',muscles:['??'],primary:'????',secondary:'',tips:['????','?????','????'],mistakes:['????','????','????'],rest:'45?90 ?'}
    ,{id:'treadmill_run',name:'??',group:'??',equipment:'???/??',muscles:['??'],primary:'??',secondary:'??',tips:['??????','??????','??????'],mistakes:['????','????','?????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'incline_walk',name:'???',group:'??',equipment:'???',muscles:['??'],primary:'?????',secondary:'??',tips:['???????','??????','???????'],mistakes:['??????????','????','????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'elliptical',name:'???',group:'??',equipment:'???',muscles:['??'],primary:'??',secondary:'??',tips:['??????','??????','??????'],mistakes:['??????','????','????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'stationary_bike',name:'????/???',group:'??',equipment:'??',muscles:['??'],primary:'??',secondary:'??',tips:['??????','??????','??????'],mistakes:['????','????','???????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'rowing_machine',name:'???',group:'??',equipment:'???',muscles:['??','?','?'],primary:'?????',secondary:'?????',tips:['?-?-?????','??????','????'],mistakes:['????','??','????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'stair_climber',name:'???',group:'??',equipment:'???',muscles:['??','?','?'],primary:'?????',secondary:'??',tips:['????','????','??????'],mistakes:['????','????','????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'jump_rope',name:'??',group:'??',equipment:'??',muscles:['??','??'],primary:'??',secondary:'?????',tips:['????','????','????'],mistakes:['????','????','???????'],rest:'',type:'cardio',metric:'min'}
    ,{id:'swimming',name:'??',group:'??',equipment:'??',muscles:['??','??'],primary:'?????',secondary:'??',tips:['????????','????','????????'],mistakes:['?????','??????','????'],rest:'',type:'cardio',metric:'min'}

  ];

  // V2.3 ?????
  const REMOVED_EXERCISE_IDS=new Set(['hip_thrust','cable_kickback','ab_wheel','rowing_machine','jump_rope','swimming']);
  for(let i=EXERCISES.length-1;i>=0;i--) if(REMOVED_EXERCISE_IDS.has(EXERCISES[i].id)) EXERCISES.splice(i,1);
  const renameExercise=(id,name)=>{const e=EXERCISES.find(x=>x.id===id);if(e)e.name=name;};
  renameExercise('incline_walk','???');renameExercise('reverse_pec_deck','???????');renameExercise('leg_extension','?????');
  EXERCISES.push(
    {id:'db_shoulder_press',name:'????',group:'?',equipment:'??',muscles:['?','??'],primary:'????????',secondary:'????',tips:['??????????','?????????????','????????????'],mistakes:['??????','????','????????????'],rest:'90?150 ?'},
    {id:'machine_crunch',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'???',tips:['????????????','??????????????','???????????'],mistakes:['???????','????????','?????????'],rest:'60?90 ?'},
    {id:'sit_up',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'????',tips:['???????????','??????????','?????????????'],mistakes:['??????','?????','???????????'],rest:'45?90 ?'},
    {id:'leg_raise',name:'??',group:'?',equipment:'??',muscles:['?'],primary:'?????',secondary:'????',tips:['??????','?????????','????????????'],mistakes:['??','????','??????????'],rest:'45?90 ?'},
    {id:'butterfly_crunch',name:'??????',group:'?',equipment:'??',muscles:['?'],primary:'???',secondary:'???',tips:['???????????','??????????????','?????????????'],mistakes:['?????','??????','??????'],rest:'45?90 ?'},
    {id:'lying_leg_raise',name:'????',group:'?',equipment:'??',muscles:['?'],primary:'?????',secondary:'????',tips:['??????????','???????????','???????'],mistakes:['????','????????','????'],rest:'45?90 ?'},
    {id:'incline_twist_crunch',name:'??????',group:'?',equipment:'???',muscles:['?'],primary:'???',secondary:'????????',tips:['???????????','???????????','?????????'],mistakes:['????','????','??????'],rest:'45?90 ?'},
    {id:'weighted_russian_twist',name:'???????',group:'?',equipment:'??/???',muscles:['?'],primary:'???',secondary:'????????',tips:['??????????','???????????','????????'],mistakes:['???????','????','????????'],rest:'45?90 ?'},
    {id:'hammer_one_arm_row',name:'???????',group:'?',equipment:'???????',muscles:['?','??'],primary:'?????????????',secondary:'???????????????',tips:['??????','??????????????','?????????'],mistakes:['??????','??','?????'],rest:'90?150 ?'},
    {id:'assisted_pullup',name:'??????',group:'?',equipment:'?????',muscles:['?','??'],primary:'???',secondary:'???????',tips:['??????????????','??????????','???????????'],mistakes:['??','????','???????????'],rest:'90?150 ?'},
    {id:'goblet_squat',name:'??????',group:'?',equipment:'??',muscles:['?','?'],primary:'????????',secondary:'??????',tips:['??????','?????????','?????????'],mistakes:['????','????','??????'],rest:'90?150 ?'},
    {id:'reverse_hack_squat',name:'????????',group:'?',equipment:'???',muscles:['?','?'],primary:'????????',secondary:'???',tips:['????????????','????????','???????????'],mistakes:['????','????','????'],rest:'2?3 ??'},
    {id:'triceps_rope_overhead',name:'???????',group:'??',equipment:'??',muscles:['??'],primary:'??????',secondary:'??',tips:['??????','??????','?????????'],mistakes:['????','????','??????'],rest:'60?120 ?'},
    {id:'triceps_kickback',name:'???????',group:'??',equipment:'??',muscles:['??'],primary:'????',secondary:'??',tips:['??????????????','???????????','???????????'],mistakes:['??????','??????','????'],rest:'60?90 ?'},
    {id:'bench_dip',name:'?????',group:'??',equipment:'???',muscles:['??'],primary:'????',secondary:'?????????',tips:['????????','?????????????','????????'],mistakes:['????','????','??????'],rest:'60?120 ?'},
    {id:'single_arm_pushdown',name:'??????',group:'??',equipment:'??',muscles:['??'],primary:'????',secondary:'??',tips:['????????','?????????','????????'],mistakes:['??????','????','??????'],rest:'60?90 ?'}
  );


  // V2.5 ??????????? UI?????????
  const GUIDE_SPECIAL={
    bench_press:{tips:[
      '??????????????????????????????????????????????????????????????',
      '????????????????????????????????????????????????',
      '??????????????????????????????????????????????',
      '?? ??????????????????/???????????????? 45??????? 90??',
      '?? ?????????????????????????????????????',
      '?? ???????????????????????????????????????????',
      '?? ?????????????????????????????????????????'
    ],mistakes:[
      '???????????????????????????????????????????',
      '??????? 45??????????????????????????????',
      '???????????????????????????????????????',
      '???????????????????????????????????????',
      '? ????????????????????????????????????????????'
    ]},
    lat_pulldown:{tips:[
      '???????????????????????????????? 1.2?1.5 ?????????',
      '???????????????????? 10??20??????????????????',
      '????????????????????????????????????????????????',
      '????????????/?????????????????? 0.5?1 ??????????',
      '??????? 2?3 ????????????????????????????????????????'
    ],mistakes:[
      '?????????????????????????????',
      '?????????????????????????????',
      '??????????????????????????????',
      '???????????????????????????',
      '??????????????????????????????'
    ]},
    face_pull:{tips:[
      '???????????????????????????????????????????',
      '???????????????????????????????????????????',
      '??????????????????????/????????????????',
      '??????????????????????????????? 1 ?????????????????',
      '???? 2?3 ????????????????????????????????????'
    ],mistakes:[
      '???????????????????????????????????',
      '??????????????????????????????',
      '????????????????????????????????',
      '??????????????????????????????',
      '??????????????????????????????'
    ]},
    incline_twist_crunch:{tips:[
      '????????????????????????????????????????',
      '???????????????????????????????????????',
      '?????????????????????????????????????????????',
      '?????????????????????????????????????????',
      '???????????????????????????????????????????'
    ],mistakes:[
      '??????????????????????????????????',
      '??????????????????????????',
      '?????????????????????????',
      '???????????????????????????????',
      '????????????????????????????????'
    ]},
    hammer_one_arm_row:{tips:[
      '???????????????????????????????????????????????',
      '????????????????????????????????????????????',
      '????????????????????????????????????????????????',
      '?????????/?????? 0.5?1 ??????????????????????????',
      '???? 2?3 ????????????????????????????????????'
    ],mistakes:[
      '??????????????????????????????????',
      '??????????????????????????????????',
      '??????????????????????????????????',
      '????????????????????????????',
      '??????????????????????????'
    ]},
    incline_walk:{tips:[
      '???????? 3?5 ????????????????? 6%?10% ???????? 10%?15%?',
      '??????????????????????????????????????????',
      '??????????????????????????????????',
      '????????????????????????????????????',
      '?????????????????????????????????? 2?3 ???'
    ],mistakes:[
      '? ????????????????????????????????',
      '? ????????????????????????????????',
      '? ??????????????????????????',
      '? ????????????????????????',
      '???????????????????????????'
    ]}
  };
  function genericGuide(ex){
    const pri=ex.primary||ex.group,eq=ex.equipment||'??/??';
    if(ex.type==='cardio')return {tips:[
      `????????? 3?5 ???????????????????????????`,
      `??????????????/????????????????????????????`,
      `????????????????????????????????????????`,
      `????????????????????????????????????????`,
      `????? 2?3 ?????????????????????????`
    ],mistakes:[
      `? ???????????????????????????`,
      `? ???????????????????????????????`,
      `? ????????/???????????????????`,
      `? ????????????????????????`,
      `???????? min ?????????????????`
    ]};
    if(ex.group==='?')return {tips:[
      `?????${eq}???????????????????????/????????????`,
      `???????????????????????????????????????`,
      `?????????????????${pri}?????????????????`,
      `????? 2?3 ?????????/???????????????????`,
      `????????????????????????????????`
    ],mistakes:[
      `? ????????????????????`,
      `? ?????????????????????????`,
      `? ????????????????`,
      `? ????????????????????`,
      `? ???????????????????????????`
    ]};
    if(ex.group==='?')return {tips:[
      `?????${eq}?????????????????????????????`,
      `?????????/???????????????????????????????`,
      `???????????????????????${pri}?????????????`,
      `?????????????????????????????????????`,
      `????????????????????????????????????`
    ],mistakes:[
      `? ?????????????????????`,
      `? ?????????????????????`,
      `? ??????/????????????????`,
      `? ??????????????????`,
      `? ???????????????????????????`
    ]};
    if(ex.group==='?')return {tips:[
      `????????????????????????????????????`,
      `?????????????????????????????????????`,
      `???????${pri}???????????????????????????`,
      `??????????????????????????? 0.5 ???????`,
      `???????????????????????/???????`
    ],mistakes:[
      `? ??????????????????????`,
      `? ??????????????????????`,
      `? ?????????????????????`,
      `? ?????????????????????`,
      `? ???????????????????????`
    ]};
    if(['?','?','??'].includes(ex.group))return {tips:[
      `?????${eq}?????????????????????????????????`,
      `????????????????????????????????????`,
      `????????????????????${pri}?????????????????`,
      `???????????????????????????????`,
      `?????/?????????????????????????`
    ],mistakes:[
      `? ???????????????????/???????`,
      `? ????????????????????????`,
      `? ??????????????????????`,
      `? ?????????????????`,
      `? ?????/??????????????????`
    ]};
    if(ex.group==='??')return {tips:[
      `????/??????????????????????????`,
      `?????????${pri}???????????????????`,
      `???? 2?3 ????????????????????????`,
      `?????????????????????????????`,
      `????????????????????`
    ],mistakes:[`? ?????????`,`? ?????????????????`,`? ???????????`,`? ?????????????`,`? ??????????`]};
    if(ex.group==='??')return {tips:[
      `?????????????????????????????????`,
      `????????????????????????${pri}?????`,
      `????????????????????????????????`,
      `???????????????????????????????????`,
      `???????????????????????????????????`
    ],mistakes:[`? ?????????????????`,`? ??????????????`,`? ????/?????`,`? ??????????????`,`? ????????????`]};
    if(ex.group==='?')return {tips:[
      `???????????????????????????????`,
      `???????????????${pri}???????????????????`,
      `?????????????????????????????????`,
      `????????????????????????????????`,
      `???????????????????????????`
    ],mistakes:[`? ?????????????`,`? ????????????`,`? ??????/??????????`,`? ??????????????`,`? ?????????????????????`]};
    return {tips:[`?????${eq}???????????????????????`,`?????????${pri}???????????`,`??????? 2 ?????????`,`??????????????????????`,`?????????????????????`],mistakes:[`? ???????????`,`? ?????????`,`? ???????????`,`? ???????`,`? ???????????`]};
  }

  EXERCISES.forEach(ex=>{const g=GUIDE_SPECIAL[ex.id]||genericGuide(ex);ex.tips=g.tips;ex.mistakes=g.mistakes;});

  let PLAN = [
    {id:'p1',index:1,name:'? + ?? + ??',note:'? 1 ?',exercises:[
      ['bench_press',3,6,10],['incline_db_press',3,8,12],['pec_deck',2,10,15],['cable_fly',2,12,15],['triceps_pushdown',3,8,12],['overhead_triceps',2,10,15],['lateral_raise',3,12,20]
    ]},
    {id:'p2',index:2,name:'? + ?? + ??',note:'? 2 ?',exercises:[
      ['pullup',3,6,10],['lat_pulldown',3,8,12],['machine_row',3,8,12],['cable_row',2,10,15],['reverse_pec_deck',3,12,20],['barbell_curl',3,8,12],['hammer_curl',2,10,15]
    ]},
    {id:'p3',index:3,name:'? + ? + ?',note:'? 3 ?',exercises:[
      ['smith_shoulder_press',3,6,10],['lateral_raise',3,12,20],['reverse_fly',2,12,20],['hack_squat',3,6,10],['rdl',3,8,12],['leg_curl',2,10,15],['calf_raise',3,10,15],['hanging_leg_raise',3,8,15],['cable_crunch',3,10,15]
    ]},
    {id:'p4',index:4,name:'??????',note:'????? + ??? + ?',exercises:[
      ['incline_press_any',3,8,12],['machine_press',2,10,12],['pulldown_any',3,8,12],['cable_row',2,10,12],['lateral_raise',3,15,20],['bulgarian_split_squat',2,8,12],['leg_curl',2,10,15],['biceps_curl',2,10,15],['triceps_pressdown',2,10,15],['crunch_combo',3,10,20]
    ]}
  ];

  const GYM_SHA='7455efae41b330c265e7cd4b78dfa848e7ce5ebd';
  const GYM_BASE=`https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@${GYM_SHA}`;
  const GYM_DATA_URL=`${GYM_BASE}/data/exercises.json`;
  const GYM_QUERY={bench_press:'barbell bench press',incline_db_press:'dumbbell incline bench press',incline_machine_press:'lever incline chest press',pec_deck:'lever seated fly',cable_fly:'cable middle fly',triceps_pushdown:'cable pushdown',overhead_triceps:'cable overhead triceps extension',lateral_raise:'dumbbell lateral raise',pullup:'pull-up',lat_pulldown:'cable pulldown pro lat bar',machine_row:'lever seated row',cable_row:'cable seated row',reverse_pec_deck:'lever seated reverse fly',barbell_curl:'barbell curl',hammer_curl:'dumbbell hammer curl',smith_shoulder_press:'smith shoulder press',reverse_fly:'dumbbell reverse fly',hack_squat:'sled hack squat',rdl:'barbell romanian deadlift',leg_curl:'lever lying leg curl',calf_raise:'standing calf raise',hanging_leg_raise:'hanging leg raise',cable_crunch:'cable kneeling crunch',incline_press_any:'dumbbell incline bench press',pulldown_any:'cable pulldown pro lat bar',crunch_combo:'crunch',machine_press:'lever chest press',bulgarian_split_squat:'split squat',biceps_curl:'dumbbell biceps curl',triceps_pressdown:'cable pushdown',front_raise:'barbell front raise',barbell_shoulder_press:'barbell standing wide military press',shrug:'dumbbell shrug',flat_db_press:'dumbbell bench press',decline_press:'barbell decline bench press',chest_dip:'chest dip',deadlift:'barbell deadlift',barbell_row:'barbell bent over row',one_arm_db_row:'dumbbell one arm bent-over row',tbar_row:'t-bar row',face_pull:'cable standing rear delt row with rope',arnold_press:'dumbbell arnold press',upright_row:'cable upright row',back_squat:'barbell full squat',leg_press:'sled 45 leg press',leg_extension:'lever leg extension',preacher_curl:'barbell preacher curl',cable_curl:'cable curl',skull_crusher:'barbell lying triceps extension',close_grip_bench:'barbell close-grip bench press',plank:'front plank',wrist_curl:'barbell wrist curl',treadmill_run:'run',incline_walk:'walking on incline treadmill',elliptical:'walk elliptical cross trainer',stationary_bike:'stationary bike run',stair_climber:'walking on stepmill',db_shoulder_press:'dumbbell seated shoulder press',machine_crunch:'lever seated crunch',sit_up:'3/4 sit-up',leg_raise:'lying leg raise flat bench',butterfly_crunch:'3/4 sit-up',lying_leg_raise:'lying leg raise flat bench',incline_twist_crunch:'incline twisting sit-up',weighted_russian_twist:'weighted russian twist',hammer_one_arm_row:'lever one arm lateral high row',assisted_pullup:'assisted pull-up',goblet_squat:'dumbbell goblet squat',reverse_hack_squat:'sled hack squat',triceps_rope_overhead:'cable overhead triceps extension',triceps_kickback:'dumbbell kickback',bench_dip:'bench dip',single_arm_pushdown:'cable one arm tricep pushdown'};
  const GYM_DIRECT={bench_press:'videos/0025-EIeI8Vf.gif',incline_db_press:'videos/0314-ns0SIbU.gif',incline_machine_press:'videos/1299-jHAnWmT.gif',pec_deck:'videos/0596-v3xmPAR.gif',cable_fly:'videos/0188-xLYSdtg.gif',triceps_pushdown:'videos/0201-3ZflifB.gif',overhead_triceps:'videos/0194-2IxROQ1.gif',lateral_raise:'videos/0334-DsgkuIt.gif',pullup:'videos/0652-lBDjFxJ.gif',lat_pulldown:'videos/0197-qdRxqCj.gif',machine_row:'videos/1350-7I6LNUG.gif',cable_row:'videos/0861-fUBheHs.gif',reverse_pec_deck:'videos/0602-myfUsKf.gif',barbell_curl:'videos/0031-25GPyDY.gif',hammer_curl:'videos/0313-slDvUAU.gif',smith_shoulder_press:'videos/0766-903mzG8.gif',reverse_fly:'videos/0383-EAs3xL9.gif',hack_squat:'videos/0743-Qa55kX1.gif',rdl:'videos/0085-wQ2c4XD.gif',leg_curl:'videos/0586-17lJ1kr.gif',calf_raise:'videos/1372-8ozhUIZ.gif',hanging_leg_raise:'videos/0472-I3tsCnC.gif',cable_crunch:'videos/0175-WW95auq.gif',incline_press_any:'videos/0314-ns0SIbU.gif',pulldown_any:'videos/0197-qdRxqCj.gif',crunch_combo:'videos/0972-tZkGYZ9.gif',machine_press:'videos/0577-T0yTjgW.gif',bulgarian_split_squat:'videos/0987-arsYEd3.gif',biceps_curl:'videos/0294-NbVPDMW.gif',triceps_pressdown:'videos/0201-3ZflifB.gif',front_raise:'videos/0041-b2Uoz54.gif',barbell_shoulder_press:'videos/1457-Kyd9Rz5.gif',shrug:'videos/0406-NJzBsGJ.gif',flat_db_press:'videos/0289-SpYC0Kp.gif',decline_press:'videos/0033-GrO65fd.gif',chest_dip:'videos/0251-9WTm7dq.gif',deadlift:'videos/0032-ila4NZS.gif',barbell_row:'videos/0027-eZyBC3j.gif',one_arm_db_row:'videos/0292-C0MA9bC.gif',tbar_row:'videos/1349-BgljGjd.gif',face_pull:'videos/0233-ZfyAGhK.gif',arnold_press:'videos/2137-Xy4jlWA.gif',upright_row:'videos/0246-cALKspW.gif',back_squat:'videos/0043-qXTaZnJ.gif',leg_press:'videos/0739-10Z2DXU.gif',leg_extension:'videos/0585-my33uHU.gif',preacher_curl:'videos/0070-qOgPVf6.gif',cable_curl:'videos/0868-G08RZcQ.gif',skull_crusher:'videos/0061-iZop9xO.gif',close_grip_bench:'videos/0030-J6Dx1Mu.gif',plank:'videos/0464-CosupLu.gif',wrist_curl:'videos/0126-82LxxkW.gif',treadmill_run:'videos/0685-oLrKqDH.gif',incline_walk:'videos/3666-rjiM4L3.gif',elliptical:'videos/2141-rjtuP6X.gif',stationary_bike:'videos/2138-H1PESYI.gif',stair_climber:'videos/2311-j9Q5crt.gif',db_shoulder_press:'videos/0405-znQUdHY.gif',machine_crunch:'videos/1452-Wgaz7pm.gif',sit_up:'videos/0001-2gPfomN.gif',leg_raise:'videos/0620-WhuFnR7.gif',butterfly_crunch:'videos/0001-2gPfomN.gif',lying_leg_raise:'videos/0620-WhuFnR7.gif',incline_twist_crunch:'videos/0495-9ZGZuOD.gif',weighted_russian_twist:'videos/0846-fZFZ704.gif',hammer_one_arm_row:'videos/1356-OIFMAp1.gif',assisted_pullup:'videos/0017-kiJ4Z2K.gif',goblet_squat:'videos/1760-yn8yg1r.gif',reverse_hack_squat:'videos/0743-Qa55kX1.gif',triceps_rope_overhead:'videos/0194-2IxROQ1.gif',triceps_kickback:'videos/0333-W6PxUkg.gif',bench_dip:'videos/0129-RrLske5.gif',single_arm_pushdown:'videos/1723-qRZ5S1N.gif'};
  const GYM_GROUP_FALLBACK={?:'videos/0025-EIeI8Vf.gif',?:'videos/0652-lBDjFxJ.gif',?:'videos/0334-DsgkuIt.gif',?:'videos/0043-qXTaZnJ.gif',?:'videos/0043-qXTaZnJ.gif',??:'videos/0405-znQUdHY.gif',??:'videos/0025-EIeI8Vf.gif',?:'videos/0001-2gPfomN.gif',??:'videos/0043-qXTaZnJ.gif',??:'videos/2141-rjtuP6X.gif'};
  const GYM_MAP_KEY='train-log-gym-media-map-v27';let persistedGymMap={};try{persistedGymMap=JSON.parse(localStorage.getItem(GYM_MAP_KEY)||'{}')||{};}catch(e){}const saveGymMap=()=>{try{localStorage.setItem(GYM_MAP_KEY,JSON.stringify(persistedGymMap));}catch(e){}};
  const VIDEO_MAP={
    bench_press:{bvid:'BV1zv4y1V7ks',author:'ALEX????',duration:624,title:'??????????'},
    incline_db_press:{bvid:'BV1Dg4y1d75K',author:'ALEX????',duration:562,title:'??????'},
    incline_machine_press:{bvid:'BV1di42197hF',author:'ALEX????',duration:391,title:'??????'},
    pec_deck:{bvid:'BV1Lg4y1A7tY',author:'ALEX????',duration:568,title:'???????'},
    cable_fly:{bvid:'BV1W8411Y7Nx',author:'ALEX????',duration:607,title:'???????'},
    triceps_pushdown:{bvid:'BV1fjMyzZEt5',author:'ALEX????',duration:405,title:'????????'},
    overhead_triceps:{bvid:'BV1wm6dBFEd8',author:'ALEX????',duration:341,title:'?????'},
    lateral_raise:{bvid:'BV1n8411j7uE',author:'ALEX????',duration:787,title:'?????'},
    pullup:{bvid:'BV1TG4y1F7m1',author:'ALEX????',duration:472,title:'????'},
    lat_pulldown:{bvid:'BV1oa4y1z73J',author:'ALEX????',duration:336,title:'????'},
    machine_row:{bvid:'BV1m2421L7tw',author:'ALEX????',duration:454,title:'??????'},
    cable_row:{bvid:'BV1y14y1X7by',author:'ALEX????',duration:639,title:'??????'},
    reverse_pec_deck:{bvid:'BV1huHNzMEhC',author:'???????',duration:101,title:'???????'},
    barbell_curl:{bvid:'BV1dP4y1D7Uc',author:'ALEX????',duration:579,title:'????'},
    hammer_curl:{bvid:'BV19a4y1q7Q3',author:'UP??',duration:25,title:'??????'},
    smith_shoulder_press:{bvid:'BV1eV4y1h74Y',author:'ALEX????',duration:582,title:'?????'},
    reverse_fly:{bvid:'BV1Sy421i79H',author:'ALEX????',duration:440,title:'????????'},
    hack_squat:{bvid:'BV13j411B7Xu',author:'ALEX????',duration:533,title:'????'},
    rdl:{bvid:'BV1Zt421g7p5',author:'???',duration:691,title:'??????'},
    leg_curl:{bvid:'BV1Hx4y1Y7TN',author:'ALEX????',duration:478,title:'???'},
    calf_raise:{bvid:'BV1N7411i7Jq',author:'FE???????',duration:315,title:'??????'},
    hanging_leg_raise:{bvid:'BV1A22EY7Eog',author:'ALEX????',duration:254,title:'????'},
    cable_crunch:{bvid:'BV1jxc1e2ELU',author:'ALEX????',duration:401,title:'???????'},
    incline_press_any:{bvid:'BV1ip4y1N7tG',author:'ALEX????',duration:351,title:'????'},
    machine_press:{bvid:'BV1AC411x7np',author:'ALEX????',duration:346,title:'??????'},
    pulldown_any:{bvid:'BV1oa4y1z73J',author:'ALEX????',duration:336,title:'???????????'},
    bulgarian_split_squat:{bvid:'BV12M411L7k8',author:'ALEX????',duration:541,title:'???????'},
    biceps_curl:{bvid:'BV1anmCYNEbK',author:'ALEX????',duration:495,title:'??????'},
    triceps_pressdown:{bvid:'BV1fjMyzZEt5',author:'ALEX????',duration:405,title:'??????'},
    crunch_combo:{bvid:'BV1WD421G7Lb',author:'????Online',duration:86,title:'????? V-Up'},
    front_raise:{bvid:'BV1hZ421N7aE',author:'ALEX????',duration:523,title:'?????'},
    barbell_shoulder_press:{bvid:'BV1iG411e7xW',author:'ALEX????',duration:579,title:'????'},
    shrug:{bvid:'BV1FV411m7aT',author:'????',duration:355,title:'????'},
    flat_db_press:{bvid:'BV1LM411z7sS',author:'ALEX????',duration:740,title:'??????'},
    decline_press:{bvid:'BV1HXXsBBEiE',author:'???',duration:933,title:'????'},
    chest_dip:{bvid:'BV1bL411Z7RU',author:'FitMen??',duration:64,title:'????????'},
    deadlift:{bvid:'BV1MA411U7Cn',author:'ALEX????',duration:505,title:'????'},
    barbell_row:{bvid:'BV17Y4y1Q7PJ',author:'ALEX????',duration:529,title:'??????'},
    one_arm_db_row:{bvid:'BV1mzZiYNEjj',author:'???????',duration:117,title:'??????'},
    tbar_row:{bvid:'BV1bG4y1J7mj',author:'ALEX????',duration:491,title:'T ???'},
    face_pull:{bvid:'BV1pe41127xk',author:'ALEX????',duration:512,title:'????'},
    arnold_press:{bvid:'BV1xeRoYEE6e',author:'???????',duration:70,title:'?????'},
    upright_row:{bvid:'BV19U4y1a76N',author:'19347978894',duration:27,title:'??????'},
    back_squat:{bvid:'BV1kM411F7G7',author:'ALEX????',duration:690,title:'????'},
    leg_press:{bvid:'BV1gs4y167gt',author:'ALEX????',duration:668,title:'?????'},
    leg_extension:{bvid:'BV1Pj411y7fy',author:'ALEX????',duration:450,title:'?????'},
    preacher_curl:{bvid:'BV1GN4y1Q75g',author:'ALEX????',duration:427,title:'?????'},
    cable_curl:{bvid:'BV1vm421p749',author:'ALEX????',duration:357,title:'????'},
    skull_crusher:{bvid:'BV1pD421H7zw',author:'???',duration:626,title:'?????'},
    close_grip_bench:{bvid:'BV14m421E71T',author:'???',duration:589,title:'????'},
    plank:{bvid:'BV14w411V7Yj',author:'???',duration:330,title:'????'},
    wrist_curl:{bvid:'BV1vb411A7c3',author:'????????',duration:62,title:'???'},
    treadmill_run:{bvid:'BV13L4y1u7fz',author:'???????',duration:331,title:'??????'},
    incline_walk:{bvid:'BV14u4m1M7d3',author:'????',duration:58,title:'??????'},
    elliptical:{bvid:'BV11t411w78E',author:'??????',duration:148,title:'?????????'},
    stationary_bike:{bvid:'BV1fos5etEAE',author:'YPOO??',duration:1250,title:'????????'},
    stair_climber:{bvid:'BV1FJkJB8ELG',author:'????',duration:155,title:'???????'},
    db_shoulder_press:{bvid:'BV1Z841187pJ',author:'ALEX????',duration:751,title:'????'},
    machine_crunch:{bvid:'BV1cGSDYrEP7',author:'ALEX????',duration:403,title:'??????'},
    sit_up:{bvid:'BV1Tt4y1b7CH',author:'??????',duration:46,title:'????'},
    leg_raise:{bvid:'BV18d4y137pp',author:'????',duration:135,title:'??????'},
    butterfly_crunch:{bvid:'BV1H2DaYbEpz',author:'???????',duration:31,title:'????'},
    lying_leg_raise:{bvid:'BV1R64y1H7Gv',author:'???????',duration:47,title:'????'},
    incline_twist_crunch:{bvid:'BV1eW411r7Xz',author:'YouthOnem',duration:204,title:'??????'},
    weighted_russian_twist:{bvid:'BV16PUSYPEVK',author:'????Online',duration:101,title:'?????????'},
    hammer_one_arm_row:{bvid:'BV1av4y1n7Kk',author:'????668',duration:8,title:'???????'},
    assisted_pullup:{bvid:'BV16T4y1a7Wh',author:'Oh?Connie?',duration:107,title:'??????'},
    goblet_squat:{bvid:'BV1TT4y1p7YR',author:'???',duration:496,title:'??????'},
    reverse_hack_squat:{bvid:'BV11k4y127f2',author:'Nikko??',duration:133,title:'????????'},
    triceps_rope_overhead:{bvid:'BV1wm6dBFEd8',author:'ALEX????',duration:341,title:'???????'},
    triceps_kickback:{bvid:'BV1sw411G7jY',author:'???',duration:361,title:'???????'},
    bench_dip:{bvid:'BV1jMSYYnE4Q',author:'Ariel_?',duration:11,title:'?????'},
    single_arm_pushdown:{bvid:'BV1nQ4y1K7d5',author:'????',duration:47,title:'??????'}
  };
  const BILIBILI_COVER_BASE='https://i0.hdslb.com/bfs/archive/';
  const BILIBILI_COVERS={lateral_raise:'fef5a5187b709d76692502190efda94b20fc37b4.jpg',bench_press:'f8bda2da2822225ade65d47a60eb4768c9f42e90.jpg',pec_deck:'34bc75e751b7b297aa59581f63d4a6189b24e316.jpg',cable_row:'ef0a041b1a04cad8294eecefa45ea6e4a982c600.jpg',reverse_pec_deck:'91843880fa34c9b593e32e2eebb17b6d03197be6.jpg',machine_row:'2f3adfd6b5eb9edce229933b32e432534b597da6.jpg',cable_fly:'4c2dab4209f276d07bf4ecbac87f648b05616525.jpg',pullup:'4508edea441b4b6c4caceb63f1ae9690120097ce.jpg',calf_raise:'80185cb7cde43c8d42d9e2c905301f809c3fecab.jpg',bulgarian_split_squat:'ea3ab0170f0ea7017f42760b13a03f5d1de84bb1.jpg',lat_pulldown:'4a68d20bbc774ccee2b2ae8d9627c822739a5f45.jpg',hack_squat:'402cf2265b67dd8a49c605c92cdc38153547b6a3.jpg',tbar_row:'b6865253315ab916d854316cf1a9d25dce6af3fe.jpg',chest_dip:'7b7eaec3b514fe67974d01f344bddf5cba353eba.jpg',barbell_shoulder_press:'12d998578cf5c0752d119fb91a875bd6c5a19309.jpg',front_raise:'19711bc78ee58e65949dc12fe7da68d4e94d232f.jpg',flat_db_press:'b5aaa6250bae92fd0c86cb954a4d33a8ae74121c.jpg',smith_shoulder_press:'0cf948b02785fc957f8e8205cfd40c3fad2b93f6.jpg',biceps_curl:'786ff8839cdc1448bbfe167762ccd48e8e3d7b48.jpg',hanging_leg_raise:'0a6fe2b1601df365ae2f9898ebc9cca9848acd07.jpg',incline_db_press:'6a41da7c7446a2b10bc55da1654bcc9d10830292.jpg',overhead_triceps:'1d4094d0553056a88c883fb726143fdc571aa11f.jpg',face_pull:'4f1344bbf04f539f423c9637f4c3ed93d0267a0f.jpg',incline_machine_press:'8432de217d440bfba1bbc4c3885ccba4af8f9810.jpg',leg_curl:'a79e3726a8358f992f356ee64932b1931bc63990.jpg',triceps_pushdown:'6db4e40dfa340a3801e3f8047e718f6f33c7b590.jpg',barbell_curl:'9e6c81f8f9ee37f317d754722de942c7f8a39bb8.jpg',incline_press_any:'e9834cbad16cc41b114d240324c5c3f189413e40.jpg',reverse_fly:'37dfde7d25f622f0daf69050a5750f8cd35361f7.jpg',stair_climber:'871640d4a208f088e3148c43673d77a0b73ef04a.jpg',triceps_pressdown:'6db4e40dfa340a3801e3f8047e718f6f33c7b590.jpg',weighted_russian_twist:'7912a03a3dcab3e355582cea5e61662d5b91292c.jpg',skull_crusher:'6cfc45274619b7d956e34504520f4416c69b9667.jpg',incline_walk:'5bea29f5eb42f17daa99502f05bdf5be293ef183.jpg',single_arm_pushdown:'eda1f6d139ad22c07af28428a5e04f77cffc40d2.jpg',upright_row:'906198d2c7a9320fec4280ae6c9c32963b565747.png',decline_press:'fbf76c2cb1dda1777118471b92e9766723c93a91.jpg',cable_crunch:'cd353bc561ebb57b36ae797eee651e34afd7b2b7.jpg',preacher_curl:'d5a43d3c6689abbdf0bdc92eb7ea2153c420835c.jpg',stationary_bike:'11d85fdef99962c8f7bf28d34250eecfeacfd0fb.jpg',leg_extension:'a5a2683d1010a615b602fd4b705cfef0c28a1489.jpg',one_arm_db_row:'77d07529bcc516116500429bf930b3b4205b9263.jpg',hammer_curl:'bd28c2ef1771dd32f1707b7703dfc82e81b9d9b4.jpg',reverse_hack_squat:'4a1f744380cbd200366563c319bc5fe4072417f9.jpg',crunch_combo:'9fc51b4f708d06e83558340c55600fae085c77fd.jpg',shrug:'a93cad94de9c610d5584e7fdd861b6995c42527c.png',lying_leg_raise:'90861388f6c342a071dfe1d78d520e09091b0c52.jpg',arnold_press:'b8cf15422fcd696bb4920d68a6d4545a6fbf6d62.jpg',elliptical:'f345bb1d2dda0a88768715ce6ebe2e58afbe8d0d.jpg',butterfly_crunch:'fcebc0b97a3180341c0d12071d5df161d4e375c1.jpg',pulldown_any:'4a68d20bbc774ccee2b2ae8d9627c822739a5f45.jpg',barbell_row:'3087ee9d1339543e04a8007a28914155fb5d5064.jpg',treadmill_run:'ad527dd78e0451213784d2dbdd733c708b8cdaaa.jpg',back_squat:'c0385d00ba1e97569d81a104ca1535668b9ffe08.jpg',bench_dip:'7e9fa030a452b627878a898f09eabc52ea02f2e9.jpg',machine_press:'db7fa1cd33d863b53c25feb5f238822ae6b4943f.jpg',machine_crunch:'68bcd88d1ae4001423b3821c713d0f054d0056ce.jpg',incline_twist_crunch:'77a28b9e3c7f3a3586d866d45641b3efa8b373d5.jpg',assisted_pullup:'e3e0edb952bf000a2977c5475e0c04495364bfad.jpg',rdl:'0f64d22d1d526b544ffc71f093b26d2e9ab16e28.jpg',wrist_curl:'avsas_i181030txjplqpkcl58q31d7kv9827kk_0004.jpg',sit_up:'92903114f8c4bdd7362750194fcd0133ffa634d9.jpg',cable_curl:'8bed1eadfd7075b2c86d7bdb102c03ed66259097.jpg',db_shoulder_press:'8dd14ef399ef6a25c39c5c23fdd80cc02b034bb9.jpg',leg_raise:'80daefc1b4dc65837e082a5a95cca89182d47bcc.jpg',leg_press:'187f4aa21c9bdb02d571a4f4aa2ef9fc2a75e213.jpg',triceps_rope_overhead:'1d4094d0553056a88c883fb726143fdc571aa11f.jpg',deadlift:'8975647ceb5c35a79afd23622687efa0b804549a.jpg',goblet_squat:'b66a52125f947a4ce7f81ee478bc5434b012f253.jpg',hammer_one_arm_row:'e68e53afab1a507378df4054738686ef6e8d58ef.jpg',plank:'0da2378d19743b5b62752c47131a880c65ad401b.jpg',triceps_kickback:'094d4162db4484b23aebabaac432fac9490224e4.jpg',close_grip_bench:'f3adc2c30afa17dfe126933b257c121bcf8cabb3.jpg'};
  let gymIndexPromise=null; const gymCache={}; let gymVisibilityObserver=null;
  const DIET = {
    training:{label:'???',kcal:2400,protein:150,fat:65,carbs:300},
    rest:{label:'???',kcal:2200,protein:150,fat:70,carbs:240},
    meals:[
      ['??','?? 2 ? + ?? 60 g + ?? 250?300 ml + ?? 1 ?'],
      ['??','??? 250?300 g + ??/?? 180?200 g + ??? 300 g'],
      ['??? 1?2 ??','?? + ??/??/????????? 20?30 g ???'],
      ['??','??? 200?250 g + ??/?/?/?? 180?200 g + ????'],
      ['??????','???? 25?30 g ????']
    ]
  };

  const defaultState = () => ({
    version:VERSION,
    profile:{age:29,height:null,goal:'??????????????????????????????????'},
    bodyMetrics:[{id:uid(),date:today(),weight:72,bodyFat:18,skeletalMuscle:31.7,leanMass:59,waist:null}],
    workouts:[],
    activeWorkout:null,
    plans:JSON.parse(JSON.stringify(PLAN)),
    meta:{updatedAt:new Date().toISOString(),lastBackupAt:null,storage:'indexeddb'},
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
  let activeExerciseFilter = '??';
  let recordMonthOpen = false;
  let recordYear = null;
  let selectedRecordMonth = null;
  let dataTab = 'body';
  let dietBatch = 0;
  let dietMode = state.settings.dietMode || 'training';
  let pendingFreeWorkout=false;
  let historyEditDraft=null;
  let storageDb=null;
  let storageReady=false;
  let storageFallback=false;
  let persistenceQueue=Promise.resolve();
  let persistedSections={};
  let recordReportPeriod='month';
  let recordReportAnchor=new Date();

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
  function exercise(id){ return allExercises().find(x=>x.id===id) || {id,name:id,group:'??',muscles:['??'],primary:'??',secondary:'',tips:[],mistakes:[],rest:'60?120 ?'}; }
  function planById(id){ return PLAN.find(p=>p.id===id); }
  function formatDate(dateStr){ if(!dateStr)return ''; const d=new Date(`${dateStr}T00:00:00`); return `${d.getMonth()+1}?${d.getDate()}?`; }
  function formatDateTime(ts){ const d=new Date(ts); return `${d.getMonth()+1}?${d.getDate()}? ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function backupStatus(){
    const ts=state.meta?.lastBackupAt;if(!ts)return {date:'????',days:null,warning:true,text:'???????????????'};
    const d=new Date(ts),days=Math.max(0,Math.floor((Date.now()-d.getTime())/86400000));
    return {date:`${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`,days,warning:days>=14,text:days===0?'?????':`?? ${days} ????`};
  }
  function currentDateLabel(){const d=new Date(),week=['???','???','???','???','???','???','???'];return `${d.getMonth()+1}?${d.getDate()}?${week[d.getDay()]}`;}
  function pageIntro(title,subtitle,actions=''){return `<div class="page-intro"><div class="page-intro-copy"><div class="page-title">${esc(title)}</div><div class="page-subtitle">${esc(subtitle)}</div></div>${actions?`<div class="page-intro-actions">${actions}</div>`:''}</div>`;}
  function scheduleDateRefresh(){const now=new Date(),next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,2);setTimeout(()=>{if(page==='home')renderHome();scheduleDateRefresh();},Math.max(1000,next-now));}
  function durationText(ms){ const min=Math.max(1,Math.round(ms/60000)); if(min<60)return `${min} ??`; return `${Math.floor(min/60)}?? ${min%60}??`; }
  function sinceText(ts){ if(!ts)return '??????'; const ms=Date.now()-new Date(ts).getTime(); const h=Math.max(0,Math.floor(ms/3600000)); if(h<1)return `${Math.floor(ms/60000)} ??`; if(h<24)return `${h} ??`; return `${Math.floor(h/24)}? ${h%24}??`; }
  function loadState(){ try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw){ const s=JSON.parse(raw); return {...defaultState(),...s}; } }catch(e){} return defaultState(); }
  function normalizeState(input){
    const base=defaultState(),next={...base,...(input||{})};
    next.bodyMetrics=(Array.isArray(next.bodyMetrics)?next.bodyMetrics:[]).map(x=>({...x,id:x.id||uid()}));
    next.workouts=(Array.isArray(next.workouts)?next.workouts:[]).map(x=>({...x,id:x.id||uid()}));
    next.customExercises=(Array.isArray(next.customExercises)?next.customExercises:[]).map(x=>({...x,id:x.id||`custom_${uid()}`}));
    next.settings={...base.settings,...(next.settings||{})};
    next.wellness={...base.wellness,...(next.wellness||{})};
    next.meta={...base.meta,...(next.meta||{}),storage:'indexeddb'};
    next.plans=(Array.isArray(next.plans)&&next.plans.length?next.plans:JSON.parse(JSON.stringify(PLAN))).map((x,i)=>({...x,id:x.id||`plan_${i+1}`}));
    return next;
  }
  function idbRequest(request){return new Promise((resolve,reject)=>{request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error||new Error('IndexedDB request failed'));});}
  function idbTransactionDone(tx){return new Promise((resolve,reject)=>{tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('IndexedDB transaction failed'));tx.onabort=()=>reject(tx.error||new Error('IndexedDB transaction aborted'));});}
  function openStorageDb(){
    if(!('indexedDB' in window))return Promise.reject(new Error('IndexedDB unavailable'));
    return new Promise((resolve,reject)=>{
      const request=indexedDB.open(DB_NAME,DB_VERSION);
      request.onupgradeneeded=()=>{const db=request.result;DB_STORES.forEach(name=>{if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:name==='settings'||name==='backup_meta'?'key':'id'});});};
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error||new Error('IndexedDB open failed'));
    });
  }
  async function readIndexedState(){
    const tx=storageDb.transaction(DB_STORES,'readonly');
    const done=idbTransactionDone(tx);
    const [workouts,customExercises,plans,bodyMetrics,settingsRows,backupRows]=await Promise.all([
      idbRequest(tx.objectStore('workouts').getAll()),idbRequest(tx.objectStore('exercises').getAll()),idbRequest(tx.objectStore('plans').getAll()),idbRequest(tx.objectStore('body_metrics').getAll()),idbRequest(tx.objectStore('settings').getAll()),idbRequest(tx.objectStore('backup_meta').getAll())
    ]);
    await done;
    const app=settingsRows.find(x=>x.key==='app')?.value;
    if(!app&&!workouts.length&&!customExercises.length&&!plans.length&&!bodyMetrics.length)return null;
    const backup=backupRows.find(x=>x.key==='lastBackupAt')?.value||app?.meta?.lastBackupAt||null;
    return normalizeState({...app,workouts,customExercises,plans,bodyMetrics,meta:{...(app?.meta||{}),lastBackupAt:backup}});
  }
  async function writeIndexedState(snapshot,force=false){
    if(!storageDb)return;
    const app={version:VERSION,profile:snapshot.profile,activeWorkout:snapshot.activeWorkout,wellness:snapshot.wellness,settings:snapshot.settings,meta:snapshot.meta};
    const sections={workouts:snapshot.workouts||[],exercises:snapshot.customExercises||[],plans:snapshot.plans||[],body_metrics:snapshot.bodyMetrics||[],settings:[{key:'app',value:app}],backup_meta:[{key:'lastBackupAt',value:snapshot.meta?.lastBackupAt||null}]};
    const changed=DB_STORES.filter(name=>force||persistedSections[name]!==JSON.stringify(sections[name]));
    if(!changed.length)return;
    const tx=storageDb.transaction(changed,'readwrite');
    changed.forEach(name=>{const store=tx.objectStore(name);store.clear();sections[name].forEach(item=>store.put(item));});
    await idbTransactionDone(tx);
    changed.forEach(name=>persistedSections[name]=JSON.stringify(sections[name]));
  }
  function queueIndexedSave(force=false){
    const snapshot=JSON.parse(JSON.stringify(state));
    persistenceQueue=persistenceQueue.catch(()=>{}).then(()=>writeIndexedState(snapshot,force)).catch(()=>{storageFallback=true;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(snapshot));}catch(e){}});
    return persistenceQueue;
  }
  async function initializeStorage(){
    try{
      storageDb=await openStorageDb();
      const indexed=await readIndexedState();
      if(indexed){state=indexed;if(Array.isArray(state.plans)&&state.plans.length)PLAN=state.plans;}
      else{state=normalizeState(state);PLAN=state.plans;await writeIndexedState(state,true);}
      storageReady=true;
      try{localStorage.removeItem(STORAGE_KEY);}catch(e){}
      render();
    }catch(e){storageFallback=true;state=normalizeState(state);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(err){}}
  }
  function saveState(){
    state.meta={...(state.meta||{}),updatedAt:new Date().toISOString(),storage:'indexeddb'};
    state.plans=PLAN;
    if(storageReady)queueIndexedSave();
    else if(storageFallback){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){}}
  }

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
    if(pts.length<2)return '<div class="chart-empty">???? 2 ??????????<br>??????????????</div>';
    const values=pts.map(p=>Number(p.weight)),min=Math.min(...values)-.5,max=Math.max(...values)+.5,w=320,h=150,pad=20,span=Math.max(1,max-min);
    const xy=pts.map((p,i)=>[pad+i*(w-2*pad)/(pts.length-1),h-pad-(Number(p.weight)-min)/span*(h-2*pad)]);
    const path=xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="????"><line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="#e7e9ee"/><path d="${path}" fill="none" stroke="#1677ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#fff" stroke="#1677ff" stroke-width="2"/><text x="${p[0]}" y="${p[1]-8}" text-anchor="middle" font-size="8" fill="#707681">${values[i]}</text>`).join('')}</svg>`;
  }
  function strengthStats(){
    const map={};
    (Array.isArray(state.workouts)?state.workouts:[]).forEach(w=>(w.exercises||[]).forEach(entry=>{
      const done=performanceSets(entry);
      if(!done.length)return;
      const id=entry.exerciseId;
      if(!map[id])map[id]={id,name:entry.customName||exercise(id).name,sessions:0,bestWeight:0,best1RM:0};
      map[id].sessions++;
      map[id].bestWeight=Math.max(map[id].bestWeight,...done.map(s=>Number(s.weight)||0));
      map[id].best1RM=Math.max(map[id].best1RM,...done.map(s=>estimated1RM(s.weight,s.reps)));
    }));
    Object.values(map).forEach(x=>x.best1RM=round(x.best1RM,1));
    return Object.values(map).sort((a,b)=>b.sessions-a.sessions||b.bestWeight-a.bestWeight);
  }
  function estimated1RM(weight,reps){
    const w=Number(weight)||0,r=clamp(Number(reps)||0,1,15);
    return w>0&&r>0?w*(1+r/30):0;
  }
  function performanceSets(entry){
    return (entry.sets||[]).filter(s=>s.done&&!s.warmup).flatMap(s=>[s,...(s.drops||[])]).filter(s=>num(s.weight)!==null&&num(s.reps)!==null&&Number(s.weight)>0&&Number(s.reps)>0);
  }
  function showStrength(id){
    const records=[];
    [...(Array.isArray(state.workouts)?state.workouts:[])].sort((a,b)=>new Date(a.endedAt)-new Date(b.endedAt)).forEach(w=>{
      const entry=(w.exercises||[]).find(x=>x.exerciseId===id);
      if(entry&&(entry.sets||[]).some(s=>s.done))records.push({date:w.endedAt,sets:(entry.sets||[]).filter(s=>s.done)});
    });
    const ex=exercise(id),flat=records.flatMap(r=>r.sets.flatMap(s=>[s,...(s.drops||[])])),best=flat.length?Math.max(...flat.map(s=>Number(s.weight)||0)):0,best1RM=flat.length?round(Math.max(...flat.map(s=>estimated1RM(s.weight,s.reps))),1):0;
    openModal(ex.name,`<div class="card"><div class="stat-row"><span>????</span><strong>${records.length}</strong></div><div class="stat-row"><span>??????</span><strong>${best} kg</strong></div><div class="stat-row"><span>???? 1RM</span><strong>${best1RM} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">??</div><div class="list">${records.slice().reverse().map(r=>`<div class="list-item"><div class="grow"><strong>${formatDateTime(r.date)}</strong><small>${esc(setSummary(r.sets,ex))}</small></div></div>`).join('')}</div></section><div class="info-note">?? 1RM ?? Epley ??????? 15 ??????? 15 ???????????</div>`);
  }
  const RECOVERY_GROUPS=['?','?','?','??','??','?','?','?'];
  function exerciseRecoveryWeights(ex){
    const weights={};
    const add=(group,value)=>{if(RECOVERY_GROUPS.includes(group))weights[group]=Math.max(weights[group]||0,value);};
    if(ex.type==='cardio'){
      if(['treadmill_run','incline_walk','elliptical','stationary_bike','stair_climber'].includes(ex.id)){add('?',.42);add('?',.28);if(ex.id==='incline_walk'||ex.id==='stair_climber')add('?',.42);}
      if(ex.id==='rowing_machine'){add('?',.35);add('?',.32);add('??',.16);}
      return weights;
    }
    add(ex.group,1);
    (ex.muscles||[]).forEach(g=>add(g,g===ex.group?1:.45));
    const text=`${ex.primary||''} ${ex.secondary||''}`;
    if(/?/.test(text))add('?',ex.group==='?' ? .55 : .45);
    if(/???|??|?|??/.test(text))add('?',ex.group==='?'?1:.45);
    if(/???|??/.test(text))add('??',ex.group==='??'?1:.42);
    if(/???|??|??/.test(text))add('??',ex.group==='??'?1:.42);
    if(/???|?/.test(text))add('?',ex.group==='?'?1:.38);
    if(/?|??/.test(text))add('?',ex.group==='?'?1:.3);
    return weights;
  }
  function setRecoveryEffort(set,entryBest=0,drop=false){
    const reps=Number(set.reps)||0,weight=Number(set.weight)||0;
    if(!reps&&!weight)return 0;
    const repFactor=reps<=5?1.16:reps<=12?1:reps<=20 ? .86 : .7;
    const loadFactor=weight>0&&entryBest>0?clamp(.72+.36*(weight/entryBest),.72,1.08):.9;
    return repFactor*loadFactor*(drop ? .68 : 1);
  }
  function muscleRecoveryDetails(){
    const remaining=Object.fromEntries(RECOVERY_GROUPS.map(g=>[g,[]])),cutoff=Date.now()-7*86400000;
    (state.workouts||[]).filter(w=>w.endedAt&&new Date(w.endedAt).getTime()>=cutoff).forEach(w=>{
      const hours=Math.max(0,(Date.now()-new Date(w.endedAt).getTime())/3600000),sessionLoads={};
      (w.exercises||[]).forEach(entry=>{
        const ex=exercise(entry.exerciseId),weights=exerciseRecoveryWeights(ex),main=(entry.sets||[]).filter(s=>s.done&&!s.warmup),entryBest=Math.max(0,...main.map(s=>Number(s.weight)||0));
        let effort=0;main.forEach(s=>{effort+=setRecoveryEffort(s,entryBest,false);(s.drops||[]).forEach(d=>effort+=setRecoveryEffort(d,entryBest,true));});
        Object.entries(weights).forEach(([g,wgt])=>sessionLoads[g]=(sessionLoads[g]||0)+effort*wgt);
      });
      Object.entries(sessionLoads).forEach(([g,load])=>{
        const fatigue=clamp(load*13.5,10,95),duration=clamp(48+load*8,48,144);
        if(hours<duration)remaining[g].push(fatigue*Math.pow(1-hours/duration,1.12));
      });
    });
    const sleep=Number(state.wellness?.sleep||3),energy=Number(state.wellness?.energy||3),soreness=Number(state.wellness?.soreness||2);
    const readinessAdj=({1:-7,2:-4,3:0,4:2,5:4}[sleep]||0)+({1:-7,2:-4,3:0,4:2,5:4}[energy]||0)+({1:1,2:0,3:-2,4:-5,5:-8}[soreness]||0);
    const scores={};RECOVERY_GROUPS.forEach(g=>{const combined=1-remaining[g].reduce((fresh,fatigue)=>fresh*(1-clamp(fatigue,0,100)/100),1);scores[g]=Math.round(clamp(100-combined*100+readinessAdj,0,100));});
    return {scores,readinessAdj};
  }
  function muscleRecovery(){return muscleRecoveryDetails().scores;}
  function recovery(){
    const last=latestWorkout();
    if(!last)return {score:100,label:'????',base:100,items:[['??????','???????',0]]};
    const {scores,readinessAdj}=muscleRecoveryDetails(),values=Object.values(scores).sort((a,b)=>a-b),base=Math.round(values.slice(0,4).reduce((a,b)=>a+b,0)/Math.min(4,values.length));
    const score=Math.round(clamp(base,0,100)),label=score>=90?'????':score>=75?'????':score>=55?'????':score>=30?'????':'????';
    const lowest=Object.entries(scores).sort((a,b)=>a[1]-b[1]).slice(0,3).map(([g,v])=>`${g} ${v}%`).join(' ? ');
    return {score,label,base,items:[['??????',sinceText(last.endedAt),0],['??????',lowest,0],['??????',`${readinessAdj>=0?'+':''}${readinessAdj}%`,readinessAdj]]};
  }
  function showRecoveryDetail(){
    const r=recovery();
    openModal('????',`<div class="card flat"><div class="stat-row"><span>????</span><strong>${r.score}% ? ${esc(r.label)}</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">????</div><div class="card flat">${r.items.map(([name,value])=>`<div class="stat-row"><span>${esc(name)}</span><strong>${esc(value)}</strong></div>`).join('')}</div></section><div class="note">???????????????????????/?????? 7 ??????????????????????? 48?72 ????????? 6 ??? 100%????????????????</div>`);
  }
  function showWellness(){
    const w=state.wellness;
    const options=(selected)=>[1,2,3,4,5].map(v=>`<option value="${v}" ${Number(selected)===v?'selected':''}>${v}</option>`).join('');
    openModal('??????',`<div class="form-grid"><div class="field"><label>?????1?5?</label><select id="wellness-sleep">${options(w.sleep)}</select></div><div class="field"><label>?????1?5?</label><select id="wellness-energy">${options(w.energy)}</select></div><div class="field full"><label>?????1=??5=??</label><select id="wellness-soreness">${options(w.soreness)}</select></div></div><button class="primary-btn" id="save-wellness" style="margin-top:14px">??????</button>`);
    document.getElementById('save-wellness').onclick=()=>{
      state.wellness={sleep:Number(document.getElementById('wellness-sleep').value),energy:Number(document.getElementById('wellness-energy').value),soreness:Number(document.getElementById('wellness-soreness').value),updated:today()};
      saveState();closeModal();renderHome();toast('???????');
    };
  }
  function bestPreviousExercise(exId,excludeId=null){
    const ws=[...state.workouts].filter(w=>w.id!==excludeId).sort((a,b)=>new Date(b.endedAt)-new Date(a.endedAt));
    for(const w of ws){ const e=(w.exercises||[]).find(x=>x.exerciseId===exId); if(e && e.sets.some(s=>s.done))return {workout:w,entry:e}; }
    return null;
  }
  function setSummary(sets, ex=null){ const done=sets.filter(s=>s.done); if(ex?.type==='cardio') return done.map(s=>`${s.minutes||s.reps||0} min`).join(' / '); return done.map(s=>`${s.weight||0}?${s.reps||0}`).join(' / '); }
  function progressionMessage(we){
    const plan=planById(state.activeWorkout?.planId || '');
    const spec=plan?.exercises.find(x=>x[0]===we.exerciseId);
    if(!spec)return '';
    const [,targetSets,minRep,maxRep]=spec;
    const done=we.sets.filter(s=>s.done&&!s.warmup);
    if(done.length<targetSets)return `?? ${targetSets} ? ? ${minRep}?${maxRep} ?`;
    const allTop=done.slice(0,targetSets).every(s=>Number(s.reps)>=maxRep);
    if(allTop)return '?? ????????????????????';
    return `?????????????????? ${maxRep} ??`;
  }

  function render(){
    document.getElementById('topbar-subtitle').textContent = ({home:'??????',training:'?????',exercises:'????',history:'????',mine:'???????'})[page];
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
      ${pageIntro('??',currentDateLabel())}
      <section class="card hero-card" id="recovery-card">
        <div class="hero-kicker">? ????</div>
        <div class="hero-row">
          <div><div class="recovery-value">${r.score}<span>%</span></div><div class="recovery-label">${r.label}</div></div>
          <div class="ring" style="--progress:${r.score}%"><div class="ring-inner"><strong>${avgMuscle}%</strong><small>????</small></div></div>
        </div>
        <div class="hero-meta">
          <div><span>??????</span><strong>${last?sinceText(last.endedAt):'????'}</strong></div>
          <div><span>????</span><strong>${last?esc(last.name):'???????'}</strong></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">???</div><button class="section-link" data-go="training">????</button></div>
        <div class="card next-card" data-start-plan="${next.id}">
          <div class="next-index">${next.index}</div><div class="next-info"><strong>${esc(next.name)}</strong><small>${next.exercises.length} ??? ? ${next.note}</small></div><div class="arrow">?</div>
        </div>
        <button class="primary-btn" style="margin-top:10px" data-start-plan="${next.id}">????</button>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">??</div><button class="section-link" data-go="history">????</button></div>
        <div class="grid2 equal-metrics">
          <div class="card metric-card"><small>????</small><strong>${body?.weight?body.weight+' kg':'?'}</strong><div class="metric-delta">7 ??? ${avg?avg+' kg':'??'}</div></div>
          <div class="card metric-card"><small>???</small><strong>${body?.bodyFat?body.bodyFat+'%':'?'}</strong><div class="metric-delta muted">???????</div></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">??</div><button class="section-link" data-go="history">????</button></div>
        <div class="card">
          <div class="stat-row"><span>????</span><strong>${week.length} / 4</strong></div>
          <div class="progress-bar"><i style="width:${clamp(week.length/4*100,0,100)}%"></i></div>
          <div class="stat-row"><span>?????</span><strong>${week.reduce((s,w)=>s+workingSets(w),0)} ?</strong></div>
          <div class="stat-row"><span>????</span><strong>${Math.round(week.reduce((s,w)=>s+totalVolume(w),0)).toLocaleString()} kg</strong></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-title">????</div><button class="section-link" id="wellness-btn">??????</button></div>
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
      ${pageIntro('??','???????????????? 1 ? 4 ???????????')}
      <div class="card current-plan"><div class="small muted">?????</div><h2>${esc(next.name)}</h2><div class="small muted">${next.exercises.length} ??? ? ? ${next.index} ?</div><button class="primary-btn" style="margin-top:14px" data-start-plan="${next.id}">????</button><button class="secondary-btn neutral free-training-btn" style="margin-top:9px;width:100%" id="free-workout-btn">? ????</button></div>
      <section class="section"><div class="section-head"><div class="section-title">????</div></div>${PLAN.map(p=>`<div class="card plan-card"><div class="plan-top"><div class="plan-day">${p.index}</div><div class="plan-info"><strong>${esc(p.name)}</strong><small>${p.exercises.length} ??? ? ${esc(p.note)}</small></div></div><div class="plan-actions"><button class="secondary-btn neutral" data-view-plan="${p.id}">????</button><button class="secondary-btn" data-start-plan="${p.id}">????</button></div></div>`).join('')}</section>
      <section class="section"><div class="section-head"><div class="section-title">????</div><button class="section-link" data-go="history">????</button></div>${history.length?history.slice(0,3).map(historyItem).join(''):'<div class="card empty">???????</div>'}</section>`;
    bindCommon();
    document.querySelectorAll('[data-view-plan]').forEach(b=>b.onclick=()=>showPlan(b.dataset.viewPlan));
    document.getElementById('free-workout-btn').onclick=startFreeWorkout;
  }

  function renderExercisesPage(){
    main.innerHTML=`${pageIntro('??','?? + ?????????????? 3D ????????????????????????')}<div class="page-scroll-content">${exerciseLibraryHTML()}</div>`;
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
        <div class="record-title-row"><div class="page-intro-copy"><div class="page-title">??</div><div class="page-subtitle">???????????????????</div></div><button class="record-stats-btn" id="record-stats-btn">??</button></div>
        <button class="record-month-trigger" id="record-month-trigger" aria-expanded="${recordMonthOpen}"><span>${selectedYear}?${selectedMonth}?</span><i>${recordMonthOpen?'?':'?'}</i></button>
        ${recordMonthOpen?recordMonthPanel(months,recordYear):''}
      </div>
      <div id="history-content" class="page-scroll-content">${selectedHistory.length?`<div class="record-month-heading"><strong>${selectedMonth}?</strong><span>${selectedHistory.length} ???</span></div><div class="list">${selectedHistory.map(historyItem).join('')}</div>`:'<div class="card empty">??????????</div>'}</div>`;
    document.getElementById('record-month-trigger').onclick=()=>{recordMonthOpen=!recordMonthOpen;renderHistoryPage();};
    document.getElementById('record-stats-btn').onclick=()=>showRecordStats();
    document.querySelectorAll('[data-record-year]').forEach(b=>b.onclick=()=>{recordYear=Number(b.dataset.recordYear);recordMonthOpen=true;renderHistoryPage();});
    document.querySelectorAll('[data-record-month]').forEach(b=>b.onclick=()=>{selectedRecordMonth=b.dataset.recordMonth;recordYear=Number(selectedRecordMonth.slice(0,4));recordMonthOpen=false;renderHistoryPage();});
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
  }

  function monthKey(value){const d=value instanceof Date?value:new Date(value);return Number.isNaN(d.getTime())?today().slice(0,7):`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
  function availableRecordMonths(history=state.workouts){return [...new Set(history.map(w=>monthKey(w.endedAt)))].sort().reverse();}
  function recordMonthPanel(months,year){
    const years=[...new Set(months.map(k=>Number(k.slice(0,4))))].sort((a,b)=>b-a),shownYears=years.length?years:[new Date().getFullYear()];
    if(!shownYears.includes(year))year=shownYears[0];
    return `<div class="record-month-panel"><div class="record-year-tabs">${shownYears.map(y=>`<button class="${y===year?'active':''}" data-record-year="${y}">${y}?</button>`).join('')}</div><div class="record-month-grid">${Array.from({length:12},(_,i)=>{const key=`${year}-${String(i+1).padStart(2,'0')}`,enabled=months.includes(key);return `<button ${enabled?'':'disabled'} class="${enabled?'available':''} ${key===selectedRecordMonth?'active':''}" ${enabled?`data-record-month="${key}"`:''}>${i+1}?</button>`;}).join('')}</div></div>`;
  }

  function localDateKey(value=new Date()){const d=value instanceof Date?value:new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function startOfWeek(value=new Date()){const d=new Date(value);d.setHours(0,0,0,0);d.setDate(d.getDate()-(d.getDay()+6)%7);return d;}
  function periodKey(period,value=new Date()){
    const d=value instanceof Date?new Date(value):new Date(value);
    if(period==='day')return localDateKey(d);
    if(period==='week')return localDateKey(startOfWeek(d));
    if(period==='month')return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    return String(d.getFullYear());
  }
  function periodDate(period,key){
    if(period==='day'||period==='week')return new Date(`${key}T12:00:00`);
    if(period==='month'){const [y,m]=key.split('-').map(Number);return new Date(y,m-1,15,12);}
    return new Date(Number(key),6,1,12);
  }
  function reportPeriodChoices(period){
    const dates=[new Date(),...(state.workouts||[]).map(w=>new Date(w.endedAt)),...(state.bodyMetrics||[]).filter(m=>m.date).map(m=>new Date(`${m.date}T12:00:00`))].filter(d=>!Number.isNaN(d.getTime()));
    const keys=[...new Set(dates.map(d=>periodKey(period,d)))];
    const selected=periodKey(period,recordReportAnchor);if(!keys.includes(selected))keys.push(selected);
    return keys.sort().reverse();
  }
  function reportRange(period,now=recordReportAnchor){
    const start=new Date(now),end=new Date(now);start.setHours(0,0,0,0);end.setHours(23,59,59,999);
    if(period==='week'){const monday=startOfWeek(start);start.setTime(monday.getTime());end.setTime(monday.getTime());end.setDate(end.getDate()+6);end.setHours(23,59,59,999);}
    if(period==='month'){start.setDate(1);end.setMonth(end.getMonth()+1,0);}
    if(period==='year'){start.setMonth(0,1);end.setMonth(11,31);}
    return {start,end};
  }
  function reportDuration(minutes){const m=Math.round(minutes);return m>=60?`${Math.floor(m/60)}h ${m%60}min`:`${m}min`;}
  function periodLabel(period,start,end=start){const local=`${start.getMonth()+1}?${start.getDate()}?`;return period==='day'?`${start.getFullYear()}?${local}`:period==='week'?`${start.getFullYear()}?${local}?${end.getMonth()+1}?${end.getDate()}?`:period==='month'?`${start.getFullYear()}?${start.getMonth()+1}?`:`${start.getFullYear()}?`;}
  function reportChoiceLabel(period,key){const d=periodDate(period,key),r=reportRange(period,d);return periodLabel(period,r.start,r.end);}
  function stepReportAnchor(period,direction){const d=new Date(recordReportAnchor);if(period==='day')d.setDate(d.getDate()+direction);if(period==='week')d.setDate(d.getDate()+direction*7);if(period==='month')d.setMonth(d.getMonth()+direction);if(period==='year')d.setFullYear(d.getFullYear()+direction);recordReportAnchor=d;showRecordStats(period);}
  function workoutExerciseMax(w,id){const entry=(w.exercises||[]).find(e=>e.exerciseId===id);return entry?Math.max(0,...performanceSets(entry).map(s=>Number(s.weight)||0)):0;}
  function recordReport(period,anchor=recordReportAnchor){
    const {start,end}=reportRange(period,anchor),all=[...state.workouts].filter(w=>w.endedAt).sort((a,b)=>new Date(a.endedAt)-new Date(b.endedAt)),history=all.filter(w=>{const d=new Date(w.endedAt);return d>=start&&d<=end;});
    const durationMinutes=history.reduce((sum,w)=>sum+Math.max(0,new Date(w.endedAt)-new Date(w.startedAt))/60000,0),groupSessions={};
    history.forEach(w=>{const hit=new Set();(w.exercises||[]).forEach(e=>{if((e.sets||[]).some(s=>s.done&&!s.warmup))hit.add(exercise(e.exerciseId).group||'??');});hit.forEach(g=>groupSessions[g]=(groupSessions[g]||0)+1);});
    const topGroup=Object.entries(groupSessions).sort((a,b)=>b[1]-a[1])[0]||null;
    const ids=[...new Set(history.flatMap(w=>(w.exercises||[]).map(e=>e.exerciseId)))];
    const progress=ids.map(id=>{const sessions=history.filter(w=>workoutExerciseMax(w,id)>0),first=sessions[0],last=sessions.at(-1);if(!first||!last||first.id===last.id)return null;const from=workoutExerciseMax(first,id),to=workoutExerciseMax(last,id);return from>0&&to>from?{id,name:exercise(id).name,from,to,pct:round((to-from)/from*100,1)}:null;}).filter(Boolean).sort((a,b)=>b.pct-a.pct).slice(0,4);
    let records=0;ids.forEach(id=>{const before=Math.max(0,...all.filter(w=>new Date(w.endedAt)<start).map(w=>workoutExerciseMax(w,id))),inside=Math.max(0,...history.map(w=>workoutExerciseMax(w,id)));if(inside>before&&inside>0)records++;});
    const body=[...(state.bodyMetrics||[])].filter(m=>{const d=new Date(`${m.date}T12:00:00`);return d>=start&&d<=end;}).sort((a,b)=>new Date(a.date)-new Date(b.date)),firstBody=body[0],lastBodyInPeriod=body.at(-1);
    return {period,start,end,history,durationMinutes,topGroup,progress,records,firstBody,lastBodyInPeriod};
  }
  function showRecordStats(period=recordReportPeriod){
    recordReportPeriod=period;const r=recordReport(period,recordReportAnchor),history=r.history,choice=periodKey(period,recordReportAnchor),choices=reportPeriodChoices(period);
    const progressHTML=r.progress.length?r.progress.map(x=>`<div class="report-progress-row"><div><strong>${esc(x.name)}</strong><span>${x.from} kg ? ${x.to} kg</span></div><b>+${x.pct}%</b></div>`).join(''):'<div class="report-empty">???????????????</div>';
    const bodyRows=[];if(r.firstBody&&r.lastBodyInPeriod&&r.firstBody!==r.lastBodyInPeriod){if(num(r.firstBody.weight)!==null&&num(r.lastBodyInPeriod.weight)!==null)bodyRows.push(`<div class="report-change-row"><span>??</span><strong>${r.firstBody.weight} ? ${r.lastBodyInPeriod.weight} kg</strong></div>`);if(num(r.firstBody.waist)!==null&&num(r.lastBodyInPeriod.waist)!==null)bodyRows.push(`<div class="report-change-row"><span>??</span><strong>${r.firstBody.waist} ? ${r.lastBodyInPeriod.waist} cm</strong></div>`);}
    openModal('????',`<div class="report-tabs">${[['day','??'],['week','??'],['month','??'],['year','??']].map(([key,label])=>`<button class="${period===key?'active':''}" data-report-period="${key}">${label}</button>`).join('')}</div><div class="report-period-picker"><button type="button" data-report-step="-1" aria-label="?????">?</button><select id="report-period-select" aria-label="??????">${choices.map(key=>`<option value="${key}" ${key===choice?'selected':''}>${reportChoiceLabel(period,key)}</option>`).join('')}</select><button type="button" data-report-step="1" aria-label="?????">?</button></div><div class="record-summary-grid"><div><strong>${history.length}</strong><span>????</span></div><div><strong>${reportDuration(r.durationMinutes)}</strong><span>????</span></div><div><strong>${history.reduce((n,w)=>n+workingSets(w),0)}</strong><span>???</span></div><div><strong>${Math.round(history.reduce((n,w)=>n+totalVolume(w),0)).toLocaleString()}</strong><span>???? kg</span></div></div><div class="report-highlight"><span>????</span><strong>${r.topGroup?`${esc(r.topGroup[0])} ${r.topGroup[1]}?`:'?'}</strong></div><section class="report-section"><h3>?${period==='day'?'?':period==='week'?'?':period==='month'?'?':'?'}??</h3>${progressHTML}</section><section class="report-section"><div class="report-records"><span>???</span><strong>${r.records} ?</strong></div></section><section class="report-section"><h3>????</h3>${bodyRows.length?bodyRows.join(''):'<div class="report-empty">???????????????????</div>'}</section><div class="info-note">???????????????????????????????</div>`);
    document.querySelectorAll('[data-report-period]').forEach(b=>b.onclick=()=>showRecordStats(b.dataset.reportPeriod));
    document.querySelectorAll('[data-report-step]').forEach(b=>b.onclick=()=>stepReportAnchor(period,Number(b.dataset.reportStep)));
    document.getElementById('report-period-select').onchange=e=>{recordReportAnchor=periodDate(period,e.target.value);showRecordStats(period);};
  }

  function calendarHTML(history){
    const now=new Date(), y=now.getFullYear(), m=now.getMonth(); const first=new Date(y,m,1); const days=new Date(y,m+1,0).getDate(); const offset=(first.getDay()+6)%7;
    const byDate={}; history.forEach(w=>{const d=(w.endedAt||'').slice(0,10);(byDate[d] ||= []).push(w);});
    const cells=[]; for(let i=0;i<offset;i++)cells.push('<div class="cal-cell blank"></div>');
    for(let d=1;d<=days;d++){const key=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;const list=byDate[key]||[];cells.push(`<button class="cal-cell ${list.length?'trained':''} ${key===today()?'today':''}" data-cal-date="${key}"><span>${d}</span>${list.length?`<i>${list.length}</i>`:''}</button>`);}
    return `<div class="card calendar"><div class="cal-title">${y}?${m+1}?</div><div class="cal-week"><span>?</span><span>?</span><span>?</span><span>?</span><span>?</span><span>?</span><span>?</span></div><div class="cal-grid">${cells.join('')}</div></div>`;
  }
  function showCalendarDay(date){const list=state.workouts.filter(w=>(w.endedAt||'').slice(0,10)===date);if(list.length===1){showWorkoutDetail(list[0].id);return;}openModal(formatDate(date),list.length?list.map(historyItem).join(''):'<div class="empty">???????</div>');document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));}

  function historyItem(w){
    return `<button class="list-item" style="width:100%;text-align:left" data-history="${w.id}"><div class="next-index" style="width:42px;height:42px">${planById(w.planId)?.index||'?'}</div><div class="grow"><strong>${esc(w.name)}</strong><small>${formatDateTime(w.endedAt)} ? ${durationText(new Date(w.endedAt)-new Date(w.startedAt))}</small></div><div><span class="pill blue">${workingSets(w)} ?</span><small style="text-align:right">${Math.round(totalVolume(w)).toLocaleString()}kg</small></div></button>`;
  }

  function renderActiveWorkout(){
    const w=state.activeWorkout; const elapsed=Date.now()-new Date(w.startedAt).getTime();
    main.innerHTML=`
      <div class="workout-head">
        <div class="workout-title">${esc(w.name)}</div><div class="workout-meta"><span id="elapsed">${durationText(elapsed)}</span><span>${workingSets(w)} ???</span><span>${Math.round(totalVolume(w)).toLocaleString()} kg</span></div>
        <div class="workout-actions"><button class="secondary-btn" id="add-exercise-btn">? ??</button><button class="secondary-btn" id="cancel-workout-btn">??/??</button></div>
      </div>
      <div>${w.exercises.map((we,idx)=>trainingExerciseHTML(we,idx)).join('')}</div>
      <button class="primary-btn" id="finish-workout-btn">????</button>
      ${restRemaining>0?timerHTML():''}
    `;
    bindActiveWorkout();
    clearInterval(timerInterval); timerInterval=setInterval(()=>{ const el=document.getElementById('elapsed'); if(el)el.textContent=durationText(Date.now()-new Date(w.startedAt).getTime()); },30000);
  }

  function trainingExerciseHTML(we,idx){
    const ex=exercise(we.exerciseId), prev=bestPreviousExercise(we.exerciseId,wId(state.activeWorkout)), cardio=ex.type==='cardio';
    return `<section class="training-exercise" data-ex-index="${idx}">
      <div class="training-exercise-head"><div class="exercise-thumb">${exerciseVisual(ex)}</div><div class="grow"><strong>${esc(ex.name)}</strong><small>${esc(ex.primary||ex.group)}${ex.rest?' ? '+esc(ex.rest):''}</small>${prev?`<div class="last-result">???${esc(setSummary(prev.entry.sets,ex))}</div>`:''}</div><button class="exercise-menu-btn" data-ex-menu="${idx}" aria-label="????"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8 3.5-2.1-.8a6.3 6.3 0 0 0-.7-1.7l.9-2-2-2-2 .9a6.3 6.3 0 0 0-1.7-.7L12 3h-2.8l-.8 2.1a6.3 6.3 0 0 0-1.7.7l-2-.9-2 2 .9 2a6.3 6.3 0 0 0-.7 1.7L1 12v2.8l2.1.8c.2.6.4 1.2.7 1.7l-.9 2 2 2 2-.9c.5.3 1.1.6 1.7.7l.8 2.1H12l.8-2.1c.6-.2 1.2-.4 1.7-.7l2 .9 2-2-.9-2c.3-.5.6-1.1.7-1.7l2.1-.8V12Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></button></div>
      <div class="set-head ${cardio?'cardio':''}"><span>?</span>${cardio?'<span>min</span>':'<span>kg</span><span>??</span>'}<span>??</span><span></span></div>
      <div class="set-rows">${we.sets.map((s,si)=>setRowHTML(ex,s,si)).join('')}</div>
      <div class="progression">${progressionMessage(we)}</div>
      <button class="text-btn" data-add-set="${idx}">? ????</button>
    </section>`;
  }
  function setRowHTML(ex,s,si){const cardio=ex.type==='cardio';const main=`<div class="set-row ${cardio?'cardio-row':''}" data-set-row="${si}"><button class="set-index ${s.warmup?'warm':''}" data-warmup="${si}">${s.warmup?'?':si+1}</button>${cardio?`<input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-field="minutes" data-set="${si}" value="${esc(s.minutes??s.reps??'')}">`:`<input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-field="weight" data-set="${si}" value="${esc(s.weight??'')}"><input class="set-input ${s.done?'completed-input':''}" inputmode="numeric" data-field="reps" data-set="${si}" value="${esc(s.reps??'')}">`}<button class="set-done ${s.done?'done':''}" data-done="${si}">${s.done?'?':'?'}</button><button class="dots-btn" data-set-menu="${si}">???</button></div>`;const drops=(s.drops||[]).map((d,di)=>`<div class="drop-row"><span class="drop-label">?${di+1}</span><input class="set-input ${s.done?'completed-input':''}" inputmode="decimal" data-drop-field="weight" data-drop="${di}" data-set="${si}" value="${esc(d.weight??'')}"><input class="set-input ${s.done?'completed-input':''}" inputmode="numeric" data-drop-field="reps" data-drop="${di}" data-set="${si}" value="${esc(d.reps??'')}"><button class="drop-plus" data-copy-drop="${si}:${di}">?</button><button class="drop-delete" data-delete-drop="${si}:${di}">?</button></div>`).join('');return `<div class="set-block">${main}${drops}</div>`;}

  function wId(w){return w?.id||null;}
  function timerHTML(){ return `<div class="timer-bar"><div><small>????</small><strong id="rest-timer">${fmtTimer(restRemaining)}</strong></div><div class="grow"></div><button class="timer-btn" id="timer-plus">+30s</button><button class="timer-btn" id="timer-skip">??</button></div>`; }
  function fmtTimer(sec){ return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; }
  function startRest(seconds=state.settings.restSeconds){ restRemaining=seconds; renderActiveWorkout(); clearInterval(timerInterval); timerInterval=setInterval(()=>{ restRemaining--; const el=document.getElementById('rest-timer'); if(el)el.textContent=fmtTimer(Math.max(0,restRemaining)); if(restRemaining<=0){clearInterval(timerInterval);toast('????????????');renderActiveWorkout();}},1000); }

  function renderPlan(){
    main.innerHTML=`<div class="page-title">????</div><div class="page-subtitle">?????????? 1 ??????????? 2 ??</div>
      <div class="info-note">? 2 ????????????????????????????????????????? 4 ????</div>
      <section class="section">${PLAN.map(p=>`<div class="card plan-card"><div class="plan-top"><div class="plan-day">${p.index}</div><div class="plan-info"><strong>${esc(p.name)}</strong><small>${p.exercises.length} ??? ? ${esc(p.note)}</small></div></div><div class="plan-actions"><button class="secondary-btn neutral" data-view-plan="${p.id}">????</button><button class="secondary-btn" data-start-plan="${p.id}">????</button></div></div>`).join('')}</section>`;
    bindCommon(); document.querySelectorAll('[data-view-plan]').forEach(b=>b.onclick=()=>showPlan(b.dataset.viewPlan));
  }

  function renderData(){
    const body=lastBody();
    main.innerHTML=`<div class="page-title">??</div><div class="page-subtitle">??? 7 ?????????????????????????</div>
      <div class="tabs"><button class="tab ${dataTab==='body'?'active':''}" data-data-tab="body">??</button><button class="tab ${dataTab==='strength'?'active':''}" data-data-tab="strength">??</button></div><div id="data-content"></div>`;
    document.querySelectorAll('[data-data-tab]').forEach(b=>b.onclick=()=>{dataTab=b.dataset.dataTab;renderData();});
    const c=document.getElementById('data-content');
    if(dataTab==='body'){
      const avg=sevenDayAvgWeight();
      c.innerHTML=`
        <div class="grid2"><div class="card metric-card"><small>????</small><strong>${body?.weight?body.weight+' kg':'?'}</strong><div class="metric-delta">7 ??? ${avg?avg+' kg':'?'}</div></div><div class="card metric-card"><small>??</small><strong>${body?.waist?body.waist+' cm':'?'}</strong><div class="metric-delta muted">????????? 1 ?</div></div></div>
        <section class="section"><div class="section-head"><div class="section-title">????</div><button class="section-link" type="button" data-add-body>? ??</button></div><div class="card"><div class="chart">${weightChart()}</div></div></section>
        <section class="section"><div class="section-head"><div class="section-title">????</div></div><div class="list">${[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(m=>`<button class="list-item" style="width:100%;text-align:left" data-edit-body="${m.id}"><div class="grow"><strong>${formatDate(m.date)}</strong><small>${[m.bodyFat?`?? ${m.bodyFat}%`:null,m.skeletalMuscle?`??? ${m.skeletalMuscle}kg`:null,m.waist?`?? ${m.waist}cm`:null].filter(Boolean).join(' ? ')||'????'}</small></div><strong>${m.weight?m.weight+' kg':'?'}</strong></button>`).join('')}</div></section>`;
      document.querySelectorAll('[data-add-body]').forEach(b=>b.onclick=()=>showBodyForm()); document.querySelectorAll('[data-edit-body]').forEach(b=>b.onclick=()=>showBodyForm(b.dataset.editBody));
    }else{
      const stats=strengthStats();
      c.innerHTML=stats.length?`<div class="list">${stats.map(s=>`<button class="list-item" style="width:100%;text-align:left" data-strength="${s.id}"><div class="grow"><strong>${esc(s.name)}</strong><small>${s.sessions} ?????</small></div><div class="strength-values"><strong>${s.bestWeight} kg</strong><small>????</small><b>?? 1RM ${s.best1RM} kg</b></div></button>`).join('')}</div>`:'<div class="card empty"><strong>???????</strong>??????????????????????????</div>';
      document.querySelectorAll('[data-strength]').forEach(b=>b.onclick=()=>showStrength(b.dataset.strength));
    }
  }

  function renderMine(){
    if(!['body','strength','diet','settings'].includes(dataTab)) dataTab='body';
    const body=lastBody(), avg=sevenDayAvgWeight();
    main.innerHTML=`
      ${pageIntro('??','??????????????????')}
      <div class="tabs"><button class="tab ${dataTab==='body'?'active':''}" data-mine-tab="body">????</button><button class="tab ${dataTab==='strength'?'active':''}" data-mine-tab="strength">????</button><button class="tab ${dataTab==='diet'?'active':''}" data-mine-tab="diet">??</button><button class="tab ${dataTab==='settings'?'active':''}" data-mine-tab="settings">??</button></div>
      <div id="mine-content"></div>`;
    document.querySelectorAll('[data-mine-tab]').forEach(b=>b.onclick=()=>{dataTab=b.dataset.mineTab;renderMine();});
    const c=document.getElementById('mine-content');
    if(dataTab==='body'){
      c.innerHTML=`<div class="grid2 equal-metrics"><div class="card metric-card"><small>????</small><strong>${body?.weight?body.weight+' kg':'?'}</strong><div class="metric-delta">7 ??? ${avg?avg+' kg':'?'}</div></div><div class="card metric-card"><small>??</small><strong>${body?.waist?body.waist+' cm':'?'}</strong><div class="metric-delta muted">????????</div></div></div>
      <section class="section"><div class="section-head"><div class="section-title">????</div><button class="section-link" type="button" data-add-body>? ??</button></div><div class="card"><div class="chart">${weightChart()}</div></div></section>
      <section class="section"><div class="section-title" style="margin-bottom:10px">????</div><div class="list">${[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(m=>`<button class="list-item" style="width:100%;text-align:left" data-edit-body="${m.id}"><div class="grow"><strong>${formatDate(m.date)}</strong><small>${[m.bodyFat?`?? ${m.bodyFat}%`:null,m.skeletalMuscle?`??? ${m.skeletalMuscle}kg`:null,m.waist?`?? ${m.waist}cm`:null].filter(Boolean).join(' ? ')||'????'}</small></div><strong>${m.weight?m.weight+' kg':'?'}</strong></button>`).join('')}</div></section>`;
      document.querySelectorAll('[data-add-body]').forEach(b=>b.onclick=()=>showBodyForm());document.querySelectorAll('[data-edit-body]').forEach(b=>b.onclick=()=>showBodyForm(b.dataset.editBody));
    } else if(dataTab==='strength'){
      const stats=strengthStats(); c.innerHTML=stats.length?`<div class="list">${stats.map(s=>`<button class="list-item" style="width:100%;text-align:left" data-strength="${s.id}"><div class="grow"><strong>${esc(s.name)}</strong><small>${s.sessions} ?????</small></div><div class="strength-values"><strong>${s.bestWeight} kg</strong><small>????</small><b>?? 1RM ${s.best1RM} kg</b></div></button>`).join('')}</div>`:'<div class="card empty">??????????????</div>';document.querySelectorAll('[data-strength]').forEach(b=>b.onclick=()=>showStrength(b.dataset.strength));
    } else if(dataTab==='diet'){
      c.innerHTML=`<div class="card"><div class="tabs diet-tabs"><button class="tab ${dietMode==='training'?'active':''}" data-diet="training">???</button><button class="tab ${dietMode==='rest'?'active':''}" data-diet="rest">???</button><button class="tab ${dietMode==='cheat'?'active':''}" data-diet="cheat">???</button></div>${dietHTML(dietMode)}</div>`;document.querySelectorAll('[data-diet]').forEach(b=>b.onclick=()=>{dietMode=b.dataset.diet;dietBatch=0;state.settings.dietMode=dietMode;saveState();renderMine();});document.getElementById('shuffle-diet').onclick=()=>{const size=dietMode==='cheat'?CHEAT_MENUS.length:(dietMode==='rest'?REST_DIET_MENUS.length:DIET_MENUS.length);dietBatch=(dietBatch+1)%size;renderMine();};
    } else {
      const backup=backupStatus();c.innerHTML=`<section class="section"><div class="card"><div class="stat-row"><span>??????</span><button class="pill blue" id="rest-setting">${state.settings.restSeconds} ?</button></div><div class="stat-row"><span>????</span><strong>${state.workouts.length} ?</strong></div><div class="stat-row"><span>????</span><strong>${storageFallback?'??????':'IndexedDB'}</strong></div><div class="stat-row"><span>????</span><strong>${backup.date}</strong></div><div class="stat-row backup-status-row ${backup.warning?'warning':''}"><span>????</span><strong>${backup.text}</strong></div></div></section><div class="backup-grid"><button class="backup-action" id="export-btn">????</button><button class="backup-action" id="import-btn">????</button></div><input id="import-file" type="file" accept="application/json,.json" hidden><div class="note ${backup.warning?'backup-reminder':''}" style="margin-top:12px">${backup.warning?'?????????':''} ?????????? IndexedDB???????????????? JSON ???????</div>`;document.getElementById('rest-setting').onclick=showRestSetting;document.getElementById('export-btn').onclick=exportData;document.getElementById('import-btn').onclick=()=>document.getElementById('import-file').click();document.getElementById('import-file').onchange=e=>importDataFile(e.target.files?.[0]);
    }
    if(c && !c.innerHTML.trim()){dataTab='body';setTimeout(()=>{if(page==='mine')renderMine();},0);}
  }

  const TRAINING_BREAKFASTS=['??2? + ????? + ??','????????? + ?? + ??','????? + ???? + ??','??2? + ?? + ???? + ??','?????? + ??','??? + ???2? + ??','?????? + ????','????? + ????'];
  const TRAINING_LUNCHES=['????? + ??????','????? + ????','????? + ?? + ??','????? + ????','????? + ????','????? + ????','????? + ????','?????? + ???','?????? + ??','????? + ????','????? + ?? + ??','??? + ?? + ????'];
  const TRAINING_SNACKS=['?? + ????','?? + ??','???? + ????','?? + ?????','???? + ?? + ??','?? + ?? + ????','???? + ??','?? + ?? + ?????'];
  const TRAINING_DINNERS=['????? + ????','??? + ?? + ???','???? + ?? + ???','????? + ????','????? + ??','????? + ??? + ??','????? + ????','????? + ??','????? + ??','?????? + ???','??????? + ????','????? + ?? + ??'];
  const REST_BREAKFASTS=['??2? + ???? + ??','????? + ?? + ??','????????? + ???','?? + ???2? + ????','???? + ??','??????? + ??2?','????? + ????','???????? + ??'];
  const REST_LUNCHES=['??? + ???? + ????','????? + ??? + ???','????? + ????','????? + ????','???? + ?? + ????','?????? + ????','????? + ??','????? + ???','????? + ????','???? + ?? + ????','????? + ??','??? + ??? + ??'];
  const REST_SNACKS=['???? + ??','?? + ???','?? + ?????','???? + ????','???? + ???','???? + ???','?? + ???','?? + ???'];
  const REST_DINNERS=['???? + ??? + ????','???? + ????','????? + ???','????? + ???','????? + ??','????? + ????','?????? + ??','????? + ????','????? + ??','????? + ??','??? + ?? + ??','?????? + ????'];
  function buildDietMenus(breakfasts,lunches,snacks,dinners,count=32){return Array.from({length:count},(_,i)=>({breakfast:breakfasts[i%breakfasts.length],lunch:lunches[(i*5+1)%lunches.length],snack:snacks[(i*3+2)%snacks.length],dinner:dinners[(i*7+3)%dinners.length]}));}
  const DIET_MENUS=buildDietMenus(TRAINING_BREAKFASTS,TRAINING_LUNCHES,TRAINING_SNACKS,TRAINING_DINNERS);
  const REST_DIET_MENUS=buildDietMenus(REST_BREAKFASTS,REST_LUNCHES,REST_SNACKS,REST_DINNERS);
  const CHEAT_MENUS=[
    {name:'?????',main:'????? + ??? + ??? + ?? + ???',side:'??????????????',treat:'??????? + ?????'},
    {name:'???????',main:'??????? + ?????',side:'???? + ????????',treat:'????????'},
    {name:'??????',main:'??????????? + ??????',side:'??? + ????',treat:'???? + ????'},
    {name:'??????',main:'??? + ??? + ???? + ????',side:'??????????????',treat:'?????????'},
    {name:'??????',main:'?????? + ????? + ???',side:'????????????',treat:'???????????'},
    {name:'?????',main:'???? + ??? + ?????',side:'???? + ?????',treat:'???????????'},
    {name:'??????',main:'?? + ?? + ??? + ?????',side:'??????????',treat:'???? + ??'},
    {name:'??????',main:'??? + ??? + ??? + ???',side:'????????????',treat:'??? + ????'},
    {name:'??????',main:'?????? + ??????',side:'???? + ???? + ??',treat:'???????'},
    {name:'??????',main:'???? + ?? + ?????',side:'???? + ????',treat:'?????????'},
    {name:'??????',main:'?? + ??? + ?? + ?????',side:'?????????????',treat:'???? + ???'},
    {name:'?????',main:'???? + ??? + ???',side:'???????? + ????',treat:'???????'},
    {name:'?????',main:'??? + ????',side:'???? + ?????',treat:'???? + ???'},
    {name:'?????',main:'?????? + ?????',side:'???? + ????',treat:'???????'},
    {name:'?????',main:'????? + ??',side:'????????????',treat:'????'},
    {name:'?????',main:'???? + ???',side:'????????????',treat:'???'},
    {name:'??????',main:'?????? + ???',side:'???? + ?????',treat:'????? + ????'},
    {name:'??????',main:'??????? + ????',side:'???? + ???',treat:'?????????'},
    {name:'??????',main:'???? + ?????',side:'?? + ????',treat:'???? + ???'},
    {name:'???????',main:'??? + ?????',side:'??????????',treat:'??? + ????'},
    {name:'??????',main:'????? + ???',side:'???? + ?????',treat:'???? + ????'},
    {name:'???????',main:'???? + ??????',side:'??????? + ??????',treat:'?????'},
    {name:'??????',main:'????? + ????',side:'????? + ?? + ?????',treat:'??? + ??'},
    {name:'?????',main:'????? + ??????',side:'???????????',treat:'?????'},
    {name:'??????',main:'?????? + ??????',side:'??? + ???????',treat:'???????'},
    {name:'?????',main:'????? + ????',side:'????? + ??',treat:'????'},
    {name:'??????',main:'??? + ??????',side:'???? + ????',treat:'??????'},
    {name:'???????',main:'??? + ??? + ?????',side:'????????????',treat:'??????'},
    {name:'?????',main:'??? + ????',side:'???? + ?????????',treat:'??????'},
    {name:'?????',main:'????? + ?????',side:'??? + ???',treat:'????'},
    {name:'??????',main:'??? + ??? + ??',side:'???? + ???',treat:'????'},
    {name:'??????',main:'?????? + ???',side:'?? + ???',treat:'????'},
    {name:'??????',main:'????????',side:'??? + ???? + ????',treat:'?????'},
    {name:'?????',main:'????? + ???',side:'???? + ????',treat:'????? + ??'},
    {name:'??????',main:'?????? + ????',side:'???? + ???',treat:'???'},
    {name:'???????',main:'????? + ?????',side:'???????????',treat:'?????'},
    {name:'?????',main:'??? + ??? + ???',side:'???? + ????',treat:'????'},
    {name:'??????',main:'??????? + ??',side:'??? + ????',treat:'???'},
    {name:'??????',main:'??? + ???? + ???',side:'?? + ???',treat:'????'},
    {name:'??????',main:'??? + ??? + ????',side:'?? + ???',treat:'???? + ???'},
    {name:'?????',main:'??????? + ???',side:'???? + ????',treat:'?????'},
    {name:'??????',main:'???? + ??',side:'??? + ????',treat:'???'},
    {name:'??????',main:'???? + ???? + ????',side:'????',treat:'????'},
    {name:'?????',main:'??? + ??? + ???',side:'??? + ???',treat:'??? + ??'},
    {name:'??????',main:'??? + ??? + ???',side:'??? + ????',treat:'???? + ???'},
    {name:'??????',main:'??? + ??? + ???',side:'???? + ??',treat:'???? + ????'},
    {name:'?????',main:'???? + ??? + ?? + ??',side:'?????????',treat:'????'},
    {name:'??????',main:'????????????????',side:'??? + ????',treat:'???'},
    {name:'?????',main:'??? + ??? + ????',side:'????? + ????',treat:'?????'},
    {name:'?????',main:'?????? + ?????',side:'??????? + ???',treat:'?????????'}
  ];
  function dietHTML(mode){
    if(mode==='cheat'){
      const menu=CHEAT_MENUS[dietBatch%CHEAT_MENUS.length];
      return `<div class="small muted">???????</div><div class="cheat-hero"><span>????</span><strong>${esc(menu.name)}</strong></div><div class="section-head" style="margin-top:18px"><strong>???????</strong><button class="section-link" id="shuffle-diet">???</button></div>${[['??',menu.main],['??',menu.side],['??/??',menu.treat]].map(([n,t])=>`<div class="meal"><strong>${n}</strong><p>${esc(t)}</p></div>`).join('')}<div class="note" style="margin-top:12px">????????????????????????????????????????</div>`;
    }
    const d=DIET[mode],menus=mode==='rest'?REST_DIET_MENUS:DIET_MENUS,menu=menus[dietBatch%menus.length];
    return `<div class="small muted">${d.label}??</div><div class="diet-macro"><div><strong>${d.kcal}</strong><small>kcal</small></div><div><strong>${d.protein}g</strong><small>???</small></div><div><strong>${d.fat}g</strong><small>??</small></div><div><strong>${d.carbs}g</strong><small>??</small></div></div>
      <div class="section-head" style="margin-top:18px"><strong>????????</strong><button class="section-link" id="shuffle-diet">???</button></div>
      ${[['??',menu.breakfast],['??',menu.lunch],['???/??',menu.snack],['??',menu.dinner]].map(([n,t])=>`<div class="meal"><strong>${n}</strong><p>${t}</p></div>`).join('')}
      <div class="note" style="margin-top:12px">??????????? 150g/??????????????????????????????????????????????????????????</div>`;
  }

  function exerciseLibraryHTML(){
    const groups=['??','?','?','?','?','?','??','??','?','??','??','??'];
    const list=allExercises().filter(e=>activeExerciseFilter==='??'||e.group===activeExerciseFilter);
    return `<div class="search"><input id="exercise-search" placeholder="??????"></div><div class="filter-chips">${groups.map(g=>`<button class="chip ${activeExerciseFilter===g?'active':''}" data-filter="${g}">${g}</button>`).join('')}</div><div class="section"><div id="exercise-list" class="list">${list.map(exerciseListItem).join('')}</div></div>`;
  }
  function exerciseListItem(e){ return `<button class="list-item tutorial-card" style="width:100%;text-align:left" data-tutorial="${e.id}"><div class="muscle-icon visual">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><p>${esc(e.primary)} ? ${esc(e.equipment)}${e.type==='cardio'?' ? min':''}</p></div><span class="pill blue">??</span></button>`; }
  function bindExerciseLibrary(){
    document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();activeExerciseFilter=b.dataset.filter;renderExercisesPage();});
    document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial));
    const list=document.getElementById('exercise-list');hydrateGymVisuals(list);
    const s=document.getElementById('exercise-search'); if(s)s.oninput=()=>{ const q=s.value.trim().toLowerCase(); list.innerHTML=allExercises().filter(e=>(activeExerciseFilter==='??'||e.group===activeExerciseFilter)&&e.name.toLowerCase().includes(q)).map(exerciseListItem).join('')||'<div class="empty">????????</div>'; document.querySelectorAll('[data-tutorial]').forEach(b=>b.onclick=()=>showTutorial(b.dataset.tutorial)); hydrateGymVisuals(list); };
  }

  function bindCommon(){
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setPage(b.dataset.go));
    document.querySelectorAll('[data-start-plan]').forEach(b=>b.onclick=()=>startPlan(b.dataset.startPlan));
    document.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showWorkoutDetail(b.dataset.history));
  }

  function startPlan(planId){
    if(state.activeWorkout){toast('????????');setPage('training');return;}
    const p=planById(planId); if(!p)return;
    state.activeWorkout={id:uid(),planId:p.id,name:p.name,startedAt:new Date().toISOString(),exercises:p.exercises.map(([id,sets,min,max])=>({exerciseId:id,target:{sets,min,max},sets:Array.from({length:sets},()=>({weight:'',reps:'',minutes:'',warmup:false,done:false,drops:[]}))}))};
    saveState(); setPage('training');
  }
  function startFreeWorkout(){ state.activeWorkout={id:uid(),planId:null,name:'????',startedAt:new Date().toISOString(),exercises:[]}; pendingFreeWorkout=true;saveState();renderTraining();showAddExercise(); }

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
  function showSetMenu(ei,si,anchor){const we=state.activeWorkout.exercises[ei],s=we.sets[si],ex=exercise(we.exerciseId);showPopover(anchor,[{label:'????',run:()=>{we.sets.splice(si+1,0,JSON.parse(JSON.stringify({...s,done:false})));saveState();renderActiveWorkout();}},...(ex.type==='cardio'?[]:[{label:'???',run:()=>{s.drops=s.drops||[];const src=s.drops.length?s.drops[s.drops.length-1]:s;s.drops.push({weight:src.weight||'',reps:src.reps||''});saveState();renderActiveWorkout();}}]),{label:'????',danger:true,run:()=>{we.sets.splice(si,1);saveState();renderActiveWorkout();}}]);}
  function showExerciseMenu(ei,anchor){const we=state.activeWorkout.exercises[ei],ex=exercise(we.exerciseId);showPopover(anchor,[{label:'????',run:()=>showTutorial(ex.id)},{label:'????',run:()=>showReorderExercises()},{label:'????',run:()=>showReplaceExercise(ei)},{label:'????',danger:true,run:()=>{state.activeWorkout.exercises.splice(ei,1);saveState();renderActiveWorkout();}}]);}
  function showReorderExercises(){openModal('????',`<div class="reorder-list">${state.activeWorkout.exercises.map((we,i)=>`<div class="reorder-item"><span>?</span><strong>${esc(exercise(we.exerciseId).name)}</strong><div><button data-move-up="${i}">?</button><button data-move-down="${i}">?</button></div></div>`).join('')}</div>`);document.querySelectorAll('[data-move-up]').forEach(b=>b.onclick=()=>moveExercise(Number(b.dataset.moveUp),-1));document.querySelectorAll('[data-move-down]').forEach(b=>b.onclick=()=>moveExercise(Number(b.dataset.moveDown),1));}
  function moveExercise(i,d){const a=state.activeWorkout.exercises,j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];saveState();showReorderExercises();}
  function showReplaceExercise(ei){openModal('????',`<div class="list">${allExercises().map(e=>`<button class="list-item" data-replace-id="${e.id}"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><small>${e.group} ? ${e.equipment}</small></div></button>`).join('')}</div>`);document.querySelectorAll('[data-replace-id]').forEach(b=>b.onclick=()=>{state.activeWorkout.exercises[ei].exerciseId=b.dataset.replaceId;saveState();closeModal();renderActiveWorkout();});}

  function showAddExercise(){const addPickedExercise=id=>{const e=exercise(id);state.activeWorkout.exercises.push({exerciseId:e.id,target:null,sets:[{weight:'',reps:'',minutes:'',warmup:false,done:false,drops:[]}]});pendingFreeWorkout=false;saveState();closeModal();renderActiveWorkout();};const bind=()=>document.querySelectorAll('[data-pick-ex]').forEach(b=>b.onclick=()=>addPickedExercise(b.dataset.pickEx));const draw=(q='')=>{const box=document.getElementById('modal-ex-list');box.innerHTML=allExercises().filter(x=>x.name.includes(q)).map(x=>`<button class="list-item" style="width:100%;text-align:left" data-pick-ex="${x.id}"><div class="exercise-thumb">${exerciseVisual(x)}</div><div class="grow"><strong>${esc(x.name)}</strong><small>${x.group} ? ${x.equipment||'???'}</small></div><span class="pill blue">??</span></button>`).join('');hydrateGymVisuals(box);bind();};openModal('????',`<button class="custom-exercise-entry" id="new-custom-exercise">? ?????</button><div class="search"><input id="modal-ex-search" placeholder="????"></div><div id="modal-ex-list" class="list"></div>`);draw();document.getElementById('modal-ex-search').oninput=e=>draw(e.target.value.trim());document.getElementById('new-custom-exercise').onclick=()=>{openModal('???????',`<div class="form-grid"><div class="field full"><label>????</label><input id="custom-name" placeholder="?????????"></div><div class="field"><label>??</label><select id="custom-group"><option>?</option><option>?</option><option>?</option><option>?</option><option>?</option><option>??</option><option>??</option><option>?</option><option>??</option><option>??</option></select></div><div class="field"><label>??</label><input id="custom-equipment" placeholder="??/??/??"></div></div><button class="primary-btn" id="save-custom-ex" style="margin-top:14px">???????</button>`);document.getElementById('save-custom-ex').onclick=()=>{const name=document.getElementById('custom-name').value.trim();if(!name){toast('???????');return;}const group=document.getElementById('custom-group').value,equipment=document.getElementById('custom-equipment').value.trim()||'???',ex={id:'custom_'+uid(),name,group,equipment,muscles:[group],primary:group,secondary:'',tips:['????????????','?????????','????????????'],mistakes:['????????????','??????????','??????'],rest:group==='??'?'':'60?120 ?',type:group==='??'?'cardio':'strength',metric:group==='??'?'min':undefined,custom:true};state.customExercises=state.customExercises||[];state.customExercises.push(ex);saveState();addPickedExercise(ex.id);};};}

  function finishWorkoutPrompt(){
    const w=state.activeWorkout; if(!w)return; const done=workingSets(w); if(done===0){toast('???????????');return;}
    openModal('????',`<div class="card flat"><div class="stat-row"><span>????</span><strong>${durationText(Date.now()-new Date(w.startedAt).getTime())}</strong></div><div class="stat-row"><span>???</span><strong>${done} ?</strong></div><div class="stat-row"><span>????</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">??????</div><div class="grid3"><button class="secondary-btn neutral feeling" data-feeling="3">??</button><button class="secondary-btn neutral feeling" data-feeling="4">??</button><button class="secondary-btn feeling" data-feeling="5">??</button></div></div><div class="section"><div class="section-title" style="margin-bottom:10px">????</div><div class="grid3"><button class="secondary-btn neutral fatigue" data-fatigue="low">?</button><button class="secondary-btn neutral fatigue" data-fatigue="medium">?</button><button class="secondary-btn neutral fatigue" data-fatigue="high">?</button></div></div><button class="primary-btn" id="confirm-finish">????</button>`);
    let feeling=4,fatigue='medium'; document.querySelectorAll('.feeling').forEach(b=>b.onclick=()=>{feeling=Number(b.dataset.feeling);document.querySelectorAll('.feeling').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');}); document.querySelectorAll('.fatigue').forEach(b=>b.onclick=()=>{fatigue=b.dataset.fatigue;document.querySelectorAll('.fatigue').forEach(x=>x.classList.add('neutral'));b.classList.remove('neutral');});
    document.getElementById('confirm-finish').onclick=()=>completeWorkout(feeling,fatigue);
  }
  function completeWorkout(feeling,fatigue){
    const w=state.activeWorkout; w.endedAt=new Date().toISOString();w.feeling=feeling;w.fatigue=fatigue;w.exercises=w.exercises.map(e=>({...e,sets:e.sets.filter(s=>s.done||s.weight||s.reps||s.minutes)})); state.workouts.push(w);state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);setPage('history');toast('?????');
  }
  function finishOrCancel(){
    openModal('??????',`<div class="note">???????????????????????????????????</div><button class="primary-btn" style="margin-top:14px" id="keep-training">????</button><button class="secondary-btn danger" style="width:100%;margin-top:8px" id="cancel-current">??????</button>`);
    document.getElementById('keep-training').onclick=closeModal;document.getElementById('cancel-current').onclick=()=>{state.activeWorkout=null;saveState();closeModal();restRemaining=0;clearInterval(timerInterval);renderTraining();toast('???????');};
  }

  function showPlan(id){ const p=planById(id); if(!p)return; openModal(`? ${p.index} ? ? ${p.name}`,`<div class="card flat plan-edit-list">${p.exercises.map(([eid,sets,min,max],i)=>{const e=exercise(eid);return `<div class="exercise-row plan-edit-row"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow plan-ex-copy"><strong>${esc(e.name)}</strong><small>${e.group} ? ${e.primary}</small></div><span class="pill">${sets}?${min}?${max}</span><div class="plan-mini-actions"><button data-plan-up="${i}">?</button><button data-plan-down="${i}">?</button><button data-plan-replace="${i}">?</button><button data-plan-delete="${i}">?</button></div></div>`;}).join('')}</div><button class="secondary-btn neutral" style="width:100%;margin-top:10px" id="plan-add-action">? ????</button><button class="primary-btn" style="margin-top:10px" id="modal-start-plan">????</button>`);document.getElementById('modal-start-plan').onclick=()=>{closeModal();startPlan(id);};document.getElementById('plan-add-action').onclick=()=>showPlanExercisePicker(p,'add');document.querySelectorAll('[data-plan-up]').forEach(b=>b.onclick=()=>movePlanExercise(p,Number(b.dataset.planUp),-1));document.querySelectorAll('[data-plan-down]').forEach(b=>b.onclick=()=>movePlanExercise(p,Number(b.dataset.planDown),1));document.querySelectorAll('[data-plan-delete]').forEach(b=>b.onclick=()=>{p.exercises.splice(Number(b.dataset.planDelete),1);saveState();showPlan(p.id);});document.querySelectorAll('[data-plan-replace]').forEach(b=>b.onclick=()=>showPlanExercisePicker(p,'replace',Number(b.dataset.planReplace))); }
  function movePlanExercise(p,i,d){const j=i+d;if(j<0||j>=p.exercises.length)return;[p.exercises[i],p.exercises[j]]=[p.exercises[j],p.exercises[i]];saveState();showPlan(p.id);}
  function showPlanExercisePicker(p,mode,index=null){openModal(mode==='add'?'????':'????',`<div class="search"><input id="plan-pick-search" placeholder="????"></div><div id="plan-pick-list" class="list"></div>`);const draw=(q='')=>{document.getElementById('plan-pick-list').innerHTML=allExercises().filter(e=>e.name.includes(q)).map(e=>`<button class="list-item" data-plan-pick="${e.id}"><div class="exercise-thumb">${exerciseVisual(e)}</div><div class="grow"><strong>${esc(e.name)}</strong><small>${e.group} ? ${e.equipment}</small></div></button>`).join('');hydrateGymVisuals(document.getElementById('plan-pick-list'));document.querySelectorAll('[data-plan-pick]').forEach(b=>b.onclick=()=>{if(mode==='add')p.exercises.push([b.dataset.planPick,1,8,12]);else{const old=p.exercises[index];p.exercises[index]=[b.dataset.planPick,old[1],old[2],old[3]];}saveState();showPlan(p.id);});};draw();document.getElementById('plan-pick-search').oninput=e=>draw(e.target.value.trim());}

  function exerciseVisual(ex,{priority=false}={}){
    const path=GYM_DIRECT[ex.id]||persistedGymMap[ex.id]||'';
    const src=path?`${GYM_BASE}/${String(path).replace(/^\.\//,'')}`:'';
    return `<div class="gym-media-shell${priority?' priority':''}"><img class="gym-gif" data-gym-id="${ex.id}" data-gym-path="${esc(path)}" data-gym-priority="${priority?'1':'0'}" ${src?`src="${src}"`:''} alt="${esc(ex.name)}" loading="${priority?'eager':'lazy'}" decoding="async" ${priority?'fetchpriority="high"':''} draggable="false"><span class="gym-loading">?????</span></div>`;
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
  async function gymRecord(ex){const saved=GYM_DIRECT[ex.id]||persistedGymMap[ex.id];if(saved)return {gif_url:saved};if(gymCache[ex.id])return gymCache[ex.id];try{const list=await loadGymIndex(),q=norm(GYM_QUERY[ex.id]||({?:'barbell bench press',?:'cable lat pulldown',?:'dumbbell lateral raise',?:'barbell full squat',??:'dumbbell biceps curl',??:'cable pushdown',?:'3/4 sit-up',??:'standing calf raise',??:'walk elliptical cross trainer'}[ex.group]||''));if(q){const rec=pickGymRecord(list,ex,q);if(rec?.gif_url){persistedGymMap[ex.id]=rec.gif_url;saveGymMap();gymCache[ex.id]=rec;return rec;}}}catch(err){console.warn('Gym Visual index load failed',err);}const fallback=GYM_GROUP_FALLBACK[ex.group]||GYM_GROUP_FALLBACK.?;return {gif_url:fallback,fallback:true};}
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
      else if(img._gymSuspendTimer){clearTimeout(img._gymSuspendTimer);img._gymSuspendTimer=null;}
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
    if(/?|??/.test(t))add('???');
    if(/??/.test(t))add('???');
    if(/??|??/.test(t))add('???');
    if(/??|??/.test(t))add('???');
    if(/??|??|??/.test(t))add('???');
    if(/????|???/.test(t))add('?????');
    if(/????|??/.test(t))add('?????');
    if(/????|??/.test(t))add('?????');
    if(/??|??|??/.test(t))add('?????');
    if(/???(?!?|?|?)|(^|[?? ])?($|[?? ])/.test(t)){add('?????');add('?????');}
    if(/???|??|??/.test(t))add('????');
    if(/???|??/.test(t))add('????');
    if(/??|??|??/.test(t))add('????');
    if(/??|??|??|??|??/.test(t))add('???');
    if(/??|??/.test(t))add('???');
    if(/??/.test(t))add('????');
    if(/???/.test(t))add('????');
    if(/??/.test(t))add('????');
    if(/??|??/.test(t))add('????');
    if(/??|?|??/.test(t))add('???');
    if(/??|???|??|??/.test(t))add('???');
    if(/??|??|??/.test(t))add('????');
    if(/??/.test(t)){add('???');add('????');add('???');}
    if(/?/.test(t)&&!out.some(x=>['???','???','???','???'].includes(x)))add('???');
    return out;
  }
  function layeredMuscleMapLegacy(ex){
    const primary=canonicalMuscles(ex.primary||ex.group),secondary=canonicalMuscles(ex.secondary||'').filter(x=>!primary.includes(x));
    const specs={
      '???':{id:'pectoralis_major',label:'???',side:'front',anchor:[250,128],paths:['M224 111 C232 101 244 101 249 111 L248 143 C237 148 225 143 220 134Z','M251 111 C256 101 268 101 276 111 L280 134 C275 143 263 148 252 143Z']},
      '?????':{id:'front_deltoid',label:'???',side:'front',anchor:[207,119],paths:['M202 105 C207 94 219 92 226 101 L222 130 C215 139 205 137 199 129Z','M274 101 C281 92 293 94 298 105 L301 129 C295 137 285 139 278 130Z']},
      '?????':{id:'middle_deltoid',label:'???',side:'front',anchor:[202,111],paths:['M198 102 C204 91 217 89 225 100 L221 122 C213 131 204 130 197 122Z','M275 100 C283 89 296 91 302 102 L303 122 C296 130 287 131 279 122Z']},
      '????':{id:'biceps',label:'????',side:'front',anchor:[190,162],paths:['M186 136 C194 132 201 138 201 150 L195 181 C188 187 181 180 181 170Z','M299 150 C299 138 306 132 314 136 L319 170 C319 180 312 187 305 181Z']},
      '????':{id:'forearms',label:'??',side:'front',anchor:[174,215],paths:['M179 179 C188 176 195 183 193 194 L181 237 C174 242 166 237 167 228Z','M307 183 C314 176 323 179 333 228 C334 237 326 242 319 237 L307 194Z']},
      '???':{id:'abs',label:'???',side:'front',anchor:[250,188],paths:['M237 147 C245 144 255 144 263 147 L264 220 C256 229 244 229 236 220Z']},
      '???':{id:'obliques',label:'???',side:'front',anchor:[224,188],paths:['M221 145 C229 145 235 151 236 160 L234 220 C225 222 219 214 216 201Z','M264 160 C265 151 271 145 279 145 L284 201 C281 214 275 222 266 220Z']},
      '????':{id:'hip_flexors',label:'????',side:'front',anchor:[250,234],paths:['M226 218 L248 224 L244 253 L228 245Z','M252 224 L274 218 L272 245 L256 253Z']},
      '????':{id:'quads',label:'????',side:'front',anchor:[227,300],paths:['M222 246 C234 240 245 249 246 266 L239 344 C231 356 219 351 216 337Z','M254 266 C255 249 266 240 278 246 L284 337 C281 351 269 356 261 344Z']},
      '????':{id:'adductors',label:'????',side:'front',anchor:[250,292],paths:['M241 248 L250 260 L247 333 L238 306Z','M250 260 L259 248 L262 306 L253 333Z']},
      '???':{id:'trapezius',label:'???',side:'back',anchor:[510,117],paths:['M478 94 C491 84 502 88 510 101 C518 88 529 84 542 94 L544 142 L510 166 L476 142Z']},
      '???':{id:'rhomboids',label:'???',side:'back',anchor:[510,145],paths:['M492 123 L510 106 L528 123 L523 163 L497 163Z']},
      '???':{id:'lats',label:'???',side:'back',anchor:[485,181],paths:['M477 148 C488 143 501 151 503 166 L500 221 C489 229 478 220 471 204Z','M517 166 C519 151 532 143 543 148 L549 204 C542 220 531 229 520 221Z']},
      '???':{id:'erector_spinae',label:'???',side:'back',anchor:[510,199],paths:['M503 162 L509 169 L507 228 L500 218Z','M511 169 L517 162 L520 218 L513 228Z']},
      '?????':{id:'rear_deltoid',label:'???',side:'back',anchor:[466,119],paths:['M459 104 C465 92 477 91 485 101 L481 130 C473 138 463 136 457 128Z','M535 101 C543 91 555 92 561 104 L563 128 C557 136 547 138 539 130Z']},
      '?????':{id:'rotator_cuff',label:'??',side:'back',anchor:[482,139],paths:['M477 121 C484 115 494 119 499 128 L496 151 C487 157 479 153 475 145Z','M521 128 C526 119 536 115 543 121 L545 145 C541 153 533 157 524 151Z']},
      '????':{id:'triceps',label:'????',side:'back',anchor:[451,163],paths:['M448 136 C456 132 464 138 465 151 L459 183 C452 189 444 182 444 172Z','M555 151 C556 138 564 132 572 136 L576 172 C576 182 568 189 561 183Z']},
      '???':{id:'glutes',label:'???',side:'back',anchor:[530,245],paths:['M477 218 C490 209 504 214 509 229 L508 268 C496 279 483 275 476 263Z','M511 229 C516 214 530 209 543 218 L544 263 C537 275 524 279 512 268Z']},
      '????':{id:'hamstrings',label:'???',side:'back',anchor:[535,310],paths:['M482 268 C494 263 505 271 506 285 L502 347 C493 355 484 348 479 337Z','M514 285 C515 271 526 263 538 268 L541 337 C536 348 527 355 518 347Z']},
      '???':{id:'calves',label:'??',side:'back',anchor:[535,378],paths:['M482 349 C493 344 502 352 503 366 L498 414 C491 426 482 420 479 408Z','M517 366 C518 352 527 344 538 349 L541 408 C538 420 529 426 522 414Z']}
    };
    const active=[...new Set([...primary,...secondary])].filter(n=>specs[n]);
    const fill=name=>primary.includes(name)?'#f5222d':secondary.includes(name)?'#ff9f1a':'#f7f8fa';
    const body=`<g class="anatomy-base" fill="#eef1f6" stroke="#aeb8c7" stroke-width="1.5" stroke-linejoin="round"><circle cx="250" cy="51" r="25"/><path d="M238 75 L262 75 L266 94 C283 96 296 105 303 124 L318 177 L336 231 L324 239 L301 185 L286 139 L283 220 L274 245 L282 345 L275 428 L258 428 L251 350 L249 267 L247 350 L239 428 L222 428 L215 345 L223 245 L216 220 L217 139 L199 185 L176 239 L164 231 L182 177 L197 124 C204 105 217 96 234 94Z"/><path d="M164 231 L176 239 L169 253 L158 246Z M324 239 L336 231 L342 246 L331 253Z M222 428 L239 428 L238 442 L214 442Z M258 428 L275 428 L286 442 L262 442Z"/><circle cx="510" cy="51" r="25"/><path d="M498 75 L522 75 L526 94 C543 96 556 105 563 124 L578 177 L596 231 L584 239 L561 185 L546 139 L543 220 L534 245 L542 345 L535 428 L518 428 L511 350 L509 267 L507 350 L499 428 L482 428 L475 345 L483 245 L476 220 L477 139 L459 185 L436 239 L424 231 L442 177 L457 124 C464 105 477 96 494 94Z"/><path d="M424 231 L436 239 L429 253 L418 246Z M584 239 L596 231 L602 246 L591 253Z M482 428 L499 428 L498 442 L474 442Z M518 428 L535 428 L546 442 L522 442Z"/></g>`;
    const regions=Object.entries(specs).flatMap(([name,s])=>s.paths.map(d=>`<path class="anatomy-muscle" data-muscle="${s.id}" d="${d}" fill="${fill(name)}" stroke="#c5ccd7" stroke-width="1.2"/>`)).join('');
    const labels=side=>{const items=active.filter(n=>specs[n].side===side).sort((a,b)=>specs[a].anchor[1]-specs[b].anchor[1]);if(!items.length)return '';const min=96,max=402,gap=34,ys=items.map(n=>clamp(specs[n].anchor[1],min,max));for(let i=1;i<ys.length;i++)ys[i]=Math.max(ys[i],ys[i-1]+gap);if(ys.at(-1)>max){const shift=ys.at(-1)-max;ys.forEach((_,i)=>ys[i]-=shift);}return items.map((name,i)=>{const s=specs[name],[x,y]=s.anchor,c=fill(name),front=side==='front',bend=front?145:615,end=front?123:637,textX=front?116:644,align=front?'end':'start';return `<g class="heatmap-label"><path d="M${x} ${y} L${bend} ${ys[i]} L${end} ${ys[i]}" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="${c}" stroke-width="1.8"/><text x="${textX}" y="${ys[i]+5}" text-anchor="${align}" fill="${c}">${s.label}</text></g>`;}).join('');};
    return `<div class="heatmap-wrap formal layered"><svg viewBox="0 0 760 470" class="heatmap-svg anatomy-svg" role="img" aria-label="${esc(ex.name)}?????"><text class="body-view-label" x="250" y="24" text-anchor="middle">??</text><text class="body-view-label" x="510" y="24" text-anchor="middle">??</text>${body}<g>${regions}</g>${labels('front')}${labels('back')}</svg><div class="heatmap-legend"><span><i class="red"></i>??????</span><span><i class="orange"></i>??????</span><span><i class="gray"></i>?????</span></div></div>`;
  }

  function layeredMuscleMap(ex){
    const primary=canonicalMuscles(ex.primary||ex.group),secondary=canonicalMuscles(ex.secondary||'').filter(x=>!primary.includes(x));
    const specs={
      '???':{id:'pectoralis_major',label:'???',side:'front',anchor:[270,143],paths:['M237 126 C248 117 260 119 268 130 L267 157 C254 163 241 158 233 147Z','M272 130 C280 119 292 117 303 126 L307 147 C299 158 286 163 273 157Z']},
      '?????':{id:'front_deltoid',label:'???',side:'front',anchor:[225,139],paths:['M215 126 C221 113 233 112 241 121 L237 150 C229 157 220 153 215 145Z','M299 121 C307 112 319 113 325 126 L325 145 C320 153 311 157 303 150Z']},
      '?????':{id:'middle_deltoid',label:'???',side:'front',anchor:[215,142],paths:['M207 129 C210 115 221 108 232 114 L226 153 C216 160 208 153 205 143Z','M308 114 C319 108 330 115 333 129 L335 143 C332 153 324 160 314 153Z']},
      '????':{id:'biceps',label:'????',side:'front',anchor:[205,187],paths:['M196 157 C207 151 216 158 217 173 L211 210 C203 219 193 211 192 199Z','M323 173 C324 158 333 151 344 157 L348 199 C347 211 337 219 329 210Z']},
      '????':{id:'forearms',label:'??',side:'front',anchor:[181,244],paths:['M188 207 C199 204 207 213 204 226 L190 273 C181 281 171 274 173 261Z','M336 213 C344 204 355 207 367 261 C369 274 359 281 350 273 L336 226Z']},
      '???':{id:'abs',label:'???',side:'front',anchor:[270,208],paths:['M257 163 C265 160 275 160 283 163 L284 248 C276 258 264 258 256 248Z']},
      '???':{id:'obliques',label:'???',side:'front',anchor:[241,213],paths:['M236 159 C246 159 253 167 254 180 L252 248 C242 252 234 242 230 224Z','M286 180 C287 167 294 159 304 159 L310 224 C306 242 298 252 288 248Z']},
      '????':{id:'hip_flexors',label:'????',side:'front',anchor:[270,271],paths:['M237 250 L267 257 L261 286 L240 279Z','M273 257 L303 250 L300 279 L279 286Z']},
      '????':{id:'quads',label:'????',side:'front',anchor:[242,340],paths:['M234 283 C249 274 263 286 264 305 L257 393 C247 407 232 399 229 382Z','M276 305 C277 286 291 274 306 283 L311 382 C308 399 293 407 283 393Z']},
      '????':{id:'adductors',label:'????',side:'front',anchor:[270,334],paths:['M254 284 L270 302 L266 382 L252 348Z','M270 302 L286 284 L288 348 L274 382Z']},
      '???':{id:'trapezius',label:'???',side:'back',anchor:[510,133],paths:['M477 111 C489 103 499 106 510 119 C521 106 531 103 543 111 L548 161 L510 190 L472 161Z']},
      '???':{id:'rhomboids',label:'???',side:'back',anchor:[510,168],paths:['M488 144 L510 122 L532 144 L527 191 L493 191Z']},
      '???':{id:'lats',label:'???',side:'back',anchor:[475,206],paths:['M469 169 C484 161 499 172 501 191 L497 253 C484 265 470 253 462 232Z','M519 191 C521 172 536 161 551 169 L558 232 C550 253 536 265 523 253Z']},
      '???':{id:'erector_spinae',label:'???',side:'back',anchor:[510,222],paths:['M501 184 L509 194 L507 260 L497 247Z','M511 194 L519 184 L523 247 L513 260Z']},
      '?????':{id:'rear_deltoid',label:'???',side:'back',anchor:[463,143],paths:['M452 127 C459 113 472 112 481 122 L477 153 C468 161 458 157 452 148Z','M539 122 C548 112 561 113 568 127 L568 148 C562 157 552 161 543 153Z']},
      '?????':{id:'rotator_cuff',label:'??',side:'back',anchor:[486,158],paths:['M480 139 C488 132 500 137 505 147 L501 174 C490 181 481 175 477 166Z','M515 147 C520 137 532 132 540 139 L543 166 C539 175 530 181 519 174Z']},
      '????':{id:'triceps',label:'????',side:'back',anchor:[447,190],paths:['M438 157 C449 151 458 159 459 174 L453 211 C445 220 435 212 434 200Z','M561 174 C562 159 571 151 582 157 L586 200 C585 212 575 220 567 211Z']},
      '???':{id:'glutes',label:'???',side:'back',anchor:[535,286],paths:['M470 254 C486 243 503 249 509 267 L508 306 C494 319 478 314 469 300Z','M511 267 C517 249 534 243 550 254 L551 300 C542 314 526 319 512 306Z']},
      '????':{id:'hamstrings',label:'???',side:'back',anchor:[541,356],paths:['M478 307 C492 300 505 311 506 329 L501 394 C491 405 480 396 474 383Z','M514 329 C515 311 528 300 542 307 L546 383 C540 396 529 405 519 394Z']},
      '???':{id:'calves',label:'??',side:'back',anchor:[540,431],paths:['M477 397 C490 390 501 401 502 418 L497 466 C488 480 477 471 473 456Z','M518 418 C519 401 530 390 543 397 L547 456 C543 471 532 480 523 466Z']}
    };
    const active=[...new Set([...primary,...secondary])].filter(name=>specs[name]);
    const color=name=>primary.includes(name)?'#f5222d':secondary.includes(name)?'#ff9f1a':'#d9dfe8';
    const figure=(cx,back=false)=>`<g class="anatomy-model ${back?'back':'front'}"><ellipse class="anatomy-skin" cx="${cx}" cy="75" rx="25" ry="31"/><path class="anatomy-hair" d="M${cx-25} 70 C${cx-25} 45 ${cx-10} 37 ${cx+2} 43 C${cx+15} 34 ${cx+28} 48 ${cx+25} 68 L${cx+17} 57 C${cx+5} 62 ${cx-6} 58 ${cx-18} 63Z"/><path class="anatomy-skin" d="M${cx-12} 101 L${cx+12} 101 L${cx+16} 118 L${cx-16} 118Z"/><path class="anatomy-skin" d="M${cx-17} 113 C${cx-42} 115 ${cx-55} 126 ${cx-60} 149 L${cx-52} 249 L${cx-35} 279 L${cx-42} 382 L${cx-35} 474 L${cx-15} 474 L${cx-7} 391 L${cx-2} 298 L${cx+2} 298 L${cx+7} 391 L${cx+15} 474 L${cx+35} 474 L${cx+42} 382 L${cx+35} 279 L${cx+52} 249 L${cx+60} 149 C${cx+55} 126 ${cx+42} 115 ${cx+17} 113 C${cx+8} 122 ${cx-8} 122 ${cx-17} 113Z"/><path class="anatomy-skin" d="M${cx-54} 137 C${cx-69} 139 ${cx-78} 154 ${cx-80} 174 L${cx-93} 225 L${cx-111} 273 L${cx-99} 280 L${cx-76} 235 L${cx-58} 190Z"/><path class="anatomy-skin" d="M${cx+54} 137 C${cx+69} 139 ${cx+78} 154 ${cx+80} 174 L${cx+93} 225 L${cx+111} 273 L${cx+99} 280 L${cx+76} 235 L${cx+58} 190Z"/><path class="anatomy-hand" d="M${cx-111} 271 L${cx-121} 284 L${cx-118} 289 L${cx-108} 281 L${cx-114} 294 L${cx-109} 298 L${cx-99} 281Z"/><path class="anatomy-hand" d="M${cx+111} 271 L${cx+121} 284 L${cx+118} 289 L${cx+108} 281 L${cx+114} 294 L${cx+109} 298 L${cx+99} 281Z"/><path class="anatomy-foot" d="M${cx-37} 470 C${cx-48} 481 ${cx-45} 490 ${cx-31} 491 L${cx-12} 487 L${cx-15} 474Z"/><path class="anatomy-foot" d="M${cx+37} 470 C${cx+48} 481 ${cx+45} 490 ${cx+31} 491 L${cx+12} 487 L${cx+15} 474Z"/></g>`;
    const regions=Object.entries(specs).flatMap(([name,s])=>s.paths.map(d=>`<path class="anatomy-muscle" data-muscle="${s.id}" d="${d}" fill="${color(name)}"/>`)).join('');
    const labels=side=>{const names=active.filter(name=>specs[name].side===side).sort((a,b)=>specs[a].anchor[1]-specs[b].anchor[1]);if(!names.length)return '';const min=110,max=458,gap=34,ys=names.map(name=>clamp(specs[name].anchor[1],min,max));for(let i=1;i<ys.length;i++)ys[i]=Math.max(ys[i],ys[i-1]+gap);if(ys.at(-1)>max){const shift=ys.at(-1)-max;ys.forEach((_,i)=>ys[i]-=shift);}return names.map((name,i)=>{const spec=specs[name],[x,y]=spec.anchor,c=color(name),front=side==='front',bend=front?133:647,end=front?110:670,textX=front?102:678,align=front?'end':'start';return `<g class="heatmap-label"><path d="M${x} ${y} L${bend} ${ys[i]} L${end} ${ys[i]}" stroke="${c}"/><circle cx="${x}" cy="${y}" r="3" stroke="${c}"/><text x="${textX}" y="${ys[i]+5}" text-anchor="${align}" fill="${c}">${spec.label}</text></g>`;}).join('');};
    return `<div class="heatmap-wrap formal layered"><svg viewBox="0 0 780 520" class="heatmap-svg anatomy-svg" role="img" aria-label="${esc(ex.name)}?????"><text class="body-view-label" x="270" y="24" text-anchor="middle">??</text><text class="body-view-label" x="510" y="24" text-anchor="middle">??</text>${figure(270)}${figure(510,true)}<g class="anatomy-regions">${regions}</g>${labels('front')}${labels('back')}</svg><div class="heatmap-legend"><span><i class="red"></i>??????</span><span><i class="orange"></i>??????</span><span><i class="gray"></i>?????</span></div></div>`;
  }

  function formatVideoDuration(seconds){
    const total=Math.max(0,Number(seconds)||0),hours=Math.floor(total/3600),minutes=Math.floor((total%3600)/60),secs=total%60;
    return hours?`${hours}:${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`:`${minutes}:${String(secs).padStart(2,'0')}`;
  }

  function videoHTML(ex){
    const video=VIDEO_MAP[ex.id];
    if(!video)return `<div class="video-unavailable"><strong>??????</strong><span>3D ???????????????????</span></div>`;
    const dur=formatVideoDuration(video.duration),cover=BILIBILI_COVERS[ex.id]?`${BILIBILI_COVER_BASE}${BILIBILI_COVERS[ex.id]}`:'';
    return `<div class="local-video" data-local-video="${ex.id}" data-bvid="${video.bvid}">
      <div class="local-video-stage">
        <div class="bilibili-cover-wrap">${cover?`<img class="bilibili-cover" src="${cover}" alt="${esc(ex.name)}??????" loading="eager" decoding="async" fetchpriority="high" referrerpolicy="no-referrer">`:''}</div>
        <div class="local-video-shade"></div>
        <button class="local-video-play" type="button" aria-label="??${esc(ex.name)}??????"><span>?</span></button>
        <div class="local-video-time">${dur}</div>
      </div>
      <div class="local-video-note">${esc(video.author)} ? ${dur} ? ${esc(video.title)}</div>
    </div>`;
  }

  let activeVideoStage=null;
  function videoScreenControlsHTML(){return `<div class="video-screen-controls" aria-label="??????"><button type="button" data-video-screen aria-label="????" title="????"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg></button></div>`;}
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
        if(!/^BV[0-9A-Za-z]{10}$/.test(bvid||'')){toast('??????');return;}
        card.classList.add('playing');
        stage.innerHTML=`<div class="video-loading" aria-live="polite"><span></span>???????</div><iframe class="bilibili-player" title="${esc(exercise(card.dataset.localVideo).name)}????" src="https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&page=1&autoplay=1&danmaku=0&high_quality=1" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${videoScreenControlsHTML()}`;
        const frame=stage.querySelector('.bilibili-player');
        frame.addEventListener('load',()=>{stage.querySelector('.video-loading')?.remove();},{once:true});
        setTimeout(()=>stage.querySelector('.video-loading')?.remove(),8000);
        bindVideoScreenControls(stage);
      });
    });
  }

  function numberedList(items,kind='blue'){return `<div class="learn-list ${kind}">${(items||[]).map((x,i)=>`<div class="learn-item"><span>${i+1}</span><p>${esc(String(x).replace(/^\s*[????]\s*/u,''))}</p></div>`).join('')}</div>`;}
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
    openModal(ex.name,`<div class="learn-stack"><section class="learn-card navy"><div class="learn-no blue">01</div><h2>3D ??</h2><p class="learn-desc">???????????</p><div class="learn-media white">${exerciseVisual(ex,{priority:true})}</div></section><section class="learn-card navy"><div class="learn-no blue">02</div><h2>????</h2><p class="learn-desc">?????????????????</p>${videoHTML(ex)}</section><section class="learn-card navy"><div class="learn-no blue">03</div><h2>????</h2>${numberedList(ex.tips,'blue')}</section><section class="learn-card navy"><div class="learn-no orange">04</div><h2>????</h2>${numberedList(ex.mistakes,'orange')}</section><section class="learn-card navy"><div class="learn-no orange">05</div><h2>?????</h2><p class="learn-desc">????????????????????</p><div class="learn-media heat">${layeredMuscleMap(ex)}</div></section></div>`);
    resetTutorialScroll();
    hydrateGymVisuals(modalBody).finally(resetTutorialScroll);
    bindLocalTutorialVideos(modalBody);
  }

  function showWorkoutDetail(id){
    const w=state.workouts.find(x=>x.id===id); if(!w)return; openModal(w.name,`<div class="card"><div class="stat-row"><span>??</span><strong>${formatDateTime(w.endedAt)}</strong></div><div class="stat-row"><span>????</span><strong>${durationText(new Date(w.endedAt)-new Date(w.startedAt))}</strong></div><div class="stat-row"><span>???</span><strong>${workingSets(w)} ?</strong></div><div class="stat-row"><span>????</span><strong>${Math.round(totalVolume(w)).toLocaleString()} kg</strong></div></div><section class="section"><div class="section-title" style="margin-bottom:10px">????</div>${(w.exercises||[]).map(e=>`<div class="card flat history-ex"><div class="exercise-thumb">${exerciseVisual(exercise(e.exerciseId))}</div><div><strong>${esc(e.customName || exercise(e.exerciseId).name)}</strong><div class="small muted" style="margin-top:6px">${esc(setSummary(e.sets,exercise(e.exerciseId)))}</div></div></div>`).join('')}</section><div class="history-detail-actions"><button class="secondary-btn" id="edit-workout">????</button><button class="secondary-btn danger" id="delete-workout">??????</button></div>`); document.getElementById('edit-workout').onclick=()=>showEditWorkout(id);document.getElementById('delete-workout').onclick=()=>{state.workouts=state.workouts.filter(x=>x.id!==id);saveState();closeModal();render();toast('???????');};
  }
  function syncHistoryEditDraft(){
    if(!historyEditDraft)return;
    document.querySelectorAll('[data-history-edit]').forEach(input=>{const [ei,si,di,field]=input.dataset.historyEdit.split(':').map((v,i)=>i<3?Number(v):v),set=historyEditDraft.exercises?.[ei]?.sets?.[si];if(!set)return;if(di>=0){set.drops=set.drops||[];if(set.drops[di])set.drops[di][field]=input.value;}else set[field]=input.value;});
    const name=document.getElementById('history-edit-name'),date=document.getElementById('history-edit-date');if(name)historyEditDraft.name=name.value.trim()||historyEditDraft.name;if(date)historyEditDraft._editDate=date.value;
  }
  function historyEditSetHTML(ex,set,ei,si){
    const cardio=ex.type==='cardio',main=cardio?`<input inputmode="decimal" value="${esc(set.minutes??set.reps??'')}" data-history-edit="${ei}:${si}:-1:minutes"><span>min</span>`:`<input inputmode="decimal" value="${esc(set.weight??'')}" data-history-edit="${ei}:${si}:-1:weight"><span>kg</span><input inputmode="numeric" value="${esc(set.reps??'')}" data-history-edit="${ei}:${si}:-1:reps"><span>?</span>`;
    const drops=cardio?'':(set.drops||[]).map((d,di)=>`<div class="history-edit-drop"><span>?${di+1}</span><input inputmode="decimal" value="${esc(d.weight??'')}" data-history-edit="${ei}:${si}:${di}:weight"><em>kg</em><input inputmode="numeric" value="${esc(d.reps??'')}" data-history-edit="${ei}:${si}:${di}:reps"><em>?</em></div>`).join('');
    return `<div class="history-edit-set"><div class="history-edit-main"><b>${set.warmup?'?':si+1}</b>${main}<button type="button" data-history-delete-set="${ei}:${si}" aria-label="?????">?</button></div>${drops}</div>`;
  }
  function showEditWorkout(id,keepDraft=false){
    const original=state.workouts.find(x=>x.id===id);if(!original)return;if(!keepDraft||!historyEditDraft||historyEditDraft.id!==id)historyEditDraft=JSON.parse(JSON.stringify(original));
    const date=historyEditDraft._editDate||(historyEditDraft.endedAt||today()).slice(0,10);
    openModal('??????',`<div class="form-grid"><div class="field"><label>????</label><input id="history-edit-name" value="${esc(historyEditDraft.name)}"></div><div class="field"><label>??</label><input id="history-edit-date" type="date" value="${date}"></div></div><div class="history-edit-list">${(historyEditDraft.exercises||[]).map((entry,ei)=>{const ex=exercise(entry.exerciseId);return `<section class="history-edit-exercise"><h3>${esc(entry.customName||ex.name)}</h3>${(entry.sets||[]).map((set,si)=>historyEditSetHTML(ex,set,ei,si)).join('')}<button class="text-btn history-add-set" type="button" data-history-add-set="${ei}">? ????</button></section>`;}).join('')}</div><button class="primary-btn" id="save-history-edit">????</button>`);
    document.querySelectorAll('[data-history-delete-set]').forEach(b=>b.onclick=()=>{syncHistoryEditDraft();const [ei,si]=b.dataset.historyDeleteSet.split(':').map(Number);historyEditDraft.exercises[ei].sets.splice(si,1);showEditWorkout(id,true);});
    document.querySelectorAll('[data-history-add-set]').forEach(b=>b.onclick=()=>{syncHistoryEditDraft();const ei=Number(b.dataset.historyAddSet),ex=exercise(historyEditDraft.exercises[ei].exerciseId),last=historyEditDraft.exercises[ei].sets.at(-1)||{};historyEditDraft.exercises[ei].sets.push(ex.type==='cardio'?{minutes:last.minutes||'',done:true,warmup:false,drops:[]}:{weight:last.weight||'',reps:last.reps||'',done:true,warmup:false,drops:[]});showEditWorkout(id,true);});
    document.getElementById('save-history-edit').onclick=()=>{syncHistoryEditDraft();const duration=Math.max(60000,new Date(original.endedAt)-new Date(original.startedAt)),oldEnd=new Date(historyEditDraft.endedAt),parts=(historyEditDraft._editDate||date).split('-').map(Number),newEnd=new Date(parts[0],parts[1]-1,parts[2],oldEnd.getHours(),oldEnd.getMinutes(),oldEnd.getSeconds());historyEditDraft.endedAt=newEnd.toISOString();historyEditDraft.startedAt=new Date(newEnd.getTime()-duration).toISOString();delete historyEditDraft._editDate;state.workouts=state.workouts.map(w=>w.id===id?historyEditDraft:w);historyEditDraft=null;saveState();closeModal();renderHistoryPage();toast('???????');};
  }

  function showBodyForm(id=null){
    const current=id?state.bodyMetrics.find(x=>x.id===id):null,value=(key)=>esc(current?.[key]??'');
    openModal(current?'??????':'??????',`<div class="form-grid"><div class="field full"><label>??</label><input id="body-date" type="date" value="${current?.date||localDateKey()}"></div><div class="field"><label>?? kg</label><input id="body-weight" type="number" inputmode="decimal" min="20" max="300" step="0.1" value="${value('weight')}"></div><div class="field"><label>??? %</label><input id="body-fat" type="number" inputmode="decimal" min="1" max="70" step="0.1" value="${value('bodyFat')}"></div><div class="field"><label>?? cm</label><input id="body-waist" type="number" inputmode="decimal" min="30" max="250" step="0.1" value="${value('waist')}"></div><div class="field"><label>??? kg</label><input id="body-muscle" type="number" inputmode="decimal" min="5" max="100" step="0.1" value="${value('skeletalMuscle')}"></div></div><div class="body-form-actions"><button class="primary-btn" id="save-body">????</button>${current?'<button class="secondary-btn danger" id="delete-body">????</button>':''}</div>`);
    document.getElementById('save-body').onclick=()=>{
      const date=document.getElementById('body-date').value||localDateKey(),weight=num(document.getElementById('body-weight').value),bodyFat=num(document.getElementById('body-fat').value),waist=num(document.getElementById('body-waist').value),skeletalMuscle=num(document.getElementById('body-muscle').value);
      if(weight===null&&bodyFat===null&&waist===null&&skeletalMuscle===null){toast('??????????');return;}
      const row={...(current||{}),id:current?.id||uid(),date,weight,bodyFat,waist,skeletalMuscle};
      state.bodyMetrics=current?state.bodyMetrics.map(x=>x.id===current.id?row:x):[...state.bodyMetrics,row];
      saveState();closeModal();render();toast(current?'???????':'???????');
    };
    const del=document.getElementById('delete-body');if(del)del.onclick=()=>{if(!confirm(`?? ${formatDate(current.date)} ??????`))return;state.bodyMetrics=state.bodyMetrics.filter(x=>x.id!==current.id);saveState();closeModal();render();toast('???????');};
  }

  function showRestSetting(){ openModal('??????',`<div class="form-grid"><div class="field full"><label>?</label><input id="rest-seconds" type="number" min="30" max="300" step="15" value="${state.settings.restSeconds}"></div></div><button class="primary-btn" style="margin-top:14px" id="save-rest">??</button>`);document.getElementById('save-rest').onclick=()=>{state.settings.restSeconds=clamp(Number(document.getElementById('rest-seconds').value)||120,30,300);saveState();closeModal();renderMine();}; }
  async function exportData(){ state.meta={...(state.meta||{}),lastBackupAt:new Date().toISOString()};saveState();if(storageReady)await persistenceQueue;const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`train-log-backup-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);if(page==='mine'&&dataTab==='settings')renderMine();toast('?????'); }
  async function importDataFile(file){
    if(!file)return;
    try{
      const text=await file.text(),incoming=JSON.parse(text);
      if(!incoming || !Array.isArray(incoming.workouts) || !Array.isArray(incoming.bodyMetrics))throw new Error('invalid');
      const ok=confirm(`???????\n?????${incoming.workouts.length} ?\n?????${incoming.bodyMetrics.length} ?\n\n???????????`);
      if(!ok)return;
      state={...defaultState(),...incoming,version:VERSION};
      if(Array.isArray(incoming.plans)&&incoming.plans.length)PLAN=JSON.parse(JSON.stringify(incoming.plans));
      state=normalizeState(state);saveState();if(storageReady)await queueIndexedSave(true);render();toast('??????');
    }catch(e){toast('??????????');}
  }

  function showQuickAdd(){
    openModal('????',`<div class="info-note">???????????????????????????x???????<b>?? 50x10 50x10 60x8</b></div><div class="quick-lines" style="margin-top:12px"><textarea id="quick-text" placeholder="?? 50x10 50x10 60x8\n???? 35x12 40x10 45x8"></textarea></div><button class="primary-btn" style="margin-top:12px" id="quick-parse">??????</button>`);
    document.getElementById('quick-parse').onclick=()=>parseQuick(document.getElementById('quick-text').value);
  }
  function parseQuick(text){
    const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean); if(!lines.length){toast('???????');return;}
    const entries=[];
    lines.forEach(line=>{
      let matches=[...line.matchAll(/(\d+(?:\.\d+)?)\s*(?:kg)?\s*[x?]\s*(\d+)/gi)];
      const barMatch=[...line.matchAll(/??\s*[x?]\s*(\d+)/gi)];
      let stripped=line.replace(/(\d+(?:\.\d+)?)\s*(?:kg)?\s*[x?]\s*(\d+)/gi,'').replace(/??\s*[x?]\s*(\d+)/gi,'').trim().replace(/[?,;?]+$/,'').trim();
      const plusReps = !matches.length && !barMatch.length ? stripped.match(/^(.*?)(\d+(?:\s*\+\s*\d+){1,})$/) : null;
      const name=(plusReps?plusReps[1]:stripped).trim();
      let ex=EXERCISES.find(e=>name.includes(e.name)||e.name.includes(name));
      if(!ex && name.includes('??'))ex=exercise('bench_press');
      if(!ex && name.includes('??'))ex=exercise('lat_pulldown');
      if(!ex && name.includes('??'))ex=exercise('cable_row');
      if(!ex && name.includes('???'))ex=exercise('lateral_raise');
      if(!ex && name.includes('??'))ex=exercise('biceps_curl');
      const parsedSets = [
        ...barMatch.map(m=>({weight:'0',reps:m[1],rir:'',warmup:true,done:true})),
        ...matches.map(m=>({weight:m[1],reps:m[2],rir:'',warmup:false,done:true})),
        ...(plusReps ? plusReps[2].split(/\s*\+\s*/).map(r=>({weight:'',reps:r,rir:'',warmup:false,done:true})) : [])
      ];
      if(parsedSets.length)entries.push({exerciseId:ex?.id||`custom_${uid()}`,customName:ex?null:(name||'?????'),sets:parsedSets});
    });
    if(!entries.length){toast('????????x?????');return;}
    const started=new Date(Date.now()-60*60000),ended=new Date(); const w={id:uid(),planId:null,name:'????',startedAt:started.toISOString(),endedAt:ended.toISOString(),feeling:4,fatigue:'medium',exercises:entries.map(e=>{if(e.customName){ if(!EXERCISES.find(x=>x.id===e.exerciseId))EXERCISES.push({id:e.exerciseId,name:e.customName,group:'??',equipment:'???',muscles:['??'],primary:'???',secondary:'',tips:[],mistakes:[],rest:'60?120 ?'});}return e;})}; state.workouts.push(w);saveState();closeModal();setPage('history');toast(`??? ${entries.length} ???`);
  }

  // PWA app-like interaction: block text selection/context menu and browser pinch zoom while preserving inputs.
  const eventTargetMatches=(e,selector)=>e.target instanceof Element&&e.target.closest(selector);
  document.addEventListener('contextmenu',e=>{if(!eventTargetMatches(e,'input,textarea'))e.preventDefault();});
  document.addEventListener('selectstart',e=>{if(!eventTargetMatches(e,'input,textarea'))e.preventDefault();});
  document.addEventListener('gesturestart',e=>e.preventDefault(),{passive:false});
  let lastTouchEnd=0;document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastTouchEnd<=300&&!eventTargetMatches(e,'input,textarea'))e.preventDefault();lastTouchEnd=now;},{passive:false});

  document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>setPage(b.dataset.page));
  document.getElementById('modal-close').onclick=closeModal;
  modal.addEventListener('click',e=>{ if(e.target===modal)closeModal(); });

  if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&page==='home')renderHome();});
  scheduleDateRefresh();
  render();
  initializeStorage();
})();
