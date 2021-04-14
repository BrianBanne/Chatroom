import { createUser, getUsers } from "../api.js";
localStorage.removeItem("swagbot_user");
localStorage.removeItem("swagbot_room");

const registerForm = document.getElementById("registerForm");
const cleanUpButton = document.getElementById("cleanup")
registerForm.addEventListener("submit", handleSubmit);
cleanUpButton.addEventListener("click", () => {
  localStorage.removeItem('bots')
  localStorage.removeItem('swagbot_user')
  localStorage.removeItem('swagbot_room')
  alert('Removed all traces of the program, you are welcome')
})

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
    const data = await createUser(name.value);
    console.log(data);
    localStorage.removeItem("swagbot_user");
    localStorage.setItem("swagbot_user", JSON.stringify(data));

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
