// Service Worker - APV Fuel Tracker
// Meng-cache semua file penting supaya aplikasi bisa dibuka tanpa internet
// setelah pertama kali diakses.

const CACHE_NAME = "apv-fuel-tracker-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png"
];

// Saat service worker pertama kali di-install: simpan semua asset ke cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Bersihkan cache versi lama saat ada versi baru
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Strategi: cache-first, fallback ke network kalau belum ada di cache.
// Kalau offline dan tidak ada di cache & bukan request navigasi, biarkan gagal secara wajar.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          // simpan salinan baru ke cache untuk pemakaian offline berikutnya
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // kalau request navigasi (buka halaman) gagal saat offline, kembalikan index.html dari cache
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
