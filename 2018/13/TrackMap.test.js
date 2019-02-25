const TrackMap = require('./TrackMap');

describe('TrackMap', () => {
  describe('init()', () => {
    test('builds a list of carts that are on the tracks', () => {
      let mine = new TrackMap();
      expect(mine.carts.length).toBe(0);

      mine.init('testInput.txt');
      expect(mine.carts.length).toBe(2);

      let firstCart = mine.carts[0];
      expect(firstCart.constructor.name).toBe('Cart');
      expect(firstCart.orientation).toBe('>');
      expect(firstCart.location).toEqual({ x: 2, y: 0 });
    });

    test('builds a mapping of x,y coordinates to tracks', () => {
      let mine = new TrackMap();
      mine.init('testInput.txt');
      expect(Object.keys(mine.tracks).length).toBe(48);

      let curveLocation = JSON.stringify({ x: 0, y: 0 });
      expect(mine.tracks[curveLocation]).toBe('/');

      let verticalLocation = JSON.stringify({ x: 0, y: 1 });
      expect(mine.tracks[verticalLocation]).toBe('|');

      let straightLocation = JSON.stringify({ x: 1, y: 0 });
      expect(mine.tracks[straightLocation]).toBe('-');

      let curve2Location = JSON.stringify({ x: 0, y: 4 });
      expect(mine.tracks[curve2Location]).toBe('\\');

      let intersectionLocation = JSON.stringify({ x: 4, y: 2 });
      expect(mine.tracks[intersectionLocation]).toBe('+');

      let replacementStraightLocation = JSON.stringify({ x: 2, y: 0 });
      expect(mine.tracks[replacementStraightLocation]).toBe('-');

      let replacementVerticalLocation = JSON.stringify({ x: 9, y: 3 });
      expect(mine.tracks[replacementVerticalLocation]).toBe('|');

      let noTrackLocation = JSON.stringify({ x: 5, y: 0 });
      expect(mine.tracks[noTrackLocation]).toBeUndefined();
    });
  });
});
