const User = require("./models/user");
const Room = require("./models/room");

const ROOMS = [];
const USERS = [];

const room = new Room("Det kule roomet");
const user1 = new User("Hans");
const user2 = new User("Brian");

room.addUser(user1.userId);
room.addUser(user2.userId);
room.addMessage(user1.userId, "Hei hei");
room.addMessage(user1.userId, "God dag ");
room.addMessage(user2.userId, "Heisann");
ROOMS.push(room);

module.exports = { ROOMS, USERS };
