const {
  processInput,
  processNode,
  processIndexedNode,
} = require('./memoryManeuverUtils');

test('processInput returns an array of integers mapped from an input string', () => {
  const processedInput = processInput('testInput.txt');
  const integerArray = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

  expect(processedInput).toEqual(integerArray);
});

describe('processNode()', () => {
  test('returns the sum of metadata for childless nodes', () => {
    let sum = processNode([0, 1, 99]);
    expect(sum).toBe(99);

    sum = processNode([0, 3, 10, 11, 12]);
    expect(sum).toBe(33);
  });

  test('returns the sum of metadata for all nodes when there are children', () => {
    let sum = processNode([1, 1, 0, 1, 99, 2]);
    expect(sum).toBe(101);

    sum = processNode([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]);
    expect(sum).toBe(138);
  });
});

describe('processIndexedNode()', () => {
  test('sums its metadata when a node has no children', () => {
    let sum = processIndexedNode([0, 1, 99]);
    expect(sum).toBe(99);

    sum = processIndexedNode([0, 3, 10, 11, 12]);
    expect(sum).toBe(33);
  });

  test('sums all indexed children node values when a node has children', () => {
    let sum = processIndexedNode([1, 1, 0, 1, 99, 2]);
    expect(sum).toBe(0);

    sum = processIndexedNode([
      2,
      3,
      0,
      3,
      10,
      11,
      12,
      1,
      1,
      0,
      1,
      99,
      2,
      1,
      1,
      2,
    ]);
    expect(sum).toBe(66);
  });
});
