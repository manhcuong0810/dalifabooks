const staticCacheName = "dalifabooks-pwa-v" + Date.now();

/*
|--------------------------------------------------------------------------
| Cache On Install
|--------------------------------------------------------------------------
*/
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return fetch("/build/manifest.json")
                .then((response) => response.json())
                .then((assets) => {
                    const filesToCache = [
                        "/offline",
                        "/build/" + (assets["modules/Storefront/Resources/assets/public/sass/app.scss"]?.file || ""),
                        "/build/" + (assets["modules/Storefront/Resources/assets/public/js/app.js"]?.file || ""),
                        "/build/" + (assets["modules/Storefront/Resources/assets/public/js/main.js"]?.file || ""),
                    ].filter(Boolean);

                    return cache.addAll(filesToCache);
                })
                .catch(() => {});
        })
    );
});

/*
|--------------------------------------------------------------------------
| Clear Cache On Activate
|--------------------------------------------------------------------------
*/
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== staticCacheName)
                    .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim())
    );
});

/*
|--------------------------------------------------------------------------
| Serve: Network First (Ensures fresh assets always load immediately)
|--------------------------------------------------------------------------
*/
self.addEventListener("fetch", (event) => {
    // Only handle GET requests and never intercept admin routes
    if (event.request.method !== "GET" || event.request.url.includes("/admin")) return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match("/offline");
                });
            })
    );
});

const pwaVersion = Date.now();
