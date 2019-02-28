const {
  parseInput,
  playMarbleMania,
  determineHighScore,
} = require('./marbleManiaUtils');

const [numPlayers, numMarbles] = parseInput('input.txt');
const playerScores = playMarbleMania(numPlayers, numMarbles);

console.log(determineHighScore(playerScores));
