const fs = require('fs');
const path = require('path');

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
  constructor(filename) {
    this.tracks = {};
    this.carts = [];
    this.collisionLocation = undefined;
    init(filename);
  }

  /**
   * Parses input data and initializes both tracks and carts
   *
   * @param {string} filename - name of file containing input data
   * @memberof TrackMap
   */
  init(filename) {
    //
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
   * @param {Number[]} location - x,y coordinates for a Cart
   * @returns {boolean}
   * @memberof TrackMap
   */
  collisionOccurred(location) {
    //
  }
}

module.exports = TrackMap;
