const {
  parseInput,
  processSteps,
  parallelizedTime,
} = require('./sumPartsUtils');

const steps = parseInput('./input.txt');
const knownSteps = processSteps(steps);

console.log(parallelizedTime(knownSteps, 5));
