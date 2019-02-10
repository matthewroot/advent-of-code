const fs = require('fs');
const path = require('path');

// Point
// positionX, positionY
// velocityX, velocityY

function parseInput(filename) {
  return fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .map(line => {
      return line.match(/-*\d+/g).map(value => Number(value));
    });
}

module.exports = { parseInput };
