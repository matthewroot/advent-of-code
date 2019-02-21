const { parseInput } = require('./sustainability');
// Goal: determine sum of the numbers of pots containing a plant after 20 generations

// * Parse input
//    * Initial state into an array to hold the pots
//    * Add three empty pots to the left of position zero
//    * Rest of file are rules into a rulesMap
// * Loop for 20 generations
//    * Copy the current array of pots to create a future array of pots
//    * Iterate through the current array of pots
//        * Get the chunk that includes current pot, two before, and two after
//          (if there aren't two to the left, add two empty pots)
//        * Find the chunk in the rulesMap, set future array of pots state with value
//    * Some rule about adding empty pots, if three empty at the start don't add?
// * Find the location of each pot and sum these values
let inputData = parseInput('input.txt');
let potsArray = initPots(inputData.shift());
let rulesMap = initRulesMap(inputData);

for (let generation = 0; generation < 20; generation++) {
  let nextPotsArray = potsArray;

  for (const pot of potsArray) {
    // get a pot chunk
    // lookup the pot chunk in rules map, set nextPotsArray value to rulesMap value
  }

  // add empty pots if necessary
  potsArray = nextPotsArray;
}

console.log(sumOfPlantLocations(potsArray));
