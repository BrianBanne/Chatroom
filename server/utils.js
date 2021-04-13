function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function findRoom(id, rooms) {
  const room = rooms.find((room) => {
    if (room.id === id) return room;
  });
  return room;
}

function getUserFromList(userId, users) {
  return users.find((user) => {
    if (user.id === userId) {
      return user;
    }
  });
}

function isUserAuth(userId, users) {
  const isAuth = users.find((user) => {
    if (user.id === userId) {
      return true;
    }
  });
  return isAuth !== undefined ? true : false;
}

module.exports = { uuidv4, isUserAuth, findRoom, getUserFromList };
