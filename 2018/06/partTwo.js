const {
  parseInput,
  getGridBounds,
  totalManhattanDistance,
} = require('./chronalCoordUtils');

const coordinates = parseInput('./input.txt');
const [xBound, yBound] = getGridBounds(coordinates);
let regionSize = 0;

for (let x = 0; x < xBound; x++) {
  for (let y = 0; y < yBound; y++) {
    if (totalManhattanDistance(coordinates, x, y) < 10000) {
      regionSize++;
    }
  }
}

console.log(regionSize);
