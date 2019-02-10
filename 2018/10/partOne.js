const { parseInput } = require('./starsAlignUtils');

// Goal: determine message displayed by progressively moving points

// * Parse input
// * Determine offsets by the minimum X and Y values, add the offset to each point
// * Determine size of the grid by max X and Y values
// * Loop indefinitely or until a point gets out of bounds
//    * Draw output
//    * Update positions
//    * Pause for <= 0.5sec after each iteration to be able to see message
const input = parseInput('input.txt');
