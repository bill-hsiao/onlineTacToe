const serialize = require('../bin/helpers')

function controller(io, connections, game) {
  function current(socket) {
    this.socket = socket;
  }

  function init() {
    io.on('connection', onConnect)
    console.log('initialized io controller');
  }


  function onConnect(socket) {
    current(socket);
    socket.join('lobby');

    socket.on('newConnection', newConnect)

    socket.on('disconnect', onDisconnect)
    // socket.on('acceptRoom', createRoom)
    // socket.on('linkData', linkData)

    socket.on('move', move)
    // socket.join
    //socket.join('')
  //  socket.on('room', )
    //console.log(socket);
    return socket

  }

  function newConnect(userId) {
    //let userId = socket.id;
    queue();

    // socket.join('waiting room');
    // joinWaitingPlayers();

    console.log(`client ${userId} has connected`);
    io.sockets.to(userId).emit('setClientId', userId);
    connections.addUser(userId);
    connections.addToQueue(userId);
    // joinWaitingPlayers();

    // if (connections.queue.length < 1) {
    //   let link = connections.lastLink();
    //   console.log(link);
      // io.on('connection', function(socket){
        // socket.join(link.id);
        // console.log(socket.id + 'joined ' + link.id);
      // });
  //     let p1 = serialize(link.p1)
  //     let p2 = serialize(link.p2)
  //     let roomId = serialize(link.id)
  //
  //     io.sockets.to(p1).emit('joinInvitation', { roomId });
  //     io.sockets.to(p2).emit('joinInvitation', { roomId });
  //     game.init(p1, p2);
  //     game.getState();
  //     console.log('emitted turn and sent room');
  //     io.sockets.to(p1).emit('turn', { turn: 1 });
  //     io.sockets.to(p2).emit('turn', { turn: 0 });
    // }
  }
  function onDisconnect() {
    let list = Object.keys(io.engine.clients);
    let temp = connections.updateUser(list);
    connections.addToQueue(temp);
  }
  // function createRoom() {
  //   let link = connections.lastLink();
  //   io.on('connection', function(socket){
  //     socket.join(link.id);
  //   });
  //   console.log(io.sockets);
  //   io.to(link.id).emit('msg', 'msg');
  //
  // }
  // function linkData(link) {
  //   //console.log(link);
  // }

  function queue() {
    const clients = [];
      let id = Object.keys(io.sockets.adapter.rooms['lobby'].sockets)[0];
      clients.push(io.sockets.adapter.nsp.connected[id]);
      console.log('clients id' + clients[0].id);
    if (clients.length >= 2) {

      console.log(clients[0]);
      game.init(link.p1, link.p2);

      // live "waiting room"
      clients[0].leave('lobby');
      clients[1].leave('lobby');
      // and then join both to another room
      clients[0].join('game' + link.id);
      clients[1].join('game' + link.id);

    }
  }
  function move(response) {
    console.log('received move from client');
    let valid = serialize(ame.move(response.idx, response.turn));
    let p1 = serialize(game.getIds().p1)
    let p2 = serialize(game.getIds().p2)
    if (valid) {
      response = serialize(response);
      io.sockets.to(p1).emit('moveMade', { response })
      io.sockets.to(p2).emit('moveMade', { response })

    }
    //game.getState();
  }
  return {
    init: init,
    newConnect: newConnect,
    move: move
  }


}

module.exports = controller;
