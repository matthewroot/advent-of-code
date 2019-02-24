const Cart = require('./Cart');

describe('Cart', () => {
  test('move() updates cart location based on orientation', () => {
    let cart = new Cart('>', { x: 1, y: 1 });
    cart.move();
    expect(cart.location).toEqual({ x: 2, y: 1 });

    cart.orientation = '^';
    cart.move();
    expect(cart.location).toEqual({ x: 2, y: 2 });

    cart.orientation = '<';
    cart.move();
    expect(cart.location).toEqual({ x: 1, y: 2 });

    cart.orientation = 'v';
    cart.move();
    expect(cart.location).toEqual({ x: 1, y: 1 });
  });

  describe('updateOrientation() changes cart orientation based on track type', () => {
    let cart;

    beforeEach(() => {
      cart = new Cart('>', { x: 1, y: 1 });
    });

    test('straight paths', () => {
      let trackType = '-';
      cart.updateOrientation({ x: 1, y: 1 }, { x: 2, y: 1 }, trackType);
      expect(cart.orientation).toBe('>');

      cart.orientation = '<';
      cart.updateOrientation({ x: 2, y: 1 }, { x: 1, y: 1 }, trackType);
      expect(cart.orientation).toBe('<');

      trackType = '|';
      cart.orientation = '^';
      cart.updateOrientation({ x: 1, y: 1 }, { x: 1, y: 2 }, trackType);
      expect(cart.orientation).toBe('^');

      cart.orientation = 'v';
      cart.updateOrientation({ x: 1, y: 2 }, { x: 1, y: 1 }, trackType);
      expect(cart.orientation).toBe('v');
    });

    test('curves', () => {
      // test: |/-, clockwise
      let trackType = '/';
      cart.orientation = '^';
      cart.location = { x: 0, y: 0 };
      cart.updateOrientation({ x: 0, y: 1 }, trackType);
      expect(cart.orientation).toBe('>');

      // test: |/-, counter-clockwise
      cart.orientation = '<';
      cart.location = { x: 0, y: 0 };
      cart.updateOrientation({ x: 1, y: 0 }, trackType);
      expect(cart.orientation).toBe('v');

      // test: -\|, clockwise
      trackType = '\\';
      cart.orientation = '>';
      cart.location = { x: 1, y: 0 };
      cart.updateOrientation({ x: 0, y: 0 }, trackType);
      expect(cart.orientation).toBe('v');

      // test: |\-, counter-clockwise
      cart.orientation = '^';
      cart.location = { x: 0, y: 0 };
      cart.updateOrientation({ x: 0, y: 1 }, trackType);
      expect(cart.orientation).toBe('<');

      // test: |/-, clockwise
      trackType = '/';
      cart.orientation = 'v';
      cart.location = { x: 0, y: 1 };
      cart.updateOrientation({ x: 0, y: 0 }, trackType);
      expect(cart.orientation).toBe('<');

      // test: -/|, counter-clockwise
      cart.orientation = '>';
      cart.location = { x: 1, y: 0 };
      cart.updateOrientation({ x: 0, y: 0 }, trackType);
      expect(cart.orientation).toBe('^');

      // test: -\|, clockwise
      trackType = '\\';
      cart.orientation = '<';
      cart.location = { x: 0, y: 0 };
      cart.updateOrientation({ x: 1, y: 0 }, trackType);
      expect(cart.orientation).toBe('^');

      // test: |\-, counter-clockwise
      cart.orientation = 'v';
      cart.location = { x: 0, y: 0 };
      cart.updateOrientation({ x: 0, y: 1 }, trackType);
      expect(cart.orientation).toBe('>');
    });

    test('intersections', () => {
      let trackType = '+';
      cart.updateOrientation({ x: 0, y: 1 }, trackType);
      expect(cart.orientation).toBe('^');

      cart.updateOrientation({ x: 1, y: 2 }, trackType);
      expect(cart.orientation).toBe('^');

      cart.updateOrientation({ x: 1, y: 2 }, trackType);
      expect(cart.orientation).toBe('>');
    });
  });

  test('nextIntersectionDirection() rotates directions ', () => {
    let cart = new Cart('>', { x: 1, y: 1 });
    expect(cart.nextIntersectionDirection()).toBe('left');
    expect(cart.nextIntersectionDirection()).toBe('straight');
    expect(cart.nextIntersectionDirection()).toBe('right');
    expect(cart.nextIntersectionDirection()).toBe('left');
  });
});
