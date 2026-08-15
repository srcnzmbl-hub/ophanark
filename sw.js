// OPHANARK service worker — push bildirimleri + ağ-öncelikli (önbelleksiz)
self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try { const keys = await caches.keys(); await Promise.all(keys.map(function (k) { return caches.delete(k); })); } catch (e) {}
    try { await self.clients.claim(); } catch (e) {}
  })());
});

self.addEventListener('push', function (event) {
  var d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { try { d = { body: event.data.text() }; } catch (_) {} }
  var title = d.title || 'OPHANARK';
  var body = d.body || 'Falın hazır.';
  var url = d.url || '/hazir';
  event.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: '/app-icon-192.png',
    badge: '/app-icon-192.png',
    data: { url: url },
    tag: 'ophanark-fal',
    renotify: true
  }));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || '/hazir';
  event.waitUntil((async function () {
    var all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (var i = 0; i < all.length; i++) {
      var c = all[i];
      if ('focus' in c) { try { c.navigate(url); } catch (e) {} return c.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});

// Ağ-öncelikli + sayfa yüklemelerinde önbelleksiz (F5 daima en güncel shell'i getirir)
self.addEventListener('fetch', function (event) {
  var req = event.request;
  var isDoc = req.mode === 'navigate' || req.destination === 'document';
  var opts = isDoc ? { cache: 'no-store' } : undefined;
  event.respondWith(fetch(req, opts).catch(function () { return new Response('', { status: 504, statusText: 'offline' }); }));
});
