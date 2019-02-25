const TrackMap = require('./TrackMap');

let mine = new TrackMap();
mine.init('input.txt');

while (!mine.collisionLocation) {
  mine.advanceTime();
  mine.cartOrderSort();
}

console.log(mine.collisionLocation);
