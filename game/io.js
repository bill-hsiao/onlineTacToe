const game = require('./Game')();

function controller(io, data) {

  function init() {
    io.on('connection', onConnect)
    console.log('works');
  }

  function onConnect(client) {
    client.on('newUser', newConnect);
    client.on('disconnect', clientLeave);
    // client.on('userLeave', clientLeave);
    client.on('sendName', setName);
  }

  function newConnect(userId) {
    console.log(`client ${userId} has connected`);
    //this.broadcast.emit(this.id)
    io.sockets.to(userId).emit('receiveUserId', {id: userId});
    game.pushPlayer(userId);
  }
  function clientLeave(client) {
    //console.log(client);
    let list = Object.keys(io.engine.clients);
    //console.log(list);
    //console.log(Object.keys(io.engine.clients));
    console.log(list);
    game.updatePlayer(list);

  }

  function onDisconnect(client) {
    console.log(`client ${client.id} has disconnected`);
  }

  function setName(user) {
    console.log(user);
    console.log(`client ${user.id} has set their name to ${user.name}`);

    io.sockets.to(user.id).emit('setName', {name: user.name});
  }

  return {
    init: init,
    newConnect: newConnect,
    onDisconnect: onDisconnect

  }

}

module.exports = controller;
