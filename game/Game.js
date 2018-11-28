class Game {
  constructor() {
    this.currentPlayers = [];
    this.players = {};
    this.state = Array(9).fill(null);
    this.turn = 0;
  }
  pushPlayer(userId) {
    this.currentPlayers.push(userId);
    this.players[userId] = {
      turn: this.turn,
      name:""
    }
    this.turn ++ ;
    this.turn = this.turn % 2;
    //console.log(this.players[userId].turn);
  }
  updatePlayer(engineArray) {
    let list = engineArray;
    let disconnectedSocket = ""
    //console.log(this.currentPlayers);
    for (let i = 0; i <= this.currentPlayers.length; i ++) {
      if (list[i] !== this.currentPlayers[i]) {
        //console.log(this.currentPlayers);
        disconnectedSocket = this.currentPlayers[i]
        break;
      }
    }
    delete this.players[disconnectedSocket]
    //console.log(`${disconnectedSocket} has disconnected`);
    this.currentPlayers = list;
    //console.log(this.currentPlayers, this.players);
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
  totalPlayers() {
    let players = Object.keys(this.players)
    return players
  }
}

function gameInstance() {
  const gameInstance = new Game
  return gameInstance
}

module.exports = gameInstance
