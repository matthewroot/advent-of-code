"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Cart_1 = require("./Cart");
class TrackMap {
    constructor() {
        this.tracks = {};
        this.carts = [];
        this.collisionLocation = undefined;
    }
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
                        this.carts.push(new Cart_1.default(value, location));
                        if (value === '<' || value === '>') {
                            this.tracks[JSON.stringify(location)] = '-';
                        }
                        else {
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
    advanceTime() {
        this.carts.forEach(cart => {
            let previousLocation = JSON.parse(JSON.stringify(cart.location));
            cart.move();
            if (this.collisionOccurred(cart.location)) {
                this.collisionLocation = cart.location;
                this.removeCrashedCarts(this.collisionLocation);
            }
            else {
                let valueAtLocation = this.tracks[JSON.stringify(cart.location)];
                cart.updateOrientation(previousLocation, valueAtLocation);
            }
        });
    }
    cartOrderSort() {
        this.carts.sort((a, b) => {
            return a.location.x - b.location.x;
        });
        this.carts.sort((a, b) => {
            return a.location.y - b.location.y;
        });
    }
    collisionOccurred(location) {
        const cartsAtLocation = this.carts.filter(cart => cart.location.x === location.x && cart.location.y === location.y);
        if (cartsAtLocation.length > 1) {
            return true;
        }
        return false;
    }
    removeCrashedCarts(crashLocation) {
        this.carts = this.carts.filter(cart => cart.location.x !== crashLocation.x ||
            cart.location.y !== crashLocation.y);
    }
}
exports.default = TrackMap;
//# sourceMappingURL=TrackMap.js.map