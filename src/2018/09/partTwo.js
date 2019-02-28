const {
  parseInput,
  playMarbleMania,
  determineHighScore,
} = require('./marbleManiaUtils');

const [numPlayers, numMarbles] = parseInput('input.txt');
const playerScores = playMarbleMania(numPlayers, numMarbles * 100);

console.log(determineHighScore(playerScores));
