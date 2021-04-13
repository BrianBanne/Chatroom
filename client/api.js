const BASE_URL = "http://0.0.0.0:8000/api";

async function createUser(name) {
  const response = await fetch(BASE_URL.concat("/users"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: name }),
  });
  if (!response.ok) throw Error("Unable to create user");
  return response.json();
}

async function getUsers() {
  const response = await fetch(BASE_URL.concat("/users"), {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw Error("Server unable to createRoom");

  return response.json();
}

async function createRoom(userId, roomName = "") {
  console.log("userid", userId);
  const response = await fetch(BASE_URL.concat("/rooms"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId, roomName: roomName }),
  });
  if (!response.ok) throw Error("Server unable to createRoom");

  return response.json();
}

async function getRooms() {
  const response = await fetch(BASE_URL.concat("/rooms"), {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw Error("Unable to fetch rooms");
  }

  const rooms = response.json();
  return rooms;
}

async function joinRoom(userId, roomId) {
  const response = await fetch(BASE_URL.concat(`/room/${roomId}/users`), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });

  if (!response.ok) throw Error("Server unable to join room");
  return response.json();
}

async function getRoomUsers(roomId, userId) {
  console.log(roomId);
  console.log(userId);
  const response = await fetch(BASE_URL.concat(`/room/${roomId}/users`), {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      userid: userId,
    },
  });

  if (!response.ok)
    throw Error("Server unable to fetch room users", response.statusText);
  return response.json();
}

async function getRoomMessages(roomId, userId) {
  const response = await fetch(
    BASE_URL.concat(`/room/${roomId}/messages`),
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        userid: userId,
      },
    }
  );
  if (!response.ok) throw Error("Unable to post message", response.statusText);
  return response.json();
}

async function sendMessage(roomId, userId, message) {
  console.log(roomId, userId, message);
  const response = await fetch(
    BASE_URL.concat(`/room/${roomId}/${userId}/messages`),
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        userid: userId,
      },
      body: JSON.stringify({ text: message }),
    }
  );
  if (!response.ok) throw Error("Unable to post message", response.statusText);
  return response.json();
}

export {
  createUser,
  getUsers,
  getRooms,
  createRoom,
  joinRoom,
  getRoomUsers,
  sendMessage,
  getRoomMessages,
};
