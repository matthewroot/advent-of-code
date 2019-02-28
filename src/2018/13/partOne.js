"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrackMap_1 = require("./TrackMap");
let mine = new TrackMap_1.default();
mine.init('input.txt');
while (!mine.collisionLocation) {
    mine.advanceTime();
    mine.cartOrderSort();
}
console.log(mine.collisionLocation);
//# sourceMappingURL=partOne.js.map