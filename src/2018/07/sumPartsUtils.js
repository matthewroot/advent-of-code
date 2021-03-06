const fs = require('fs');

class Step {
  constructor(value) {
    this.value = value;
    this.remainingTime = value.charCodeAt(0) - 4;
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

// Creates a mapping of step to its subsequent steps and prerequisite steps
// Return [Object] Maps a step value ('A') to a Step object
function processSteps(steps) {
  let knownSteps = {};

  steps.forEach(step => {
    const [prereqValue, nextValue] = step;
    let prereqStep = knownSteps[prereqValue];
    let nextStep = knownSteps[nextValue];

    if (!prereqStep) {
      prereqStep = new Step(prereqValue);
      knownSteps[prereqValue] = prereqStep;
    }

    if (!nextStep) {
      nextStep = new Step(nextValue);
      knownSteps[nextValue] = nextStep;
    }

    prereqStep.addNextStep(nextStep);
    nextStep.addPrereqStep(prereqStep);
  });

  return knownSteps;
}

// Determines the instruction order based on the group of knownSteps
// Return: [String] Order of instructions
function determineOrder(knownSteps) {
  let availableNextSteps = getInitialSteps(knownSteps);
  let instructionOrder = '';

  while (availableNextSteps.length > 0) {
    let currentStep = knownSteps[availableNextSteps.shift()];

    if (prereqsMet(currentStep, instructionOrder)) {
      instructionOrder = instructionOrder.concat(currentStep.value);

      currentStep.nextSteps.forEach(nextStep => {
        if (!availableNextSteps.includes(nextStep.value)) {
          availableNextSteps.push(nextStep.value);
        }
      });

      availableNextSteps.sort();
    } else {
      availableNextSteps.push(currentStep.value);
    }
  }

  return instructionOrder;
}

// Initial steps will have an empty prereqs array
// Return: array of step values
function getInitialSteps(steps) {
  let initialSteps = [];

  for (const key in steps) {
    if (steps.hasOwnProperty(key)) {
      const step = steps[key];

      if (step.prereqs.length === 0) {
        initialSteps.push(step.value);
      }
    }
  }

  initialSteps.sort();

  return initialSteps;
}

// Prereqs have been met if the prereqs array is empty or all prereqs are part of
// the current instructions string
function prereqsMet(step, instructions) {
  if (step.prereqs.length === 0) {
    return true;
  }

  let completedPrereqs = step.prereqs.filter(prereq =>
    instructions.includes(prereq.value)
  );

  if (completedPrereqs.length === step.prereqs.length) {
    return true;
  }

  return false;
}

// Determines total time to process all steps based on list of known steps
// and a number of workers that can process steps in parallel
// Return: [Number] Number of 'seconds' to process all steps
function parallelizedTime(knownSteps, numWorkers) {
  let elapsedTime = 0;
  let instructionOrder = '';
  let workerQueue = [];
  let availableNextSteps = getInitialSteps(knownSteps);

  while (instructionOrder.length !== Object.keys(knownSteps).length) {
    workerQueue.forEach(step => {
      if (step.remainingTime === 0) {
        instructionOrder = instructionOrder.concat(step.value);

        step.nextSteps.forEach(nextStep => {
          if (!availableNextSteps.includes(nextStep.value)) {
            availableNextSteps.push(nextStep.value);
          }
        });

        availableNextSteps.sort();
      }
    });

    workerQueue = workerQueue.filter(step => step.remainingTime > 0);

    let waitingSteps = [];

    while (workerQueue.length < numWorkers && availableNextSteps.length > 0) {
      let currentStep = knownSteps[availableNextSteps.shift()];

      if (prereqsMet(currentStep, instructionOrder)) {
        workerQueue.push(currentStep);
      } else {
        waitingSteps.push(currentStep.value);
      }
    }

    availableNextSteps = availableNextSteps.concat(waitingSteps);

    workerQueue.forEach(step => {
      step.remainingTime--;
    });

    elapsedTime++;
  }

  return elapsedTime - 1;
}

module.exports = {
  Step,
  parseInput,
  determineOrder,
  processSteps,
  parallelizedTime,
};
