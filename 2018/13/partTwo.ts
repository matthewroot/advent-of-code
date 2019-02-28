import TrackMap from './TrackMap';

let mine: TrackMap = new TrackMap();
mine.init('input.txt');

while (mine.carts.length > 1) {
  mine.advanceTime();
  mine.cartOrderSort();
}

console.log(mine.carts[0].location);
