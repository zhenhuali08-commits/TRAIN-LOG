import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const window={};
for(const file of ['new-videos.js','advanced-videos.js','new-content.js','advanced-content.js'])vm.runInNewContext(read(file),{window});
const content=window.TRAIN_LOG_NEW_CONTENT;
const app=read('app.js');
const builtIn=new Set([...app.matchAll(/\{id:'([^']+)',name:/g)].map(match=>match[1]));
for(const id of ['hip_thrust','cable_kickback','ab_wheel','rowing_machine','jump_rope'])builtIn.delete(id);
const exerciseIds=new Set([...builtIn,...content.exercises.map(ex=>ex.id)]);
const planIds=new Set();
const errors=[];
for(const plan of content.programs){
  if(planIds.has(plan.id))errors.push(`duplicate plan ${plan.id}`);
  planIds.add(plan.id);
  for(const day of plan.days){
    if(!day.exercises.length)errors.push(`empty day ${plan.id}/${day.name}`);
    for(const [id,sets,min,max] of day.exercises){
      if(!exerciseIds.has(id))errors.push(`unknown exercise ${plan.id}/${id}`);
      if(!Number.isInteger(sets)||sets<1||min<1||max<min)errors.push(`invalid target ${plan.id}/${id}`);
    }
  }
}
for(const ex of content.exercises.slice(63)){
  const path=window.TRAIN_LOG_NEW_GIFS[ex.id];
  if(!path||!fs.existsSync(new URL(path,root)))errors.push(`missing GIF ${ex.id}`);
  if(!ex.tips?.length||!ex.mistakes?.length)errors.push(`missing coaching ${ex.id}`);
}
for(const ex of content.exercises.slice(63)){
  const video=window.TRAIN_LOG_NEW_VIDEOS[ex.id];
  if(!video?.bvid||!/^BV[A-Za-z0-9]{10}$/.test(video.bvid)||!Number.isInteger(video.duration)||video.duration<1)errors.push(`invalid video ${ex.id}`);
}
const categories=Object.fromEntries([...new Set(content.programs.map(plan=>plan.category))].map(category=>[category,content.programs.filter(plan=>plan.category===category).length]));
if(content.programs.length!==33)errors.push(`expected 33 library plans, got ${content.programs.length}`);
if(content.exercises.length!==101)errors.push(`expected 101 extra exercises, got ${content.exercises.length}`);
console.log(JSON.stringify({ok:errors.length===0,libraryPlans:content.programs.length,extraExercises:content.exercises.length,categories,errors},null,2));
if(errors.length)process.exitCode=1;
