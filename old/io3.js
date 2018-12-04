function controller(io, game) {

  function init() {

    const clients = [];
    const inQueue = [];
    const games = [];
    io.on('connection', (socket) => {
      console.log(socket.id + ' connected');
      joinLobby(socket);
      joinQueue(socket);
      if (queue.length === 2) {
        leaveQueue(socket);
        joinRoom(socket);
        let rooms = Object.keys(socket.rooms);
        console.log(socket.rooms);
      }
      socket.on('disconnecting', (reason) => {
        // let rooms = Object.keys(socket.rooms);
        // console.log(socket.rooms);
        leaveLobby(socket);
        leaveRoom(socket;
        queueFind();
      });
      socket.on('disconnect', (reason) => {
        console.log(socket.id + ' disconnected');
      });
    });
    function lobby(socket, flag) {
      this.lobby = [];
      if (flag) {
        this.lobby.push(socket)
      } else if (!flag) {
        let temp = this.lobby.indexOf(socket);
        this.lobby = this.lobby.splice(temp, 1)
      }
    }
    function joinLobby(socket) {
      lobby(socket, 1)
      socket.join('lobby')
      console.log(socket.id + ' has joined the lobby');
    }
    function leaveLobby(socket) {
      lobby(socket, 0)
      socket.leave('lobby')
      console.log(socket.id + ' has left the lobby');
    }
    function queue(socket, flag) {
      this.queue = [];
      if (flag) {
        this.queue.push(socket)
      } else if (!flag) {
        let temp = this.queue.indexOf(socket);
        this.queue = this.queue.splice(temp, 1)
      }
    }
    function joinQueue(socket) {
      queue(socket, 1)
      socket.join('queue')
      console.log(socket.id + ' has joined the queue');
    }
    function leaveQueue(socket) {
      queue(socket, 0)
      socket.leave('queue')
      console.log(socket.id + ' has left the queue');
    }

    function room(flag, socket, id) {
      this.room = [];
      if (flag) {
        this.room.push(socket)
      } else if (!flag) {
        let temp = this.room.indexOf(socket);
        this.room = this.room.splice(temp, 1)
        return temp
      }
    }
    function joinRoom(socket, game) {
      room(socket, 1)
      socket.join('room ' + room.length)
      console.log(socket.id + ' has joined the room');
    }
    function leaveRoom(socket, game) {
      id = room(socket, 0)
      socket.leave('room ' + id)
      console.log(socket.id + ' has left room ' + id);
    }
  }

  return {
    init: init
  }
}
module.exports = controller;
