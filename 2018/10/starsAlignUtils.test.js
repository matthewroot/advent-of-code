const {
  parseInput,
  getGridParameters,
  createPoints,
  allPointsWithinBounds,
} = require('./starsAlignUtils');

const processedInput = [
  [9, 1, 0, 2],
  [7, 0, -1, 0],
  [3, -2, -1, 1],
  [6, 10, -2, -1],
  [2, -4, 2, 2],
  [-6, 10, 2, -2],
  [1, 8, 1, -1],
  [1, 7, 1, 0],
  [-3, 11, 1, -2],
  [7, 6, -1, -1],
  [-2, 3, 1, 0],
  [-4, 3, 2, 0],
  [10, -3, -1, 1],
  [5, 11, 1, -2],
  [4, 7, 0, -1],
  [8, -2, 0, 1],
  [15, 0, -2, 0],
  [1, 6, 1, 0],
  [8, 9, 0, -1],
  [3, 3, -1, 1],
  [0, 5, 0, -1],
  [-2, 2, 2, 0],
  [5, -2, 1, 2],
  [1, 4, 2, 1],
  [-2, 7, 2, -2],
  [3, 6, -1, -1],
  [5, 0, 1, 0],
  [-6, 0, 2, 0],
  [5, 9, 1, -2],
  [14, 7, -2, 0],
  [-3, 6, 2, -1],
];

test('parseInput() processes input into an array of arrys with position and velocity', () => {
  const input = parseInput('testInput.txt');
  expect(input).toEqual(processedInput);
});

test('getGridParameters() returns an object with grid offsets and grid size', () => {
  const gridParameters = getGridParameters(processedInput);
  expect(gridParameters.xOffset).toBe(6);
  expect(gridParameters.yOffset).toBe(4);
  expect(gridParameters.xMax).toBe(21);
  expect(gridParameters.yMax).toBe(15);
});

test('createPoints() returns an array of Point objects', () => {
  const points = createPoints(processedInput, 6, 4);
  expect(points).toBeInstanceOf(Array);
  expect(points.length).toBe(processedInput.length);

  const firstPoint = points[0];
  expect(firstPoint.constructor.name).toBe('Point');
  expect(firstPoint.xPosition).toBe(15);
  expect(firstPoint.yPosition).toBe(5);
  expect(firstPoint.xVelocity).toBe(0);
  expect(firstPoint.yVelocity).toBe(2);
});

test('allPointWithinBounds() checks that each point lies within grid boundaries', () => {
  const points = createPoints(processedInput, 6, 4);
  const grid = new Array(22);

  for (let index = 0; index < grid.length; index++) {
    grid[index] = new Array(16);
  }

  expect(allPointsWithinBounds(points, grid)).toBe(true);

  points[0].xPosition = -1;
  expect(allPointsWithinBounds(points, grid)).toBe(false);

  points[0].xPosition = 21;
  expect(allPointsWithinBounds(points, grid)).toBe(true);

  points[0].yPosition = -1;
  expect(allPointsWithinBounds(points, grid)).toBe(false);

  points[0].yPosition = 15;
  expect(allPointsWithinBounds(points, grid)).toBe(true);

  points[0].xPosition = 22;
  expect(allPointsWithinBounds(points, grid)).toBe(false);

  points[0].xPosition = 10;
  points[0].yPosition = 16;
  expect(allPointsWithinBounds(points, grid)).toBe(false);
});
