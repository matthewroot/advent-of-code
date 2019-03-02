import CookingContest from './CookingContest';

const INPUT: string = '290431';
const PARTICIPANTS: number = 2;

let hotCocoaCompetition: CookingContest = new CookingContest(PARTICIPANTS);
console.log(hotCocoaCompetition.runSecondContest(INPUT));
