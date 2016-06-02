
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/publicTransportationAppFrontend/',
        '/publicTransportationAppFrontend/index.html',
        '/publicTransportationAppFrontend/sw.min.js',
        '/publicTransportationAppFrontend/js/app-indexBundle.min.js',
        '/publicTransportationAppFrontend/css/index.min.css',
        '/publicTransportationAppFrontend/bower_components/jquery.min.js',
        '/publicTransportationAppFrontend/bower_components/bootstrap.min.css'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
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
