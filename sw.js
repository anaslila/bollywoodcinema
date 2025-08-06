// Bollywood Simulator Service Worker
// Version 1.0.0

const CACHE_NAME = 'bollywood-simulator-v1.0.0';
const DYNAMIC_CACHE = 'bollywood-simulator-dynamic-v1.0.0';

// Files to cache for offline support
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  // Font Awesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  // Icons (you'll need to create these)
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('🎬 Bollywood Simulator Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🎬 Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('🎬 Service Worker: App shell cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('🎬 Service Worker: Failed to cache app shell', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('🎬 Bollywood Simulator Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('🎬 Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🎬 Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch Strategy: Cache First with Network Fallback
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extension requests
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('🎬 Service Worker: Serving from cache:', request.url);
          return response;
        }
        
        // Otherwise fetch from network
        console.log('🎬 Service Worker: Fetching from network:', request.url);
        return fetch(request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('🎬 Service Worker: Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Return a fallback response for other requests
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle background sync (for when app comes back online)
self.addEventListener('sync', event => {
  console.log('🎬 Service Worker: Background sync triggered');
  
  if (event.tag === 'game-save-sync') {
    event.waitUntil(
      // Sync game saves when back online
      syncGameSaves()
    );
  }
});

// Handle push notifications (for future features)
self.addEventListener('push', event => {
  console.log('🎬 Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Game',
        icon: '/icons/icon-96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Bollywood Simulator', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🎬 Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync game saves function
async function syncGameSaves() {
  try {
    console.log('🎬 Service Worker: Syncing game saves...');
    // Here you would implement cloud save sync if needed
    return Promise.resolve();
  } catch (error) {
    console.error('🎬 Service Worker: Failed to sync game saves:', error);
    throw error;
  }
}

// Handle updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync (for updating game data)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-game-data') {
    event.waitUntil(updateGameData());
  }
});

async function updateGameData() {
  try {
    console.log('🎬 Service Worker: Updating game data...');
    // Update celebrity data, market trends, etc.
    return Promise.resolve();
  } catch (error) {
    console.error('🎬 Service Worker: Failed to update game data:', error);
  }
}
