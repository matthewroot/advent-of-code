"use strict";
exports.__esModule = true;
var TrackMap_1 = require("./TrackMap");
var mine = new TrackMap_1["default"]();
mine.init('input.txt');
while (mine.carts.length > 1) {
    mine.advanceTime();
    mine.cartOrderSort();
}
console.log(mine.carts[0].location);
