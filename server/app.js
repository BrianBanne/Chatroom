const express = require("express");
const app = express();
const apiRoutes = require("./routes");
PORT = 8000;

const User = require('./models/user')
const Room = require('./models/room')


app.get("/", (req, res) => {
  res.json("This is the server");
});

app.use("/api", apiRoutes);

app.listen(8000, () => console.log(`Server is listening at port ${PORT}`));

//Global containers for users and rooms

const user1 = new User('Hans')
const user2 = new User('Brian')

const room = new Room('Det kule roomet')
room.addUser(user1.userId)
room.addUser(user2.userId)
room.addMessage(user1.userId, 'Hei hei')
room.addMessage(user1.userId, 'God dag ')
room.addMessage(user2.userId, 'Heisann')
 
console.log('get', room.getMessages());
//console.log('rom', room);

const ROOMS = [];
const USERS = [];

module.export = { ROOMS, USERS };
