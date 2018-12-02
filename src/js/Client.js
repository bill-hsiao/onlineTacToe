class Client {
  constructor() {
    this.id = "";
    this.turn = null;
    this.data = [null, null, null, null, null, null, null, null, null];
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
  updateBoard(idx, turn, method) {
    this.data[idx] = turn
    method(idx, turn)
  }
  getData() {
    return this.data
  }
  opponentMove(method) {
    method()
  }
  pushUpdate() {
    
  }
  //test

  passViewData(data, callback) {
    console.log('passed in data');
    if (callback) {
      callback(data);
    }
    return data
  }


}

module.exports = Client;
