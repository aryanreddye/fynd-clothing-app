const CACHE_NAME = 'fynd-v1.0.0';
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

// Install event - cache resources
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
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline actions when connection is restored
  console.log('Background sync triggered');
  // Add your offline action handling here
}
