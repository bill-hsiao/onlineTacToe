(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Client {
  constructor() {
    this.id = "";
    this.turn = null;
    this.data = [];
  }
  setId(id) {
    this.id = id
    console.log(this.id);
  }
  setTurn(turn) {
    this.turn = (turn ? 1 : 0)
    console.log(this.turn);
  }
  getTurn() {
    return this.turn
  }
  setMove(val) {
    return val
  }
  updateBoard(idx, turn) {
    this.data[idx] = turn
  }
}

module.exports = Client;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
class State {
  constructor() {
    this.client = null;
    this.opponent = null;
    this.game = [];
  }

  addPlayer(playerId) {
    this.client = playerId
    console.log('added client');
    console.log(this.client);
  }

  addOpponent(opponentId) {
    this.opponent = opponentId
    console.log('added opoonent');
    console.log(this.opponent);
  }



}

function stateInstance() {
  const state = new State;
  return state
}

module.exports = stateInstance;

},{}],4:[function(require,module,exports){
const socket = io.connect('http://localhost:1234');
const app = require('./socket.js')(socket);



app.init();



document.getElementById('game_area').addEventListener('click', getValue)

function getValue(evt) {
  let val = evt.target.id;
  console.log(val);
  app.sendMove(val);
}


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

},{"./socket.js":5}],5:[function(require,module,exports){
const state = require('./clientState')();
const user = require('./User.js')();
const Client = require('./Client');
const client = new Client


function controller(socket, data) {

  function init() {
    //socket = io.connect('http://localhost:1234');
    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
    socket.on('turn', getLink);
    //name moves/controllers
    socket.on('sendName', sendName);
    socket.on('setName', setName);

    socket.on('playerOne', playerOne);
    socket.on('playerTwo', playerTwo);
    //game moves/controllers
    socket.on('sendMove', sendMove);


  }

  function onConnect() {
    if (!socket.id) {
      return
    }
    socket.emit('newUser', socket.id);
    client.setId(socket.id)
    socket.emit('clientReady', socket.id);
  //  socket.on('disconnect', onDisconnect);
  }
/////fixxx
  function onDisconnect() {
    //let user = client(socket.id);

    socket.emit('userLeave');
    socket.emit('disconnect')
  }

  function getLink(turn) {
    client.setTurn(turn.turn)

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

  function playerOne(players) {
    state.addPlayer(players.p1)
    state.addOpponent(players.p2)
  }
  function playerTwo(players) {
    state.addPlayer(players.p2)
    state.addOpponent(players.p1)
  }

  function sendMove(idx) {
    let idx1 = client.setMove(idx);
    let turn = client.getTurn();
    socket.emit('move', {idx: idx1, turn: turn})
  }
  function updateMove() {

  }



  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect,
    sendMove: sendMove,
    sendName: sendName

    //newPlayer: newPlayer

  }
}

module.exports = controller;

},{"./Client":1,"./User.js":2,"./clientState":3}]},{},[4]);
