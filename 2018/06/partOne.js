const { parseInput } = require('./chronalCoordUtils');

const coordinates = parseInput('./input.txt');

// Manhattan distance = absolute difference between two Cartesian points

// For each location, need to know closest location
// Also, need to identify if there is any other location that is equally close
//   Should not need to check locations of greater distance than the first found location

// Goal: find the size of the largest, non-infinite area around a location
