const CACHE_NAME = 'snek-game-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './src/assets/icon.png',
  './src/assets/favicon.png',
  './src/assets/adaptive-icon.png',
  './src/assets/splash.png',
  './test.js'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request (streams can only be read once)
        const fetchRequest = event.request.clone();
        
        // Make network request and cache the response
        return fetch(fetchRequest)
          .then(response => {
            // Don't cache if response is not valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response (streams can only be read once)
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // If the fetch fails (offline), try to return a cached page
            if (event.request.url.indexOf('.html') > -1 || 
                event.request.url.endsWith('/')) {
              return caches.match('./index.html');
            }
            return new Response('Offline and resource not cached');
          });
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // If this cache is not in the whitelist, delete it
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 