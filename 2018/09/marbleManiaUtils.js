const fs = require('fs');
const path = require('path');

class Marble {
  constructor(value) {
    this.value = value;
    this.next;
    this.previous;
  }
}

function parseInput(filename) {
  let input = fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split(' ');
  return [Number(input[0]), Number(input[6])];
}

// Plays a game of marble mania
// Return: [Object] Mapping of player to score
function playMarbleMania(numPlayers, numMarbles) {
  let players = initPlayers(numPlayers);
  let playerScores = initScores(players);
  let firstMarble = initFirstMarble();
  let currentMarble = firstMarble;

  for (let marble = 1; marble < numMarbles; marble++) {
    let currentPlayer = players.shift();
    players.push(currentPlayer);

    if (marble % 23 === 0) {
      playerScores[currentPlayer] += marble;

      for (let index = 0; index < 7; index++) {
        currentMarble = currentMarble.previous;
      }

      playerScores[currentPlayer] += currentMarble.value;
      currentMarble.previous.next = currentMarble.next;
      currentMarble.next.previous = currentMarble.previous;
      currentMarble = currentMarble.next;
    } else {
      let newMarble = new Marble(marble);
      let precedingMarble = currentMarble.next;

      newMarble.next = precedingMarble.next;
      newMarble.previous = precedingMarble;
      precedingMarble.next.previous = newMarble;
      precedingMarble.next = newMarble;
      currentMarble = newMarble;
    }
  }

  return playerScores;
}

function initPlayers(numPlayers) {
  let players = [];

  for (let player = 1; player <= numPlayers; player++) {
    players.push(player);
  }

  return players;
}

function initScores(players) {
  let playerScores = {};

  players.map(player => (playerScores[player] = 0));

  return playerScores;
}

function initFirstMarble() {
  let firstMarble = new Marble(0);
  firstMarble.next = firstMarble;
  firstMarble.previous = firstMarble;

  return firstMarble;
}

// Determines the high score of the game
// Return: [Number] The highest score of all players in the game
function determineHighScore(playerScores) {
  let highScore = 0;

  for (const key in playerScores) {
    if (playerScores.hasOwnProperty(key)) {
      const score = playerScores[key];

      if (score > highScore) {
        highScore = score;
      }
    }
  }

  return highScore;
}

module.exports = { parseInput, playMarbleMania, determineHighScore };
