const {
  parseInput,
  getGridParameters,
  createPoints,
  updatePointPositions,
  maxPointDistance,
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
  const points = createPoints(processedInput);
  const gridParameters = getGridParameters(points);
  expect(gridParameters.xOffset).toBe(6);
  expect(gridParameters.yOffset).toBe(4);
  expect(gridParameters.xMax).toBe(21);
  expect(gridParameters.yMax).toBe(15);
});

test('createPoints() returns an array of Point objects', () => {
  const points = createPoints(processedInput);
  expect(points).toBeInstanceOf(Array);
  expect(points.length).toBe(processedInput.length);

  const firstPoint = points[0];
  expect(firstPoint.constructor.name).toBe('Point');
  expect(firstPoint.xPosition).toBe(9);
  expect(firstPoint.yPosition).toBe(1);
  expect(firstPoint.xVelocity).toBe(0);
  expect(firstPoint.yVelocity).toBe(2);
});

test('updatePointPositions() changes all point positions by their velocity', () => {
  const points = createPoints(processedInput);
  const updatedPoints = updatePointPositions(points);

  expect(updatedPoints[0].xPosition).toBe(9);
  expect(updatedPoints[0].yPosition).toBe(3);
  expect(updatedPoints[1].xPosition).toBe(6);
  expect(updatedPoints[1].yPosition).toBe(0);
  expect(updatedPoints[2].xPosition).toBe(2);
  expect(updatedPoints[2].yPosition).toBe(-1);
  expect(updatedPoints[3].xPosition).toBe(4);
  expect(updatedPoints[3].yPosition).toBe(9);
});

test('maxPointDistance() determines the difference between the min and max x positions', () => {
  const points = createPoints(processedInput, 6, 4);
  const distance = maxPointDistance(points);

  expect(distance).toBe(21);
});
