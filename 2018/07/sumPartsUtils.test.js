const {
  Step,
  parseInput,
  determineOrder,
  processSteps,
} = require('./sumPartsUtils');

let parsedInput;

beforeAll(() => {
  parsedInput = parseInput('./2018/07/testInput.txt');
});

test('parseInput outputs an array of step mapping arrays', () => {
  const stepMapping = [
    ['C', 'A'],
    ['C', 'F'],
    ['A', 'B'],
    ['A', 'D'],
    ['B', 'E'],
    ['D', 'E'],
    ['F', 'E'],
  ];

  expect(parsedInput).toEqual(stepMapping);
});

test('processSteps returns an object mapping step value to next steps and prereqs', () => {
  const processedSteps = processSteps(parsedInput);
  const stepMapping = createStepMapping();

  expect(processedSteps).toEqual(stepMapping);
});

test('determineOrder returns the ordered set of instructions in a string', () => {
  const stepMapping = createStepMapping();
  const order = determineOrder(stepMapping);

  expect(order).toBe('CABDFE');
});

function createStepMapping() {
  let stepA = new Step('A');
  let stepB = new Step('B');
  let stepC = new Step('C');
  let stepD = new Step('D');
  let stepE = new Step('E');
  let stepF = new Step('F');

  stepA.addNextStep(stepB);
  stepA.addNextStep(stepD);
  stepA.addPrereqStep(stepC);

  stepB.addNextStep(stepE);
  stepB.addPrereqStep(stepA);

  stepC.addNextStep(stepA);
  stepC.addNextStep(stepF);

  stepD.addNextStep(stepE);
  stepD.addPrereqStep(stepA);

  stepE.addPrereqStep(stepB);
  stepE.addPrereqStep(stepD);
  stepE.addPrereqStep(stepF);

  stepF.addNextStep(stepE);
  stepF.addPrereqStep(stepC);

  return {
    A: stepA,
    B: stepB,
    C: stepC,
    D: stepD,
    E: stepE,
    F: stepF,
  };
}
