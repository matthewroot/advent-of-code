const fs = require('fs');
const path = require('path');

// Sample input: '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'
// Return: [Array] Each integer from the input string
function processInput(filename) {
  return fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split(' ')
    .map(value => Number(value));
}

function processNode(tree) {
  let numChildren = tree.shift();
  let numMetadata = tree.shift();
  let sum = 0;

  if (numChildren > 0) {
    while (numChildren > 0) {
      sum += processNode(tree);
      numChildren--;
    }
  }

  for (let index = 0; index < numMetadata; index++) {
    sum += tree.shift();
  }

  return sum;
}

module.exports = { processInput, processNode };
