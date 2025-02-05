const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/favicon.ico',
];

// Installation du Service Worker et mise en cache des fichiers statiques
self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Mise en cache des ressources');
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

// Activation du Service Worker et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activé');
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cache) => {
        if (cache !== CACHE_NAME) {
          console.log('Suppression de l’ancien cache:', cache);
          return caches.delete(cache);
        }
      }),
    )),
  );
});

// Interception des requêtes fetch pour servir le cache en priorité
self.addEventListener('fetch', (event) => {
  console.log('Intercepting fetch request for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request).then((response) => caches.open(CACHE_NAME).then((cache) => {
      cache.put(event.request, response.clone()); // Ajoute la réponse au cache
      return response;
    }))).catch(() => caches.match('/index.html'), // Retourne la page d'accueil en cas d'échec
    ),
  );
});
