const fs = require('fs');

// Sample input line: 135, 127
// Return: array with x,y coordinate objects
function parseInput(filepath) {
  return fs
    .readFileSync(filepath, { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .map(coordinateSet => {
      let [x, y] = coordinateSet.split(', ');
      return [Number(x), Number(y)];
    });
}

// Determines the highest X and Y value from the coordinates
// Input: array of [x,y] coordinates
// Return: array with max X and Y values
function getGridBounds(coordinates) {
  let xBound = 0;
  let yBound = 0;

  coordinates.forEach(coordinate => {
    if (coordinate[0] > xBound) {
      xBound = coordinate[0];
    }

    if (coordinate[1] > yBound) {
      yBound = coordinate[1];
    }
  });

  return [xBound, yBound];
}

// Returns coordinates for nearest neighbor or null if two coordinates
// are equally close
function findNearestNeighbor(coordinatesMap, x, y) {
  let nearestNeighbor;
  let minDistance;
  let multipleNearest = false;

  for (const coordinates in coordinatesMap) {
    if (coordinatesMap.hasOwnProperty(coordinates)) {
      if (coordinates === JSON.stringify([x, y])) {
        return coordinates;
      }

      let distance = manhattanDistance(coordinates, x, y);

      if (!minDistance) {
        minDistance = distance;
        nearestNeighbor = coordinates;
        continue;
      }

      if (distance === minDistance) {
        multipleNearest = true;
      }

      if (distance < minDistance) {
        minDistance = distance;
        nearestNeighbor = coordinates;
        multipleNearest = false;
      }
    }
  }

  return multipleNearest ? null : nearestNeighbor;
}

function findMaxArea(coordinateAreas) {
  let maxArea = 0;

  for (const coordinates in coordinateAreas) {
    if (coordinateAreas.hasOwnProperty(coordinates)) {
      const area = coordinateAreas[coordinates];

      if (area === 'infinite') {
        continue;
      }

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}

// Returns true if the given x,y pair lies on the boundary of the grid
function isGridBoundary(x, y, xBound, yBound) {
  if (x === 0 || y === 0 || x === xBound - 1 || y === yBound - 1) {
    return true;
  }

  return false;
}

function buildAreasMap(coordinatesArray) {
  let areaMap = {};

  coordinatesArray.forEach(coordinates => {
    let stringCoordinates = JSON.stringify(coordinates);
    areaMap[stringCoordinates] = 0;
  });

  return areaMap;
}

// point: JSON string representation of a coordinate point "[1,2]"
function manhattanDistance(point, x, y) {
  let [pointX, pointY] = JSON.parse(point);

  return Math.abs(x - pointX) + Math.abs(y - pointY);
}

function totalManhattanDistance(coordinates, x, y) {
  let sumDistance = 0;

  coordinates.forEach(coordinate => {
    sumDistance += manhattanDistance(JSON.stringify(coordinate), x, y);
  });

  return sumDistance;
}

module.exports = {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
  findMaxArea,
  isGridBoundary,
  buildAreasMap,
  totalManhattanDistance,
};
