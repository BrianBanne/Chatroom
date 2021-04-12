const express = require("express");
const app = express();
const apiRoutes = require("./routes");
PORT = 8000;

app.get("/", (req, res) => {
  res.json("This is the server");
});

app.use("/api", apiRoutes);

app.listen(8000, () => console.log(`Server is listening at port ${PORT}`));

//Global containers for users and rooms

const ROOMS = [];
const USERS = [];

module.export = { ROOMS, USERS };
