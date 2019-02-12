const {
  parseInput,
  getGridParameters,
  createPoints,
  updatePointPositions,
  maxPointDistance,
} = require('./starsAlignUtils');

// Goal: determine message displayed by progressively moving points

// * Parse input
// * Determine offsets by the minimum X and Y values, add the offset to each point
// * Determine size of the grid by max X and Y values
// * Loop indefinitely or until a point gets out of bounds
//    * Draw output
//    * Update positions
//    * Pause for <= 0.5sec after each iteration to be able to see message
const input = parseInput('input.txt');
let points = createPoints(input);
const drawDistance = 100;

while (maxPointDistance(points) > drawDistance) {
  points = updatePointPositions(points);
}

let { xOffset, yOffset, xMax, yMax } = getGridParameters(points);
let grid = new Array(xMax + xOffset);

for (let index = 0; index < grid.length; index++) {
  grid[index] = new Array(yMax + yOffset);
}

while (maxPointDistance(points) < drawDistance) {
  clearGrid(grid);
  renderGrid(points, grid);

  points = updatePointPositions(points);
}

function clearGrid(grid) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      grid[x][y] = ' ';
    }
  }
}

function renderGrid(points, grid) {
  for (const point of points) {
    let x = point.xPosition + xOffset;
    let y = point.yPosition + yOffset;
    if (grid.length > x) {
      if (grid[x].length > y) {
        grid[x][y] = '*';
      }
    }
  }

  for (let x = 0; x < grid.length; x++) {
    let rowString = '';
    for (let y = 0; y < grid[x].length; y++) {
      rowString = rowString.concat(grid[x][y]);
    }

    console.log(rowString);
  }

  console.log('-------------------------------------------');
}
