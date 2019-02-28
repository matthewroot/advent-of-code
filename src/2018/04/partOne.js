const { processGuardLogs, guardWithMaxSleep, findBestMinute } = require('./sleepiestGuard');

const processedGuardData = processGuardLogs('./input.txt');
let sleepiestGuardId = guardWithMaxSleep(processedGuardData);
let bestMinute = findBestMinute(processedGuardData[sleepiestGuardId].minutesHistogram);

console.log(sleepiestGuardId * bestMinute);
