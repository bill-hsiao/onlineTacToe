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
