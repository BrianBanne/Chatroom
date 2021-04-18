const { ROOMS, USERS } = require("../database");
const Room = require("../models/room");
const { isUserAuth, findRoom, getUserFromList } = require("../utils");

function createRoom(req, res) {
  //TODO:  check if user exists
  const { roomName, userId } = req.body;
  const deserializedUsers = USERS.map((i) => i.getUser());
  const newRoom = new Room(roomName, userId);

  newRoom.addUser(getUserFromList(userId, deserializedUsers));
  ROOMS.push(newRoom);

  return res.status(201).json({ room: newRoom });
}

function deleteRoom(req, res) {
  const roomId = req.params.id;
  const userId = req.body.userId;

  const room = findRoom(roomId, ROOMS);

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "User not allowed to perform action" });

  //Finds the room by id and removes it from array
  const deletedRoom = ROOMS.splice(
    ROOMS.findIndex(({ id }) => id === roomId),
    1
  );

  if (deletedRoom === undefined)
    return res.status(400).json({ error: "Could not delete room" });

  return res.status(200).json({ rooms: ROOMS });
}

function getRooms(req, res) {
  return res.status(200).json({ rooms: ROOMS });
}

function getRoomFromId(req, res) {
  const roomId = req.params.id;
  const room = findRoom(roomId, ROOMS);

  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  return res
    .status(200)
    .json({ room: { id: room.id, name: room.name, hostId: room.hostId } });
}

function addUserToRoom(req, res) {
  const roomId = req.params.id;
  const userId = req.body.userId;
  const deserializedUsers = USERS.map((i) => i.getUser());

  if (deserializedUsers && !isUserAuth(userId, deserializedUsers))
    return res.status(400).json({ error: "Could not get find requested user" });

  const room = findRoom(roomId, ROOMS);

  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  room.addUser(getUserFromList(userId, deserializedUsers));

  return res.status(200).json({ room: room });
}

function removeUser(req, res) {
  const room = findRoom(req.params.id, ROOMS);
  const userId = req.params.userId;

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "User not allowed to perform action" });

  room.removeUser(userId);

  return res.status(200).json({ room: room });
}

function getRoomUsers(req, res) {
  const room = findRoom(req.params.id, ROOMS);
  const userId = req.headers.userid;

  if (room === userId)
    return res
      .status(400)
      .json({ error: "You have to provide a userId header" });

  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "Request is forbidden, you are not in this room" });

  return res.status(200).json({ users: room.users });
}

module.exports = {
  addUserToRoom,
  getRooms,
  getRoomFromId,
  getRoomUsers,
  createRoom,
  deleteRoom,
  removeUser,
};
