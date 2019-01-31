const {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
  findMaxArea,
  isGridBoundary,
} = require('./chronalCoordUtils');
const createKDTree = require('static-kdtree');

let parsedInput;

beforeAll(() => {
  parsedInput = parseInput('./2018/06/testInput.txt');
});

test('parseInput returns an array of x,y coordinates', () => {
  const expectedInput = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];

  expect(parsedInput).toEqual(expectedInput);
});

test('getGridBounds returns the max X and Y values from a set of coordinates', () => {
  const [x, y] = getGridBounds(parsedInput);
  expect(x).toBe(8);
  expect(y).toBe(9);
});

test.skip('find nearest neighbors returns the two closest neighbors to a point', () => {
  const coordTree = createKDTree(parsedInput);
  let [x, y] = [0, 0];
  let nearestNeighbor = findNearestNeighbor(coordTree, x, y);

  expect(nearestNeighbor).toEqual(0);

  [x, y] = [6, 0];
  nearestNeighbor = findNearestNeighbor(coordTree, x, y);
  expect(nearestNeighbor).toBeNull;

  [x, y] = [5, 2];
  nearestNeighbor = findNearestNeighbor(coordTree, x, y);
  expect(nearestNeighbor).toEqual(4);

  [x, y] = [1, 1];
  nearestNeighbor = findNearestNeighbor(coordTree, x, y);
  expect(nearestNeighbor).toEqual(0);

  [x, y] = [0, 9];
  nearestNeighbor = findNearestNeighbor(coordTree, x, y);
  expect(nearestNeighbor).toEqual(1);
});

test('findMaxArea returns the largest, non-infinite area', () => {
  const coordinateAreas = {
    '[1, 1]': 'infinite',
    '[1, 6]': 'infinite',
    '[8, 3]': 'infinite',
    '[3, 4]': 9,
    '[5, 5]': 17,
    '[8, 9]': 'infinite',
  };

  expect(findMaxArea(coordinateAreas)).toBe(17);
});

test('isGridBoundary determines if a point lies on the edge of the grid', () => {
  const xBound = 8;
  const yBound = 9;

  let x = 0;
  let y = 0;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(true);

  x = xBound - 1;
  y = 0;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(true);

  x = 0;
  y = yBound - 1;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(true);

  x = xBound - 1;
  y = yBound - 1;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(true);

  x = 2;
  y = 3;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(false);

  x = xBound - 2;
  y = yBound - 2;
  expect(isGridBoundary(x, y, xBound, yBound)).toBe(false);
});
