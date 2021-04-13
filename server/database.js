const User = require("./models/user");
const Room = require("./models/room");

let ROOMS = [];
let USERS = [];

const room = new Room("Det kule roomet");
const user1 = new User("Hans");
const user2 = new User("Brian");

room.addUser(user1);
room.addUser(user2);
room.addMessage(user1, "Hei hei");
room.addMessage(user1, "God dag ");
room.addMessage(user2, "Heisann");
ROOMS.push(room);

module.exports = { ROOMS, USERS };
