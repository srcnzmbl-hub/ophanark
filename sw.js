// Kill-switch service worker: eski PWA önbelleğini emekliye ayırır.
// Kurulunca tüm cache'leri siler, kendini kaldırır ve açık sekmeleri
// yeni sürüme tazeler. Böylece eski ana sayfa artık sunulmaz.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (c) { try { c.navigate(c.url); } catch (e) {} });
    } catch (e) {}
  })());
});

// Ağ-öncelikli: hiçbir şeyi önbellekten sunma (eski shell'i asla verme).
self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request).catch(function () {
    return new Response('', { status: 504, statusText: 'offline' });
  }));
});
