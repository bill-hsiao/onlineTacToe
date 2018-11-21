var User = require('./User.js');


///fix this later
function client(argument) {
  const user = new User(argument);
  return user
}
///////



function controller(socket) {

  function init() {
    socket = io.connect('http://localhost:1234');
    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
  }

  function onConnect() {
    let user = client(socket.id);
    if (!user.id) {
      return
    }
    console.log(user);
    socket.emit('newUser', user.id);
    console.log('from onConnect function');
  }
/////fixxx
  function onDisconnect() {
    let user = client(socket.id);
    socket.emit('leave', user.id);
    socket.emit('disconnect', user.id)
  }
//////fix
  function newPlayer(user) {
    console.log(user);
    //player.setId(user.id)
    //console.log(player.id);
  }



  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect
    //newPlayer: newPlayer

  }
}

module.exports = controller;
