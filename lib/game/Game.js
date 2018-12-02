class Game {
  constructor() {
    this.turn = NaN;
    this.state = [];
  }
  init() {
    this.turn = 0;
    this.state = Array(9).fill(null);
  }
  makeMove() {

  }


  getState() {
    console.log(this.state);
    return this.state;
  }
}

module.exports = Game
