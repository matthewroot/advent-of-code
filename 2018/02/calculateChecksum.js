const fs = require('fs');

const boxIDs = fs.readFileSync('input.txt', {encoding: 'utf8'}).trim().split('\n');

console.log(calculateChecksum());

function calculateChecksum() {
  let twosCount = threesCount = 0;

  // iterate through boxIDs
  for (const id of boxIDs) {
    let letterCounts = countLettersInID(id);

    // if there is a letter with exactly count of two, add to the twos count
    if (checkForCount(letterCounts, 2)) {
      twosCount++;
    }
    
    // if there is a letter with exactly count of three, add to the threes count
    if (checkForCount(letterCounts, 3)) {
      threesCount++;
    }
  }
  
  // multiply the twos count by the threes count to get the checksum, return this value
  return(twosCount * threesCount);
}

function countLettersInID(id) {
  let letters = {};

  for (const char of id) {
    if (letters.hasOwnProperty(char)) {
      letters[char] += 1;
    } else {
      letters[char] = 1;
    }
  }

  return(letters);
}

function checkForCount(letterCounts, count) {
  // check if any letter in the object has the matching count and return true if so
  for (const letter in letterCounts) {
    if (letterCounts.hasOwnProperty(letter)) {
      const currentCount = letterCounts[letter];
      
      if (currentCount === count) {
        return(true);
      }
    }
  }

  return(false);
}
