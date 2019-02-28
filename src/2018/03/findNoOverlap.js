const fs = require('fs');

const claims = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split('\n');

let processedClaims = {};
let claimsWithoutOverlap = new Set();

for (const claim of claims) {
  // Format of each string is '#73 @ 167,253: 10x25'
  // Need to pick out the claim number, coordinates and size values
  const claimValues = claim.split(' ');
  const claimNumber = claimValues[0].slice(1);
  const xStart = Number(claimValues[2].slice(0, claimValues[2].indexOf(',')));
  const yStart = Number(claimValues[2].slice(claimValues[2].indexOf(',') + 1, claimValues[2].indexOf(':')));
  const xMax = xStart + Number(claimValues[3].slice(0, claimValues[3].indexOf('x')));
  const yMax = yStart + Number(claimValues[3].slice(claimValues[3].indexOf('x') + 1));

  let encounteredOverlap = false;

  for(let x = xStart; x < xMax; x++) {
    for(let y = yStart; y < yMax; y++) {
      const coordinates = [x, y].toString();

      if (processedClaims[coordinates]) {
        claimsWithoutOverlap.delete(processedClaims[coordinates])
        encounteredOverlap = true;
      } else {
        processedClaims[coordinates] = claimNumber;
      }
    }
  }

  if (!encounteredOverlap) {
    claimsWithoutOverlap.add(claimNumber);
  }
}

console.log(claimsWithoutOverlap);
