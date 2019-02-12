const fs = require('fs');
const path = require('path');

// Point
// positionX, positionY
// velocityX, velocityY
class Point {
  constructor(values, xOffset, yOffset) {
    this.xPosition = values[0] + xOffset;
    this.yPosition = values[1] + yOffset;
    this.xVelocity = values[2];
    this.yVelocity = values[3];
  }
}

// Sample Input line:
// position=< 9,  1> velocity=< 0,  2>
// Return [Array] List of arrays each containing four Numbers defining point
// positions and velocities
function parseInput(filename) {
  return fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .map(line => {
      return line.match(/-*\d+/g).map(value => Number(value));
    });
}

// Processes the list of point definitions to determine the required X and Y offset
// as well as the size of the grid
// Return [Object] Value of xOffset, yOffset, xMax, and yMax
function getGridParameters(input) {
  let gridParameters = {
    xOffset: 0,
    yOffset: 0,
    xMax: 0,
    yMax: 0,
  };

  input.forEach(inputValues => {
    if (inputValues[0] < gridParameters.xOffset) {
      gridParameters.xOffset = inputValues[0];
    }

    if (inputValues[1] < gridParameters.yOffset) {
      gridParameters.yOffset = inputValues[1];
    }

    if (inputValues[0] > gridParameters.xMax) {
      gridParameters.xMax = inputValues[0];
    }

    if (inputValues[1] > gridParameters.yMax) {
      gridParameters.yMax = inputValues[1];
    }
  });

  gridParameters.xOffset = Math.abs(gridParameters.xOffset);
  gridParameters.yOffset = Math.abs(gridParameters.yOffset);
  gridParameters.xMax += gridParameters.xOffset;
  gridParameters.yMax += gridParameters.yOffset;

  return gridParameters;
}

// Processes raw input arrays into Point objects with appropriate offsets
// input: [Array] Array of arrays storing xPosition, yPosition, xVelocity, yVelocity
// xOffset: [Number] Value to adjust given xPosition by
// yOffset: [Number] Value to adjust given yPosition by
// Return: [Array] List of Points
function createPoints(input, xOffset, yOffset) {
  return input.map(pointValues => new Point(pointValues, xOffset, yOffset));
}

// Checks if the list of points are still within the maximum boundaries of the grid
// Return: [Boolean]
function allPointsWithinBounds(points, grid) {
  for (const point of points) {
    if (
      point.xPosition < 0 ||
      point.yPosition < 0 ||
      point.xPosition >= grid.length ||
      point.yPosition >= grid[0].length
    ) {
      return false;
    }
  }

  return true;
}

module.exports = {
  Point,
  parseInput,
  getGridParameters,
  createPoints,
  allPointsWithinBounds,
};
