'use strict';

// Caching all files
importScripts('sw-toolbox.js');

toolbox.precache(['/']);
toolbox.router.get('/*', toolbox.cacheFirst);

self.addEventListener('install', function(event) {
    self.skipWaiting();
});
