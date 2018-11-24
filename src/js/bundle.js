(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class User {
  constructor(userId) {
      this.id = userId;
      this.name = "";
      this.first = null;
  }
  // setId(userId) {
  //   this.id = userId;
  // }
  setName(userName) {
    this.name = userName;
  }
  setFirst(num) {
    this.first = (num ? true : false)
  }
}

function newUser(userId) {
  const user = new User(userId)
  return user
}

module.exports = newUser;

},{}],2:[function(require,module,exports){
class State {
  constructor() {
    this.client = null;
    this.opponent = null;
  }
  addPlayer(playerId) {
    this.client = playerId
  }
  addOpponent(opponentId) {
    this.opponent = opponentId
  }
}

function stateInstance() {
  const state = new State;
  return state
}

module.exports = stateInstance;

},{}],3:[function(require,module,exports){
const socket = io.connect('http://localhost:1234');
const app = require('./socket.js')(socket);



app.init();






(function name() {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
    app.sendName(string);
    return display.value

  }

  (function () {
    const form = {
      root: document.getElementById('name_input'),
      field: document.getElementById('name_input_field'),
      submit: document.getElementById('name_input_submit'),
      value: ""
    }

    form.field.addEventListener('keydown', function(evt) {
      form.value = evt.target.value;
      form.field.value = evt.target.value;
    });

    form.submit.addEventListener('click', function() {
      form.root.classList.add('hidden')
      output(form.value)
    });

    return form.value;
  })();
})();

},{"./socket.js":4}],4:[function(require,module,exports){
const state = require('./clientState')();
const user = require('./User.js')();


function controller(socket, data) {

  function init() {
    socket = io.connect('http://localhost:1234');

    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);

    //name moves/controllers
    socket.on('sendName', sendName);
    socket.on('setName', setName);

    socket.on('receiveOpponent', receiveOpponent);
    //game moves/controllers
    socket.on('sendMove', sendMove);


  }

  function onConnect() {
    if (!socket.id) {
      return
    }
    socket.emit('newUser', socket.id);
  //  socket.on('disconnect', onDisconnect);
  }
/////fixxx
  function onDisconnect() {
    //let user = client(socket.id);
    console.log(user.id);
    socket.emit(user.id)
    socket.emit('userLeave');
    //socket.emit('disconnect')
  }
//////fix
  function newPlayer(user) {
    state.addPlayer(user.id)
  }

  function sendName(name) {
    console.log(name);
    socket.emit('sendName', {id: socket.id, name: name})
  }

  function setName(response) {
    console.log(response);
    user.setName(response.name)
  }

  function receiveOpponent() {

  }

  function sendMove() {

  }
  function updateMove() {

  }



  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect,
    sendName: sendName

    //newPlayer: newPlayer

  }
}

module.exports = controller;

},{"./User.js":1,"./clientState":2}]},{},[3]);
