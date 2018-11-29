function controller(io, connections, game) {

  function init() {
    io.on('connection', onConnect)
    console.log('initialized io controller');
  }

  function onConnect(socket) {
    socket.on('newConnection', newConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('acceptRoom', createRoom)
    socket.on('linkData', linkData)

    socket.on('move', move)
    // socket.join
    //socket.join('')
  //  socket.on('room', )
    //console.log(socket);
    return socket

  }

  function newConnect(userId) {
    //let userId = socket.id;
    console.log(`client ${userId} has connected`);
    io.sockets.to(userId).emit('setClientId', userId);
    connections.addUser(userId);
    connections.addToQueue(userId);
    if (connections.queue.length < 1) {
      let link = connections.lastLink();
      console.log(link);
      io.on('connection', function(socket){
        socket.join(link.id);
        console.log(socket.id + 'joined ' + link.id);
      });
      io.sockets.to(link.p1).emit('joinInvitation', { link });
      io.sockets.to(link.p2).emit('joinInvitation', { link });
      game.init(link.p1, link.p2)
      game.getState()
      console.log('emitted turn and sent room');
      io.sockets.to(link.p1).emit('turn', { turn: 1 });
      io.sockets.to(link.p2).emit('turn', { turn: 0 });
    }
  }
  function onDisconnect() {
    let list = Object.keys(io.engine.clients);
    let temp = connections.updateUser(list);
    connections.addToQueue(temp);
  }
  function createRoom() {
    let link = connections.lastLink();
    io.on('connection', function(socket){
      socket.join(link.id);
    });
    console.log(io.sockets);
    io.to(link.id).emit('msg', 'msg');

  }
  function linkData(link) {
    //console.log(link);
  }
  function move(response) {
    console.log('received move from client');
    let valid = game.move(response.idx, response.turn);
    let p1 = game.getIds().p1
    let p2 = game.getIds().p2
    if (valid) {
      io.sockets.to(p1).emit('moveMade', { response })
      io.sockets.to(p2).emit('moveMade', { response })

    }
    game.getState();
  }
  return {
    init: init,
    newConnect: newConnect,
    onDisconnect: onDisconnect,
    move: move
  }


}

module.exports = controller;
