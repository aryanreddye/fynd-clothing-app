// ✅ Version your cache — bump this every time you update files
const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = `fynd-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/html/home.html',
  '/html/cart.html',
  '/html/wishlist.html',
  '/html/profile.html',
  '/html/login.html',
  '/html/signup.html',
  '/css/global.css',
  '/css/home.css',
  '/css/cart.css',
  '/css/wishlist.css',
  '/css/profile.css',
  '/css/login.css',
  '/css/signup.css',
  '/css/welcome.css',
  '/js/global.js',
  '/js/home.js',
  '/js/cart.js',
  '/js/wishlist.js',
  '/js/profile.js',
  '/js/login.js',
  '/js/signup.js',
  '/js/welcome.js',
  '/manifest.json'
];

// ✅ Install event — cache important resources immediately
self.addEventListener('install', event => {
  console.log('[SW] Installing new version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching files');
      return cache.addAll(urlsToCache);
    }).then(() => {
      // Force new SW to activate right away
      return self.skipWaiting();
    })
  );
});

// ✅ Activate event — clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('[SW] Activating new version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      // Take control of all open clients immediately
      return self.clients.claim();
    })
  );
});

// ✅ Fetch event — try cache first, then network, and update cache in background
self.addEventListener('fetch', event => {
  // Ignore requests to Supabase or external APIs (always fetch fresh)
  if (event.request.url.includes('supabase.co') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Try to update cache in the background
        fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }).catch(() => {});
        return cachedResponse;
      }
      // If not cached, fetch from network
      return fetch(event.request).then(response => {
        // Cache new files for next time
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Optional: return a fallback page or image if offline
        return caches.match('/index.html');
      });
    })
  );
});

// ✅ Background sync (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  console.log('[SW] Background sync triggered');
  // Add offline retry logic here (e.g., re-sync cart data)
}
