const { ROOMS } = require("../database");

function getMessagesFromList(req, res) {
  const message = req.params.message;
  console.log("arg", message);
  let arr = [];
  for (let m in message) {
    arr.append(m.message);
  }
  console.log(arr);
  //return arr;

  return res.status(200).json({ messages: message });
}

function getMessagesFromRoomId(req, res) {
  const roomId = req.params.id;
  for (room in ROOMS) {
    if (room.id === roomId) {
      room.getMessages();
    }
  }

  /*  for message in ROOMS:
       
        if message.room.id == room_id:
            for m in message.messages:
                if m.user.id == user_id:
                    #message_arr = getMessagesFromList(message.messages)
                    return jsonify(message.messages)
                    #return jsonify(message.messages)
                    #return jsonify(message.messages)
         */

  return res.status(200).json({ roomId: roomId });
}

module.exports = { getMessagesFromRoomId, getMessagesFromList };
