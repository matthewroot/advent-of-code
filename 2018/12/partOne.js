const { parseInput, runGenerations } = require('./sustainability');

let inputData = parseInput('input.txt');
console.log(runGenerations(inputData));
