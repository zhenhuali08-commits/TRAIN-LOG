import fs from 'node:fs';
import vm from 'node:vm';

const context=vm.createContext({window:{}});
for(const file of ['new-videos.js','new-content.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const {TRAIN_LOG_NEW_CONTENT:content,TRAIN_LOG_NEW_NAMES:names,TRAIN_LOG_NEW_VIDEOS:videos,TRAIN_LOG_NEW_GIFS:gifs}=context.window;
const oldSource=fs.readFileSync('app.js','utf8').split('// V2.5 全动作实用讲解')[0];
const oldIds=[...new Set([...oldSource.matchAll(/\{id:'([^']+)'/g)].map(m=>m[1]))];
const oldLive=new Set(oldIds.filter(id=>!new Set(['hip_thrust','cable_kickback','ab_wheel','rowing_machine','jump_rope','swimming']).has(id)));
const ids=content.exercises.map(ex=>ex.id);
const known=new Set([...oldLive,...ids]);
const errors=[];
const check=(condition,message)=>{if(!condition)errors.push(message);};
check(ids.length===63,`新增动作数量 ${ids.length}，应为 63`);
check(new Set(ids).size===ids.length,'新增动作 ID 重复');
check(ids.every(id=>!oldLive.has(id)),'新增动作与原动作库 ID 重复');
check(ids.every(id=>names[id]),'新增动作缺少中文名称');
check(Object.keys(videos).length===62,`视频数量 ${Object.keys(videos).length}，应为 62`);
check(!videos.band_high_shoulder_external_rotation,'唯一未匹配视频应留空');
check(content.programs.length===10,`新计划数量 ${content.programs.length}，应为 10`);
for(const ex of content.exercises){
  check(ex.tips.length>=2&&ex.mistakes.length>=2,`${ex.id} 缺少要点或常见错误`);
  check(ex.muscleMap.primary.length>0,`${ex.id} 缺少主训练肌群`);
  check(Boolean(gifs[ex.id])===Boolean(ex.gymId),`${ex.id} 的 GIF 与源 ID 状态不一致`);
  if(gifs[ex.id])check(gifs[ex.id].startsWith(`videos/${ex.gymId}-`),`${ex.id} 的 GIF ID 不一致`);
}
for(const [id,video] of Object.entries(videos)){
  check(known.has(id),`${id} 视频没有对应动作`);
  check(/^BV[0-9A-Za-z]{10}$/.test(video.bvid),`${id} 视频 BV 号无效`);
  check(video.author&&video.duration>0,`${id} 缺少视频作者或时长`);
}
for(const program of content.programs){
  check(program.days.length>0,`${program.id} 没有训练日`);
  for(const day of program.days){
    check(day.exercises.length>0,`${program.id}/${day.name} 没有动作`);
    for(const [id,sets,min,max] of day.exercises)check(known.has(id)&&sets>0&&min>0&&max>=min,`${program.id}/${day.name} 的 ${id} 配置无效`);
  }
}
if(process.argv[2]){
  const dataset=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const byPath=new Map(dataset.map(row=>[row.gif_url,row]));
  check(dataset.length===1324,`固定数据集数量 ${dataset.length}，应为 1324`);
  for(const [id,path] of Object.entries(gifs)){
    const row=byPath.get(path);
    check(Boolean(row),`${id} 的 GIF 不在固定数据集中：${path}`);
    check(row?.attribution?.includes('Gym visual'),`${id} 缺少 Gym visual 来源标识`);
  }
  if(process.argv.includes('--audit')){
    const lines=[
      '# 新增动作素材核对表',
      '',
      `固定数据集：\`hasaneyldrm/exercises-dataset@7455efae41b330c265e7cd4b78dfa848e7ce5ebd\`，共 ${dataset.length} 条。`,
      '',
      `新增动作 ${ids.length} 个；已核准无文字 Gym Visual 循环 GIF ${Object.keys(gifs).length} 个；待补充 ${ids.length-Object.keys(gifs).length} 个；B 站视频 ${Object.keys(videos).length} 个。`,
      '',
      '同一动作 ID 在动作库、计划编辑、训练中和历史记录使用同一 GIF 映射。下表“待补充”的 GIF 不使用相似动作顶替。',
      '',
      '| 动作 ID | 中文名称 | Gym Visual 数据集匹配 | 视频 UP 主 / BV 号 |',
      '| --- | --- | --- | --- |'
    ];
    for(const ex of content.exercises){
      const path=gifs[ex.id],row=byPath.get(path),video=videos[ex.id];
      const gifText=row?`#${row.id} ${row.name} · ${path}`:'待补充准确 GIF';
      const videoText=video?`${video.author} · ${video.bvid}`:'待补充对应视频';
      lines.push(`| \`${ex.id}\` | ${ex.name} | ${gifText} | ${videoText} |`);
    }
    lines.push('', '素材来源：[数据集说明](https://github.com/hasaneyldrm/exercises-dataset)；[媒体使用条款](https://github.com/hasaneyldrm/exercises-dataset/blob/main/NOTICE.md)。', '');
    fs.writeFileSync('NEW_MEDIA_AUDIT.md',lines.join('\n'));
  }
}
console.log(JSON.stringify({ok:errors.length===0,oldExercises:oldLive.size,newExercises:ids.length,programs:content.programs.length,videos:Object.keys(videos).length,gymVisualGifs:Object.keys(gifs).length,missingGifs:ids.length-Object.keys(gifs).length,errors},null,2));
if(errors.length)process.exitCode=1;
