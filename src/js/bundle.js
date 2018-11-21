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
  return new User(userId)
}

module.exports = newUser;

},{}],2:[function(require,module,exports){
var socket = io.connect('http://localhost:1234');
var app = require('./socket.js')(socket);
app.init(socket);






(function name() {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
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

},{"./socket.js":3}],3:[function(require,module,exports){
var User = require('./User.js');


///fix this later
function client(argument) {
  const user = new User(argument);
  return user
}
///////



function controller(socket) {

  function init() {
    socket = io.connect('http://localhost:1234');
    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
  }

  function onConnect() {
    let user = client(socket.id);
    if (!user.id) {
      return
    }
    console.log(user);
    socket.emit('newUser', user.id);
    console.log('from onConnect function');
  }
/////fixxx
  function onDisconnect() {
    let user = client(socket.id);
    socket.emit('leave', user.id);
    socket.emit('disconnect', user.id)
  }
//////fix
  function newPlayer(user) {
    console.log(user);
    //player.setId(user.id)
    //console.log(player.id);
  }



  return {
    init: init,
    onConnect: onConnect,
    onDisconnect: onDisconnect
    //newPlayer: newPlayer

  }
}

module.exports = controller;

},{"./User.js":1}]},{},[2]);
