const { parseInput, determineOrder } = require('./sumPartsUtils');

test('parseInput outputs an array of step mapping arrays', () => {
  const parsedInput = parseInput('./2018/07/testInput.txt');
  const stepMapping = [
    ['C', 'A'],
    ['C', 'F'],
    ['A', 'B'],
    ['A', 'D'],
    ['B', 'E'],
    ['D', 'E'],
    ['F', 'E'],
  ];

  expect(parsedInput).toEqual(stepMapping);
});

test('determineOrder returns the ordered set of instructions in a string', () => {
  //
});
