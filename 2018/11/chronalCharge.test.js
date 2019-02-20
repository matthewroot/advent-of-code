const {
  findMaxPower,
  findVariableMaxPower,
  calculateFuelCellPower,
} = require('./chronalCharge');

test('findMaxPower() prints the x,y coordinates of the square with highest power', () => {
  let maxPower = findMaxPower(18, 3);
  let expectedPowerAndLocation = {
    maxPower: 29,
    maxPowerLocation: [33, 45],
  };
  expect(maxPower).toEqual(expectedPowerAndLocation);

  maxPower = findMaxPower(42, 3);
  expectedPowerAndLocation = {
    maxPower: 30,
    maxPowerLocation: [21, 61],
  };
  expect(maxPower).toEqual(expectedPowerAndLocation);
});

test('findVariableMaxPower() finds location and square size of highest power square', () => {
  let variableMaxPower = findVariableMaxPower(18);
  expect(variableMaxPower).toEqual('90,269,16');

  variableMaxPower = findVariableMaxPower(42);
  expect(variableMaxPower).toEqual('232,251,12');
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
