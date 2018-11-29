class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.turn = 0;
    this.state = [null, null, null, null, null, null, null, null, null];
  }
  init(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  getIds() {
    return {p1: this.p1, p2: this.p2}
  }
  newRound() {
    this.state = Array(9).fill(null);
  }

  move(idx, turn) {
    if (turn !== this.turn) {
      return false
    } else {
      if (this.state[idx] !== null) {
        return false
      } else {
        this.turn = this.turn % 2;
        this.state[idx] = turn
        this.turn ++;
        return {idx: idx, turn: turn}
      }
    }
  }
  getState() {
    console.log(this.state);
    return this.state;
  }
}

module.exports = Game
