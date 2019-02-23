/**
 * Represents a single cart
 *
 * @class Cart
 */
class Cart {
  /**
   * Creates an instance of Cart.
   * @param {string} orientation
   * @param {Number[]} location
   * @memberof Cart
   */
  constructor(orientation, location) {
    this.orientation = orientation;
    this.location = location;
    this.nextIntersection = ['left', 'straight', 'right'];
  }

  /**
   * Processes a single Cart movement
   *
   * @memberof Cart
   */
  move() {
    //
  }

  /**
   * Helper for a Cart to cycle through the nextIntersection list
   *
   * @memberof Cart
   */
  updateIntersection() {
    //
  }
}

module.exports = Cart;
