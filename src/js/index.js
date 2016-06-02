
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
