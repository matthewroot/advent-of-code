const fs = require('fs');

const boxIDs = fs.readFileSync('input.txt', { encoding: 'utf8' }).trim().split('\n');

console.log(findFabricBoxes());

function findFabricBoxes() {
  for (let index = 0; index < boxIDs.length; index++) {
    const boxID = boxIDs[index];
    
    for (let compareIndex = index + 1; compareIndex < boxIDs.length; compareIndex++) {
      const compareBoxID = boxIDs[compareIndex];
      let matchingLetters = '';
      
      for (let charIndex = 0; charIndex < boxID.length; charIndex++) {
        const letter = boxID[charIndex];
        
        if (boxID[charIndex] === compareBoxID[charIndex]) {
          matchingLetters += letter;
        }
      }
      
      if (matchingLetters.length === boxID.length -1) {
        return(matchingLetters);
      }
    }
  }
}
