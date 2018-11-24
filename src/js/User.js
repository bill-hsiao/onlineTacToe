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
  const user = new User(userId)
  return user
}

module.exports = newUser;