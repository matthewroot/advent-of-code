const { processGuardLogs, guardWithMaxSleep, findBestMinute, findMaxFrequency } = require('./sleepiestGuard.js');

let processedGuardData;

beforeAll(() => {
  processedGuardData = processGuardLogs('./2018/04/testInput.txt');
});

test('guardWithMaxSleep() should determine the guard with the most sleep', () => {
  const sleepiestGuard = guardWithMaxSleep(processedGuardData);
  expect(sleepiestGuard).toBe(10);
});

test('findBestMinute() should determine the minute that the guard sleeps the most', () => {
  const sleepiestGuard = guardWithMaxSleep(processedGuardData);
  const bestMinute = findBestMinute(processedGuardData[sleepiestGuard].minutesHistogram);
  expect(bestMinute).toBe(24);
});

test('findMaxFrequency should determine the guard most frequently asleep on the same minute', () => {
  const actual = findMaxFrequency(processedGuardData);
  expect(actual).toBe(4455);
});
