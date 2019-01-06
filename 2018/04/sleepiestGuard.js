const fs = require('fs');

const guardLogSorted = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split('\n').sort();

// Sample input:
// [1518-07-31 00:54] wakes up
// [1518-04-09 00:01] Guard #3407 begins shift
// [1518-04-03 00:36] wakes up
// [1518-10-24 00:03] Guard #1049 begins shift
// [1518-03-15 00:11] falls asleep

// Iterate through each log entry
//    Parse the entry for date, time, and action
//    Make decision about what to do based on what action is:
//      If falls asleep, set start sleep time (if this is before midnight, start counting at midnight)
//      Else if wakes up
//        Set end sleep time
//        Iterate from start to end time
//          Add to current guard's total sleep time
//          Update current guard's histogram of minutes slept
//      Else, set current guard

// Find guard with the highest slept time
// Find the most slept minute for that guard (could print this out as a histogram for fun)
