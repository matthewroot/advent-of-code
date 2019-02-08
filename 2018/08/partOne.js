const { processInput, processNode } = require('./memoryManeuverUtils');

// Goal: calculate the sum of all metadata entries

// * Parse input into an array of integers
// * init sum to 0
// * Process node (called on remaining array)
//   * Remove the first two numbers from the node (# children, # metadata)
//      * If remaining children === 0
//        * remove the node's metadata and sum
//        * return the sum
//      * While remaining children > 0
//        * Call process child node on entire remaining array
//        * add returned sum to total sum
//        * decrement remaining children
// * Output sum

let tree = processInput('input.txt');
let sum = 0;

sum = processNode(tree);

console.log(sum);
