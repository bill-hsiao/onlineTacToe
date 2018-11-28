class Connections {
  constructor() {
    this.totalConnections = [];
    // this.totalConnection = (userId, idx) => {
    //   const totalConnections = []
    //   if (userId && !idx) {
    //     totalConnections.push(userId)
    //   }
    //   if (!userId && idx) {
    //     totalConnections.splice((idx - 1), 1)
    //   }
    //   return totalConnections
    // }
    this.queue = [];
    this.links = [];
    // this.clearQueue = function() {
    //   if (this.queue.length >= 2) {
    //     let link = {
    //       p1: this.queue.pop(),
    //       p2: this.queue.pop()
    //     }
    //     this.links.push(link)
    //   }
    // }
  }
  addUser(userId) {
    this.totalConnections.push(userId);
    // this.totalConnection(userId, 0)
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
    }
  }
  updateUser(updated) {

    let current = this.totalConnections;
    let dc = "";
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
      let container;
      container = (dc === this.links[i].p1 ?
      this.links[i] : dc === this.links[i].p2 ?
      this.links[i] : null)
      if (container !== null) {
        this.links = this.links.splice(i, 1)
        console.log('found index of container');
        break
      }
    }


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
  // newLink(a, b) {
  //   let link = {
  //     p1: a,
  //     p2: b
  //   }
  //   this.links.push(link)
  //   console.log(this.links[this.links.length]);
  // }
  lastLink() {
    return this.links[this.links.length - 1]
  }


  // discObj(userId) {
  //   return {
  //     userId: userId,
  //     idx: 0
  //   }
  // }
}



function connectionsInstance() {
  const connectionsInstance = new Connections
  return connectionsInstance
}

module.exports = connectionsInstance
