self.addEventListener("install", function (e) { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open("conectaai-v1").then(function (cache) {
      return fetch(e.request).then(function (rede) {
        if (new URL(e.request.url).origin === location.origin) {
          cache.put(e.request, rede.clone());
        }
        return rede;
      }).catch(function () {
        return cache.match(e.request);
      });
    })
  );
});