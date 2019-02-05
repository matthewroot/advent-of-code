const { parseInput, determineOrder, processSteps } = require('./sumPartsUtils');

const steps = parseInput('./input.txt');
const knownSteps = processSteps(steps);

console.log(determineOrder(knownSteps));
