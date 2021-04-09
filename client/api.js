const BASE_URL = "http://0.0.0.0:8080/api";

async function createUser(name) {
  const response = await fetch(BASE_URL.concat("/users"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
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

async function createRoom(userId) {
  console.log("userid", userId);
  const response = await fetch(BASE_URL.concat("/rooms"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userId }),
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
    body: JSON.stringify({id: userId}),
  });

  if (!response.ok) throw Error("Server unable to createRoom");
  return response.json();
}

export { createUser, getUsers, getRooms, createRoom, joinRoom };
