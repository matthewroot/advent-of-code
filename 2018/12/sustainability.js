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
    rulesMap[rule] = value;
  });

  return rulesMap;
}

function getPotsGroup(potsArray, potIndex) {
  //
}

function sumOfPlantLocations(potsArray) {
  //
}

module.exports = {
  parseInput,
  initPots,
  initRulesMap,
  getPotsGroup,
  sumOfPlantLocations,
};
