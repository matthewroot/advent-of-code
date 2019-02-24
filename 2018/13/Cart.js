/**
 * Represents a single cart
 *
 * @class Cart
 */
class Cart {
  /**
   * Creates an instance of Cart.
   * @param {string} orientation - The direction the cart is facing
   * @param {Object} location - The x,y coordinates of the cart
   * @param {Object} location.x - The x coordinate of the cart location
   * @param {Object} location.y - The y coordinate of the cart location
   * @memberof Cart
   */
  constructor(orientation, location) {
    this.orientation = orientation;
    this.location = location;
    this.intersectionDirections = ['left', 'straight', 'right'];
  }

  /**
   * Processes a single Cart movement, resulting in an updated location
   *
   * @memberof Cart
   */
  move() {
    switch (this.orientation) {
      case '>':
        this.location.x++;
        break;
      case '<':
        this.location.x--;
        break;
      case '^':
        this.location.y++;
        break;
      case 'v':
        this.location.y--;
        break;
    }
  }

  /**
   * Changes the orientation of the cart based on the type of track the cart ended on
   *
   * @param {Object} previousLocation - x,y coordinates where the cart started its turn
   * @param {Object} previousLocation.x - x coordinate where the cart started its turn
   * @param {Object} previousLocation.y - y coordinate where the cart started its turn
   * @param {string} trackType - type of track, one of +, -, |, /, \
   * @memberof Cart
   */
  updateOrientation(previousLocation, trackType) {
    let orientations = ['<', '^', '>', 'v'];
    let orientationIndex = orientations.indexOf(this.orientation);
    let clockwise;

    switch (trackType) {
      case '/':
      case '\\':
        clockwise = this.isMovingClockwise(previousLocation, trackType);

        if (clockwise) {
          let first = orientations.shift();
          orientations.push(first);
        } else {
          let last = orientations.pop();
          orientations.unshift(last);
        }

        this.orientation = orientations[orientationIndex];
        break;
      case '+':
        let direction = this.nextIntersectionDirection();

        if (direction === 'left') {
          let last = orientations.pop();
          orientations.unshift(last);
        }

        if (direction === 'right') {
          let first = orientations.shift();
          orientations.push(first);
        }

        this.orientation = orientations[orientationIndex];
        break;
    }
  }

  /**
   * Determines if the cart of moving clockwise or not
   *
   * @param {Object} previousLocation - x,y coordinates where the cart started its turn
   * @param {Object} previousLocation.x - x coordinate where the cart started its turn
   * @param {Object} previousLocation.y - y coordinate where the cart started its turn
   * @param {string} trackType - type of track, one of +, -, |, /, \
   * @returns {boolean}
   * @memberof Cart
   */
  isMovingClockwise(previousLocation, trackType) {
    switch (trackType) {
      case '/':
        if (previousLocation.x === this.location.x) {
          return true;
        }

        return false;
      case '\\':
        if (previousLocation.y === this.location.y) {
          return true;
        }

        return false;
    }
  }

  /**
   * Gets the next intersectionDirections item and cycle the directions
   *
   * @returns {string} - the next direction
   * @memberof Cart
   */
  nextIntersectionDirection() {
    let nextDirection = this.intersectionDirections.shift();
    this.intersectionDirections.push(nextDirection);
    return nextDirection;
  }
}

module.exports = Cart;
