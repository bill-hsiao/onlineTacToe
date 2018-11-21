class Game {
  constructor(idx) {
    this.state = Array(9).fill(null);
    this.turn = 0;
  }
  makeMove(idx) {
    if (typeof this.state[idx] === 'number') {
      return
    } else {
      this.state[idx] = (this.turn ? 1 : 0);
      this.turn ++ ;
      this.turn = this.turn % 2;
    }
  }
}

module.exports = { Game: Game}
