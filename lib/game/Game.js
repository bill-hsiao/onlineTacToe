class Game {
  constructor(id) {
    this.id = id;
    this.state = [];
  }
  init() {
    console.log('game initialized');
  }
  makeMove(idx) {
    console.log(this.state.length);
    //this.state[idx]
  }


  getState() {
    console.log(this.state);
    return this.state;
  }
}

module.exports = Game
