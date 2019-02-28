"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cart {
    constructor(orientation, location) {
        this.orientation = orientation;
        this.location = location;
        this.intersectionDirections = ['left', 'straight', 'right'];
    }
    move() {
        switch (this.orientation) {
            case '>':
                this.location.x++;
                break;
            case '<':
                this.location.x--;
                break;
            case '^':
                this.location.y--;
                break;
            case 'v':
                this.location.y++;
                break;
        }
    }
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
                }
                else {
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
    nextIntersectionDirection() {
        let nextDirection = this.intersectionDirections.shift();
        this.intersectionDirections.push(nextDirection);
        return nextDirection;
    }
}
exports.default = Cart;
//# sourceMappingURL=Cart.js.map