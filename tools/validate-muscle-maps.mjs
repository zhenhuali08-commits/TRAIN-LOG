import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const expectedHash='301CB13731FC3902E6F7C072EE3B1515859FB58A1BFD48E08B85CE577D04F697';
const removed=new Set(['hip_thrust','cable_kickback','ab_wheel','rowing_machine','jump_rope','swimming']);
const config=JSON.parse(fs.readFileSync('exercise-muscle-mappings.json','utf8'));
const svg=fs.readFileSync('assets/标准人体.svg','utf8');
const app=fs.readFileSync('app.js','utf8');
const exerciseSource=app.slice(app.indexOf('const EXERCISES = ['),app.indexOf('// V2.5 全动作实用讲解'));
const originalIds=[...new Set([...exerciseSource.matchAll(/\{id:'([^']+)'/g)].map(match=>match[1]))].filter(id=>!removed.has(id));
const addedSource=fs.readFileSync('new-content.js','utf8').split('const regionNames=')[0];
const addedIds=[...addedSource.matchAll(/^\s*\['([^']+)','/gm)].map(match=>match[1]);
const context=vm.createContext({window:{}});
for(const file of ['new-videos.js','new-content.js','advanced-content.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const advancedIds=context.window.TRAIN_LOG_NEW_CONTENT.exercises.slice(addedIds.length).map(ex=>ex.id);
const appIds=[...originalIds,...addedIds,...advancedIds];
const mappedIds=Object.keys(config.exercises);
const pathIds=new Set([...svg.matchAll(/<path\b(?=[^>]*\bclass="muscle-block")(?=[^>]*\bid="([^"]+)")[^>]*>/g)].map(match=>match[1]));
const errors=[];

const hash=crypto.createHash('sha256').update(svg).digest('hex').toUpperCase();
if(hash!==expectedHash) errors.push(`冻结人体哈希改变：${hash}`);
if(config.templateSha256!==expectedHash) errors.push('映射表未绑定冻结人体哈希');
if(pathIds.size!==90) errors.push(`独立肌肉 path 应为 90，当前 ${pathIds.size}`);
if(new Set(appIds).size!==appIds.length) errors.push('应用动作 ID 存在重复');
if(addedIds.length!==63) errors.push(`新增动作应为 63，当前 ${addedIds.length}`);
if(advancedIds.length!==38) errors.push(`扩展动作应为 38，当前 ${advancedIds.length}`);
if(mappedIds.length!==config.expectedExerciseCount) errors.push(`动作映射应为 ${config.expectedExerciseCount}，当前 ${mappedIds.length}`);
if(appIds.length!==config.expectedExerciseCount) errors.push(`应用动作应为 ${config.expectedExerciseCount}，当前 ${appIds.length}`);
appIds.filter(id=>!config.exercises[id]).forEach(id=>errors.push(`缺少动作映射：${id}`));
mappedIds.filter(id=>!appIds.includes(id)).forEach(id=>errors.push(`多余动作映射：${id}`));

Object.entries(config.regions).forEach(([regionId,region])=>{
  if(!pathIds.has(region.target)) errors.push(`${regionId} 引线目标不存在：${region.target}`);
  region.paths.forEach(pathId=>{if(!pathIds.has(pathId)) errors.push(`${regionId} path 不存在：${pathId}`);});
});
Object.entries(config.exercises).forEach(([exerciseId,exercise])=>{
  const primary=new Set(exercise.primary);
  exercise.secondary.forEach(regionId=>{if(primary.has(regionId)) errors.push(`${exerciseId} 主辅肌群重复：${regionId}`);});
  [...exercise.primary,...exercise.secondary].forEach(regionId=>{if(!config.regions[regionId]) errors.push(`${exerciseId} 肌群未定义：${regionId}`);});
  const primaryPaths=new Set(exercise.primary.flatMap(regionId=>config.regions[regionId]?.paths||[]));
  const sharedPaths=exercise.secondary.flatMap(regionId=>config.regions[regionId]?.paths||[]).filter(pathId=>primaryPaths.has(pathId));
  if(sharedPaths.length) errors.push(`${exerciseId} 主辅肌群共用 path：${[...new Set(sharedPaths)].join(',')}`);
});

const result={ok:errors.length===0,templateHash:hash,independentMusclePaths:pathIds.size,appExercises:appIds.length,mappedExercises:mappedIds.length,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exitCode=1;
