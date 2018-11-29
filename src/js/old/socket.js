const state = require('./clientState')();
const user = require('./User.js')();
const Client = require('./Client');
const client = new Client


function controller(socket, client) {

  function init() {
    //socket = io.connect('http://localhost:1234');

    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onReady);

    socket.on('disconnect', onDisconnect);

    // socket.on('disconnect', onDisconnect);
    //socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
    socket.on('turn', getLink);
    socket.on('gameTurn', gameTurn);
    //name moves/controllers
    socket.on('sendName', sendName);
    socket.on('setName', setName);

    socket.on('playerOne', playerOne);
    socket.on('playerTwo', playerTwo);
    //game moves/controllers
    socket.on('sendMove', sendMove);


  }

  function onReady() {
    if (!socket.id) {
      return
    }
    socket.emit('newUser', socket.id);
    client.setId(socket.id)
    socket.emit('clientReady', socket.id);
  //  socket.on('disconnect', onDisconnect);
  }
/////fixxx
  function onDisconnect() {
    //let user = client(socket.id);

    socket.emit('disconnect')
  }

  function getLink(turn) {
    console.log('getlink');
    console.log(turn.turn);
    client.setTurn(turn.turn)

  }
  function gameTurn(num) {
    const turn = num;
    turn = turn % 2;
    return turn
  }

//////fix
  function newPlayer(user) {
    state.addPlayer(user.id)
  }

  function sendName(name) {
    console.log(name);
    socket.emit('sendName', {id: socket.id, name: name})
  }

  function setName(response) {
    console.log(response);
    user.setName(response.name)
  }

  function playerOne(players) {
    state.addPlayer(players.p1)
    state.addOpponent(players.p2)
  }
  function playerTwo(players) {
    state.addPlayer(players.p2)
    state.addOpponent(players.p1)
  }

  function sendMove(idx) {
    let idx1 = client.setMove(idx);
    let turn = client.getTurn();
    socket.emit('move', {idx: idx1, turn: turn})
  }
  function updateMove() {

  }



  return {
    init: init,
    onReady: onReady,
    onDisconnect: onDisconnect,
    sendMove: sendMove,
    sendName: sendName

    //newPlayer: newPlayer

  }
}

module.exports = controller;
