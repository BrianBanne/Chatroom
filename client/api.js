const BASE_URL = "http://0.0.0.0:8080/api";

async function createUser(name, roomId) {
  //const user = { name: name, roomId: roomId };
  console.log('name', name);
  const user = { name: name };
  const response = await fetch(BASE_URL.concat("/users"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
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
  return response.json();
}

export { createUser, getUsers };
