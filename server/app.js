const express = require("express");
const app = express();
const apiRoutes = require("./routes");
PORT = 8000;

const User = require('./models/user')

app.get("/", (req, res) => {
  res.json("This is the server");
});

app.use("/api", apiRoutes);

app.listen(8000, () => console.log(`Server is listening at port ${PORT}`));

//Global containers for users and rooms

const user1 = new User('Hans')
const user2 = new User('Brian')
console.log(user1.getUser());
console.log(user2.getUser());

const ROOMS = [];
const USERS = [];

module.export = { ROOMS, USERS };
