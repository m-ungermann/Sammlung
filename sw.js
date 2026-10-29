
const CACHE_NAME = "physiksammlung-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./inline-data.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        // Vorhandene Dateien einzeln zwischenspeichern.
        // Eine fehlende optionale Datei verhindert nicht
        // die Installation der gesamten PWA.
        await Promise.all(
          APP_FILES.map(async path => {
            try {
              const response = await fetch(path);
              if (response.ok) {
                await cache.put(path, response);
              }
            } catch (error) {
              console.warn("Nicht zwischengespeichert:", path);
            }
          })
        );
        await self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith("physiksammlung-") &&
            key !== CACHE_NAME
          )
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);

        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }

        return response;
      } catch {
        const cached = await caches.match(request);

        if (cached) return cached;

        if (request.mode === "navigate") {
          const indexUrl = new URL(
            "./index.html",
            self.registration.scope
          ).href;

          const offlinePage = await caches.match(indexUrl);
          if (offlinePage) return offlinePage;
        }

        return new Response("Offline – diese Datei ist nicht gespeichert.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    })()
  );
});
