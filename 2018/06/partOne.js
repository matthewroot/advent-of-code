const {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
} = require('./chronalCoordUtils');
const createKDTree = require('static-kdtree');

const coordinates = parseInput('./input.txt');
const [xBound, yBound] = getGridBounds(coordinates);
const coordTree = createKDTree(coordinates);
let coordinateAreas = new Map();

// Manhattan distance = absolute difference between two Cartesian points

// For each location, need to know closest location
// Also, need to identify if there is any other location that is equally close
//   Should not need to check locations of greater distance than the first found location

// Goal: find the size of the largest, non-infinite area around a location

// * Parse Input
// * Create object to store coordinate counts { [x,y] -> count }
// * Load points into k-d-tree
// * Determine grid bounds
// * Iterate through each location in the grid
//     * use k-d-tree to identify 2 nearest neighbors
//     * if distance to 2 nearest neighbors is different
//       * if location is on grid boundary, set coordinate value to 'infinite'
//       * else add to count for nearest point (if not in counts object, add it)
// * Iterate through remaining coordinate counts to find the max value, ignore 'infinite'

for (let x = 0; x < xBound; x++) {
  for (let y = 0; y < yBound; y++) {
    let nearestNeighbor = findNearestNeighbor(coordTree, x, y);

    // if nearestNeighbor && !onGridBoundary(x,y)
  }
}

console.log(findMaxArea(filteredCoordCounts));
