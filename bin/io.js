function controller(io, data) {

  function init() {
    io.on('connection', onConnect)
  }

  function onConnect(client) {
    client.on('newUser', newConnect);
    client.on('disconnect', onDisconnect)
  }

  function onDisconnect(client) {
    console.log(`client ${client} has disconnected`);
  }

  function newConnect(userId) {
    console.log(`client ${userId} has connected`);
    //this.broadcast.emit(this.id)
    io.sockets.to(userId).emit('receiveUserId', {id: userId});
  }
  return {
    init: init,
    newConnect: newConnect,
    onDisconnect: onDisconnect

  }

}

module.exports = controller;
