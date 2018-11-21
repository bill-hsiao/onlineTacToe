(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var socket = io.connect('http://localhost:4000');
var app = require('./socket.js')(socket);
app.init(socket);






(function form() {

  const form = {
    root: document.getElementById('name_form'),
    field: document.getElementById('name_field'),
    submit: document.getElementById('name_submit'),
    value: ""
  }


  form.field.addEventListener('keydown', function(evt) {
    form.value = evt.target.value;
    form.field.value = evt.target.value;
  });

  form.submit.addEventListener('click', function() {
    form.root.classList.add('hidden')
    console.log(form.root);

    //form.value = evt.target.value;
  });

  return form.value;
})();

},{"./socket.js":2}],2:[function(require,module,exports){
function controller(socket) {

  function init() {
    socket = io.connect('http://localhost:4000');
    connect(socket);
  }

  function connect(socket) {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newPlayer', newPlayer);
    socket.on('receiveUserId', newPlayer);
  }

  function onConnect() {
    let userId = socket.id;
    if (!userId) {
      return
    }
    socket.emit('newUser', userId);
  }

  function onDisconnect() {
    let userId = socket.id;
    this.broadcast.emit(userId);
    this.emit('disconnect', userId)
  }

  function newPlayer(userId) {
    console.log(userId.id);
  }



  return {
    init: init,
    onConnect: onConnect,
    newPlayer: newPlayer,
    onDisconnect: onDisconnect
  }
}

module.exports = controller;

},{}]},{},[1]);
