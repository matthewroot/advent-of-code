const fs = require('fs');

class Step {
  constructor(value) {
    this.value = value;
    this.nextSteps = [];
    this.prereqs = [];
  }

  addNextStep(step) {
    this.nextSteps.push(step);
    this.nextSteps.sort;
  }

  addPrereqStep(step) {
    this.prereqs.push(step);
  }
}

function parseInput(filepath) {
  let stepMapping = [];

  fs.readFileSync(filepath, { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .forEach(instruction => {
      const splitInstruction = instruction.split(' ');
      const firstStep = splitInstruction[1];
      const secondStep = splitInstruction[7];
      stepMapping.push([firstStep, secondStep]);
    });

  return stepMapping;
}

// Determines the instruction order based on the group of knownSteps and the known firstStep
// Return: [String] Order of instructions
function determineOrder(knownSteps, firstStep) {
  //
}

module.exports = { Step, parseInput, determineOrder };
