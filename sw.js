const CACHE="mensajeria-mx-v2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./manifest.json"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(a=>Promise.all(a.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.hostname.includes("supabase.co")) return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});