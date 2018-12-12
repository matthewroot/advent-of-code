const fs = require('fs');

const frequencies = fs.readFileSync('input.txt', {encoding: 'utf8'}).trim().split("\n").map(Number);

let currentFrequency = 0;
let seenFrequencies = new Set();
let foundDuplicate = false

while (!foundDuplicate) {
  foundDuplicate = adjustFrequency();

  if (foundDuplicate) {
    console.log(foundDuplicate);
  }
}

function adjustFrequency() {
  for (const frequency of frequencies) {
    currentFrequency += frequency;
  
    if (seenFrequencies.has(currentFrequency)) {
      foundDuplicate = true;
      return(currentFrequency);
    } else {
      seenFrequencies.add(currentFrequency);
    }
  }
}
