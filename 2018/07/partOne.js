const { Step, parseInput, determineOrder } = require('./sumPartsUtils');

// Goal: determine order of steps (return string of ordered steps)

// * Parse input into [firstStep, nextStep] (e.g. ['A', 'B'])
// * Keep track of all known steps (Value --> Step object)
// * For each of the steps from input
//    * Check known steps for firstStep and nextStep; get both or create both
//    * If new Steps were created, add them to knownSteps
//    * Add nextStep to firstStep.nextSteps array using firstStep.addNextStep(nextStep)
//    * Add firstStep to nextStep.prereqs array using nextStep.addPrereqStep(firstStep)
//    * Keep track of first node while processing input
//  * Init an array for possible next steps
//  * Init a string instructionOrder
//  * Start at first node found
//    * Add value to instructionOrder
//    * Add all nextSteps to to possible next steps
//    * Sort the possible next steps array
//  * While the next steps array isn't empty
//      * Unshift the first possible next step
//      * If all prereqs have been met (check against instructionOrder)
//        * add Step value to instructionOrder
//        * add all nextSteps from the current Step to the possible next steps array
//        * sort the possible next steps array
//      * Else, add the Step to the end of possible next steps

const steps = parseInput('./input.txt');
// TODO: when the below steps.forEach is moved to a function, change this to const
let knownSteps = {};
let firstStep;

// TODO: move all of this to a function call in sumPartsUtils, return the object
steps.forEach(step => {
  //    * Check known steps for firstStep and nextStep; get both or create both
  //    * If new Steps were created, add them to knownSteps
  //    * Add nextStep to firstStep.nextSteps array using firstStep.addNextStep(nextStep)
  //    * Add firstStep to nextStep.prereqs array using nextStep.addPrereqStep(firstStep)
  //    * Keep track of first node while processing input
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

  // TODO: this logic is wrong, will always result in A being first step
  // Probably something like if prereqStep has no prereqs, that's the new firstStep
  // Should be able to get away with not tracking this and instead just getting all
  // of the Steps with no prereqs as the first group to add to possible next steps
  if (!firstStep || prereqValue < firstStep.value) {
    firstStep = prereqStep;
  }
});

// console.log(determineOrder(knownSteps, firstStep));
console.log(firstStep.value);
console.log(knownSteps);
