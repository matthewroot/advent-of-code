const { parseInput } = require('./marbleManiaUtils');

test('parseInput returns the number of players and marbles in an array', () => {
  let [numPlayers, numMarbles] = parseInput('testInput.txt');
  expect(numPlayers).toBe(9);
  expect(numMarbles).toBe(25);
});

// Example games:
// 10 players; last marble is worth 1618 points, high score 8317
// 13 players; last marble is worth 7999 points, high score 146373
// 17 players; last marble is worth 1104 points, high score 2764
// 21 players; last marble is worth 6111 points, high score 54718
// 30 players; last marble is worth 5807 points, high score 37305
