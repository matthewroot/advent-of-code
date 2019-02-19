const { findMaxPower, calculateFuelCellPower } = require('./chronalCharge');

test('findMaxPower() prints the x,y coordinates of the square with highest power', () => {
  let maxPower = findMaxPower(18);
  expect(maxPower).toEqual('33,45');

  maxPower = findMaxPower(42);
  expect(maxPower).toEqual('21,61');
});

test('calculateFuelCellPower() gets power based on serial number and coordiantes', () => {
  let fuelCellPower = calculateFuelCellPower(8, 3, 5);
  expect(fuelCellPower).toBe(4);

  fuelCellPower = calculateFuelCellPower(57, 122, 79);
  expect(fuelCellPower).toBe(-5);

  fuelCellPower = calculateFuelCellPower(39, 217, 196);
  expect(fuelCellPower).toBe(0);

  fuelCellPower = calculateFuelCellPower(71, 101, 153);
  expect(fuelCellPower).toBe(4);
});
