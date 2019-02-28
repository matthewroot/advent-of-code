import TrackMap from './TrackMap';

let mine: TrackMap = new TrackMap();
mine.init('input.txt');

while (!mine.collisionLocation) {
  mine.advanceTime();
  mine.cartOrderSort();
}

console.log(mine.collisionLocation);
