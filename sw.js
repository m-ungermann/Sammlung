
/* Offline-Unterstützung für die Physiksammlung */
const CACHE_NAME = "physiksammlung-v3";

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
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Wichtige App-Dateien vorab speichern.
    // Einzelne fehlende Dateien verhindern die Installation nicht.
    await Promise.allSettled(APP_FILES.map(async path => {
      try {
        const url = new URL(path, self.registration.scope).href;
        const response = await fetch(url, { cache: "reload" });

        if (response.ok && response.type !== "opaque") {
          await cache.put(url, response);
        }
      } catch (error) {
        console.warn("Datei konnte nicht vorgeladen werden:", path, error);
      }
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith("physiksammlung-") &&
          key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;

  // Nur lesende Anfragen der eigenen Website behandeln.
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      // Online: aktuelle Version laden und für offline speichern.
      const response = await fetch(request);

      if (response.ok && response.type !== "opaque") {
        try {
          await cache.put(request, response.clone());
        } catch (error) {
          console.warn(
            "Datei konnte nicht im Offline-Cache gespeichert werden:",
            request.url,
            error
          );
        }
      }

      return response;
    } catch (error) {
      // Offline: bereits gespeicherte Datei verwenden.
      const cached = await caches.match(request);
      if (cached) return cached;

      // Bei Navigationen die gespeicherte App öffnen.
      if (request.mode === "navigate") {
        const indexUrl = new URL(
          "./index.html",
          self.registration.scope
        ).href;

        const indexPage = await caches.match(indexUrl);
        if (indexPage) return indexPage;
      }

      return new Response(
        "Diese Datei ist noch nicht offline gespeichert. " +
        "Öffne sie einmal mit Internetverbindung und versuche es erneut.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  })());
});
