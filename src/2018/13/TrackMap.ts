import * as fs from 'fs';
import * as path from 'path';
import Cart from './Cart';
import { Location } from './interfaces';

/**
 * Represents the map of tracks and the carts on the tracks
 *
 * @class TrackMap
 */
export default class TrackMap {
  tracks: Object;
  carts: Cart[];
  collisionLocation: Location;

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
  init(filename: string): void {
    const lines: string[] = fs
      .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
      .trim()
      .split('\n');

    lines.forEach((line, yPosition) => {
      line.split('').forEach((value, xPosition) => {
        let location: Location = { x: xPosition, y: yPosition };

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
  advanceTime(): void {
    this.carts.forEach(cart => {
      let previousLocation: Location = JSON.parse(
        JSON.stringify(cart.location)
      );
      cart.move();

      if (this.collisionOccurred(cart.location)) {
        this.collisionLocation = cart.location;
        this.removeCrashedCarts(this.collisionLocation);
      } else {
        let valueAtLocation: string = this.tracks[
          JSON.stringify(cart.location)
        ];
        cart.updateOrientation(previousLocation, valueAtLocation);
      }
    });
  }

  /**
   * Sorts the list of carts into order starting from the top and moving left to right
   *
   * @memberof TrackMap
   */
  cartOrderSort(): void {
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
  collisionOccurred(location: Location): boolean {
    const cartsAtLocation: Cart[] = this.carts.filter(
      cart => cart.location.x === location.x && cart.location.y === location.y
    );

    if (cartsAtLocation.length > 1) {
      return true;
    }

    return false;
  }

  /**
   * Updates carts array to remove both carts after a crash occurs
   *
   * @param {Object} crashLocation - the x,y coordinates of a crash
   * @param {Object} crashLocation.x - the x coordinate of a crash
   * @param {Object} crashLocation.y - the y coordinate of a crash
   * @memberof TrackMap
   */
  removeCrashedCarts(crashLocation: Location): void {
    this.carts = this.carts.filter(
      cart =>
        cart.location.x !== crashLocation.x ||
        cart.location.y !== crashLocation.y
    );
  }
}
