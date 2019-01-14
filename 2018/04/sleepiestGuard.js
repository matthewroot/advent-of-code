const fs = require('fs');

// TODO: Fetch the input from this location https://adventofcode.com/2018/day/4/input
function processGuardLogs(inputFile) {
  const sortedLogEntries = fs.readFileSync(inputFile, { encoding: 'utf-8' }).trim().split('\n').sort();

  // { guardId: {
  //   totalSleepTime: 0,
  //   minutesHistogram: []
  //     0,
  //     ,
  //   ]
  // }}
  let guardSleepData = {};
  
  // Iterate through each log entry
  //    Parse the entry for date, time, and action
  //    Make decision about what to do based on what action is:
  //      If falls asleep, set start sleep time (if this is before midnight, start counting at midnight)
  //      Else if wakes up
  //        Set end sleep time
  //        Iterate from start to end time
  //          Add to current guard's total sleep time
  //          Update current guard's histogram of minutes slept
  //      Else, set current guard

  let currentGuardId, startSleepTime, endSleepTime;
  
// Sample input:
// [1518-07-31 00:54] wakes up
// [1518-04-09 00:01] Guard #3407 begins shift
// [1518-04-03 00:36] wakes up
// [1518-10-24 00:03] Guard #1049 begins shift
// [1518-03-15 00:11] falls asleep

  for (const logEntry of sortedLogEntries) {
    const action = logEntry.slice(logEntry.indexOf(']') + 2);
    const minutes = new Date(logEntry.slice(logEntry.indexOf('[') + 1, logEntry.indexOf(']'))).getMinutes();

    if (action === 'falls asleep') {
      startSleepTime = minutes;
    } else if (action === 'wakes up') {
      endSleepTime = minutes;

      guardSleepData[currentGuardId].totalSleepTime += endSleepTime - startSleepTime;

      for(let minute = startSleepTime; minute < endSleepTime; minute++) {
        let currentMinuteValue = guardSleepData[currentGuardId].minutesHistogram[minute];

        if (currentMinuteValue) {
          guardSleepData[currentGuardId].minutesHistogram[minute]++;
        } else {
          guardSleepData[currentGuardId].minutesHistogram[minute] = 1;
        }
      }
    } else {
      currentGuardId = action.match(/#\d+/)[0].substring(1);

      if (!guardSleepData[currentGuardId]) {
        guardSleepData[currentGuardId] = {
          totalSleepTime: 0,
          minutesHistogram: Array.from('0'.repeat(5)),
        };
      }
    }
  }

  return(guardSleepData);
}

// Find guard with the highest slept time
function guardWithMaxSleep(guardSleepData) {
  let sleepiestGuardId = null;

  for (const guardId in guardSleepData) {
    if (guardSleepData.hasOwnProperty(guardId)) {
      const currentGuardData = guardSleepData[guardId];
      
      if (!sleepiestGuardId) {
        sleepiestGuardId = guardId;
      }

      if (currentGuardData.totalSleepTime > guardSleepData[sleepiestGuardId].totalSleepTime) {
        sleepiestGuardId = guardId;
      }
    }
  }

  return(Number(sleepiestGuardId));
}

// Find the most slept minute for that guard (could print this out as a histogram for fun)
function findBestMinute(minutesHistogram) {
  let mostSleptMinute = 0;

  for (let minute = 0; minute < minutesHistogram.length; minute++) {
    if (minutesHistogram[minute] > minutesHistogram[mostSleptMinute]) {
      mostSleptMinute = minute;
    }
  }

  return(mostSleptMinute);
}

module.exports = { processGuardLogs, guardWithMaxSleep, findBestMinute };
