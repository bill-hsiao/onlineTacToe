function controller(io, game) {
  console.log('io on');
  let gameNum = 0;
  let clients = [2]
  function init() {
    io.on('connection', onConnect)
      // client.join('gameroom' + gameNum);
      // gameNum++

    // })
  }



  function onConnect(socket) {
    socket.join('lobby');
    socket.on('message', function() {})
    socket.on('disconnect', onClientDisconnect);
    socket.on('getSomeData', (data) => {
      console.log(data);
    })
    socket.on('updatePlayer', function(updatePlayer){
      console.log("Someone just moved on the map!")
      updatePlayer() // will trigger the client side function
    });
    socket.on('buttonValue', function(name, buttonValue){
    
      console.log(name)
      game.makeMove(name)
      buttonValue(name)
      // will trigger the client side function
    });
  }

  function joinGame(name, word, fn) {
    fn(name + word)

  }

  // function joinGame(client) {
  //   const clients = [];
  //   let id = Object.keys(io.sockets.adapter.rooms['lobby'].sockets)[0];
  //   clients.push(io.sockets.adapter.nsp.connected[id]);
  //   console.log('clients id' + clients[0].id);
  //   if (clients.length >= 2) {
  //     console.log(clients[0]);
  //     // live "waiting room"
  //     clients[0].leave('lobby');
  //     clients[1].leave('lobby');
  //     // and then join both to another room
  //     clients[0].join('game' + gameCounter);
  //     clients[1].join('game' + gameCounter);
  //
  //   }


  // }

  function onClientDisconnect() {
    //remove
  }

  return {
    init: init
  }

}

module.exports = controller
