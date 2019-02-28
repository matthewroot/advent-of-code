const { processInput, processNode } = require('./memoryManeuverUtils');

let tree = processInput('input.txt');
let sum = 0;

sum = processNode(tree);

console.log(sum);
