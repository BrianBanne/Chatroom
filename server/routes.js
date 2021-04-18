const express = require("express");
const router = express.Router();

const MessageController = require("./controller/message-controller");
const UserController = require("./controller/user-controller");
const RoomController = require("./controller/room-controller");

//User routes
router.post("/users", UserController.addUser);
router.get("/users", UserController.getAllUsers);

router.get("/user/:id", UserController.getUserFromId);
router.delete("/user/:id", UserController.deleteUserFromId);

//Room Routes
router.get("/rooms", RoomController.getRooms);
router.post("/rooms", RoomController.createRoom);
router.get("/room/:id", RoomController.getRoomFromId);
router.delete("/room/:id", RoomController.deleteRoom);


router.get("/room/:id/users", RoomController.getRoomUsers);
router.post("/room/:id/users", RoomController.addUserToRoom);

//Message routes
router.get("/room/:id/messages", MessageController.getMessagesFromRoomId);
router.get("/room/:id/:userId/messages", MessageController.getUserMessages);
router.post("/room/:id/:userId/messages", MessageController.postUserMessage);

module.exports = router;
