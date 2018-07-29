import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as display from "./displayFunction.js";
import {today} from 'user-activity';
import {calculateDistance} from '../common/utils';
import {HeartRateSensor} from 'heart-rate';


// Update the clock every minute
clock.granularity = "minutes";
const backArc = document.getElementById('backArc');
const frontArc = document.getElementById('frontArc');

const lblCal = document.getElementById('cal');
const lblDist = document.getElementById('dist');
const lblHR = document.getElementById('hr');

const hrm = new HeartRateSensor();

hrm.onreading = function(){
  lblHR.text = `${hrm.heartRate} bpm`
}

hrm.start();

var buttonGroup = document.getElementById("buttonGroup");

let buttonCaption = ``;

let status = `nothing`;

let exists = true;
try {
  fs.statSync("json.txt");
} 
catch(error) {
  exists = false;
}

if (!exists) {
  buttonCaption = `START FIRST FAST`;

  let someDay = new Date('2018-05-20T10:00:30Z');
  let fastingLog = {
      "entries": [
        { "id" : 0,
          "date": someDay,
          "status": status }
      ]  
    };
  fs.writeFileSync("json.txt", fastingLog, "json");
} 
else {
  let jsonObject = fs.readFileSync("json.txt", "json");
  let lastIndex = jsonObject["entries"].length - 1;
  
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
    buttonCaption = `STOP`;
  }
  else {
    buttonCaption = `START`;
  }

}

buttonGroup.onclick = () => {
  
  var butt =   document.getElementById("sup");

  if( butt.href === "icons/pause.png" ) {
      butt.href = "icons/play.png";
  } else {
     butt.href = "icons/pause.png";
  }
  
  let today = display.displayFunction();
  let jsonObject = fs.readFileSync("json.txt", "json");
  let lastIndex = jsonObject["entries"].length - 1;
  
  if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
    buttonCaption = `START`;
    status = `eating`;
  }
  else {
    buttonCaption = `STOP`;
    status = `fasting`;
  }


  jsonObject.entries.push({
    "id" : jsonObject["entries"].length,
    "date": today,
    "status": status });
  fs.writeFileSync("json.txt", jsonObject, "json");
  display.displayFunction();
}

clock.ontick = function(evt) {
  display.displayFunction();
  
  lblCal.text = today.local.calories;
  lblDist.text = calculateDistance(today.local.distance, 'miles');
}