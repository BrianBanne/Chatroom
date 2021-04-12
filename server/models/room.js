const { text } = require("express");
const Message = require("../models/message");
const { uuidv4 } = require("../utils");

class Room {
  constructor(roomName = "", hostId) {
    this.id = uuidv4();
    this.name = roomName;
    this.hostId = hostId;
    this.users = [];
    this.messages = [];
  }

  addUser(userId) {
    this.users.push({ userId: userId, messages: [] });
  }

  getAllUsers() {
    return {
      id: this.id,
      name: this.name,
      hostId: this.hostId,
      users: this.users,
    };
  }

  addMessage(userId, message) {
    this.messages.push({
      userId: userId,
      message: { text: message, timestamp: Date.now() },
    });
  }

  getMessages() {
    return this.messages;
  }
}

module.exports = Room;
