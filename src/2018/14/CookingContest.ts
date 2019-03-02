export default class CookingContest {
  currentRecipes: number[];
  scoreboard: number[];

  constructor(participants: number) {
    this.currentRecipes = [0, 1];
    this.scoreboard = [3, 7];
  }

  runContest(recipes: number, scoreCount: number): string {
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
   * Creates new recipes by summing the scores of current recipes and adding
   * these to the scoreboard.
   *
   * @private
   * @memberof CookingContest
   */
  createNewRecipes(): void {
    let sum: number = this.currentRecipes.reduce(
      (total, recipeIndex) => total + this.scoreboard[recipeIndex],
      0
    );

    if (sum > 9) {
      this.scoreboard.push(Math.floor(sum / 10));
    }

    this.scoreboard.push(sum % 10);
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
