
var northJSON = require('./northStops.json');

stopMapping={}

for(var i in northJSON) {
  stopMapping[northJSON[i].stop_name] = northJSON[i].stop_id;
}
