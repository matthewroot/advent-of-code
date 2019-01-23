const { parseInput, processReactions } = require('./processReactions');

const polymerString = parseInput('./input.txt');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let minPolymerLength = polymerString.length;

for (const letter of alphabet) {
  const letterRegex = new RegExp(letter, 'gi');
  const filteredPolymerString = polymerString.replace(letterRegex, '');
  const reactedPolymerLength = processReactions(filteredPolymerString);

  if (reactedPolymerLength < minPolymerLength) {
    minPolymerLength = reactedPolymerLength;
  }

  console.log(`${letter}: ${reactedPolymerLength}`);
}

console.log(minPolymerLength);
