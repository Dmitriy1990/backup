const CACHE_NAME = "version-5";
const urlsToCache = ["index.html"];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", function (event) {
  var request = event.request;
  var acceptHeader = request.headers.get("Accept");

  var resourceType = "static";
  var cacheKey;

  if (acceptHeader.indexOf("text/html") !== -1) {
    resourceType = "content";
    return;
  }
  if (acceptHeader.indexOf("text/javascript") !== -1) {
    return;
  }
  if (request.destination == "script") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
