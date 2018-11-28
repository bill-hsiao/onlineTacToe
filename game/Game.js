class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.turn = 0;
    this.state = [];
  }
  newRound() {
    this.state = Array(9).fill(null);
  }
  move(idx, turn) {
    if (turn !== this.turn) {
      return
    } else {
      if (this.state[idx] !== null) {
        return
      } else {
        this.turn = this.turn % 2;
        this.state[idx] = turn
        this.turn ++;
      }
    }
  }
}

module.exports = Game
