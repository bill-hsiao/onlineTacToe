(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

},{}],2:[function(require,module,exports){
class Client {
  constructor() {
    this.id = "";
    this.turn = null;
    this.data = [null, null, null, null, null, null, null, null, null];
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
  updateBoard(idx, turn, method) {
    this.data[idx] = turn
    method(idx, turn)
  }
  getData() {
    return this.data
  }
  opponentMove(method) {
    method()
  }
  pushUpdate() {
    
  }
  //test

  passViewData(data, callback) {
    console.log('passed in data');
    if (callback) {
      callback(data);
    }
    return data
  }


}

module.exports = Client;

},{}],3:[function(require,module,exports){
// const app = require('./socket')
function events(app, client) {
  //add listener to game
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
    console.log(val);
    let data = client.getData();
        render = render.bind(document.body)
        render(data)
    client.passViewData(val, app.sendMove(val));
    app.sendMove(val);
    //client.passViewData(val, app.sendMove);

    //render
  }


  function render(data) {
    let board = [...document.getElementsByClassName('game_unit')]
    for (let i = 0; i < 9; i ++) {
      if (board[i].innerText !== data[i]) {
        board[i].innerText = data[i]
      }
    }
  }


  function renderElement(id, value) {
    let temp = document.getElementById(id);
    temp.innerText = value;
  }
  return {
    renderElement: renderElement,
    getValue: getValue,
    render: render,
    init: init
  }
}

module.exports = events

},{}],4:[function(require,module,exports){
const Client = require('./Client');
const socket = io.connect('http://localhost:1234')
const client = new Client
const app = require('./socket')(socket, client)
const events = require('./events');
const set = events(app, client)

const nameForms = require('./nameHandler')();








app.init()
set.init();

},{"./Client":2,"./events":3,"./nameHandler":5,"./socket":6}],5:[function(require,module,exports){
function name(methods) {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
    //methods(string);
    return display.value

  }

  (function () {
    const form = {
      root: document.getElementById('name_input'),
      field: document.getElementById('name_input_field'),
      // submit: document.getElementById('name_input_submit'),
      value: ""
    }

    form.field.addEventListener('keydown', function(evt) {
      form.value = evt.target.value;
      form.field.value = evt.target.value;
      if (evt.which == 13 || event.keyCode == 13) {
        (function() {
          form.root.classList.add('hidden')
          form.field.classList.add('hidden')
          output(form.value)
        })();
      }
    });

    // form.submit.addEventListener('click', function() {
    //   form.root.classList.add('hidden')
    //   output(form.value)
    // });

    return form.value;
  })();
}

module.exports = name

},{}],6:[function(require,module,exports){
const serializer = require('./../../bin/helpers')

function controller(socket, client) {

  function current(socket) {
    this.socket = socket;
  }
  function init() {
    connect()
  }
  function connect() {
    socket.on('connect', onConnect);
    // socket.on('joinInvitation', joinRoom);

    socket.on('setClientId', setClientId);
    socket.on('moveMade', updateMove);
    socket.on('msg', printMsg);
    //socket.on('joinInvitation', joinRoom)


  }

  function onConnect(socket) {
    current(socket);
    console.log('connection established')
    socket.emit('newConnection', socket.id)
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

  function setClientId() {
    client.setId(socket.id)
    // socket.emit('clientReady', socket.id)
  }
  function sendMove(val) {
    current(socket);
    val = serializer(val);
    let turn = serializer(client.getTurn());
    let response = { idx: val, turn: turn}
    response = serializer(response)
    socket.emit('move', response)
  }
  function updateMove(index, cb) {
    console.log(index);
    client.updateBoard(index.move, index.turn)
    //client.opoonentMove();
    //updateReceived(socket,  )

  }
  function passViewData(data) {
    console.log('passed in data');
    sendMove(data);
  }
  function updateReceived(socket, method) {
      let data = client.getData();
      socket.emit('pushUpdate', socket)
      method(data);
  }

  function printMsg(msg) {
    console.log(msg);
  }
  //emitters only





  return {
    init: init,
    onConnect: onConnect
    // joinRoom: joinRoom
  }







}


module.exports = controller

},{"./../../bin/helpers":1}]},{},[4]);
