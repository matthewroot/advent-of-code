const { parseInput, processReactions } = require('./processReactions');

const polymerString = parseInput('./input.txt');
console.log(processReactions(polymerString));
