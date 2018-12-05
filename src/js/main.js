const socket = io.connect('http://localhost:3000')
const app = require('./sockets')(socket)

const state = {
  view: null
}

app.init()

gameUnit.init()


const gameUnit = {
  init: init,
  getValue: getValue
}

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
  updateElements() {

  }
  //client.passViewData(val, app.sendMove);

  //render
}
function updateElements()
//
// function init() {
//   let board = [...document.getElementsByClassName('game_unit')]
//   //console.log(typeof board);
//   board.forEach(function(button) {
//      button.addEventListener('click', getValue)
//    })
//   console.log(board);
// }
// function getValue(evt) {
//   let val = evt.target.id;
//   //app.updatePlayer()
//   app.buttonValue(val)
//   //client.passViewData(val, app.sendMove);
//
//   //render
// }
