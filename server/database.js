const User = require("./models/user");
const Room = require("./models/room");

let ROOMS = [];
let USERS = [];

const room = new Room("Det kule roomet");
const user1 = new User("Hans");
const user2 = new User("Brian");

room.addUser(user1);
room.addUser(user2);
room.addMessage(user1, "This is a message from the authors");
room.addMessage(user2, "Hope you are having a wonderful day!");
ROOMS.push(room);

module.exports = { ROOMS, USERS };
