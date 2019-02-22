// Goal, determine the x,y location of the first mine cart crash

// * Parse input which is a map of the tracks and the starting cart locations
//    * Build a map of tracks
//    * Build a set of carts with their starting locations
// * Loop until there is a crash
//    * Move all carts (process from top, move from left-to-right)
//        * moves straight unless curve or intersection
//        * if curve, change cart direction to match next path
//        * if intersection, rotate cart direction through left->straight->right
//        * check if new spot is occupied by a cart, if so, return that position and break

// Data structures:
//  * TrackMap - stores information about the map of tracks, location of carts
//    * tracks (two dimensional matrix that maps the tracks)
//    * carts (list of carts on the map, kept in order some how)
//    * cartOrderSort (func that sorts the list of carts to be in correct order)
//    * advance (func that advances 'time' one step)
//    * collisionOccurred (func that determines if a collision has occurred)
//    * collisionLocation (func that determines location of first collision)
//  * Cart - stores cart information and operations for a cart
//    * orientation (>, <, V, ^)
//    * location ([x, y])
//    * nextIntersection ([l,s,r])
//    * updateIntersection (func that rotates through l,s,r)

// TrackMap.init(inputData);
// while(!TrackMap.collisionOccurred) {
//    TrackMap.advance();
// }
// console.log(TrackMap.collisionLocation);
