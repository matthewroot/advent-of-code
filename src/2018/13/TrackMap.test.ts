import TrackMap from './TrackMap';
import { Location } from './interfaces';

describe('TrackMap', () => {
  describe('init()', () => {
    test('builds a list of carts that are on the tracks', () => {
      let mine: TrackMap = new TrackMap();
      expect(mine.carts.length).toBe(0);

      mine.init('testInput.txt');
      expect(mine.carts.length).toBe(2);

      let firstCart: any = mine.carts[0];
      expect(firstCart.constructor.name).toBe('Cart');
      expect(firstCart.orientation).toBe('>');
      expect(firstCart.location).toEqual({ x: 2, y: 0 });
    });

    test('builds a mapping of x,y coordinates to tracks', () => {
      let mine: TrackMap = new TrackMap();
      mine.init('testInput.txt');
      expect(Object.keys(mine.tracks).length).toBe(48);

      let curveLocation: string = JSON.stringify({ x: 0, y: 0 });
      expect(mine.tracks[curveLocation]).toBe('/');

      let verticalLocation: string = JSON.stringify({ x: 0, y: 1 });
      expect(mine.tracks[verticalLocation]).toBe('|');

      let straightLocation: string = JSON.stringify({ x: 1, y: 0 });
      expect(mine.tracks[straightLocation]).toBe('-');

      let curve2Location: string = JSON.stringify({ x: 0, y: 4 });
      expect(mine.tracks[curve2Location]).toBe('\\');

      let intersectionLocation: string = JSON.stringify({ x: 4, y: 2 });
      expect(mine.tracks[intersectionLocation]).toBe('+');

      let replacementStraightLocation: string = JSON.stringify({ x: 2, y: 0 });
      expect(mine.tracks[replacementStraightLocation]).toBe('-');

      let replacementVerticalLocation: string = JSON.stringify({ x: 9, y: 3 });
      expect(mine.tracks[replacementVerticalLocation]).toBe('|');

      let noTrackLocation: string = JSON.stringify({ x: 5, y: 0 });
      expect(mine.tracks[noTrackLocation]).toBeUndefined();
    });
  });

  test('collisionOccurred() returns true if two carts occupy the same location', () => {
    const location: Location = { x: 2, y: 0 };
    let mine: TrackMap = new TrackMap();
    mine.init('testInput.txt');
    expect(mine.collisionOccurred(location)).toBe(false);

    mine.carts[1].location = location;
    expect(mine.collisionOccurred(location)).toBe(true);
  });

  describe('advanceTime()', () => {
    let mine: TrackMap;

    beforeEach(() => {
      mine = new TrackMap();
      mine.init('testInput.txt');
    });

    test('causes each cart to move', () => {
      expect(mine.carts[0].location).toEqual({ x: 2, y: 0 });
      expect(mine.carts[1].location).toEqual({ x: 9, y: 3 });

      mine.advanceTime();
      expect(mine.carts[0].location).toEqual({ x: 3, y: 0 });
      expect(mine.carts[1].location).toEqual({ x: 9, y: 4 });
    });

    test('stores the location of a collision when one occurs', () => {
      expect(mine.collisionLocation).toBeUndefined();

      for (let ticks: number = 0; ticks < 14; ticks++) {
        mine.advanceTime();
      }

      expect(mine.collisionLocation).toEqual({ x: 7, y: 3 });
    });
  });

  test('cartOrderSort() puts carts in order starting at the left, moving top to bottom ', () => {
    let mine: TrackMap = new TrackMap();
    mine.init('testInput.txt');
    mine.cartOrderSort();
    expect(mine.carts[0].orientation).toBe('>');

    mine.carts[0].location.y = 5;
    mine.cartOrderSort();
    expect(mine.carts[0].orientation).toBe('v');

    mine.carts[1].location.y = 3;
    mine.cartOrderSort();
    expect(mine.carts[0].orientation).toBe('>');

    mine.carts[0].location.x = 13;
    mine.cartOrderSort();
    expect(mine.carts[0].orientation).toBe('v');
  });

  test('removeCrashedCarts() filters out carts at the crash location', () => {
    let mine: TrackMap = new TrackMap();
    let crashLocation: Location = { x: 2, y: 0 };

    mine.init('testInput.txt');
    mine.carts[1].location = crashLocation;
    expect(mine.carts.length).toBe(2);

    mine.removeCrashedCarts(crashLocation);
    expect(mine.carts.length).toBe(0);
  });
});
