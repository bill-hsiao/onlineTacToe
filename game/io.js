const game = require('./Game')();
const connections = require('./Connections')();

function controller(io, data) {

  function init() {
    io.on('connection', onConnect)
    console.log('works');
  }

  function onConnect(client) {
    client.on('newUser', newConnect);
    client.on('disconnect', clientLeave);
    client.on('userLeave', clientLeave);
    client.on('sendName', setName);
  }

  function newConnect(userId) {
    console.log(`client ${userId} has connected`);
    io.sockets.to(userId).emit('receiveUserId', {id: userId});

    connections.addUser(userId);
    if (connections.queue.length < 1) {
      let link = connections.lastLink();
      console.log(link);
      io.sockets.to(link.p1).emit('linkId', { link });
      io.sockets.to(link.p2).emit('linkId', { link });

    }
    //comment this out for now

    // let round = game.totalPlayers();
    // if (game.totalPlayers().length === 2) {
    //   io.sockets.to(round[0]).emit('playerOne', {p1: round[0], p2: round[1]});
    //   io.sockets.to(round[1]).emit('playerTwo', {p1: round[0], p2: round[1]});
    // };
  }

  function clientLeave(client) {
    //console.log(client);
    let list = Object.keys(io.engine.clients);
    //console.log(list);
    //console.log(Object.keys(io.engine.clients));
    // console.log(list);
    connections.updateUsers(list);
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
  function gameStart() {
    const count = 0;

  }




  return {
    init: init,
    newConnect: newConnect,
    onDisconnect: onDisconnect

  }

}

module.exports = controller;
