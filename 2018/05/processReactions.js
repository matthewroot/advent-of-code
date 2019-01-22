const fs = require('fs');

function processReactions(polymerString) {
  let polymerStack = [];

  for (const letter of polymerString) {
    if (polymerStack.length === 0) {
      polymerStack.push(letter);
      continue;
    }

    const compareLetter = polymerStack.pop();

    if (
      letter === compareLetter ||
      (letter !== compareLetter.toUpperCase() &&
        letter !== compareLetter.toLowerCase())
    ) {
      polymerStack.push(compareLetter);
      polymerStack.push(letter);
    }
  }

  return polymerStack.length;
}

function parseInput(filepath) {
  return fs.readFileSync(filepath, { encoding: 'utf-8' }).trim();
}

module.exports = {
  processReactions,
  parseInput,
};
