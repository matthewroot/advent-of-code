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

module.exports = { parseInput, getGridBounds, findNearestNeighbor };
