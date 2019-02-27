"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var Cart_1 = require("./Cart");
/**
 * Represents the map of tracks and the carts on the tracks
 *
 * @class TrackMap
 */
var TrackMap = /** @class */ (function () {
    /**
     * Creates an instance of TrackMap.
     * @memberof TrackMap
     */
    function TrackMap() {
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
    TrackMap.prototype.init = function (filename) {
        var _this = this;
        var lines = fs
            .readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
            .trim()
            .split('\n');
        lines.forEach(function (line, yPosition) {
            line.split('').forEach(function (value, xPosition) {
                var location = { x: xPosition, y: yPosition };
                switch (value) {
                    case '<':
                    case '^':
                    case '>':
                    case 'v':
                        _this.carts.push(new Cart_1["default"](value, location));
                        if (value === '<' || value === '>') {
                            _this.tracks[JSON.stringify(location)] = '-';
                        }
                        else {
                            _this.tracks[JSON.stringify(location)] = '|';
                        }
                        break;
                    case '/':
                    case '\\':
                    case '-':
                    case '|':
                    case '+':
                        _this.tracks[JSON.stringify(location)] = value;
                        break;
                    default:
                        break;
                }
            });
        });
    };
    /**
     * Advances 'time' by one tick. Causes all carts to update their location and
     * then checks to see if a collision has occurred.
     *
     * @memberof TrackMap
     */
    TrackMap.prototype.advanceTime = function () {
        var _this = this;
        this.carts.forEach(function (cart) {
            var previousLocation = JSON.parse(JSON.stringify(cart.location));
            cart.move();
            if (_this.collisionOccurred(cart.location)) {
                _this.collisionLocation = cart.location;
                _this.removeCrashedCarts(_this.collisionLocation);
            }
            else {
                var valueAtLocation = _this.tracks[JSON.stringify(cart.location)];
                cart.updateOrientation(previousLocation, valueAtLocation);
            }
        });
    };
    /**
     * Sorts the list of carts into order starting from the top and moving left to right
     *
     * @memberof TrackMap
     */
    TrackMap.prototype.cartOrderSort = function () {
        this.carts.sort(function (a, b) {
            return a.location.x - b.location.x;
        });
        this.carts.sort(function (a, b) {
            return a.location.y - b.location.y;
        });
    };
    /**
     * Checks to see if a collision occurred at the provided location.
     *
     * @param {Object} location - x,y coordinates for a Cart
     * @param {Object} location.x - x coordinates for a Cart
     * @param {Object} location.y - y coordinates for a Cart
     * @returns {boolean}
     * @memberof TrackMap
     */
    TrackMap.prototype.collisionOccurred = function (location) {
        var cartsAtLocation = this.carts.filter(function (cart) { return cart.location.x === location.x && cart.location.y === location.y; });
        if (cartsAtLocation.length > 1) {
            return true;
        }
        return false;
    };
    /**
     * Updates carts array to remove both carts after a crash occurs
     *
     * @param {Object} crashLocation - the x,y coordinates of a crash
     * @param {Object} crashLocation.x - the x coordinate of a crash
     * @param {Object} crashLocation.y - the y coordinate of a crash
     * @memberof TrackMap
     */
    TrackMap.prototype.removeCrashedCarts = function (crashLocation) {
        this.carts = this.carts.filter(function (cart) {
            return cart.location.x !== crashLocation.x ||
                cart.location.y !== crashLocation.y;
        });
    };
    return TrackMap;
}());
exports["default"] = TrackMap;
