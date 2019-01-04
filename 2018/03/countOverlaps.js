const fs = require('fs');

const claims = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split('\n');

let processedClaims = {};
let overlapCounter = 0;

for (const claim of claims) {
  // Format of each string is '#73 @ 167,253: 10x25'
  // Need to pick out the coordinates and size values
  const claimValues = claim.split(' ').slice(2);
  const xStart = Number(claimValues[0].slice(0, claimValues[0].indexOf(',')));
  const yStart = Number(claimValues[0].slice(claimValues[0].indexOf(',') + 1, claimValues[0].indexOf(':')));
  const xMax = xStart + Number(claimValues[1].slice(0, claimValues[1].indexOf('x')));
  const yMax = yStart + Number(claimValues[1].slice(claimValues[1].indexOf('x') + 1));

  for(let x = xStart; x < xMax; x++) {
    for(let y = yStart; y < yMax; y++) {
      const coordinates = [x, y].toString();

      if (processedClaims[coordinates]) {
        if (processedClaims[coordinates] === 1) {
          overlapCounter++;
          processedClaims[coordinates] = 'X';
        }
      } else {
        processedClaims[coordinates] = 1;
      }
    }
  }
}

console.log(overlapCounter);
