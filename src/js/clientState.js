class State {
  constructor() {
    this.client = null;
    this.opponent = null;
    this.game = [];
  }

  addPlayer(playerId) {
    this.client = playerId
    console.log('added client');
    console.log(this.client);
  }

  addOpponent(opponentId) {
    this.opponent = opponentId
    console.log('added opoonent');
    console.log(this.opponent);
  }



}

function stateInstance() {
  const state = new State;
  return state
}

module.exports = stateInstance;
