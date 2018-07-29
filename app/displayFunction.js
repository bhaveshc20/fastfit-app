import * as fs from "fs";
import document from "document";
import * as util from "../common/utils";
const appTitle = document.getElementById("appTitle");
const ifStart = document.getElementById("ifStart");
const ifEnd = document.getElementById("ifEnd");
const ifEndTime = document.getElementById("ifEndTime");

const lblTextLast = document.getElementById("textLast");
const lblTextEnd = document.getElementById("textEnd");
const lblTimeLast = document.getElementById("timeLast");
const lblTimeEnd = document.getElementById("timeEnd");

const lblHrsLeft = document.getElementById("hrsLeft");
const lblMinsLeft = document.getElementById("minLeft");
const lblCHrs = document.getElementById("cHrs");
const lblCMins = document.getElementById("cMin");

const eatTime = 8;
const fastTime = 16;

export function displayFunction() {
  
    let jsonObject = fs.readFileSync("json.txt", "json");
    let lastIndex = jsonObject["entries"].length - 1;
    let today = new Date();
      
    if (jsonObject["entries"][lastIndex]["status"] == `fasting`) {
      let date = new Date(jsonObject["entries"][lastIndex]["date"]);
      let hoursStarted = util.zeroPad(date.getHours());
      let minsStarted = util.zeroPad(date.getMinutes());
      ifStart.text = `last started: ${hoursStarted}:${minsStarted}`;
  
      let timePassed = today - date;
      let minutesPassed = Math.floor(timePassed/(60*1000));
      let hoursPassed = Math.floor(timePassed/(60*60*1000));
      let fastingTime = fastTime*60*60*1000;
  
      if (timePassed <= fastingTime) {
        let timeRemaining = fastingTime - timePassed;

        let hoursRemaining = Math.floor(timeRemaining/(60*60*1000));
        let minsRemaining = Math.floor(timeRemaining/(60*1000));
        console.log(minsRemaining);
        console.log(hoursRemaining);
        let endTime = new Date(today.getTime() + timeRemaining);
        let endTimeHours = util.zeroPad(endTime.getHours());
        let endTimeMins = util.zeroPad(endTime.getMinutes());
        lblHrsLeft.text = `${hoursRemaining}`;
        lblCHrs.text = 'H';
        lblMinsLeft.text = `${minsRemaining - hoursRemaining*60}`;
        lblCMins.text = 'M';
        lblTextLast.text = 'Last Started';
        lblTimeLast.text = `${hoursStarted}:${minsStarted}`;
        lblTextEnd.text = 'Will End At';
        lblTimeEnd.text = `${endTimeHours}:${endTimeMins}`;
      }
      else {
        let timeOverTarget = timePassed - fastingTime;
        let hoursOver = Math.floor(timeOverTarget/(60*60*1000));
        let minsOver = Math.floor(timeOverTarget/(60*1000));
        ifEnd.text = `Break fast!`;
        ifEnd.text = `exceeded by: ${hoursOver} h ${minsOver - hoursOver*60} min`;
      }
    }
    else if (jsonObject["entries"][lastIndex]["status"] == `eating`) {
      let date = new Date(jsonObject["entries"][lastIndex]["date"]);
      let hoursEnded = util.zeroPad(date.getHours());
      let minsEnded = util.zeroPad(date.getMinutes());
      ifStart.text = `breakfast at: ${hoursEnded}:${minsEnded}`;
      
      let timePassed = today - date;
      let minutesPassed = Math.floor(timePassed/(60*1000));
      let hoursPassed = Math.floor(timePassed/(60*60*1000));
      let eatingTime = eatTime*60*60*1000;
      
      if (timePassed <= eatingTime) {
        let timeRemaining = eatingTime - timePassed;
        let hoursRemaining = Math.floor(timeRemaining/(60*60*1000));
        let minsRemaining = Math.floor(timeRemaining/(60*1000));
        let endTime = new Date(today.getTime() + timeRemaining);
        let endTimeHours = util.zeroPad(endTime.getHours());
        let endTimeMins = util.zeroPad(endTime.getMinutes());
        lblHrsLeft.text = `0${hoursRemaining}`;
        lblCHrs.text = 'H';
        lblMinsLeft.text = `${minsRemaining - hoursRemaining*60}`;
        lblCMins.text = 'M';
        // ifEnd.text = `start fast in: ${hoursRemaining} h ${minsRemaining - hoursRemaining*60} min`;
        lblTextLast.text = 'Food at';
        lblTimeLast.text = `${hoursEnded}:${minsEnded}`;
        lblTextEnd.text = 'Start Fast At';
        lblTimeEnd.text = `${endTimeHours}:${endTimeMins}`;
      }
      else {
        let timeOverTarget = timePassed - eatingTime;
        let hoursOver = Math.floor(timeOverTarget/(60*60*1000));
        let minsOver = Math.floor(timeOverTarget/(60*1000));
        ifEnd.text = `Start fast!`;
        ifEndTime.text = `exceeded by: ${hoursOver} h ${minsOver - hoursOver*60} min`;
      }
    }
    return today;
}