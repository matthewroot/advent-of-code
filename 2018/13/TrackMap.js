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
   * @param {string } filename - name of file containing input data
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

    // Will need to handle case where cart currently is on a path
    // "On your initial map, the track under each cart is a straight path matching the direction the cart is facing"
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
    // carts.forEach(cart => {
    //   let previousLocation = cart.location;
    //   cart.move();
    //   cart.updateOrientation(previousLocation, valueAtLocation);
    //   if (collisionOccurred(cart.location)) {
    //     this.collisionLocation = cart.location;
    //   }
    // });
  }

  /**
   * Sorts the list of carts into order starting from the top and moving left to right
   *
   * @memberof TrackMap
   */
  cartOrderSort() {
    //
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
    //
  }
}

module.exports = TrackMap;
