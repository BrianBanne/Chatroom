const express = require("express");
const router = express.Router();

const { getMessageFromRoomId } = require("./controller/message-controller");

//User routes
router.post("/users"); //create one user, req.body
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
