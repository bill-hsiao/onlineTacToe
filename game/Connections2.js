class Connections {
  constructor() {
    this.totalConnections = [];
    this.queue = [];
    this.links = [];

  }
  addUser(userId) {
    const
  }
  updateUsers(newConnections) {
    const updated = newConnections;
    let current = this.totalConnections;
    const dcuser = {id: "", idx: 0};
    let orphan;
    for (let i = 0; i <= current.length; i ++) {
      if (updated[i] !== current[i]) {
        dcuser.id = current[i];
        current = current.splice(i, 1)
        console.log(`<<<${dcuser.id} has disconnected<<<`);
        // this.totalConnections = this.totalConnections.splice((i - 1), 1);
        //test
      }
      //test
        if (this.queue[0] === dcuser.id) {
          console.log(`***${dcuser.id} was in queue***`);
          //this.queue = this.queue.splice(this.queue.length - 1, 1)
          this.queue.pop();
          console.log('new queue' + this.queue);


        } else if (this.links.length !== 0) {
          dcuser.idx = (i = (i - (i % 2 === 0 ? 0 : 1)) / 2);
          let pendDel = this.links[dcuser.idx];
          // this.links = this.links.splice(dcuser.idx, 1);

          orphan = (dcuser.id === pendDel.p1 ? pendDel.p1 : pendDel.p2);

          this.links = this.links.splice(dcuser.idx, 1);

          if (this.queue.length === 0) {
            this.queue.push(orphan)
            console.log(`pushed orphan:${orphan} back in queue, queue: ${this.queue}`);
          } else if (this.queue.length === 1) {
            this.queue.push(orphan);
            let link = {
              p1: this.queue.pop(),
              p2: this.queue.pop()
            }

            this.links.push(link)
          }


          // if (dcuser.id === pendDel.p1) {
          //   console.log(`>>>${pendDel.p2} back in queue`);
          //   this.queue.push(pendDel.p2)
          // } else if (dcuser.id === pendDel.p2) {
          //   console.log(`>>>${pendDel.p1} back in queue`);
          //   this.queue.push(pendDel.p1)
          // }
        }
        //current = current.splice((i - 1), 1);
        console.log(current);
        console.log(this.queue, this.links);
        //test
      // }
      //test
      break
    }
    // console.log(`<<<${dcuser.id} has disconnected`);
  }

  lastLink() {
    return this.links[this.links.length - 1]
  }


}

class User extends Connections {
  constructor() {
    super();
  }
}


function connectionsInstance() {
  const connectionsInstance = new Connections
  return connectionsInstance
}

module.exports = connectionsInstance
