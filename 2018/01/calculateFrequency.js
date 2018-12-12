const fs = require('fs');
const readline = require('readline');

function processLineByLine() {
  let total = 0;
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    total += frequencyValueFromLine(line);
  });

  rl.on('close', () => {
    console.log(total);
  });
}

function frequencyValueFromLine(line) {
  let value = Number.parseInt(line.substring(1));

  if (line[0] === '-') {
    value *= -1;
  }

  return value;
}

processLineByLine();
