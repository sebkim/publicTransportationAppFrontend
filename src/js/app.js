// register service worker

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/publicTransportationAppFrontend/src/sw.js', { scope: '/publicTransportationAppFrontend/src/' }).then(function(reg) {
  navigator.serviceWorker.register('/publicTransportationAppFrontend/sw.min.js', { scope: '/publicTransportationAppFrontend/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};
