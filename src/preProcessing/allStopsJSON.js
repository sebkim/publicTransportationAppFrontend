var gtfs = require("gtfs");
var fs    = require("fs")

var agency_key='caltrain-agency-key';

var myPromise=new Promise(function(resolve, reject) {
  var allRoutes=[];
  gtfs.getRoutesByAgency(agency_key, function(err, routes) {
    resolve(routes);
  });
});

function stopsBy(northOrSouth, fileName, optCallback) {
  myPromise.then(
    function(routes) {
      var promiseArr=[];
      for(var i in routes) {
        promiseArr.push(new Promise(function(resolve, reject) {
          gtfs.getStopsByRoute(agency_key, routes[i].route_id, northOrSouth, function(err, stops) {
            resolve(stops);
          });
        }));
      }
      return Promise.all(promiseArr);
    }
  ).then(
    function(stopsArr) {
      var stops=[].concat.apply([],stopsArr);
      fs.writeFile(fileName, JSON.stringify(stops, null, 2) , 'utf-8', optCallback);
    }
  );
}

stopsBy('0', './northStops.json', function() {
    stopsBy('1', './southStops.json', process.exit);
});
