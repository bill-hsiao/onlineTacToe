function game() {
  this.round = Array(9).fill(null)
  return this.round
}



function init() {
  game.call(game)

}

function move(id) {
  //checking if it's empty
  if (this[id] === null) {
    this[id]++;
    return this[id]
  } else if(this[id] === 1) {
//mov
  } else {

  }

}
