const { parseInput, runInfiniteGenerations } = require('./sustainability');

let inputData = parseInput('input.txt');
console.log(runInfiniteGenerations(inputData));
