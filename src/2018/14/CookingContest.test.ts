import CookingContest from './CookingContest';

let contest: CookingContest;

beforeEach(() => {
  contest = new CookingContest(2);
});

describe('CookingContest', () => {
  test('runContest() returns the correct scores', () => {
    let scores: string = contest.runContest(9, 10);
    expect(scores).toBe('5158916779');

    scores = contest.runContest(5, 10);
    expect(scores).toBe('0124515891');

    scores = contest.runContest(18, 10);
    expect(scores).toBe('9251071085');

    scores = contest.runContest(2018, 10);
    expect(scores).toBe('5941429882');
  });

  test('runSecondContest() returns count of recipes', () => {
    let input: string = '51589';
    expect(contest.runSecondContest(input)).toEqual(9);

    input = '01245';
    expect(contest.runSecondContest(input)).toEqual(5);

    input = '92510';
    expect(contest.runSecondContest(input)).toEqual(18);

    input = '59414';
    expect(contest.runSecondContest(input)).toEqual(2018);
  });

  test('createNewRecipes() adds new recipes based on current recipe scores', () => {
    contest.input = '9';
    expect(contest.scoreboard).toEqual([3, 7]);

    contest.createNewRecipes();
    expect(contest.scoreboard).toEqual([3, 7, 1, 0]);

    contest.createNewRecipes();
    expect(contest.scoreboard).toEqual([3, 7, 1, 0, 1, 0]);

    contest.currentRecipes = [4, 3];
    contest.createNewRecipes();
    expect(contest.scoreboard).toEqual([3, 7, 1, 0, 1, 0, 1]);

    contest.currentRecipes = [6, 4];
    contest.createNewRecipes();
    expect(contest.scoreboard).toEqual([3, 7, 1, 0, 1, 0, 1, 2]);

    contest.currentRecipes = [0, 6];
    contest.createNewRecipes();
    expect(contest.scoreboard).toEqual([3, 7, 1, 0, 1, 0, 1, 2, 4]);
  });

  test('pickNewRecipes() assigns a new current recipe to each participant', () => {
    expect(contest.currentRecipes).toEqual([0, 1]);

    contest.scoreboard = [3, 7, 1, 0];
    contest.pickNewRecipes();
    expect(contest.currentRecipes).toEqual([0, 1]);

    contest.scoreboard = [3, 7, 1, 0, 1, 0];
    contest.pickNewRecipes();
    expect(contest.currentRecipes).toEqual([4, 3]);

    contest.scoreboard = [3, 7, 1, 0, 1, 0, 1];
    contest.pickNewRecipes();
    expect(contest.currentRecipes).toEqual([6, 4]);

    contest.scoreboard = [3, 7, 1, 0, 1, 0, 1, 2];
    contest.pickNewRecipes();
    expect(contest.currentRecipes).toEqual([0, 6]);

    contest.scoreboard = [3, 7, 1, 0, 1, 0, 1, 2, 4];
    contest.pickNewRecipes();
    expect(contest.currentRecipes).toEqual([4, 8]);
  });
});
