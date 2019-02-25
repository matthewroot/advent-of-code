const fs = require('fs');
const path = require('path');
const Cart = require('./Cart');

/**
 * Represents the map of tracks and the carts on the tracks
 *
 * @class TrackMap
 */
class TrackMap {
  /**
   * Creates an instance of TrackMap.
   * @memberof TrackMap
   */
  constructor() {
    this.tracks = {};
    this.carts = [];
    this.collisionLocation = undefined;
  }

  /**
   * Parses input data and initializes both tracks and carts
   *
   * @param {string} filename - name of file containing input data
   * @memberof TrackMap
   */
  init(filename) {
    const lines = fs
      .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
      .trim()
      .split('\n');

    lines.forEach((line, yPosition) => {
      line.split('').forEach((value, xPosition) => {
        let location = { x: xPosition, y: yPosition };

        switch (value) {
          case '<':
          case '^':
          case '>':
          case 'v':
            this.carts.push(new Cart(value, location));

            if (value === '<' || value === '>') {
              this.tracks[JSON.stringify(location)] = '-';
            } else {
              this.tracks[JSON.stringify(location)] = '|';
            }

            break;
          case '/':
          case '\\':
          case '-':
          case '|':
          case '+':
            this.tracks[JSON.stringify(location)] = value;
            break;
          default:
            break;
        }
      });
    });
  }

  /**
   * Advances 'time' by one tick. Causes all carts to update their location and
   * then checks to see if a collision has occurred.
   *
   * @memberof TrackMap
   */
  advanceTime() {
    this.carts.forEach(cart => {
      let previousLocation = JSON.parse(JSON.stringify(cart.location));
      cart.move();

      if (this.collisionOccurred(cart.location)) {
        this.collisionLocation = cart.location;
        return;
      }

      let valueAtLocation = this.tracks[JSON.stringify(cart.location)];
      cart.updateOrientation(previousLocation, valueAtLocation);
    });
  }

  /**
   * Sorts the list of carts into order starting from the top and moving left to right
   *
   * @memberof TrackMap
   */
  cartOrderSort() {
    this.carts.sort((a, b) => {
      return a.location.x - b.location.x;
    });

    this.carts.sort((a, b) => {
      return a.location.y - b.location.y;
    });
  }

  /**
   * Checks to see if a collision occurred at the provided location.
   *
   * @param {Object} location - x,y coordinates for a Cart
   * @param {Object} location.x - x coordinates for a Cart
   * @param {Object} location.y - y coordinates for a Cart
   * @returns {boolean}
   * @memberof TrackMap
   */
  collisionOccurred(location) {
    const cartsAtLocation = this.carts.filter(
      cart => cart.location.x === location.x && cart.location.y === location.y
    );

    if (cartsAtLocation.length > 1) {
      return true;
    }

    return false;
  }
}

module.exports = TrackMap;
