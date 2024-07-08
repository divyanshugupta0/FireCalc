self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('calculator-cache').then((cache) => {
          return cache.addAll([
              '/',
              '/calc.html',
              '/calc.css',
              '/calc.js',
              '/manifest.json',
              '/icon-192x192.png',
              '/icon-512x512.png'
          ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
      })
  );
});
