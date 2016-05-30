var gtfs = require("gtfs");
var fs    = require("fs")

var agency_key='caltrain-agency-key';

var myPromise=new Promise(function(resolve, reject) {
  var allRoutes=[];
  gtfs.getRoutesByAgency(agency_key, function(err, routes) {
    resolve(routes);
  });
});

function stopTimesBy(northOrSouth, serviceID ,fileName, optCallback) {
  myPromise.then(
    function(routes) {
      var promiseArr=[];
      serviceID_container=[];
      serviceID_container.push(serviceID);
      for(var i in routes) {
        promiseArr.push(new Promise(function(resolve, reject) {
          gtfs.getTripsByRouteAndDirection(agency_key, routes[i].route_id, northOrSouth, serviceID_container, function(err, trips) {
            resolve(trips);
          });
        }));
      }
      return Promise.all(promiseArr);
    }
  ).then(
    function(tripsArr) {
      var trips=[].concat.apply([],tripsArr);
      var stopTimesArr=[];
      var forPromise=new Promise(function(resolve, reject) {
        var smallPromise;
        for(var i in trips) {
          smallPromise = new Promise(function(resolve, reject) {
            gtfs.getStoptimesByTrip(agency_key, trips[i].trip_id, function(err, stoptimes) {
              resolve(stoptimes);
            });
          });
          smallPromise.then(
            function(stoptimes) {
              stopTimesArr.push(stoptimes);
              if(stopTimesArr.length == trips.length) resolve();
            }
          )
        }
      });
      forPromise.then(
        function() {
          // console.log(stopTimesArr.length);
          fs.writeFile(fileName, JSON.stringify(stopTimesArr, null, 2) , 'utf-8', optCallback);
        }
      )
    }
  );
}

stopTimesBy('0', 'CT-16APR-Caltrain-Weekday-01','./northWeekdaysStopTimes.json', function() {
  stopTimesBy('0', 'CT-16APR-Caltrain-Saturday-02','./northSatStopTimes.json',function() {
    stopTimesBy('0', 'CT-16APR-Caltrain-Sunday-02','./northSunStopTimes.json',function() {
      stopTimesBy('1', 'CT-16APR-Caltrain-Weekday-01','./southWeekdaysStopTimes.json', function() {
        stopTimesBy('1', 'CT-16APR-Caltrain-Saturday-02','./southSatStopTimes.json', function() {
          stopTimesBy('1', 'CT-16APR-Caltrain-Sunday-02','./southSunStopTimes.json', process.exit);
        });
      });
    });
  });
});
