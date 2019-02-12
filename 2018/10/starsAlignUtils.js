const fs = require('fs');
const path = require('path');

// Point
// positionX, positionY
// velocityX, velocityY
class Point {
  constructor(values) {
    this.xPosition = values[0];
    this.yPosition = values[1];
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
function getGridParameters(points) {
  let gridParameters = {
    xOffset: 0,
    yOffset: 0,
    xMax: 0,
    yMax: 0,
  };

  for (const point of points) {
    if (point.xPosition < gridParameters.xOffset) {
      gridParameters.xOffset = point.xPosition;
    }

    if (point.yPosition < gridParameters.yOffset) {
      gridParameters.yOffset = point.yPosition;
    }

    if (point.xPosition > gridParameters.xMax) {
      gridParameters.xMax = point.xPosition;
    }

    if (point.yPosition > gridParameters.yMax) {
      gridParameters.yMax = point.yPosition;
    }
  }

  gridParameters.xOffset = Math.abs(gridParameters.xOffset);
  gridParameters.yOffset = Math.abs(gridParameters.yOffset);
  gridParameters.xMax += gridParameters.xOffset;
  gridParameters.yMax += gridParameters.yOffset;

  return gridParameters;
}

// Processes raw input arrays into Point objects with appropriate offsets
// input: [Array] Array of arrays storing xPosition, yPosition, xVelocity, yVelocity
// Return: [Array] List of Points
function createPoints(input) {
  return input.map(pointValues => new Point(pointValues));
}

// Updates the positions of all points based on the point's velocity
// Return: [Array] List of points with updated positions
function updatePointPositions(points) {
  return points.map(point => {
    point.xPosition += point.xVelocity;
    point.yPosition += point.yVelocity;
    return point;
  });
}

function maxPointDistance(points) {
  let xMin = points[0].xPosition;
  let xMax = points[0].xPosition;

  for (const point of points) {
    if (point.xPosition < xMin) {
      xMin = point.xPosition;
    }

    if (point.xPosition > xMax) {
      xMax = point.xPosition;
    }
  }

  return Math.abs(xMax - xMin);
}

module.exports = {
  Point,
  parseInput,
  getGridParameters,
  createPoints,
  updatePointPositions,
  maxPointDistance,
};
