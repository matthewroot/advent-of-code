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

  // TODO: fix issue with popping from the end
  // Look at node B which needs to pop 10,11,12 but instead would pop 1,99,2
  for (let index = 0; index < numMetadata; index++) {
    sum += tree.pop();
  }

  if (numChildren > 0) {
    let childCount = numChildren;

    while (childCount > 0) {
      sum += processNode(tree);
      childCount--;
    }
  }

  return sum;
}

module.exports = { processInput, processNode };
