const {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
  findMaxArea,
  isGridBoundary,
  buildAreasMap,
} = require('./chronalCoordUtils');

const coordinates = parseInput('./input.txt');
const [xBound, yBound] = getGridBounds(coordinates);
let coordinateAreas = buildAreasMap(coordinates);

for (let x = 0; x < xBound; x++) {
  for (let y = 0; y < yBound; y++) {
    let nearestNeighbor = findNearestNeighbor(coordinateAreas, x, y);

    if (nearestNeighbor) {
      if (
        !isGridBoundary(x, y) &&
        coordinateAreas[nearestNeighbor] !== 'infinite'
      ) {
        coordinateAreas[nearestNeighbor]++;
      }
      if (isGridBoundary(x, y)) {
        coordinateAreas[nearestNeighbor] = 'infinite';
      }
    }
  }
}

console.log(findMaxArea(coordinateAreas));
