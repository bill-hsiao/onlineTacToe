function controller (socket) {
  const state = Array(9).fill(undefined)

  function init() {
    socket.on('connect', function () {
      console.log('connected');
      socket.send('hi')
      socket.on('message', function(msg) {
        console.log(msg);
      })
    });
  }
  function updatePlayer() {
    socket.emit('updatePlayer', function(){
  console.log('testing');
})
}
function buttonValue(val) {
  socket.emit('buttonValue', val, function(){
console.log('testing' + val);
state(val)

})

  }
  return {
    init: init,
    updatePlayer:updatePlayer,
    buttonValue: buttonValue
  }
}

module.exports = controller
