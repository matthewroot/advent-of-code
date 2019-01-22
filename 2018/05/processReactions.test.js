const { processReactions, parseInput } = require('./processReactions');

test.only('processReactions should return the number of units remaining after processing reactions', () => {
  let polymerString = parseInput('./2018/05/testInput.txt');
  let polymerLength = processReactions(polymerString);
  expect(polymerLength).toBe(10);

  polymerString = 'aA';
  polymerLength = processReactions(polymerString);
  expect(polymerLength).toBe(0);

  polymerString = 'abBA';
  polymerLength = processReactions(polymerString);
  expect(polymerLength).toBe(0);

  polymerString = 'abAB';
  polymerLength = processReactions(polymerString);
  expect(polymerLength).toBe(4);

  polymerString = 'aabAAB';
  polymerLength = processReactions(polymerString);
  expect(polymerLength).toBe(6);
});
