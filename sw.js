const CACHE_NAME = 'curinga-cozinha-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/produtos/caldo_ossos.jpg',
  './assets/produtos/creme_aipim.jpg',
  './assets/produtos/creme_aipim_bacon.jpg',
  './assets/produtos/creme_aspargos.jpg',
  './assets/produtos/molho_cogumelos.jpg',
  './assets/produtos/molho_pesto.jpg',
  './assets/produtos/molho_pomodoro.jpg',
  './assets/produtos/molho_queijo.jpg',
  './assets/produtos/ragu_carne.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE).catch((err) => console.warn('Cache addAll error:', err)))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
