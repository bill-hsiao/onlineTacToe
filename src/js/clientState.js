class State {
  constructor() {
    this.client = null;
    this.opponent = null;
    this.game = [];
  }

  addPlayer(playerId) {
    this.client = playerId
  }

  addOpponent(opponentId) {
    this.opponent = opponentId
  }



}

function stateInstance() {
  const state = new State;
  return state
}

module.exports = stateInstance;
