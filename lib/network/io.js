function controller(io, game) {

  function init() {
    //client tracker
    const clients = [];
    const inQueue = [];

    io.on('connection', (socket) => {
      socket.join('lobby');
      queue();
      console.log(socket.rooms);

//listeners here 


      socket.on('disconnecting', (reason) => {
        let rooms = Object.keys(socket.rooms);
        console.log(socket.rooms);
      })
      socket.on('disconnect', (reason) => {
        console.log(reason);
      });


    });



  function queue() {
    if (inQueue.length == 2) {
      for (let i = 0; i < 2; i ++) {
        console.log(inQueue[i])
        console.log(clients[i]);
        inQueue.pop()
        inQueue.pop()
        game.init(...inQueue)


      }
    }
    let lobby = Object.keys(io.sockets.adapter.rooms['lobby'].sockets);
    console.log(lobby);
    let id = (lobby.length % 2 ? lobby[0] : lobby[1])
    inQueue.push(io.sockets.adapter.nsp.connected[id]);
    clients.push(io.sockets.adapter.nsp.connected[id]);
      io.of('/').in('lobby').clients((error, clients) => {
        if (error) throw error;
        console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
      });

      // function ifLengthTwo() {
      //   let i = 0;
      //     inQueue[i]
      //     clients[i]
      //     // inQueue.forEach((client, client) => {
      //     //   console.log(client);
      //     //   // queued.join('game' + count);
      //       //
      //       // queued.leave('lobby');
      //     // });
      //
      //     game.init(...inQueue)
      //     count ++;
      //   }
      }
  }

return {
  init: init
  }
}
module.exports = controller;
