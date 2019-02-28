const {
  processInput,
  calculateNodeValue: processIndexedNode,
} = require('./memoryManeuverUtils');

let tree = processInput('input.txt');
console.log(processIndexedNode(tree));
