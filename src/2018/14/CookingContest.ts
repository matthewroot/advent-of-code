export default class CookingContest {
  currentRecipes: number[];
  scoreboard: number[];
  targetRegister: number[];
  input: string;

  constructor(participants: number) {
    this.currentRecipes = [0, 1];
    this.scoreboard = [3, 7];
    this.targetRegister = [];
  }

  /**
   * Runs the cooking contest looking for scores after scoreboard reaches a
   * designated length.
   *
   * @param {number} recipes
   * @param {number} scoreCount
   * @returns {string}
   * @memberof CookingContest
   */
  runContest(recipes: number, scoreCount: number): string {
    this.input = recipes.toString();
    let scores: string = '';

    while (this.scoreboard.length < recipes + scoreCount) {
      this.createNewRecipes();
      this.pickNewRecipes();
    }

    for (let index: number = recipes; index < recipes + scoreCount; index++) {
      scores = scores.concat(this.scoreboard[index].toString());
    }

    return scores;
  }

  /**
   * Runs the cooking contest looking for the number of recipes generated before
   * the input is on the scoreboard.
   *
   * @param {string} input
   * @returns {number}
   * @memberof CookingContest
   */
  runSecondContest(input: string): number {
    this.input = input;
    let currentRegister: string = this.targetRegister.join('');

    while (currentRegister !== input) {
      this.createNewRecipes();
      this.pickNewRecipes();
      currentRegister = this.targetRegister.join('');
    }

    return this.scoreboard.join('').indexOf(input);
  }

  /**
   * Creates new recipes by summing the scores of current recipes and adding
   * these to the scoreboard.
   *
   * @memberof CookingContest
   */
  createNewRecipes(): void {
    let sum: number = this.currentRecipes.reduce(
      (total, recipeIndex) => total + this.scoreboard[recipeIndex],
      0
    );

    if (sum > 9) {
      let firstScore: number = Math.floor(sum / 10);
      this.scoreboard.push(firstScore);
      this.updateRegister(firstScore);
    }

    let secondScore: number = sum % 10;
    this.scoreboard.push(secondScore);
    this.updateRegister(secondScore);
  }

  /**
   * Updates the targetRegister with latest recipes added to scoreboard.
   *
   * @param {number} score
   * @memberof CookingContest
   */
  updateRegister(score: number): void {
    if (this.targetRegister.length === this.input.length) {
      this.targetRegister.shift();
    }

    this.targetRegister.push(score);
  }

  /**
   * Selects a new recipe for each participant. Recipe is picked by moving forward
   * through scoreboard number of times equal to current recipe score plus one.
   *
   * @private
   * @memberof CookingContest
   */
  pickNewRecipes(): void {
    this.currentRecipes.forEach((recipeIndex, index) => {
      const currentScore: number = this.scoreboard[recipeIndex];
      let steps: number = currentScore + 1;
      let nextRecipe: number = recipeIndex;

      while (steps > 0) {
        if (this.scoreboard[nextRecipe + 1] === undefined) {
          nextRecipe = 0;
        } else {
          nextRecipe++;
        }

        steps--;
      }

      this.currentRecipes[index] = nextRecipe;
    });
  }
}
