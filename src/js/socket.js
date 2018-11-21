function controller(socket) {

  function init() {
    socket = io.connect('http://localhost:4000');
    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
  }

  function onConnect() {
    let userId = socket.id;
    if (!userId) {
      return
    }
    socket.emit('newUser', userId);
  }

  function onDisconnect() {
    let userId = socket.id;
    this.broadcast.emit(userId);
    this.emit('disconnect', userId)
  }

  function newPlayer(userId) {
    console.log(userId.id);
  }



  return {
    init: init,
    onConnect: onConnect,
    newPlayer: newPlayer,
    onDisconnect: onDisconnect
  }
}

module.exports = controller;
