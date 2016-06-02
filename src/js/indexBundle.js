(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var northStopMapping = require('../preProcessing/northStopMapping.json');
var southStopMapping = require('../preProcessing/southStopMapping.json');

var northWeekdaysStopTimes = require('../preProcessing/northWeekdaysStopTimesMin.json');
var northSatStopTimes = require('../preProcessing/northSatStopTimesMin.json');
var northSunStopTimes = require('../preProcessing/northSunStopTimesMin.json');

var southWeekdaysStopTimes = require('../preProcessing/southWeekdaysStopTimesMin.json');
var southSatStopTimes = require('../preProcessing/southSatStopTimesMin.json');
var southSunStopTimes = require('../preProcessing/southSunStopTimesMin.json');



$(function() {
 // $.ajax({
 //    url: 'http://www.caltrain.com/schedules/realtime.html',
 //    beforeSend: function(xhr) {
 //      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 //      xhr.setRequestHeader('Origin', 'http://www.caltrain.com');
 //    },
 //    type: 'POST',
 //    contentType: 'application/x-www-form-urlencoded',
 //    // processData:false,
 //    // data: '__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUENTM4MQ8WJB4SaXBJbmFjdGl2ZUZvbGxvd1VwZx4ERTNSNmceBTM5ODRMZx4WVklFV1NUQVRFX0xPQ0FUSU9OTElORQWTAjxzcGFuIGNsYXNzPSJpcGItbG9jYXRpb25saW5lLXNlcGFyYXRvciI%2BJm5ic3A7Jmd0OyZuYnNwOzwvc3Bhbj48YSBocmVmPSIvUGFnZTQuYXNweCI%2BY2FsdHJhaW4uY29tPC9hPjxzcGFuIGNsYXNzPSJpcGItbG9jYXRpb25saW5lLXNlcGFyYXRvciI%2BJm5ic3A7Jmd0OyZuYnNwOzwvc3Bhbj48YSBocmVmPSIvUGFnZTExLmFzcHgiPlNjaGVkdWxlczwvYT48c3BhbiBjbGFzcz0iaXBiLWxvY2F0aW9ubGluZS1zZXBhcmF0b3IiPiZuYnNwOyZndDsmbmJzcDs8L3NwYW4%2BUmVhbCBUaW1lHg5pcEFsbG93UHJldmlld2ceEGlwUmV2aWV3Rm9sbG93VXBnHhNWYWxpZGF0ZVJlcXVlc3RNb2RlAgEeDGlwQ2hpbGRMaW5rc2geCWlwUGFnZWxldGceCGlwTW9iaWxlaB4FM09JUk5nHg1pcFRyYW5zbGF0aW9uaB4RaXBBcmNoaXZlRm9sbG93VXBnHg5pcE5vbmVGb2xsb3dVcGceDmlwRm9sbG93dXBUYXNraB4PaXBVbnRpbEZvbGxvd1VwArQBHgtfX0lQX1BEQ19JRAKTAR4LX19JUF9QVkNfSUQCBBYCAgEPZBYEAhgPZBYCZg8PFgIeEkluaXRpYWxDb250cm9sTG9hZGhkZAIbDw8WAh8SaGQWAmYPDxYCHxJoZGRktWeLUBQng9wwnlJLVokozJ1VOtY%3D&_html:txtSearchText_98=&ipf-st-ip-station=Atherton&__CALLBACKID=ctl10&__CALLBACKPARAM=refreshStation%3DAtherton',
 //    data: {"__EVENTTARGET":"","__EVENTARGUMENT":"","__VIEWSTATE":"/wEPDwUENTM4MQ8WJB4SaXBJbmFjdGl2ZUZvbGxvd1VwZx4ERTNSNmceBTM5ODRMZx4WVklFV1NUQVRFX0xPQ0FUSU9OTElORQWTAjxzcGFuIGNsYXNzPSJpcGItbG9jYXRpb25saW5lLXNlcGFyYXRvciI+Jm5ic3A7Jmd0OyZuYnNwOzwvc3Bhbj48YSBocmVmPSIvUGFnZTQuYXNweCI+Y2FsdHJhaW4uY29tPC9hPjxzcGFuIGNsYXNzPSJpcGItbG9jYXRpb25saW5lLXNlcGFyYXRvciI+Jm5ic3A7Jmd0OyZuYnNwOzwvc3Bhbj48YSBocmVmPSIvUGFnZTExLmFzcHgiPlNjaGVkdWxlczwvYT48c3BhbiBjbGFzcz0iaXBiLWxvY2F0aW9ubGluZS1zZXBhcmF0b3IiPiZuYnNwOyZndDsmbmJzcDs8L3NwYW4+UmVhbCBUaW1lHg5pcEFsbG93UHJldmlld2ceEGlwUmV2aWV3Rm9sbG93VXBnHhNWYWxpZGF0ZVJlcXVlc3RNb2RlAgEeDGlwQ2hpbGRMaW5rc2geCWlwUGFnZWxldGceCGlwTW9iaWxlaB4FM09JUk5nHg1pcFRyYW5zbGF0aW9uaB4RaXBBcmNoaXZlRm9sbG93VXBnHg5pcE5vbmVGb2xsb3dVcGceDmlwRm9sbG93dXBUYXNraB4PaXBVbnRpbEZvbGxvd1VwArQBHgtfX0lQX1BEQ19JRAKTAR4LX19JUF9QVkNfSUQCBBYCAgEPZBYEAhgPZBYCZg8PFgIeEkluaXRpYWxDb250cm9sTG9hZGhkZAIbDw8WAh8SaGQWAmYPDxYCHxJoZGRktWeLUBQng9wwnlJLVokozJ1VOtY=","_html:txtSearchText_98":"","ipf-st-ip-station":"Atherton","__CALLBACKID":"ctl10","__CALLBACKPARAM":"refreshStation=Atherton"},
 //    success: function(data){
 //        console.log(data);
 //    },
 //    error: function(){
 //      console.log("Cannot get data");
 //    }
 //  });
 function onOffCheck() {
   if (navigator.onLine) {
     $("#indicatorP").text("Online").css("color","black").css("font-weight","normal");
   } else {
     $("#indicatorP").text("Offline").css("color","red").css("font-weight","bold");
   }
 }
 onOffCheck();
  $("body").click(function() {
    onOffCheck();
  })



  northStopNames=Object.keys(northStopMapping);
  southStopNames=Object.keys(southStopMapping);

  var hereStr=""
  for(var i in northStopNames) {
    hereStr='<option val=' + '"' + northStopNames[i] +'"' + '>' + northStopNames[i] + '</option>'
    $("#station1").append(hereStr);
    $("#station2").append(hereStr);
  }

  $("#search-submit").click(function(e) {
    $("#olInfoPart").empty();
    e.preventDefault();
    var station1 = $('#station1').val();
    var station2 = $('#station2').val();
    var NorS = $('input:radio[name=NorS]:checked').val();
    var days = $('input:radio[name=days]:checked').val();
    var station1id;
    if(NorS === 'north') {
      station1id= northStopMapping[station1];
      station2id= northStopMapping[station2];
    } else if (NorS === 'south') {
      station1id = southStopMapping[station1];
      station2id = southStopMapping[station2];
    }
    var successInd=[];
    var successInd2=[];
    var subSuccessInd2=[];
    var forCheck=0;
    var selectedStopTimes=[]
    var selectedStopTimesSorted1=[];
    var somethingStopTimes;
    if(NorS === 'north' && days==='weekdays') {
      somethingStopTimes = northWeekdaysStopTimes;
    } else if (NorS === 'north' && days==='sat') {
      somethingStopTimes = northSatStopTimes;
    } else if (NorS === 'north' && days==='sun') {
      somethingStopTimes = northSunStopTimes;
    } else if(NorS === 'south' && days==='weekdays') {
      somethingStopTimes = southWeekdaysStopTimes;
    } else if (NorS === 'south' && days==='sat') {
      somethingStopTimes = southSatStopTimes;
    } else if (NorS === 'south' && days==='sun') {
      somethingStopTimes = southSunStopTimes;
    }

    for(var i in somethingStopTimes) {
      forCheck=0;
      subSuccessInd2=[];
      for(var j in somethingStopTimes[i]) {
        if(somethingStopTimes[i][j].stop_id === station1id || somethingStopTimes[i][j].stop_id=== station2id) {
          forCheck+=1;
          subSuccessInd2.push(j);
        }
        if (forCheck===2) {
          forCheck=0;
          successInd.push(i);
          successInd2.push(subSuccessInd2);
          subSuccessInd2=[];
        }
      }
    }
    for(var k in successInd) {
      selectedStopTimes.push([somethingStopTimes[successInd[k]][successInd2[k][0]],
      somethingStopTimes[successInd[k]][successInd2[k][1]]]);
    }
    var one;
    var templateDate='01/01/2011 ';
    for(var l in selectedStopTimes) {
      one=selectedStopTimes[l];
      one.sort(function(a,b) {
        var aArrivalTime=a.arrival_time;
        var bArrivalTime=b.arrival_time;
        aArrivalTime=Date.parse(templateDate+aArrivalTime);
        bArrivalTime=Date.parse(templateDate+bArrivalTime);
        return aArrivalTime - bArrivalTime;
      });
      selectedStopTimesSorted1.push(one);
    }

    selectedStopTimesSorted1.sort(function(a,b) {
      var aArrivalTime=a[0].arrival_time;
      var bArrivalTime=b[0].arrival_time;
      aArrivalTime=Date.parse(templateDate+aArrivalTime);
      bArrivalTime=Date.parse(templateDate+bArrivalTime);
      return aArrivalTime - bArrivalTime;
    });

    // var hereStr2=JSON.stringify(selectedStopTimesSorted1,null,2);
    // $("#infoPart").text(hereStr2);

    for(var m in selectedStopTimesSorted1) {
      var ulPart=$("<ul class='list-unstyled'></ul>");
      for(var n in selectedStopTimesSorted1[m]) {
        if(n==0) {
          var liPart=$("<li>" + "Expected Departure Time: "+selectedStopTimesSorted1[m][n].arrival_time +"</li>")
        } else if(n==1) {
          var liPart=$("<li>" + "Expected Arrival Time: "+selectedStopTimesSorted1[m][n].arrival_time +"</li>")
        }

        ulPart.append(liPart);
      }
      $("#olInfoPart").append($("<li class='oneTrip'></li>").append(ulPart));
    }
    $(".oneTrip").after("<hr>");

  });

});

},{"../preProcessing/northSatStopTimesMin.json":2,"../preProcessing/northStopMapping.json":3,"../preProcessing/northSunStopTimesMin.json":4,"../preProcessing/northWeekdaysStopTimesMin.json":5,"../preProcessing/southSatStopTimesMin.json":6,"../preProcessing/southStopMapping.json":7,"../preProcessing/southSunStopTimesMin.json":8,"../preProcessing/southWeekdaysStopTimesMin.json":9}],2:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "23a",
      "arrival_time": "7:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "23a",
      "arrival_time": "7:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "25a",
      "arrival_time": "8:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "25a",
      "arrival_time": "8:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "27a",
      "arrival_time": "9:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "27a",
      "arrival_time": "9:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "01a",
      "arrival_time": "10:10:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "01a",
      "arrival_time": "10:22:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "29a",
      "arrival_time": "10:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "29a",
      "arrival_time": "10:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "31a",
      "arrival_time": "11:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "31a",
      "arrival_time": "11:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "33a",
      "arrival_time": "12:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "33a",
      "arrival_time": "12:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "35a",
      "arrival_time": "13:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "35a",
      "arrival_time": "13:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "37a",
      "arrival_time": "14:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "37a",
      "arrival_time": "14:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "39a",
      "arrival_time": "15:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "39a",
      "arrival_time": "15:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "41a",
      "arrival_time": "16:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "41a",
      "arrival_time": "16:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "03a",
      "arrival_time": "17:10:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "03a",
      "arrival_time": "17:22:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "43a",
      "arrival_time": "17:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "43a",
      "arrival_time": "17:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "45a",
      "arrival_time": "18:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "45a",
      "arrival_time": "18:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "47a",
      "arrival_time": "19:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "47a",
      "arrival_time": "19:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "49a",
      "arrival_time": "20:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "49a",
      "arrival_time": "20:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "421a",
      "arrival_time": "7:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "421a",
      "arrival_time": "7:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "421a",
      "arrival_time": "8:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "423a",
      "arrival_time": "8:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "423a",
      "arrival_time": "8:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "423a",
      "arrival_time": "9:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "425a",
      "arrival_time": "9:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "425a",
      "arrival_time": "9:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "425a",
      "arrival_time": "10:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "427a",
      "arrival_time": "10:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "427a",
      "arrival_time": "10:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "427a",
      "arrival_time": "11:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "429a",
      "arrival_time": "11:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "429a",
      "arrival_time": "11:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "429a",
      "arrival_time": "12:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "431a",
      "arrival_time": "12:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "431a",
      "arrival_time": "12:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "431a",
      "arrival_time": "13:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "433a",
      "arrival_time": "13:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "433a",
      "arrival_time": "13:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "433a",
      "arrival_time": "14:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "435a",
      "arrival_time": "14:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "435a",
      "arrival_time": "14:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "435a",
      "arrival_time": "15:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "437a",
      "arrival_time": "15:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "437a",
      "arrival_time": "15:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "437a",
      "arrival_time": "16:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "439a",
      "arrival_time": "16:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "439a",
      "arrival_time": "16:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "439a",
      "arrival_time": "17:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "441a",
      "arrival_time": "17:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "441a",
      "arrival_time": "17:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "441a",
      "arrival_time": "18:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "443a",
      "arrival_time": "18:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "443a",
      "arrival_time": "18:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "443a",
      "arrival_time": "19:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "445a",
      "arrival_time": "19:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "445a",
      "arrival_time": "19:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "445a",
      "arrival_time": "20:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "447a",
      "arrival_time": "20:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "447a",
      "arrival_time": "20:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "447a",
      "arrival_time": "21:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "449a",
      "arrival_time": "21:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "449a",
      "arrival_time": "21:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "449a",
      "arrival_time": "22:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "451a",
      "arrival_time": "22:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:35:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:40:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:44:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:49:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:53:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "451a",
      "arrival_time": "22:57:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:01:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:04:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:07:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:11:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:15:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:18:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:21:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:24:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:27:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:32:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:35:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:40:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:44:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:49:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "451a",
      "arrival_time": "23:55:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "451a",
      "arrival_time": "24:00:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "451a",
      "arrival_time": "24:08:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "801a",
      "arrival_time": "10:35:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "801a",
      "arrival_time": "10:45:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "801a",
      "arrival_time": "10:50:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "801a",
      "arrival_time": "10:58:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "801a",
      "arrival_time": "11:04:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "801a",
      "arrival_time": "11:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "801a",
      "arrival_time": "11:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "801a",
      "arrival_time": "11:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "801a",
      "arrival_time": "11:41:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "803a",
      "arrival_time": "17:35:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "803a",
      "arrival_time": "17:45:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "803a",
      "arrival_time": "17:50:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "803a",
      "arrival_time": "17:58:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "803a",
      "arrival_time": "18:04:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "803a",
      "arrival_time": "18:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "803a",
      "arrival_time": "18:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "803a",
      "arrival_time": "18:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "803a",
      "arrival_time": "18:41:00",
      "stop_id": "70011"
    }
  ]
]
},{}],3:[function(require,module,exports){
module.exports={
  "Tamien Caltrain Station": "777403",
  "San Jose Caltrain Station": "777402",
  "San Jose Diridon Caltrain": "70261",
  "Santa Clara Caltrain": "70241",
  "Lawrence Caltrain": "70231",
  "Sunnyvale Caltrain": "70221",
  "Mt View Caltrain": "70211",
  "San Antonio Caltrain": "70201",
  "California Ave Caltrain": "70191",
  "Palo Alto Caltrain": "70171",
  "Menlo Park Caltrain": "70161",
  "Atherton Caltrain": "70151",
  "Redwood City Caltrain": "70141",
  "San Carlos Caltrain": "70131",
  "Belmont Caltrain": "70121",
  "Hillsdale Caltrain": "70111",
  "Hayward Park Caltrain": "70101",
  "San Mateo Caltrain": "70091",
  "Burlingame Caltrain": "70081",
  "Broadway Caltrain": "70071",
  "Millbrae Caltrain": "70061",
  "San Bruno Caltrain": "70051",
  "So. San Francisco Caltrain Station": "70041",
  "Bayshore Caltrain": "70031",
  "22nd St Caltrain": "70021",
  "San Francisco Caltrain": "70011",
  "Gilroy Caltrain": "70321",
  "San Martin Caltrain": "70311",
  "Morgan Hill Caltrain": "70301",
  "Blossom Hill Caltrain": "70291",
  "Capitol Caltrain": "70281",
  "Tamien Caltrain": "70271"
}
},{}],4:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "23u",
      "arrival_time": "7:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "23u",
      "arrival_time": "7:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "25u",
      "arrival_time": "8:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "25u",
      "arrival_time": "8:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "27u",
      "arrival_time": "9:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "27u",
      "arrival_time": "9:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "01u",
      "arrival_time": "10:10:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "01u",
      "arrival_time": "10:22:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "29u",
      "arrival_time": "10:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "29u",
      "arrival_time": "10:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "31u",
      "arrival_time": "11:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "31u",
      "arrival_time": "11:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "33u",
      "arrival_time": "12:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "33u",
      "arrival_time": "12:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "35u",
      "arrival_time": "13:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "35u",
      "arrival_time": "13:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "37u",
      "arrival_time": "14:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "37u",
      "arrival_time": "14:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "39u",
      "arrival_time": "15:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "39u",
      "arrival_time": "15:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "41u",
      "arrival_time": "16:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "41u",
      "arrival_time": "16:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "03u",
      "arrival_time": "17:10:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "03u",
      "arrival_time": "17:22:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "43u",
      "arrival_time": "17:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "43u",
      "arrival_time": "17:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "45u",
      "arrival_time": "18:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "45u",
      "arrival_time": "18:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "47u",
      "arrival_time": "19:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "47u",
      "arrival_time": "19:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "49u",
      "arrival_time": "20:33:00",
      "stop_id": "777403"
    },
    {
      "trip_id": "49u",
      "arrival_time": "20:45:00",
      "stop_id": "777402"
    }
  ],
  [
    {
      "trip_id": "423u",
      "arrival_time": "8:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "423u",
      "arrival_time": "8:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "423u",
      "arrival_time": "9:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "425u",
      "arrival_time": "9:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "425u",
      "arrival_time": "9:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "425u",
      "arrival_time": "10:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "427u",
      "arrival_time": "10:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "427u",
      "arrival_time": "10:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "427u",
      "arrival_time": "11:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "429u",
      "arrival_time": "11:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "429u",
      "arrival_time": "11:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "429u",
      "arrival_time": "12:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "431u",
      "arrival_time": "12:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "431u",
      "arrival_time": "12:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "431u",
      "arrival_time": "13:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "433u",
      "arrival_time": "13:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "433u",
      "arrival_time": "13:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "433u",
      "arrival_time": "14:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "435u",
      "arrival_time": "14:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "435u",
      "arrival_time": "14:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "435u",
      "arrival_time": "15:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "437u",
      "arrival_time": "15:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "437u",
      "arrival_time": "15:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "437u",
      "arrival_time": "16:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "439u",
      "arrival_time": "16:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "439u",
      "arrival_time": "16:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "439u",
      "arrival_time": "17:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "441u",
      "arrival_time": "17:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "441u",
      "arrival_time": "17:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "441u",
      "arrival_time": "18:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "443u",
      "arrival_time": "18:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "443u",
      "arrival_time": "18:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "443u",
      "arrival_time": "19:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "445u",
      "arrival_time": "19:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "445u",
      "arrival_time": "19:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "445u",
      "arrival_time": "20:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "447u",
      "arrival_time": "20:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "447u",
      "arrival_time": "20:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "447u",
      "arrival_time": "21:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "449u",
      "arrival_time": "21:00:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:05:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:10:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:14:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:19:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:23:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:27:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:31:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:34:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:37:00",
      "stop_id": "70151"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:41:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:45:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:48:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:51:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:54:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "449u",
      "arrival_time": "21:57:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:02:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:05:00",
      "stop_id": "70071"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:19:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:25:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "449u",
      "arrival_time": "22:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "801u",
      "arrival_time": "10:35:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "801u",
      "arrival_time": "10:45:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "801u",
      "arrival_time": "10:50:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "801u",
      "arrival_time": "10:58:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "801u",
      "arrival_time": "11:04:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "801u",
      "arrival_time": "11:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "801u",
      "arrival_time": "11:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "801u",
      "arrival_time": "11:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "801u",
      "arrival_time": "11:41:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "803u",
      "arrival_time": "17:35:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "803u",
      "arrival_time": "17:45:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "803u",
      "arrival_time": "17:50:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "803u",
      "arrival_time": "17:58:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "803u",
      "arrival_time": "18:04:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "803u",
      "arrival_time": "18:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "803u",
      "arrival_time": "18:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "803u",
      "arrival_time": "18:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "803u",
      "arrival_time": "18:41:00",
      "stop_id": "70011"
    }
  ]
]
},{}],5:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "103",
      "arrival_time": "4:58:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:05:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:11:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:16:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:20:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:25:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:29:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:33:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:37:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:40:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:45:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:49:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:52:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:55:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "103",
      "arrival_time": "5:58:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:01:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:05:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:10:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:14:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:18:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:24:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:29:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "103",
      "arrival_time": "6:38:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "135",
      "arrival_time": "9:15:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:21:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:26:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:31:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:37:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:41:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:45:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:49:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:52:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "135",
      "arrival_time": "9:58:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:02:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:05:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:08:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:11:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:15:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:27:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:31:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:37:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:43:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "135",
      "arrival_time": "10:50:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "101",
      "arrival_time": "4:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:36:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:41:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:45:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:50:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:54:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "101",
      "arrival_time": "4:58:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:02:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:05:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:10:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:14:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:17:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:20:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:23:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:26:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:30:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:35:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:39:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:43:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:49:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "101",
      "arrival_time": "5:54:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "101",
      "arrival_time": "6:03:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "147",
      "arrival_time": "12:10:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:16:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:22:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:26:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:31:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:34:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:38:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:42:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:45:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:51:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:55:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "147",
      "arrival_time": "12:58:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:02:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:05:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:08:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:12:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:17:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:21:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:25:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:31:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:37:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "147",
      "arrival_time": "13:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "151",
      "arrival_time": "13:10:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:16:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:22:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:26:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:31:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:34:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:38:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:42:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:45:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:51:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:55:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "151",
      "arrival_time": "13:58:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:02:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:05:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:08:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:12:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:17:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:21:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:25:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:31:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:37:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "151",
      "arrival_time": "14:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "155",
      "arrival_time": "14:15:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:21:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:26:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:31:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:37:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:41:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:45:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:49:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:52:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "155",
      "arrival_time": "14:58:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:02:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:05:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:08:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:11:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:15:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:27:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:31:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:37:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:43:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "155",
      "arrival_time": "15:50:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "139",
      "arrival_time": "10:15:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:21:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:26:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:31:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:37:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:41:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:45:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:49:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:52:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "139",
      "arrival_time": "10:58:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:02:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:05:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:08:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:11:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:15:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:23:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:27:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:31:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:37:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:43:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "139",
      "arrival_time": "11:50:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "143",
      "arrival_time": "11:10:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:16:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:22:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:26:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:31:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:34:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:38:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:42:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:45:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:51:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:55:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "143",
      "arrival_time": "11:58:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:02:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:05:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:08:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:12:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:17:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:21:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:25:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:31:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:37:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "143",
      "arrival_time": "12:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "159",
      "arrival_time": "15:05:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:09:00",
      "stop_id": "70251"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:13:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:18:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:22:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:27:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:31:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:35:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:40:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:43:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:48:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:52:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:55:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "159",
      "arrival_time": "15:58:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:01:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:04:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:08:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:13:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:17:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:21:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:27:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:32:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "159",
      "arrival_time": "16:40:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "191",
      "arrival_time": "18:50:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "191",
      "arrival_time": "18:56:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:01:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:05:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:10:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:14:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:18:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:22:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:25:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:30:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:34:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:37:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:40:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:43:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:46:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:50:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:55:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "191",
      "arrival_time": "19:59:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "191",
      "arrival_time": "20:03:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "191",
      "arrival_time": "20:09:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "191",
      "arrival_time": "20:14:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "191",
      "arrival_time": "20:23:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "193",
      "arrival_time": "19:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:36:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:41:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:46:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:51:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:55:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "193",
      "arrival_time": "19:59:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:04:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:07:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:12:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:16:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:20:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:23:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:26:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:29:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:33:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:38:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:42:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:46:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:52:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "193",
      "arrival_time": "20:57:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "193",
      "arrival_time": "21:04:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "195",
      "arrival_time": "20:23:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:36:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:41:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:46:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:51:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:55:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "195",
      "arrival_time": "20:59:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:04:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:07:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:12:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:16:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:20:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:23:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:26:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:29:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:33:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:38:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:42:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:46:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:52:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "195",
      "arrival_time": "21:57:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "195",
      "arrival_time": "22:04:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "197",
      "arrival_time": "21:23:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:36:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:41:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:46:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:51:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:55:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "197",
      "arrival_time": "21:59:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:04:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:07:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:12:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:16:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:20:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:23:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:26:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:29:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:33:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:38:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:42:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:46:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:52:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "197",
      "arrival_time": "22:57:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "197",
      "arrival_time": "23:04:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "199",
      "arrival_time": "22:30:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:36:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:41:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:46:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:51:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:55:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "199",
      "arrival_time": "22:59:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:04:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:07:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:12:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:16:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:20:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:23:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:26:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:29:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:33:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:38:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:42:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:46:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:52:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "199",
      "arrival_time": "23:57:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "199",
      "arrival_time": "24:04:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "207",
      "arrival_time": "5:50:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "207",
      "arrival_time": "5:57:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:04:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:14:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:21:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:26:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:30:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:34:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:39:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:42:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:48:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "207",
      "arrival_time": "6:54:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "207",
      "arrival_time": "7:03:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "207",
      "arrival_time": "7:09:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "207",
      "arrival_time": "7:22:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "211",
      "arrival_time": "6:19:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:25:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:33:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:39:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:48:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:54:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "211",
      "arrival_time": "6:58:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:02:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:05:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:09:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:12:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:16:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:21:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:25:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:29:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:37:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:44:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "211",
      "arrival_time": "7:51:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "215",
      "arrival_time": "6:50:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:02:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:07:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:14:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:19:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:27:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:33:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:38:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:42:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "215",
      "arrival_time": "7:48:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "215",
      "arrival_time": "8:03:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "217",
      "arrival_time": "6:06:00",
      "stop_id": "70321"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:15:00",
      "stop_id": "70311"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:21:00",
      "stop_id": "70301"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:36:00",
      "stop_id": "70291"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:42:00",
      "stop_id": "70281"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:50:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "217",
      "arrival_time": "6:57:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:04:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:14:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:21:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:26:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:30:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:34:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:39:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:42:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:48:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "217",
      "arrival_time": "7:54:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "217",
      "arrival_time": "8:03:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "217",
      "arrival_time": "8:09:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "217",
      "arrival_time": "8:22:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "221",
      "arrival_time": "6:28:00",
      "stop_id": "70321"
    },
    {
      "trip_id": "221",
      "arrival_time": "6:37:00",
      "stop_id": "70311"
    },
    {
      "trip_id": "221",
      "arrival_time": "6:43:00",
      "stop_id": "70301"
    },
    {
      "trip_id": "221",
      "arrival_time": "6:56:00",
      "stop_id": "70291"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:02:00",
      "stop_id": "70281"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:10:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:18:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:24:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:29:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:34:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:40:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:48:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:54:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "221",
      "arrival_time": "7:58:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:01:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:05:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:08:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:11:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:15:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:21:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:25:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:29:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:37:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:44:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "221",
      "arrival_time": "8:51:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "225",
      "arrival_time": "7:50:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:02:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:07:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:14:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:19:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:27:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:33:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:38:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:42:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "225",
      "arrival_time": "8:48:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "225",
      "arrival_time": "9:03:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "227",
      "arrival_time": "7:06:00",
      "stop_id": "70321"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:15:00",
      "stop_id": "70311"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:21:00",
      "stop_id": "70301"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:36:00",
      "stop_id": "70291"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:42:00",
      "stop_id": "70281"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:50:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "227",
      "arrival_time": "7:57:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:01:00",
      "stop_id": "70251"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:06:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:16:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:23:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:29:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:33:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:37:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:42:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:45:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:51:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "227",
      "arrival_time": "8:59:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "227",
      "arrival_time": "9:08:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "227",
      "arrival_time": "9:14:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "227",
      "arrival_time": "9:27:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "231",
      "arrival_time": "8:22:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "231",
      "arrival_time": "8:28:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "231",
      "arrival_time": "8:36:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "231",
      "arrival_time": "8:42:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "231",
      "arrival_time": "8:51:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "231",
      "arrival_time": "8:57:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:01:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:05:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:08:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:12:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:15:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:19:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:24:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:29:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:32:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:38:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:44:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "231",
      "arrival_time": "9:50:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "233",
      "arrival_time": "8:33:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "233",
      "arrival_time": "8:40:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "233",
      "arrival_time": "8:46:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "233",
      "arrival_time": "8:52:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "233",
      "arrival_time": "8:57:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:03:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:07:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:11:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:18:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:21:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:27:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:31:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:34:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:38:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:42:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:46:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:51:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "233",
      "arrival_time": "9:55:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "233",
      "arrival_time": "10:09:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "237",
      "arrival_time": "9:43:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "237",
      "arrival_time": "9:50:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "237",
      "arrival_time": "9:56:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:01:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:05:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:11:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:15:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:19:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:24:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:27:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:32:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:36:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:39:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:42:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:47:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:51:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "237",
      "arrival_time": "10:56:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "237",
      "arrival_time": "11:00:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "237",
      "arrival_time": "11:15:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "257",
      "arrival_time": "14:33:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "257",
      "arrival_time": "14:40:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "257",
      "arrival_time": "14:46:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "257",
      "arrival_time": "14:51:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "257",
      "arrival_time": "14:55:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:04:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:08:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:12:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:15:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:20:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:24:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:27:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:30:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:34:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:38:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:43:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "257",
      "arrival_time": "15:47:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "257",
      "arrival_time": "16:04:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "261",
      "arrival_time": "15:38:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "261",
      "arrival_time": "15:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "261",
      "arrival_time": "15:51:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "261",
      "arrival_time": "15:56:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:00:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:05:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:09:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:13:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:18:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:21:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:27:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:31:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:38:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:46:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "261",
      "arrival_time": "16:58:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "261",
      "arrival_time": "17:06:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "263",
      "arrival_time": "16:01:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:08:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:14:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:29:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:37:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:41:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:45:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:49:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:52:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:55:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "263",
      "arrival_time": "16:59:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:04:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:08:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:13:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:19:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:25:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "263",
      "arrival_time": "17:32:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "267",
      "arrival_time": "16:31:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "267",
      "arrival_time": "16:40:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "267",
      "arrival_time": "16:48:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "267",
      "arrival_time": "16:56:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "267",
      "arrival_time": "16:59:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:06:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:25:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:35:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "267",
      "arrival_time": "17:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "269",
      "arrival_time": "16:33:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "269",
      "arrival_time": "16:40:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "269",
      "arrival_time": "16:46:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "269",
      "arrival_time": "16:54:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:00:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:05:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:09:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:14:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:20:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:23:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:29:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:33:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:40:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "269",
      "arrival_time": "17:48:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "269",
      "arrival_time": "18:00:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "269",
      "arrival_time": "18:06:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "273",
      "arrival_time": "17:01:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:08:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:14:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:29:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:37:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:41:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:45:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:49:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:52:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:55:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "273",
      "arrival_time": "17:59:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:04:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:08:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:13:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:19:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:25:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "273",
      "arrival_time": "18:33:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "277",
      "arrival_time": "17:31:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "277",
      "arrival_time": "17:40:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "277",
      "arrival_time": "17:48:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "277",
      "arrival_time": "17:56:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "277",
      "arrival_time": "17:59:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:06:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:25:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:35:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "277",
      "arrival_time": "18:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "279",
      "arrival_time": "17:33:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "279",
      "arrival_time": "17:40:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "279",
      "arrival_time": "17:46:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "279",
      "arrival_time": "17:54:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:00:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:05:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:09:00",
      "stop_id": "70201"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:14:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:20:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:23:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:29:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:33:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:40:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "279",
      "arrival_time": "18:48:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "279",
      "arrival_time": "19:00:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "279",
      "arrival_time": "19:06:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "283",
      "arrival_time": "18:01:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:08:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:14:00",
      "stop_id": "70241"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:29:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:37:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:41:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:45:00",
      "stop_id": "70121"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:49:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:52:00",
      "stop_id": "70101"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:55:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "283",
      "arrival_time": "18:59:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:04:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:08:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:13:00",
      "stop_id": "70041"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:19:00",
      "stop_id": "70031"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:25:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "283",
      "arrival_time": "19:32:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "287",
      "arrival_time": "18:24:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "287",
      "arrival_time": "18:31:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "287",
      "arrival_time": "18:40:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "287",
      "arrival_time": "18:48:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "287",
      "arrival_time": "18:56:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "287",
      "arrival_time": "18:59:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:06:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:10:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:14:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:18:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:25:00",
      "stop_id": "70051"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:35:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "287",
      "arrival_time": "19:43:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "289",
      "arrival_time": "18:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "289",
      "arrival_time": "18:54:00",
      "stop_id": "70231"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:01:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:07:00",
      "stop_id": "70191"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:11:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:14:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:20:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:24:00",
      "stop_id": "70131"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:29:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:33:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:37:00",
      "stop_id": "70081"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:43:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "289",
      "arrival_time": "19:55:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "289",
      "arrival_time": "20:02:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "305",
      "arrival_time": "5:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "305",
      "arrival_time": "6:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "305",
      "arrival_time": "6:08:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "305",
      "arrival_time": "6:19:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "305",
      "arrival_time": "6:29:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "305",
      "arrival_time": "6:47:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "309",
      "arrival_time": "5:56:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:03:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:16:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:26:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:33:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:42:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "309",
      "arrival_time": "6:50:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "309",
      "arrival_time": "7:07:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "313",
      "arrival_time": "6:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "313",
      "arrival_time": "7:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "313",
      "arrival_time": "7:08:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "313",
      "arrival_time": "7:19:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "313",
      "arrival_time": "7:29:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "313",
      "arrival_time": "7:47:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "319",
      "arrival_time": "6:56:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:03:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:16:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:26:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:33:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:42:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "319",
      "arrival_time": "7:50:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "319",
      "arrival_time": "8:07:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "323",
      "arrival_time": "7:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "323",
      "arrival_time": "8:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "323",
      "arrival_time": "8:08:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "323",
      "arrival_time": "8:19:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "323",
      "arrival_time": "8:29:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "323",
      "arrival_time": "8:47:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "329",
      "arrival_time": "7:56:00",
      "stop_id": "70271"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:03:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:16:00",
      "stop_id": "70221"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:27:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:35:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:44:00",
      "stop_id": "70091"
    },
    {
      "trip_id": "329",
      "arrival_time": "8:52:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "329",
      "arrival_time": "9:09:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "365",
      "arrival_time": "16:22:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "365",
      "arrival_time": "16:35:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "365",
      "arrival_time": "16:44:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "365",
      "arrival_time": "16:48:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "365",
      "arrival_time": "16:54:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "365",
      "arrival_time": "17:09:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "365",
      "arrival_time": "17:21:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "365",
      "arrival_time": "17:27:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "371",
      "arrival_time": "16:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:08:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:19:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:29:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:43:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "371",
      "arrival_time": "17:49:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "375",
      "arrival_time": "17:22:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "375",
      "arrival_time": "17:35:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "375",
      "arrival_time": "17:44:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "375",
      "arrival_time": "17:48:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "375",
      "arrival_time": "17:54:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "375",
      "arrival_time": "18:09:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "375",
      "arrival_time": "18:21:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "375",
      "arrival_time": "18:27:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "381",
      "arrival_time": "17:45:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:00:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:08:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:19:00",
      "stop_id": "70111"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:29:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:43:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "381",
      "arrival_time": "18:49:00",
      "stop_id": "70011"
    }
  ],
  [
    {
      "trip_id": "385",
      "arrival_time": "18:22:00",
      "stop_id": "70261"
    },
    {
      "trip_id": "385",
      "arrival_time": "18:35:00",
      "stop_id": "70211"
    },
    {
      "trip_id": "385",
      "arrival_time": "18:44:00",
      "stop_id": "70171"
    },
    {
      "trip_id": "385",
      "arrival_time": "18:48:00",
      "stop_id": "70161"
    },
    {
      "trip_id": "385",
      "arrival_time": "18:54:00",
      "stop_id": "70141"
    },
    {
      "trip_id": "385",
      "arrival_time": "19:09:00",
      "stop_id": "70061"
    },
    {
      "trip_id": "385",
      "arrival_time": "19:21:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "385",
      "arrival_time": "19:27:00",
      "stop_id": "70011"
    }
  ]
]
},{}],6:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "24a",
      "arrival_time": "11:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "24a",
      "arrival_time": "11:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "22a",
      "arrival_time": "10:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "22a",
      "arrival_time": "10:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "26a",
      "arrival_time": "12:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "26a",
      "arrival_time": "12:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "02a",
      "arrival_time": "13:13:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "02a",
      "arrival_time": "13:23:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "30a",
      "arrival_time": "14:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "30a",
      "arrival_time": "14:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "32a",
      "arrival_time": "15:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "32a",
      "arrival_time": "15:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "34a",
      "arrival_time": "16:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "34a",
      "arrival_time": "16:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "36a",
      "arrival_time": "17:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "36a",
      "arrival_time": "17:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "38a",
      "arrival_time": "18:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "38a",
      "arrival_time": "18:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "40a",
      "arrival_time": "19:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "40a",
      "arrival_time": "19:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "04a",
      "arrival_time": "20:13:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "04a",
      "arrival_time": "20:23:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "44a",
      "arrival_time": "21:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "44a",
      "arrival_time": "21:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "46a",
      "arrival_time": "22:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "46a",
      "arrival_time": "22:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "422a",
      "arrival_time": "8:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "422a",
      "arrival_time": "8:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "422a",
      "arrival_time": "9:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "424a",
      "arrival_time": "9:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "424a",
      "arrival_time": "9:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "424a",
      "arrival_time": "10:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "426a",
      "arrival_time": "10:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "426a",
      "arrival_time": "10:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "426a",
      "arrival_time": "11:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "428a",
      "arrival_time": "11:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "428a",
      "arrival_time": "11:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "428a",
      "arrival_time": "12:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "430a",
      "arrival_time": "12:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "430a",
      "arrival_time": "12:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "430a",
      "arrival_time": "13:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "432a",
      "arrival_time": "13:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "432a",
      "arrival_time": "13:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "432a",
      "arrival_time": "14:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "434a",
      "arrival_time": "14:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "434a",
      "arrival_time": "14:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "434a",
      "arrival_time": "15:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "436a",
      "arrival_time": "15:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "436a",
      "arrival_time": "15:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "436a",
      "arrival_time": "16:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "438a",
      "arrival_time": "16:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "438a",
      "arrival_time": "16:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "438a",
      "arrival_time": "17:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "440a",
      "arrival_time": "17:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "440a",
      "arrival_time": "17:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "440a",
      "arrival_time": "18:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "442a",
      "arrival_time": "18:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "442a",
      "arrival_time": "18:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "442a",
      "arrival_time": "19:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "444a",
      "arrival_time": "19:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "444a",
      "arrival_time": "19:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "444a",
      "arrival_time": "20:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "446a",
      "arrival_time": "20:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "446a",
      "arrival_time": "20:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "446a",
      "arrival_time": "21:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "448a",
      "arrival_time": "21:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "448a",
      "arrival_time": "21:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "448a",
      "arrival_time": "22:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "450a",
      "arrival_time": "22:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "450a",
      "arrival_time": "22:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "450a",
      "arrival_time": "23:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "454a",
      "arrival_time": "24:01:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:05:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:11:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:17:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:21:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:25:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:29:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:31:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:37:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:40:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:43:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:46:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:49:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:55:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "454a",
      "arrival_time": "24:59:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:02:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:05:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:09:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:13:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:17:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:22:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:26:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:31:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "454a",
      "arrival_time": "25:39:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "802a",
      "arrival_time": "11:59:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:15:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:23:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:27:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:35:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "802a",
      "arrival_time": "12:54:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "802a",
      "arrival_time": "13:05:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "804a",
      "arrival_time": "18:59:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:15:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:23:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:27:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:35:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "804a",
      "arrival_time": "19:54:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "804a",
      "arrival_time": "20:05:00",
      "stop_id": "70262"
    }
  ]
]
},{}],7:[function(require,module,exports){
module.exports={
  "San Jose Caltrain Station": "777402",
  "Tamien Caltrain Station": "777403",
  "San Francisco Caltrain": "70012",
  "22nd St Caltrain": "70022",
  "Bayshore Caltrain": "70032",
  "So. San Francisco Caltrain Station": "70042",
  "San Bruno Caltrain": "70052",
  "Millbrae Caltrain": "70062",
  "Burlingame Caltrain": "70082",
  "San Mateo Caltrain": "70092",
  "Hayward Park Caltrain": "70102",
  "Hillsdale Caltrain": "70112",
  "Belmont Caltrain": "70122",
  "San Carlos Caltrain": "70132",
  "Redwood City Caltrain": "70142",
  "Menlo Park Caltrain": "70162",
  "Palo Alto Caltrain": "70172",
  "California Ave Caltrain": "70192",
  "San Antonio Caltrain": "70202",
  "Mt View Caltrain": "70212",
  "Sunnyvale Caltrain": "70222",
  "Lawrence Caltrain": "70232",
  "Santa Clara Caltrain": "70242",
  "College Park Caltrain": "70252",
  "San Jose Diridon Caltrain": "70262",
  "Tamien Caltrain": "70272",
  "Capitol Caltrain": "70282",
  "Blossom Hill Caltrain": "70292",
  "Morgan Hill Caltrain": "70302",
  "San Martin Caltrain": "70312",
  "Gilroy Caltrain": "70322"
}
},{}],8:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "26u",
      "arrival_time": "12:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "26u",
      "arrival_time": "12:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "24u",
      "arrival_time": "11:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "24u",
      "arrival_time": "11:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "22u",
      "arrival_time": "10:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "22u",
      "arrival_time": "10:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "02u",
      "arrival_time": "13:13:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "02u",
      "arrival_time": "13:23:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "30u",
      "arrival_time": "14:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "30u",
      "arrival_time": "14:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "32u",
      "arrival_time": "15:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "32u",
      "arrival_time": "15:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "34u",
      "arrival_time": "16:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "34u",
      "arrival_time": "16:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "36u",
      "arrival_time": "17:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "36u",
      "arrival_time": "17:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "38u",
      "arrival_time": "18:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "38u",
      "arrival_time": "18:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "40u",
      "arrival_time": "19:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "40u",
      "arrival_time": "19:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "04u",
      "arrival_time": "20:13:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "04u",
      "arrival_time": "20:23:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "44u",
      "arrival_time": "21:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "44u",
      "arrival_time": "21:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "46u",
      "arrival_time": "22:00:00",
      "stop_id": "777402"
    },
    {
      "trip_id": "46u",
      "arrival_time": "22:10:00",
      "stop_id": "777403"
    }
  ],
  [
    {
      "trip_id": "422u",
      "arrival_time": "8:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "422u",
      "arrival_time": "8:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "422u",
      "arrival_time": "9:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "424u",
      "arrival_time": "9:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "424u",
      "arrival_time": "9:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "424u",
      "arrival_time": "10:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "426u",
      "arrival_time": "10:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "426u",
      "arrival_time": "10:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "426u",
      "arrival_time": "11:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "428u",
      "arrival_time": "11:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "428u",
      "arrival_time": "11:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "428u",
      "arrival_time": "12:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "430u",
      "arrival_time": "12:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "430u",
      "arrival_time": "12:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "430u",
      "arrival_time": "13:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "432u",
      "arrival_time": "13:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "432u",
      "arrival_time": "13:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "432u",
      "arrival_time": "14:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "434u",
      "arrival_time": "14:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "434u",
      "arrival_time": "14:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "434u",
      "arrival_time": "15:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "436u",
      "arrival_time": "15:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "436u",
      "arrival_time": "15:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "436u",
      "arrival_time": "16:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "438u",
      "arrival_time": "16:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "438u",
      "arrival_time": "16:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "438u",
      "arrival_time": "17:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "440u",
      "arrival_time": "17:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "440u",
      "arrival_time": "17:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "440u",
      "arrival_time": "18:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "442u",
      "arrival_time": "18:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "442u",
      "arrival_time": "18:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "442u",
      "arrival_time": "19:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "444u",
      "arrival_time": "19:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "444u",
      "arrival_time": "19:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "444u",
      "arrival_time": "20:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "446u",
      "arrival_time": "20:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "446u",
      "arrival_time": "20:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "446u",
      "arrival_time": "21:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "448u",
      "arrival_time": "21:15:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:20:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:25:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:31:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:39:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:43:00",
      "stop_id": "70072"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:45:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:51:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:54:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "448u",
      "arrival_time": "21:57:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:00:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:03:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:09:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:13:00",
      "stop_id": "70152"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:16:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:19:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:23:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:27:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:31:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:36:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:40:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:45:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "448u",
      "arrival_time": "22:53:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "802u",
      "arrival_time": "11:59:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:15:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:23:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:27:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:35:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "802u",
      "arrival_time": "12:54:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "802u",
      "arrival_time": "13:05:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "804u",
      "arrival_time": "18:59:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:15:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:23:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:27:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:35:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "804u",
      "arrival_time": "19:54:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "804u",
      "arrival_time": "20:05:00",
      "stop_id": "70262"
    }
  ]
]
},{}],9:[function(require,module,exports){
module.exports=[
  [
    {
      "trip_id": "104",
      "arrival_time": "5:25:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:30:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:35:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:41:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:45:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:49:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:53:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "104",
      "arrival_time": "5:58:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:01:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:04:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:07:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:10:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:15:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:20:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:23:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:27:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:31:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:35:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:40:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:44:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:49:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "104",
      "arrival_time": "6:58:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "104",
      "arrival_time": "7:05:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "102",
      "arrival_time": "4:55:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:00:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:05:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:11:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:15:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:19:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:23:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:28:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:31:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:34:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:37:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:40:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:45:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:50:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:53:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "102",
      "arrival_time": "5:57:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:01:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:05:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:10:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:14:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:19:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "102",
      "arrival_time": "6:28:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "134",
      "arrival_time": "9:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "134",
      "arrival_time": "9:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "134",
      "arrival_time": "10:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "138",
      "arrival_time": "10:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "138",
      "arrival_time": "10:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "138",
      "arrival_time": "11:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "142",
      "arrival_time": "11:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "142",
      "arrival_time": "11:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "142",
      "arrival_time": "12:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "146",
      "arrival_time": "12:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "146",
      "arrival_time": "12:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "146",
      "arrival_time": "13:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "150",
      "arrival_time": "13:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "150",
      "arrival_time": "13:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "150",
      "arrival_time": "14:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "152",
      "arrival_time": "14:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:10:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:15:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:18:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:22:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:27:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:30:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:33:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:37:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:41:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:44:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:48:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:53:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "152",
      "arrival_time": "14:58:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:01:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:06:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:10:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:15:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "152",
      "arrival_time": "15:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "156",
      "arrival_time": "15:00:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:05:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:12:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:17:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:21:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:25:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:30:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:33:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:36:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:40:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:44:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:47:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:51:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "156",
      "arrival_time": "15:56:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:01:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:04:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:09:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:13:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:18:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:23:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:28:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:32:00",
      "stop_id": "70252"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:38:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:45:00",
      "stop_id": "70272"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:52:00",
      "stop_id": "70282"
    },
    {
      "trip_id": "156",
      "arrival_time": "16:58:00",
      "stop_id": "70292"
    },
    {
      "trip_id": "156",
      "arrival_time": "17:11:00",
      "stop_id": "70302"
    },
    {
      "trip_id": "156",
      "arrival_time": "17:17:00",
      "stop_id": "70312"
    },
    {
      "trip_id": "156",
      "arrival_time": "17:30:00",
      "stop_id": "70322"
    }
  ],
  [
    {
      "trip_id": "190",
      "arrival_time": "19:33:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "190",
      "arrival_time": "19:38:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "190",
      "arrival_time": "19:43:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "190",
      "arrival_time": "19:49:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "190",
      "arrival_time": "19:53:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "190",
      "arrival_time": "19:57:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:06:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:09:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:12:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:15:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:18:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:23:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:28:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:31:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:35:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:39:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:43:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:48:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:52:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "190",
      "arrival_time": "20:57:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "190",
      "arrival_time": "21:06:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "192",
      "arrival_time": "20:40:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "192",
      "arrival_time": "20:45:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "192",
      "arrival_time": "20:50:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "192",
      "arrival_time": "20:56:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:00:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:05:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:09:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:13:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:16:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:20:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:24:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:27:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:31:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "192",
      "arrival_time": "21:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "192",
      "arrival_time": "22:01:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "192",
      "arrival_time": "22:06:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "192",
      "arrival_time": "22:13:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "192",
      "arrival_time": "22:20:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "194",
      "arrival_time": "21:40:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "194",
      "arrival_time": "21:45:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "194",
      "arrival_time": "21:50:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "194",
      "arrival_time": "21:56:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:00:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:05:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:09:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:13:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:16:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:20:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:24:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:27:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:31:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "194",
      "arrival_time": "22:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "194",
      "arrival_time": "23:01:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "194",
      "arrival_time": "23:06:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "194",
      "arrival_time": "23:13:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "194",
      "arrival_time": "23:20:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "196",
      "arrival_time": "22:40:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "196",
      "arrival_time": "22:45:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "196",
      "arrival_time": "22:50:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "196",
      "arrival_time": "22:56:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:00:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:05:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:09:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:13:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:16:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:20:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:24:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:27:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:31:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "196",
      "arrival_time": "23:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "196",
      "arrival_time": "24:01:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "196",
      "arrival_time": "24:06:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "196",
      "arrival_time": "24:13:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "198",
      "arrival_time": "24:01:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:06:00",
      "stop_id": "70021"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:11:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:17:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:21:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:25:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:29:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:34:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:37:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:40:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:43:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:46:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:51:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:56:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "198",
      "arrival_time": "24:59:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:03:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:07:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:11:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:16:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:20:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:25:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "198",
      "arrival_time": "25:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "206",
      "arrival_time": "6:06:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:11:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:24:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:28:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:32:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:36:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:40:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:45:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:50:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:53:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "206",
      "arrival_time": "6:57:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "206",
      "arrival_time": "7:03:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "206",
      "arrival_time": "7:08:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "206",
      "arrival_time": "7:20:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "208",
      "arrival_time": "6:24:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:29:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:35:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:41:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:44:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:49:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:53:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "208",
      "arrival_time": "6:56:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:00:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:04:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:07:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:11:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:15:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:22:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:36:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:45:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "208",
      "arrival_time": "7:52:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "210",
      "arrival_time": "6:44:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "210",
      "arrival_time": "6:50:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:02:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:09:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:16:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:22:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:28:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:32:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:35:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:40:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:44:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:49:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "210",
      "arrival_time": "7:55:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "210",
      "arrival_time": "8:02:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "210",
      "arrival_time": "8:05:00",
      "stop_id": "70252"
    },
    {
      "trip_id": "210",
      "arrival_time": "8:11:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "210",
      "arrival_time": "8:18:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "216",
      "arrival_time": "7:19:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:25:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:37:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:44:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:48:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:52:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "216",
      "arrival_time": "7:58:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "216",
      "arrival_time": "8:06:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "216",
      "arrival_time": "8:09:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "216",
      "arrival_time": "8:17:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "216",
      "arrival_time": "8:24:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "216",
      "arrival_time": "8:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "218",
      "arrival_time": "7:24:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:29:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:35:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:41:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:44:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:49:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:53:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "218",
      "arrival_time": "7:56:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:00:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:04:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:07:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:11:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:15:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:22:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:36:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:45:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "218",
      "arrival_time": "8:52:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "220",
      "arrival_time": "7:44:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "220",
      "arrival_time": "7:50:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:02:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:09:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:16:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:22:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:28:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:32:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:35:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:40:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:44:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:49:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "220",
      "arrival_time": "8:55:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "220",
      "arrival_time": "9:02:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "220",
      "arrival_time": "9:10:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "220",
      "arrival_time": "9:17:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "226",
      "arrival_time": "8:19:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:25:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:37:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:44:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:48:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:52:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "226",
      "arrival_time": "8:58:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "226",
      "arrival_time": "9:06:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "226",
      "arrival_time": "9:09:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "226",
      "arrival_time": "9:17:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "226",
      "arrival_time": "9:24:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "226",
      "arrival_time": "9:34:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "228",
      "arrival_time": "8:24:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:29:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:35:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:41:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:44:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:49:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:53:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "228",
      "arrival_time": "8:56:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:00:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:04:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:07:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:11:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:15:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:22:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:36:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:45:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "228",
      "arrival_time": "9:52:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "230",
      "arrival_time": "8:44:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "230",
      "arrival_time": "8:50:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:02:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:09:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:16:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:22:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:28:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:32:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:35:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:40:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:44:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:49:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "230",
      "arrival_time": "9:55:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "230",
      "arrival_time": "10:02:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "230",
      "arrival_time": "10:10:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "230",
      "arrival_time": "10:17:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "236",
      "arrival_time": "9:37:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "236",
      "arrival_time": "9:52:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "236",
      "arrival_time": "9:56:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:04:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:08:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:11:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:14:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:20:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:26:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:30:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:34:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:38:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:43:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:48:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:52:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "236",
      "arrival_time": "10:57:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "236",
      "arrival_time": "11:04:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "236",
      "arrival_time": "11:11:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "254",
      "arrival_time": "14:37:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "254",
      "arrival_time": "14:52:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "254",
      "arrival_time": "14:56:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:04:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:08:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:11:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:14:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:20:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:26:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:30:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:34:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:38:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:43:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:48:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:52:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "254",
      "arrival_time": "15:57:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "254",
      "arrival_time": "16:04:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "254",
      "arrival_time": "16:11:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "258",
      "arrival_time": "15:37:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "258",
      "arrival_time": "15:52:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "258",
      "arrival_time": "15:56:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:04:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:08:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:11:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:14:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:20:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:26:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:30:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:34:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:38:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:43:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:48:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:52:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "258",
      "arrival_time": "16:57:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "258",
      "arrival_time": "17:04:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "258",
      "arrival_time": "17:11:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "262",
      "arrival_time": "16:19:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "262",
      "arrival_time": "16:33:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "262",
      "arrival_time": "16:38:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "262",
      "arrival_time": "16:43:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "262",
      "arrival_time": "16:48:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "262",
      "arrival_time": "16:52:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "262",
      "arrival_time": "17:02:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "262",
      "arrival_time": "17:06:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "262",
      "arrival_time": "17:12:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "262",
      "arrival_time": "17:17:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "262",
      "arrival_time": "17:28:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "264",
      "arrival_time": "16:28:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "264",
      "arrival_time": "16:33:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "264",
      "arrival_time": "16:41:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "264",
      "arrival_time": "16:49:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "264",
      "arrival_time": "16:53:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "264",
      "arrival_time": "16:57:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:06:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:09:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:13:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:16:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:20:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:24:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:30:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:38:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:43:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "264",
      "arrival_time": "17:52:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "264",
      "arrival_time": "18:00:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "268",
      "arrival_time": "16:55:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:08:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:14:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:24:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:30:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "268",
      "arrival_time": "17:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:03:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:10:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:20:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:26:00",
      "stop_id": "70272"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:33:00",
      "stop_id": "70282"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:39:00",
      "stop_id": "70292"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:52:00",
      "stop_id": "70302"
    },
    {
      "trip_id": "268",
      "arrival_time": "18:58:00",
      "stop_id": "70312"
    },
    {
      "trip_id": "268",
      "arrival_time": "19:11:00",
      "stop_id": "70322"
    }
  ],
  [
    {
      "trip_id": "272",
      "arrival_time": "17:20:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "272",
      "arrival_time": "17:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "272",
      "arrival_time": "17:42:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "272",
      "arrival_time": "17:45:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "272",
      "arrival_time": "17:50:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "272",
      "arrival_time": "17:55:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "272",
      "arrival_time": "18:04:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "272",
      "arrival_time": "18:08:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "272",
      "arrival_time": "18:14:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "272",
      "arrival_time": "18:20:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "272",
      "arrival_time": "18:30:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "274",
      "arrival_time": "17:28:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "274",
      "arrival_time": "17:33:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "274",
      "arrival_time": "17:41:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "274",
      "arrival_time": "17:49:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "274",
      "arrival_time": "17:53:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "274",
      "arrival_time": "17:57:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:06:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:09:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:13:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:16:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:20:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:24:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:30:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:38:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:43:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:47:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "274",
      "arrival_time": "18:52:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:00:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:06:00",
      "stop_id": "70272"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:13:00",
      "stop_id": "70282"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:19:00",
      "stop_id": "70292"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:32:00",
      "stop_id": "70302"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:38:00",
      "stop_id": "70312"
    },
    {
      "trip_id": "274",
      "arrival_time": "19:51:00",
      "stop_id": "70322"
    }
  ],
  [
    {
      "trip_id": "278",
      "arrival_time": "17:55:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:08:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:14:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:24:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:30:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "278",
      "arrival_time": "18:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "278",
      "arrival_time": "19:03:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "278",
      "arrival_time": "19:10:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "278",
      "arrival_time": "19:20:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "278",
      "arrival_time": "19:26:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "282",
      "arrival_time": "18:20:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "282",
      "arrival_time": "18:35:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "282",
      "arrival_time": "18:42:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "282",
      "arrival_time": "18:45:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "282",
      "arrival_time": "18:50:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "282",
      "arrival_time": "18:55:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "282",
      "arrival_time": "19:04:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "282",
      "arrival_time": "19:08:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "282",
      "arrival_time": "19:14:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "282",
      "arrival_time": "19:20:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "282",
      "arrival_time": "19:30:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "284",
      "arrival_time": "18:28:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "284",
      "arrival_time": "18:33:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "284",
      "arrival_time": "18:41:00",
      "stop_id": "70032"
    },
    {
      "trip_id": "284",
      "arrival_time": "18:49:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "284",
      "arrival_time": "18:53:00",
      "stop_id": "70052"
    },
    {
      "trip_id": "284",
      "arrival_time": "18:57:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:01:00",
      "stop_id": "70082"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:06:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:09:00",
      "stop_id": "70102"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:13:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:16:00",
      "stop_id": "70122"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:20:00",
      "stop_id": "70132"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:24:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:30:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:38:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:43:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "284",
      "arrival_time": "19:52:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "284",
      "arrival_time": "20:00:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "288",
      "arrival_time": "18:55:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:08:00",
      "stop_id": "70042"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:14:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:24:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:30:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:36:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:40:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:44:00",
      "stop_id": "70192"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:48:00",
      "stop_id": "70202"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:52:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "288",
      "arrival_time": "19:57:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "288",
      "arrival_time": "20:03:00",
      "stop_id": "70232"
    },
    {
      "trip_id": "288",
      "arrival_time": "20:10:00",
      "stop_id": "70242"
    },
    {
      "trip_id": "288",
      "arrival_time": "20:18:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "288",
      "arrival_time": "20:25:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "312",
      "arrival_time": "6:56:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:02:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:17:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:32:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:38:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "312",
      "arrival_time": "7:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "312",
      "arrival_time": "8:03:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "314",
      "arrival_time": "7:12:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "314",
      "arrival_time": "7:18:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "314",
      "arrival_time": "7:32:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "314",
      "arrival_time": "7:42:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "314",
      "arrival_time": "7:54:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "314",
      "arrival_time": "8:01:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "314",
      "arrival_time": "8:16:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "322",
      "arrival_time": "7:56:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:02:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:17:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:32:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:38:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "322",
      "arrival_time": "8:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "322",
      "arrival_time": "9:03:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "324",
      "arrival_time": "8:12:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "324",
      "arrival_time": "8:18:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "324",
      "arrival_time": "8:32:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "324",
      "arrival_time": "8:42:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "324",
      "arrival_time": "8:54:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "324",
      "arrival_time": "9:01:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "324",
      "arrival_time": "9:16:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "332",
      "arrival_time": "8:56:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:02:00",
      "stop_id": "70022"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:17:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:32:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:38:00",
      "stop_id": "70162"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:41:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "332",
      "arrival_time": "9:49:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "332",
      "arrival_time": "10:03:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "360",
      "arrival_time": "16:10:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "360",
      "arrival_time": "16:26:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "360",
      "arrival_time": "16:36:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "360",
      "arrival_time": "16:47:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "360",
      "arrival_time": "16:54:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "360",
      "arrival_time": "17:09:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "366",
      "arrival_time": "16:33:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "366",
      "arrival_time": "16:50:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "366",
      "arrival_time": "16:59:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "366",
      "arrival_time": "17:08:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "366",
      "arrival_time": "17:16:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "366",
      "arrival_time": "17:26:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "366",
      "arrival_time": "17:36:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "366",
      "arrival_time": "17:43:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "370",
      "arrival_time": "17:12:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "370",
      "arrival_time": "17:30:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "370",
      "arrival_time": "17:40:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "370",
      "arrival_time": "17:52:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "370",
      "arrival_time": "17:59:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "370",
      "arrival_time": "18:14:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "376",
      "arrival_time": "17:33:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "376",
      "arrival_time": "17:50:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "376",
      "arrival_time": "17:59:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "376",
      "arrival_time": "18:08:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "376",
      "arrival_time": "18:16:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "376",
      "arrival_time": "18:26:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "376",
      "arrival_time": "18:36:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "376",
      "arrival_time": "18:43:00",
      "stop_id": "70272"
    }
  ],
  [
    {
      "trip_id": "380",
      "arrival_time": "18:12:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "380",
      "arrival_time": "18:30:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "380",
      "arrival_time": "18:40:00",
      "stop_id": "70112"
    },
    {
      "trip_id": "380",
      "arrival_time": "18:52:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "380",
      "arrival_time": "18:59:00",
      "stop_id": "70212"
    },
    {
      "trip_id": "380",
      "arrival_time": "19:14:00",
      "stop_id": "70262"
    }
  ],
  [
    {
      "trip_id": "386",
      "arrival_time": "18:33:00",
      "stop_id": "70012"
    },
    {
      "trip_id": "386",
      "arrival_time": "18:50:00",
      "stop_id": "70062"
    },
    {
      "trip_id": "386",
      "arrival_time": "18:59:00",
      "stop_id": "70092"
    },
    {
      "trip_id": "386",
      "arrival_time": "19:08:00",
      "stop_id": "70142"
    },
    {
      "trip_id": "386",
      "arrival_time": "19:16:00",
      "stop_id": "70172"
    },
    {
      "trip_id": "386",
      "arrival_time": "19:26:00",
      "stop_id": "70222"
    },
    {
      "trip_id": "386",
      "arrival_time": "19:36:00",
      "stop_id": "70262"
    },
    {
      "trip_id": "386",
      "arrival_time": "19:43:00",
      "stop_id": "70272"
    }
  ]
]
},{}]},{},[1]);
