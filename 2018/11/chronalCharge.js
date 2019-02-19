const GRID_SIZE = 300;
const SQUARE_SIZE = 3;

function findMaxPower(serialNumber) {
  const fuelGrid = Array.from(new Array(GRID_SIZE), () => new Array(GRID_SIZE));

  for (let x = 0; x < fuelGrid.length; x++) {
    for (let y = 0; y < fuelGrid.length; y++) {
      fuelGrid[x][y] = calculateFuelCellPower(serialNumber, x + 1, y + 1);
    }
  }

  let maxPower = 0;
  let maxPowerLocation;

  for (let x = 0; x < fuelGrid.length - SQUARE_SIZE; x++) {
    for (let y = 0; y < fuelGrid.length - SQUARE_SIZE; y++) {
      const squarePower = calculateSquarePower(fuelGrid, x, y);

      if (squarePower > maxPower) {
        maxPower = squarePower;
        maxPowerLocation = [x + 1, y + 1];
      }
    }
  }

  return maxPowerLocation.join(',');
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

function calculateSquarePower(grid, xCoord, yCoord) {
  let squarePower = 0;

  for (let x = xCoord; x < xCoord + SQUARE_SIZE; x++) {
    for (let y = yCoord; y < yCoord + SQUARE_SIZE; y++) {
      squarePower += grid[x][y];
    }
  }

  return squarePower;
}

module.exports = {
  findMaxPower,
  calculateFuelCellPower,
};
