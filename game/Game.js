class Game {
  constructor() {
    this.players = {};
    this.state = Array(9).fill(null);
    this.turn = 0;
  }
  pushPlayer(userId) {
    this.players[userId] = {
      turn: this.turn,
      name:""
    }
    this.turn ++ ;
    this.turn = this.turn % 2;
    console.log(this.players[userId].turn);
  }
  pushPlayerName(userId, name) {
    this.players[userId].name = name;
    console.log(this.players[userId].name);
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

function gameInstance() {
  const gameInstance = new Game
  return gameInstance
}

module.exports = gameInstance
