class Game {
  constructor() {
    // this.id = ;
    this.turn = 0;
    this.state = Array(9).fill(undefined)

  }
  init() {
    console.log('game initialized');
  }
  makeMove(idx) {
    this.turn %= 2;
    let nextState = this.state.slice()
    nextState[idx] = this.turn;
    this.state = nextState;
    console.log(this.state);
    this.turn++;
  }
  getTurn() {
    return this.turn
  }
  newGame() {
    this.turn = 0;
    this.state = Array(9).fill(undefined);
  }
}

module.exports = Game
