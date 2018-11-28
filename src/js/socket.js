const state = require('./clientState')();
const user = require('./User.js')();


function controller(socket, data) {

  function init() {
    //socket = io.connect('http://localhost:1234');

    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);

    //name moves/controllers
    socket.on('sendName', sendName);
    socket.on('setName', setName);

    socket.on('playerOne', playerOne);
    socket.on('playerTwo', playerTwo);
    //game moves/controllers
    socket.on('sendMove', sendMove);


  }

  function onConnect() {
    if (!socket.id) {
      return
    }
    socket.emit('newUser', socket.id);
    socket.emit('clientReady', socket.id);
  //  socket.on('disconnect', onDisconnect);
  }
/////fixxx
  function onDisconnect() {
    //let user = client(socket.id);

    socket.emit('userLeave');
    socket.emit('disconnect')
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

  function sendMove() {

  }
  function updateMove() {

  }



  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect,
    sendName: sendName

    //newPlayer: newPlayer

  }
}

module.exports = controller;
