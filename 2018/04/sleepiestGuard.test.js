const { processGuardLogs } = require('./sleepiestGuard.js');

test('should determine the correct guard and minute combination', () => {
  const actual = processGuardLogs('2018/04/testInput.txt');
  expect(actual).toBe(240);
});
