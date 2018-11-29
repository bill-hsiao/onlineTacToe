function controller(socket, client) {

  function init() {
    connect(socket)
  }
  function connect(socket) {
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('joinInvitation', joinRoom)

    //socket.on('joinRoom', joinRoom)
    socket.on('setClientId', setClientId)
    socket.on('moveMade', updateMove)
    socket.on('msg', printMsg)
    //socket.on('joinInvitation', joinRoom)

  }

  function onConnect() {
    console.log('connection established')
    socket.emit('newConnection', socket.id)
  }

  function onDisconnect() {
    socket.emit('disconnect')
  }
  function joinRoom(link) {
    //socket.join(room.id, () => console.log(`joined room: ${room.id} `))
    socket.emit('acceptRoom', socket)
    socket.emit('linkData', {p1: link.p1, p2: link.p2, id: link.id})

    console.log(socket);
  }

  function setClientId() {
    client.setId(socket.id)
    socket.emit('clientReady', socket.id)
  }
  function sendMove(val) {
    let response = { idx: val, turn: client.getTurn()}
    socket.emit('move', response)
  }
  function updateMove(index) {
    console.log(index);
    client.updateBoard(index.move, index.turn)

  }
  function passViewData(data) {
    console.log('passed in data');
    sendMove(data);
  }
  function printMsg(msg) {
    console.log(msg);
  }
  //emitters only





  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect,
    joinRoom: joinRoom,
    sendMove: sendMove,
    passViewData: passViewData
  }







}


module.exports = controller
