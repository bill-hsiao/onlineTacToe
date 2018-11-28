class User {
  constructor(id) {
    this.id = id;
  }
  static new(user) {
    const users = [];
    users.push(user)
    return users
  }
}

function userInstance(id) {
  const userInstance = new User(id)
  return userInstance
}

module.exports = User;
