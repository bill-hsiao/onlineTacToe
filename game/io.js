const Game = require('./Game');
const Connections = require('./Connections')
const connections = new Connections()


function controller(io, data) {
  const game = newGame;


  function init() {
    io.on('connection', onConnect)
    console.log('works');
  }

  function onConnect(client) {
    client.on('newUser', newConnect);
    client.on('disconnect', clientLeave);
    client.on('userLeave', clientLeave);
    client.on('sendName', setName);
    client.on('move', setMove);

  }

  function newConnect(userId) {

    console.log(`client ${userId} has connected`);
    io.sockets.to(userId).emit('receiveUserId', {id: userId});


    connections.addUser(userId);
    connections.addToQueue(userId);
    if (connections.queue.length < 1) {
      let link = connections.lastLink();
      game(link.p1, link.p2)

      console.log(link);
      io.sockets.to(link.p1).emit('turn', { turn: 1 });
      io.sockets.to(link.p2).emit('turn', { turn: 0 });

    }
    //comment this out for now

    // let round = game.totalPlayers();
    // if (game.totalPlayers().length === 2) {
    //   io.sockets.to(round[0]).emit('playerOne', {p1: round[0], p2: round[1]});
    //   io.sockets.to(round[1]).emit('playerTwo', {p1: round[0], p2: round[1]});
    // };
  }

  function clientLeave(client) {
    let list = Object.keys(io.engine.clients);
    let temp = connections.updateUser(list);
    connections.addToQueue(temp);
  }

  function onDisconnect(client) {
    console.log(`client ${client.id} has disconnected`);
  }

  function setMove(move) {
    console.log('received client move');
    let response = move;
    console.log(move);
    if (move) {
      game.move(response.idx, response.turn)
    }
    
  }

  function setName(user) {
    console.log(user);
    console.log(`client ${user.id} has set their name to ${user.name}`);

    io.sockets.to(user.id).emit('setName', {name: user.name});
  }
  function newGame(p1, p2) {
    const game = new Game(p1, p2)
    return game

  }




  return {
    init: init,
    newConnect: newConnect,
    onDisconnect: onDisconnect

  }

}

module.exports = controller;
