// Empowr Sessions service worker: makes the app installable and shows an offline page.
// Offline (installable-app standard, 2026-11-23): only the static /offline.html is cached. Pages are
// always fetched live (never cached: they hold signed-in or live data); if the network fails, the
// offline page shows instead of the browser's error.
const OFFLINE = "offline-v1";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(OFFLINE).then((c) => c.add("/offline.html")).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== OFFLINE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(() => caches.match("/offline.html")));
});
