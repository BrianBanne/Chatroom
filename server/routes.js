const express = require("express");
const router = express.Router();

const { getMessageFromRoomId } = require("./controller/message-controller");
const { get_all_users } = require("./controller/user_controller");
const { add_user } = require("./controller/user_controller");

//User routes
router.post("/users", add_user(name)); //create one user, req.body
router.get("/users", get_all_users); //get all users - brianmade
router.get("/users", (req, res) => res.json("Test test")); //fetch  all users
router.delete("users/:id"); //delete user from req.param

//Room Routes
router.get("/rooms"); //get all rooms
router.get("/room/:id"); //get room from req.param)

router.get("/room/:id/users"); //get all users from room-id -> req.param
router.post("/room/:id/users"); // add user from body.userid

//Message routes
router.get("/room/:id/messages", getMessageFromRoomId); //get all messages from room-id -> req.param

router.get("/room/:id/:user-id/messages"); //get  messages from room-id, user.id-> req.param ,
router.post("/room/:id/:user-id/messages"); //post  message from room-id, user.id-> req.param , message -> req.body

module.exports = router;
