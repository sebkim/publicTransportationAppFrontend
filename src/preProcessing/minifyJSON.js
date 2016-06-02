var fs=require('fs');

var northJSON = require('./northStops.json');
var southJSON = require('./southStops.json');

var northWeekdaysStopTimes = require('./northWeekdaysStopTimes.json');
var northSatStopTimes = require('./northSatStopTimes.json');
var northSunStopTimes = require('./northSunStopTimes.json');

var southWeekdaysStopTimes = require('./southWeekdaysStopTimes.json');
var southSatStopTimes = require('./southSatStopTimes.json');
var southSunStopTimes = require('./southSunStopTimes.json');

northStopMapping={}
southStopMapping={}
for(var i in northJSON) {
  northStopMapping[northJSON[i].stop_name] = northJSON[i].stop_id;
}
for(var i in southJSON) {
  southStopMapping[southJSON[i].stop_name] = southJSON[i].stop_id;
}

fs.writeFile('./northStopMapping.json', JSON.stringify(northStopMapping, null, 2) , 'utf-8');
fs.writeFile('./southStopMapping.json', JSON.stringify(southStopMapping, null, 2) , 'utf-8');


function replacer(key, value) {
  if( key==="_id" || key==="departure_time" || key==="stop_sequence" || key==="pickup_type" || key==="drop_off_type" || key==="agency_key") {
    return undefined;
  } else {
    return value;
  }
}

fs.writeFile('./northWeekdaysStopTimesMin.json', JSON.stringify(northWeekdaysStopTimes, replacer, 2) , 'utf-8');
fs.writeFile('./northSatStopTimesMin.json', JSON.stringify(northSatStopTimes, replacer, 2) , 'utf-8');
fs.writeFile('./northSunStopTimesMin.json', JSON.stringify(northSunStopTimes, replacer, 2) , 'utf-8');

fs.writeFile('./southWeekdaysStopTimesMin.json', JSON.stringify(southWeekdaysStopTimes, replacer, 2) , 'utf-8');
fs.writeFile('./southSatStopTimesMin.json', JSON.stringify(southSatStopTimes, replacer, 2) , 'utf-8');
fs.writeFile('./southSunStopTimesMin.json', JSON.stringify(southSunStopTimes, replacer, 2) , 'utf-8');
