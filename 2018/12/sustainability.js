const fs = require('fs');
const path = require('path');

class Pot {
  constructor(value, location) {
    this.contents = value;
    this.location = location;
  }
}

function parseInput(filename) {
  return fs
    .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
    .trim()
    .split('\n');
}

function initPots(initialStateString) {
  const plantsString = initialStateString.slice(
    initialStateString.indexOf(':') + 2
  );

  let potsArray = Array.from(plantsString).map((value, index) => {
    return new Pot(value, index);
  });

  let lastPotLocation = potsArray[potsArray.length - 1].location;

  for (let index = 1; index < 4; index++) {
    potsArray.push(new Pot('.', lastPotLocation + index));
  }

  for (let index = -1; index > -4; index--) {
    potsArray.unshift(new Pot('.', index));
  }

  return potsArray;
}

function initRulesMap(inputData) {
  let rulesMap = {};

  inputData.shift();
  inputData.forEach(ruleString => {
    let [rule, value] = ruleString.split(' => ');
    if (value === '#') {
      rulesMap[rule] = value;
    }
  });

  return rulesMap;
}

function sumOfPlantLocations(potsArray) {
  let sum = 0;

  potsArray.forEach(pot => {
    if (pot.contents === '#') {
      sum += pot.location;
    }
  });

  return sum;
}

function runInfiniteGenerations(inputData) {
  let potsArray = initPots(inputData.shift());
  let rulesMap = initRulesMap(inputData);
  let generation = 0;

  while (true) {
    let nextPotsArray = JSON.parse(JSON.stringify(potsArray));

    for (index = 2; index < potsArray.length - 2; index++) {
      let pots = potsArray
        .slice(index - 2, index + 3)
        .map(p => p.contents)
        .join('');

      nextPotsArray[index].contents = rulesMap.hasOwnProperty(pots) ? '#' : '.';
    }

    nextPotsArray = bufferPots(nextPotsArray);
    potsArray = JSON.parse(JSON.stringify(nextPotsArray));

    // This is a quick dirty hack to note what difference of sum the system
    // settles into after time. Could do something more sophisticated where
    // each generation calculates the difference in sum, notes when that has
    // remained the same for a number of generations and then do the calculation
    generation++;
    const currentSum = sumOfPlantLocations(potsArray);
    console.log(
      `${generation}: ${potsArray
        .map(p => p.contents)
        .join('')} | ${currentSum}`
    );
  }

  return sumOfPlantLocations(potsArray);
}

function runGenerations(inputData, numberOfGenerations) {
  let potsArray = initPots(inputData.shift());
  let rulesMap = initRulesMap(inputData);

  for (let generation = 0; generation < numberOfGenerations; generation++) {
    let nextPotsArray = JSON.parse(JSON.stringify(potsArray));

    for (index = 2; index < potsArray.length - 2; index++) {
      let pots = potsArray
        .slice(index - 2, index + 3)
        .map(p => p.contents)
        .join('');

      nextPotsArray[index].contents = rulesMap.hasOwnProperty(pots) ? '#' : '.';
    }

    nextPotsArray = bufferPots(nextPotsArray);
    potsArray = JSON.parse(JSON.stringify(nextPotsArray));
  }

  return sumOfPlantLocations(potsArray);
}

function bufferPots(nextPotsArray) {
  if (
    nextPotsArray[0].contents === '#' ||
    nextPotsArray[1].contents === '#' ||
    nextPotsArray[2].contents === '#'
  ) {
    nextPotsArray.unshift(new Pot('.', nextPotsArray[0].location - 1));
    nextPotsArray.unshift(new Pot('.', nextPotsArray[0].location - 1));
    nextPotsArray.unshift(new Pot('.', nextPotsArray[0].location - 1));
  }

  if (
    nextPotsArray[nextPotsArray.length - 1].contents === '#' ||
    nextPotsArray[nextPotsArray.length - 2].contents === '#' ||
    nextPotsArray[nextPotsArray.length - 3].contents === '#'
  ) {
    nextPotsArray.push(
      new Pot('.', nextPotsArray[nextPotsArray.length - 1].location + 1)
    );

    nextPotsArray.push(
      new Pot('.', nextPotsArray[nextPotsArray.length - 1].location + 1)
    );

    nextPotsArray.push(
      new Pot('.', nextPotsArray[nextPotsArray.length - 1].location + 1)
    );
  }

  return nextPotsArray;
}

module.exports = {
  parseInput,
  initPots,
  initRulesMap,
  sumOfPlantLocations,
  runGenerations,
  runInfiniteGenerations,
};
