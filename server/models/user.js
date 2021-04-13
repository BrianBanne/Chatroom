const { uuidv4 } = require("../utils");

class User {
  constructor(username) {
    this.username = username;
    this.userId = uuidv4();
  }

  getUser() {
    return { username: this.username, id: this.userId };
  }
}

module.exports = User;
