const { USERS } = require("../database");
const User = require("../models/user");
const { isUserAuth } = require("../utils");

function addUser(req, res) {
  const username = req.body.username;
  const newUser = new User(username);
  USERS.push(newUser);

  return res
    .status(200)
    .json({ user: { username: newUser.username, userId: newUser.userId } });
}

function getUserFromId(req, res) {
  const userId = req.params.id;
  const user = USERS.find((user) => {
    if (user.userId === userId) return user;
  });
  if (user === undefined)
    return res.status(400).json({ error: "Could not find requested user" });

  return res.status(200).json({ user: user });
}

function getAllUsers(req, res) {
  //User validation ?? kanskje
  return res.status(200).json({ users: USERS });
}

function deleteUserFromId(req, res) {
  const userId = req.params.id;

  USERS.splice(
    USERS.findIndex(user => user.userId === userId),
    1
  );

  return res.status(200).json({ users: USERS });
}

module.exports = {
  addUser,
  deleteUserFromId,
  getAllUsers,
  getUserFromId,
};
