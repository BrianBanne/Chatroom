const { ROOMS, USERS } = require("../database");
const { isUserAuth, findRoom, getUserFromList } = require("../utils");

function getUserMessages(req, res) {
  const roomId = req.params.id;
  const userId = req.params.userId;
  const room = findRoom(roomId, ROOMS);

  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "Request is forbidden, you are not in this room" });

  const userMessages = room.messages.filter(
    (message) => message.userId === userId
  );

  return res.status(200).json({ messages: userMessages });
}

function postUserMessage(req, res) {
  const roomId = req.params.id;
  const userId = req.params.userId;
  const text = req.body.text;

  //maybe validate text
  const room = findRoom(roomId, ROOMS);
  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "Request is forbidden, you are not in this room" });

  const deserializedUsers = USERS.map((i) => i.getUser());

  const user = getUserFromList(userId, deserializedUsers);
  room.addMessage(user, text);
  return res.status(201).json({ messages: room.messages });
}

function getMessagesFromRoomId(req, res) {
  const roomId = req.params.id;
  const userId = req.headers.userid;
  const room = findRoom(roomId, ROOMS);

  //TODO: validate user from header

  if (!isUserAuth(userId, room.users))
    return res
      .status(403)
      .json({ error: "Request is forbidden, you are not in this room" });

  if (room === undefined)
    return res.status(400).json({ error: "Could not get a room from id" });

  return res.status(200).json({ messages: room.messages });
}

module.exports = { getMessagesFromRoomId, getUserMessages, postUserMessage };
