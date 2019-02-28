"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrackMap_1 = require("./TrackMap");
let mine = new TrackMap_1.default();
mine.init('input.txt');
while (mine.carts.length > 1) {
    mine.advanceTime();
    mine.cartOrderSort();
}
console.log(mine.carts[0].location);
//# sourceMappingURL=partTwo.js.map