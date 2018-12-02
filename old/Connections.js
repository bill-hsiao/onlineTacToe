class serverController {
  constructor() {
    this.totalConnections = [];
    this.queue = [];
    this.links = [];
    this.rooms = [];
  }
  addUser(userId) {
    this.totalConnections.push(userId);
  }
  addToQueue(userId) {
    this.queue.push(userId);
    if (this.queue.length < 2) {
      console.log(this.queue);
    } else if (this.queue.length === 2) {
      let p1 = this.queue.shift();
      let p2 = this.queue.shift();
      let id = [p1.substring(0, 11), p2.substring(0, 11)].join('');
      let link = {
        p1: p1,
        p2: p2,
        id: id
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
      if (dc === this.links[i].p1 || dc === this.links[i].p2) {
        const link = this.links[i];
        this.links = this.links.splice(i, 1);
        if (dc === link.p1) {
          container = link.p2
          break
        }
        if (dc === link.p2) {
          container = link.p1
          break
        }
      }
    }
    return container
  }
  lastLink() {
    return this.links[this.links.length - 1]
  }
}

module.exports = serverController
