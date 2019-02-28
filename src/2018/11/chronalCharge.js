const GRID_SIZE = 300;

function locateMaxPower(fuelGrid, squareSize) {
  let maxPower = 0;
  let maxPowerLocation;

  for (let x = 0; x < fuelGrid.length - squareSize; x++) {
    for (let y = 0; y < fuelGrid.length - squareSize; y++) {
      const squarePower = calculateSquarePower(fuelGrid, squareSize, x, y);

      if (squarePower > maxPower) {
        maxPower = squarePower;
        maxPowerLocation = [x + 1, y + 1];
      }
    }
  }

  return { maxPowerLocation, maxPower };
}

function findMaxPower(serialNumber, squareSize) {
  const fuelGrid = createFuelGrid(serialNumber);

  return locateMaxPower(fuelGrid, squareSize);
}

function findVariableMaxPower(serialNumber) {
  let variableMaxPower = 0;
  let variableMaxPowerLocation;
  const fuelGrid = createFuelGrid(serialNumber);

  for (let squareSize = 1; squareSize < 301; squareSize++) {
    let { maxPowerLocation, maxPower } = locateMaxPower(fuelGrid, squareSize);

    if (maxPower > variableMaxPower) {
      variableMaxPower = maxPower;
      variableMaxPowerLocation = maxPowerLocation
        .join(',')
        .concat(`,${squareSize}`);
    }
  }

  return variableMaxPowerLocation;
}

function createFuelGrid(serialNumber) {
  const fuelGrid = Array.from(new Array(GRID_SIZE), () => new Array(GRID_SIZE));

  for (let x = 0; x < fuelGrid.length; x++) {
    for (let y = 0; y < fuelGrid.length; y++) {
      fuelGrid[x][y] = calculateFuelCellPower(serialNumber, x + 1, y + 1);
    }
  }

  return fuelGrid;
}

function calculateFuelCellPower(serialNumber, x, y) {
  let rackID = x + 10;
  let power = rackID * y;
  power += serialNumber;
  power *= rackID;
  power = Math.floor(power / 100) % 10;
  power -= 5;

  return power;
}

function calculateSquarePower(grid, squareSize, xCoord, yCoord) {
  let squarePower = 0;

  for (let x = xCoord; x < xCoord + squareSize; x++) {
    for (let y = yCoord; y < yCoord + squareSize; y++) {
      squarePower += grid[x][y];
    }
  }

  return squarePower;
}

module.exports = {
  findMaxPower,
  findVariableMaxPower,
  calculateFuelCellPower,
};
