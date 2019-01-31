const fs = require('fs');
const createKDTree = require('static-kdtree');

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

function findNearestNeighbor(coordinates, x, y) {
  // TODO: use something other static-kdtree, it does Euclidean distance
  return coordTree.knn([x, y], 2);
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

module.exports = {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
  findMaxArea,
  isGridBoundary,
};
