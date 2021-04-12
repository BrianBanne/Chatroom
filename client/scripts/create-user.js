import { createUser, getUsers } from "../api.js";
localStorage.removeItem("swagbot_user");
localStorage.removeItem("swagbot_room");

const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", handleSubmit);

async function handleGetUsers() {
  const res = await getUsers();
  const formattedUsers = res.users.map((user) => `<li>${user.name}</li>`);
  document.getElementById("userList").innerHTML = formattedUsers;
}

async function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name");
  console.log(name.value);
  if (name.value === "") {
    alert("You have to provide a name");
    name.focus();
    return;
  }
  try {
    const { data } = await createUser(name.value);
    console.log(data);
    if (typeof data !== "undefined") {
      localStorage.removeItem("swagbot_user");
      localStorage.setItem("swagbot_user", JSON.stringify(data));
    }
    window.location = "pick-room";
  } catch (err) {
    alert(err);
    return;
  }
}

function handleEnterRoom() {
  window.location.hash = selectedRoom;
}

export { handleGetUsers, handleEnterRoom, handleSubmit };
