const { processGuardLogs, guardWithMaxSleep, findBestMinute } = require('./sleepiestGuard');

let processedGuardData = processGuardLogs('./input.txt');

let sleepiestGuard = guardWithMaxSleep(processedGuardData);
let bestMinute = findBestMinute(processedGuardData[sleepiestGuard].minutesHistogram);

console.log(Number(sleepiestGuard) * bestMinute);
