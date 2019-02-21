const {
  parseInput,
  initPots,
  initRulesMap,
  sumOfPlantLocations,
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

  expect(potsArray.length).toBe(28);
  expect(potsArray[0].constructor.name).toBe('Pot');
  expect(potsArray[0].contents).toBe('.');
  expect(potsArray[0].location).toBe(-3);
  expect(potsArray[3].contents).toBe('#');
  expect(potsArray[3].location).toBe(0);
  expect(potsArray[27].contents).toBe('#');
  expect(potsArray[27].location).toBe(24);
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

test.skip('sumOfPlantLocations() adds the value of all plant locations', () => {
  const potsArray = Array.from('.#....##....#####...#######....#.#..##.');
  expect(sumOfPlantLocations(potsArray)).toBe(325);
});
