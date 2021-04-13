const { uuidv4 } = require("../utils");

class Room {
  constructor(roomName = "", hostId) {
    this.id = uuidv4();
    this.name = roomName;
    this.hostId = hostId;
    this.users = [];
    this.messages = [];
  }

  addUser(user) {
    this.users.push({ ...user, messages: [] });
  }

  getAllUsers() {
    return {
      id: this.id,
      name: this.name,
      hostId: this.hostId,
      users: this.users,
    };
  }

  addMessage(user, message) {
    this.messages.push({
      ...user,
      message: { text: message, timestamp: Date.now() },
    });
  }

  getMessages() {
    return this.messages;
  }
}

module.exports = Room;
