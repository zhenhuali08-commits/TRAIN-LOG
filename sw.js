const APP_CACHE='train-log-v26-local';
const MEDIA_CACHE='train-log-media-v26';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/heatmap-neutral-v2.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(APP_CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![APP_CACHE,MEDIA_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const u=new URL(event.request.url);
  const isGym=/cdn\.jsdelivr\.net|cdn\.statically\.io|raw\.githubusercontent\.com/.test(u.hostname);
  if(isGym){
    event.respondWith(caches.open(MEDIA_CACHE).then(async cache=>{
      const hit=await cache.match(event.request);
      if(hit) return hit;
      try{
        const r=await fetch(event.request,{cache:'force-cache'});
        if(r && (r.ok||r.type==='opaque')) await cache.put(event.request,r.clone());
        return r;
      }catch(err){ return Response.error(); }
    }));
    return;
  }
  if(u.origin===self.location.origin){
    event.respondWith(fetch(event.request).then(async r=>{
      if(r && r.ok){const c=await caches.open(APP_CACHE);c.put(event.request,r.clone());}
      return r;
    }).catch(async()=>await caches.match(event.request)||await caches.match('./index.html')));
  }
});
