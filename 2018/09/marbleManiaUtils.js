const fs = require('fs');
const path = require('path');

function parseInput(filename) {
  let input = fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split(' ');
  return [Number(input[0]), Number(input[6])];
}

module.exports = { parseInput };
