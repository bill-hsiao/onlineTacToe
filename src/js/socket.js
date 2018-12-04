// const serializer = require('./../../bin/helpers')

function controller(socket, client) {

  // function current(socket) {
  //   this.socket = socket;
  // }
  function init() {
    connect()
  }
  function connect() {
    socket.on('connect', onConnect);
    socket.on('newGame', newGame);
    socket.on('catch', catch)
    // socket.on('joinInvitation', joinRoom);

    // socket.on('newGame', newGame);
    // socket.on('moveMade', updateMove);
    // socket.on('msg', printMsg);
    //socket.on('joinInvitation', joinRoom)


  }

  function onConnect(socket) {
    console.log('connection established')
    socket.emit('getRoomNumber')

  }

  //function onDisconnect() {
    //socket.emit('disconnect')
//  }
  // function joinRoom(link) {
  //   let response = {p1: link.p1, p2: link.p2, id: link.id};
    // response = serializer(response);
    // socket.emit('acceptRoom', socket);
    // socket.emit('linkData', response)

    // console.log(socket);
  // }

  function newGame(room) {
    console.log('new game' + room.name);
    socket.emit('getRoomNumber')
    // socket.emit('clientReady', socket.id)
  }
  function catch(data) {
    console.log(data);
  }
  // function sendMove(val) {
  //   current(socket);
  //   val = serializer(val);
  //   let turn = serializer(client.getTurn());
  //   let response = { idx: val, turn: turn}
  //   response = serializer(response)
  //   socket.emit('move', response)
  // }
  // function updateMove(index, cb) {
  //   console.log(index);
  //   client.updateBoard(index.move, index.turn)
  //   //client.opoonentMove();
  //   //updateReceived(socket,  )
  //
  // }
  // function passViewData(data) {
  //   console.log('passed in data');
  //   sendMove(data);
  // }
  // function updateReceived(socket, method) {
  //     let data = client.getData();
  //     socket.emit('pushUpdate', socket)
  //     method(data);
  // }




  return {
    init: init,
    newGame: newGame,
    onConnect: onConnect
  }





}



module.exports = controller
