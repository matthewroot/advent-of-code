import CookingContest from './CookingContest';

const RECIPES: number = 290431;
const PARTICIPANTS: number = 2;
const SCORE_COUNT: number = 10;

let hotCocoaCompetition: CookingContest = new CookingContest(PARTICIPANTS);
console.log(hotCocoaCompetition.runContest(RECIPES, SCORE_COUNT));
