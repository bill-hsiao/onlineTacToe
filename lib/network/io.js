function controller(io, game) {

  function init() {

    let l, q, r;
    let roomId = 0;
    let client = [];
    let games = [];
    io.on('connection', (socket) => {
      console.log(socket.id + ' connected');
      joinLobby(socket)
      console.log(l, q, r);
      joinQueue(socket)
      let temp;
      temp = joinRoom(socket, client);
      client = temp;
      if (client.length === 0) {
        let name = 'game ' + roomId
        io.to(name).emit('newGame', { name: name});


      }

      socket.on('disconnect', function (reason) {
        console.log(socket.id + ' disconnected');
        leaveRoom(socket)
        leaveQueue(socket)
        leaveLobby(socket)
      });
    });
    io.on('connection', function(socket) {
      socket.to('')('catch', {data: data})
    })



  function lobby(flag, socket) {
    this.lobby = [];
    if (!flag && !socket) {
      return this.lobby
    }
    if (!flag && socket) {
      this.lobby.push(socket)
    } else if (flag === 1) {
      let temp = this.lobby.indexOf(socket);
      this.lobby = this.lobby.splice(temp, 1)
    }
  }
  function joinLobby(socket) {
    lobby(0, socket)
    socket.join('lobby')
    console.log(socket.id + ' has joined the lobby');
  }

  function leaveLobby(socket) {
    lobby(1, socket)
    socket.leave('lobby')
    console.log(socket.id + ' has left the lobby');
  }

  function queue(flag, socket) {
    this.queue = [];
    if (flag == 0) {
      this.queue.push(socket)
      return this.queue
    } else if (flag == 1) {
      let temp = this.queue.indexOf(socket);
      if (temp == -1) {
        return false
      } else if (temp >= 0) {
        this.queue = this.queue.splice(temp, 1)
      }
    } else if (flag == 2) {
      let temp = this.queue.splice(0, 2);
      return temp
    }
  }

  function joinQueue(socket) {
    socket.join('queue')
    console.log(socket.id + ' has joined the queue');
    return queue(0, socket)

  }

  function leaveQueue(socket) {
    if (socket == undefined) {
      return false
    }
    queue(1, socket)
    socket.leave('queue')
    console.log(socket.id + ' has left the queue');
  }

  function queueSockets() {
    let sockets = queue(2)
    leaveQueue(sockets[0])
    leaveQueue(sockets[1])
    return sockets
  }

  function room(flag, socket1, socket2) {
    this.games = [];
    this.rooms = [];
    if (!flag) {
      this.rooms.push([]);
      this.rooms[this.rooms.length - 1].push(socket1)
      this.rooms[this.rooms.length - 1].push(socket2)
      this.games.push(game(this.rooms.length))
      console.log('room' +  this.rooms[this.rooms.length - 1]);
      return this.rooms.length - 1
    } else if (flag && !socket2) {
      for (let i = 0; i < this.rooms.length - 1; i ++) {
        let temp = this.rooms[i].indexOf(socket1);
        if (temp !== -1) {
          this.rooms[i] = this.rooms[i].splice(temp, 1)
          socket2 = this.rooms[i].pop();
          temp = this.rooms.indexOf(this.rooms[i])
          this.rooms = this.rooms.splice(temp, 1)
          break;
        }
      }
      return socket2;
    }
  }


  function joinRoom(socket, sockets, counter) {
    sockets.push(socket);
    if (sockets.length > 1) {
      let count = room(0, sockets[0], sockets[1])
      let roomName = 'game ' + roomId;
      sockets.pop().join(roomName)
      sockets.pop().join(roomName)
      roomId ++;
      let z = Object.keys(io.sockets.adapter.rooms[roomName].sockets);
      console.log('clients: ' + z + 'in room ' + roomName);
      io.to(roomName).emit('newGame');


    }
    console.log(sockets.length);
    return sockets
  }

  function leaveRoom(socket) {
    let socket2 = undefined;
    room(1, socket, socket2)
  }

}


return {
init: init
}

}

module.exports = controller;
