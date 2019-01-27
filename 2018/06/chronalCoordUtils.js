const fs = require('fs');

// Sample input line: 135, 127
// Return: array with x,y coordinate objects
function parseInput(filepath) {
  return fs
    .readFileSync(filepath, { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .map(coordinateSet => {
      let [x, y] = coordinateSet.split(', ');
      x = Number(x);
      y = Number(y);
      return { x, y };
    });
}

module.exports = { parseInput };
