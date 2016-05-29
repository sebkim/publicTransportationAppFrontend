this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/publicTransportationAppFrontend/src/',
        '/publicTransportationAppFrontend/src/index.html',
        '/publicTransportationAppFrontend/src/bower_components/jquery/dist/jquery.min.js',
        '/publicTransportationAppFrontend/src/bower_components/bootstrap/dist/css/bootstrap.min.css'
        // '/github/sw-test/star-wars-logo.jpg',
        // '/github/sw-test/gallery/bountyHunters.jpg',
        // '/github/sw-test/gallery/myLittleVader.jpg'
        // '/github/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         return cacheName.startsWith('wittr-') &&
  //                cacheName != staticCacheName;
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
});

this.addEventListener('fetch', function(event) {
  // console.log(event);
  // console.log(event.request);

  // var response;
  // event.respondWith(caches.match(event.request).catch(function() {
  //   return fetch(event.request);
  // }).then(function(r) {
  //   response = r;
  //   // caches.open('v1').then(function(cache) {
  //   //   cache.put(event.request, response);
  //   // });
  //   // console.log(event.request);
  //   // console.log(response.clone());
  //   return response.clone();
  // }).catch(function() {
  //   // return caches.match('/sw-test/gallery/myLittleVader.jpg');
  // }));
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
