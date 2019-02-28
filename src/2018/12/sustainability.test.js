const {
  parseInput,
  initPots,
  initRulesMap,
  sumOfPlantLocations,
  runGenerations,
} = require('./sustainability');

test('parseInput() returns an array with each line from input', () => {
  const input = parseInput('testInput.txt');
  const expectedArray = [
    'initial state: #..#.#..##......###...###',
    '',
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #',
  ];

  expect(input).toEqual(expectedArray);
});

test('initPots() parses initial state string and returns and array of pot objects', () => {
  const initialStateString = 'initial state: #..#.#..##......###...###';
  const potsArray = initPots(initialStateString);

  expect(potsArray.length).toBe(31);
  expect(potsArray[0].constructor.name).toBe('Pot');
  expect(potsArray[0].contents).toBe('.');
  expect(potsArray[0].location).toBe(-3);
  expect(potsArray[3].contents).toBe('#');
  expect(potsArray[3].location).toBe(0);
  expect(potsArray[27].contents).toBe('#');
  expect(potsArray[27].location).toBe(24);
  expect(potsArray[30].contents).toBe('.');
  expect(potsArray[30].location).toBe(27);
});

test('initRulesMap() process array of rule strings and returns a mapping of rule to next state', () => {
  const rulesArray = [
    '',
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #',
  ];
  const rulesMap = initRulesMap(rulesArray);
  expect(Object.keys(rulesMap).length).toBe(14);
  expect(rulesMap['##.#.']).toBe('#');
});

test('sumOfPlantLocations() adds the value of all plant locations', () => {
  const initialStateString = 'initial state: #..#.#..##......###...###';
  const potsArray = initPots(initialStateString);
  expect(sumOfPlantLocations(potsArray)).toBe(145);
});

test('runGenerations() sums plant locations after running all generations', () => {
  const input = parseInput('testInput.txt');
  const sum = runGenerations(input);
  expect(sum).toBe(325);
});
