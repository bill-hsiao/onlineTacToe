// const app = require('./socket')
function events(app, client) {
  //add listener to game
  function init() {
    let board = [...document.getElementsByTagName('button')]
    console.log(typeof board);
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
    //client.passViewData(val, app.sendMove);

    //render
  }


  function render(data) {
    let counter = 0;
    for (let i = 0; i < 3; i ++) {
      let cells = document.getElementsByClassName(i);
      for (let j = 0; j < 3; j ++) {
        let cell = cells[j]
        console.log(cell.textContent);
        if (cell.textContent !== data[counter]) {
          cell.textContent = data[counter];
          counter++
        }
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
    init: init
  }
}

module.exports = events
