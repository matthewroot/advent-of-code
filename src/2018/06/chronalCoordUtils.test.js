const {
  parseInput,
  getGridBounds,
  findNearestNeighbor,
  findMaxArea,
  isGridBoundary,
  buildAreasMap,
  totalManhattanDistance,
} = require('./chronalCoordUtils');

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

describe('findNearestNeighbor', () => {
  let coordinatesMap;

  beforeAll(() => {
    coordinatesMap = {
      '[1,1]': 0,
      '[1,6]': 0,
      '[8,3]': 0,
      '[3,4]': 0,
      '[5,5]': 0,
      '[8,9]': 0,
    };
  });

  test('should return the closest coordinate to a point', () => {
    let [x, y] = [0, 0];
    let nearestNeighbor = findNearestNeighbor(coordinatesMap, x, y);
    expect(nearestNeighbor).toEqual('[1,1]');

    [x, y] = [5, 2];
    nearestNeighbor = findNearestNeighbor(coordinatesMap, x, y);
    expect(nearestNeighbor).toEqual('[5,5]');

    [x, y] = [1, 1];
    nearestNeighbor = findNearestNeighbor(coordinatesMap, x, y);
    expect(nearestNeighbor).toEqual('[1,1]');

    [x, y] = [0, 9];
    nearestNeighbor = findNearestNeighbor(coordinatesMap, x, y);
    expect(nearestNeighbor).toEqual('[1,6]');
  });

  test('should return null when 2 or more coordinates are closest to a point', () => {
    let [x, y] = [5, 0];
    let nearestNeighbor = findNearestNeighbor(coordinatesMap, x, y);
    expect(nearestNeighbor).toBeNull();
  });
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

test('buildAreasMap constructs a mapping of coordinate to area size', () => {
  const expectedMap = {
    '[1,1]': 0,
    '[1,6]': 0,
    '[8,3]': 0,
    '[3,4]': 0,
    '[5,5]': 0,
    '[8,9]': 0,
  };

  expect(buildAreasMap(parsedInput)).toEqual(expectedMap);
});

test('totalManhattanDistance calculates the sum of manhattan distances from a given point', () => {
  let calculatedTotal = totalManhattanDistance(parsedInput, 4, 3);
  expect(calculatedTotal).toBe(30);

  calculatedTotal = totalManhattanDistance(parsedInput, 3, 4);
  expect(calculatedTotal).toBe(28);
});
