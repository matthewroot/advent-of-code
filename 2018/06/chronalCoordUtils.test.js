const { parseInput } = require('./chronalCoordUtils');

test('parseInput should return an array of x,y coordinates', () => {
  const parsedInput = parseInput('./2018/06/testInput.txt');
  const expectedInput = [
    { x: 1, y: 1 },
    { x: 1, y: 6 },
    { x: 8, y: 3 },
    { x: 3, y: 4 },
    { x: 5, y: 5 },
    { x: 8, y: 9 },
  ];

  expect(parsedInput).toEqual(expectedInput);
});
