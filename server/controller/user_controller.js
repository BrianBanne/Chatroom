const { USERS } = require("../database");
const User = require('../models/user')

function add_user(req, res) {
  const username = req.body.name;
  console.log(username);
  let newuser = new User(username);
  USERS.push(newuser);

  return res.status(200).json({ username: newuser.username, userId:  newuser.userId });
}

function delete_user_from_id(req, res) {
  const userId = req.params.id;

  for (let user in USERS) {
    if (user.id() === userId) {
      delete user;
      return json("User removed");
    } else {
      json("Cant remove user");
    }
  }

  return res.status(200).json({ userId: userId });
}

function get_all_users(req, res) {
  const username = req.params.name;
  let userlist = [];
  //kanskje den skal returnere listen? hmmm
  for (let user in USERS) {
    userlist.append(user);
  }

  return res.status(200).json({ username: username });
}

function get_user_from_id(req, res) {
  const userId = req.params.id;
  for (let user in USERS) {
    if (user.id === userId) {
      return user;
    }
  }
  //return null?

  return res.status(200).json({ userId: userId });
}

module.exports = {
  add_user,
  delete_user_from_id,
  get_all_users,
  get_user_from_id,
};
