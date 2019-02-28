const {
  parseInput,
  playMarbleMania,
  determineHighScore,
} = require('./marbleManiaUtils');

test('parseInput() returns the number of players and marbles in an array', () => {
  let [numPlayers, numMarbles] = parseInput('testInput.txt');
  expect(numPlayers).toBe(9);
  expect(numMarbles).toBe(25);
});

test('playMarbleMania() runs the game and returns the score for each player', () => {
  const playerScores = playMarbleMania(9, 25);
  const expectedScores = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 32,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  expect(playerScores).toEqual(expectedScores);
});

test('determineHighScore() finds the highest score out of all players', () => {
  let scoreMapping = {
    1: 0,
    3: 10,
    4: 25,
  };

  expect(determineHighScore(scoreMapping)).toBe(25);

  scoreMapping = {
    1: 50,
    3: 10,
    4: 25,
  };

  expect(determineHighScore(scoreMapping)).toBe(50);

  scoreMapping = {
    1: 50,
    3: 100,
    4: 25,
  };

  expect(determineHighScore(scoreMapping)).toBe(100);
});
