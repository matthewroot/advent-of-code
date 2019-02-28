const { processGuardLogs, findMaxFrequency } = require('./sleepiestGuard');

const processedGuardData = processGuardLogs('./input.txt');

console.log(findMaxFrequency(processedGuardData));
