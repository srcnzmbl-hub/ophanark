/* Ophanark PWA service worker */
var CACHE = 'ophanark-v78';
var CORE = [
'./','./index.html','./manifest.webmanifest','./opening.jpg','./emblem.png','./natal_splash.jpg','./natal_bg.jpg','./zodiac.ttf',
'./app-icon-192.png','./app-icon-512.png','./app-apple-touch.png'
];

self.addEventListener('install', function(e){
e.waitUntil(
caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); })
);
});

self.addEventListener('activate', function(e){
e.waitUntil(
caches.keys().then(function(keys){
return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
}).then(function(){ return self.clients.claim(); })
);
});

/* --- Web Push: kapalı uygulamaya bildirim --- */
self.addEventListener('push', function(e){
var d = {};
try{ d = e.data ? e.data.json() : {}; }catch(err){ try{ d = { govde: e.data && e.data.text() }; }catch(e2){ d = {}; } }
var baslik = d.baslik || d.title || 'OPHANARK';
var govde  = d.govde  || d.body  || 'Falınız hazır ✨';
var url    = d.url    || './';
e.waitUntil(
self.registration.showNotification(baslik, {
body: govde,
icon: './app-icon-192.png',
badge: './app-icon-192.png',
tag: d.tag || 'ophanark-fal',
renotify: true,
data: { url: url }
})
);
});

self.addEventListener('notificationclick', function(e){
e.notification.close();
var url = (e.notification.data && e.notification.data.url) || './';
e.waitUntil(
self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(cl){
for(var i=0;i<cl.length;i++){
var c = cl[i];
if('focus' in c){ try{ c.navigate(url); }catch(err){} return c.focus(); }
}
if(self.clients.openWindow) return self.clients.openWindow(url);
})
);
});

self.addEventListener('fetch', function(e){
var req = e.request;
if(req.method !== 'GET'){ return; }
var url = new URL(req.url);
// navigation requests: network first, fall back to cached app shell (offline)
if(req.mode === 'navigate'){
e.respondWith(
fetch(req).catch(function(){ return caches.match('./index.html'); })
);
return;
}
// HTML dosyaları (index + natal3d + kahvefali): network-first — güncellemeler çevrimiçiyken ANINDA görünür, çevrimdışında cache'e düşer
if(url.origin === self.location.origin && /\.html$/.test(url.pathname)){
e.respondWith(
fetch(req).then(function(res){
if(res && res.status === 200){ var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
return res;
}).catch(function(){ return caches.match(req); })
);
return;
}
// app JS (oph_app.js, spiral.js, signimg.js, ophan_*.js — NOT /vendor/): network-first, bypass HTTP cache
// so code updates reach users immediately; fall back to cache offline.
if(url.origin === self.location.origin && /\.js$/.test(url.pathname) && !/\/vendor\//.test(url.pathname)){
e.respondWith(
fetch(new Request(url.pathname, { cache: 'reload' })).then(function(res){
if(res && res.status === 200){ var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
return res;
}).catch(function(){ return caches.match(req); })
);
return;
}
// same-origin static assets: cache first, then network (and cache it)
if(url.origin === self.location.origin){
e.respondWith(
caches.match(req).then(function(hit){
return hit || fetch(req).then(function(res){
if(res && res.status === 200){
var copy = res.clone();
caches.open(CACHE).then(function(c){ c.put(req, copy); });
}
return res;
}).catch(function(){ return hit; });
})
);
return;
}
// cross-origin (fonts, CDNs): network first, fall back to cache
e.respondWith(
fetch(req).catch(function(){ return caches.match(req); })
);
});
