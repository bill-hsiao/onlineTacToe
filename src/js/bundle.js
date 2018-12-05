(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const socket = io.connect('http://localhost:3000')
const app = require('./sockets')(socket)



app.init()

init()




function init() {
  let board = [...document.getElementsByClassName('game_unit')]
  //console.log(typeof board);
  board.forEach(function(button) {
     button.addEventListener('click', getValue)
   })
  console.log(board);
}
function getValue(evt) {
  let val = evt.target.id;
  //app.updatePlayer()
  app.buttonValue(val)
  //client.passViewData(val, app.sendMove);

  //render
}

},{"./sockets":2}],2:[function(require,module,exports){
function controller (socket) {


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
})

  }
  return {
    init: init,
    updatePlayer:updatePlayer,
    buttonValue: buttonValue
  }
}

module.exports = controller

},{}]},{},[1]);
