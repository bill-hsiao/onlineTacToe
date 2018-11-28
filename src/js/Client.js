class Client {
  constructor() {
    this.id = "";
    this.turn = null;
    this.data = [];
  }
  setId(id) {
    this.id = id
    console.log(this.id);
  }
  setTurn(turn) {
    this.turn = (turn ? 1 : 0)
    console.log(this.turn);
  }
  getTurn() {
    return this.turn
  }
  setMove(val) {
    return val
  }
  updateBoard(idx, turn) {
    this.data[idx] = turn
  }
}

module.exports = Client;
