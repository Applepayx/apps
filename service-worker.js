self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/icon.png',
                '/peakpx.jpg',
                '/black.jpg',
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Perform any cleanup or updates here when the service worker activates
    console.log('Service worker activated');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request); // Try to fetch, else serve from cache
        })
    );
});
