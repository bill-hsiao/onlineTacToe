

class Connections {
  constructor() {
    this.totalConnections = [];
    this.queue = [];
    this.links = [];
  }
  addUser(userId) {
    this.totalConnections.push(userId);
  }
  addToQueue(userId) {
    this.queue.push(userId);
    if (this.queue.length < 2) {
      console.log(this.queue);
    } else if (this.queue.length === 2) {
      let link = {
        p1: this.queue.shift(),
        p2: this.queue.shift()
      };
      this.queue = this.queue.splice(0, 2)
      console.log(this.queue);
      this.links.push(link)
      console.log('new link');
    }
  }
  updateUser(updated) {
    let current = this.totalConnections;
    let dc = "";
    let container = "";
    let temp = "";
    //find the dcuser
    //remove from total connections
    //iterate throguh links
    //find link Object
    //remove it
    //take link re add to queue
    //total connection
    for (let i = 0; i < current.length; i ++) {
      if (updated[i] !== current[i]) {
        dc = current[i]
        current = current.splice(i, 1)
        console.log(`<<<user: ${dc} has disconnected<<<`);
        console.log(i);
        break
      }
    }
    for (let i = 0; i < this.queue.length; i ++) {
      if (this.queue[i] === dc) {
        this.queue = this.queue.splice(i, 1)
        console.log(`new queue${this.queue}`);
        break
      } else {
        console.log(`dc not in queue`);
      }
    }
    for (let i = 0; i < this.links.length; i ++) {
      container = (dc === this.links[i].p1 ?
      this.links[i] : dc === this.links[i].p2 ?
      this.links[i] : null)
      if (container !== null) {
        this.links = this.links.splice(i, 1)
        console.log('found index of container');
        break
      }
    }
    temp = (container.p1 === dc ? container.p2 : container.p1);
    return temp
  }
  lastLink() {
    return this.links[this.links.length - 1]
  }
}

module.exports = Connections
