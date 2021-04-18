import { createUser, deleteUser, getUser, getUsers } from "../api.js";
localStorage.removeItem("swagbot_user");
localStorage.removeItem("swagbot_room");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const deleteUserBtn = document.getElementById("deleteUserBtn");

const cleanUpButton = document.getElementById("cleanup");
registerForm.addEventListener("submit", handleSubmit);
loginForm.addEventListener("submit", handleLogin);
deleteUserBtn.addEventListener("click", handleDeleteUser);

cleanUpButton.addEventListener("click", () => {
  localStorage.removeItem("bots");
  localStorage.removeItem("swagbot_user");
  localStorage.removeItem("swagbot_room");
  alert("Removed all traces of the program, you are welcome");
});
const { users } = await getUsers();
setUserList(users, "option", "users");


document.getElementById("loginFields").disabled = users.length === 0 ? true : false

async function handleLogin(e) {
  e.preventDefault();
  const userId = document.getElementById("users").value
  const { user } = await getUser(userId);
  localStorage.removeItem("swagbot_user");
  localStorage.setItem("swagbot_user", JSON.stringify(user));
  window.location = 'pick-room'
}

async function handleDeleteUser(e) {
  e.preventDefault();
  const userId = document.getElementById("users");
  await deleteUser(userId);
  window.location.reload()
}

async function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name");
  if (name.value === "") {
    alert("You have to provide a name");
    name.focus();
    return;
  }
  try {
    const { user } = await createUser(name.value);
    console.log(user);
    localStorage.removeItem("swagbot_user");
    localStorage.setItem("swagbot_user", JSON.stringify(user));

    window.location = "pick-room";
  } catch (err) {
    alert(err);
    return;
  }
}

function setUserList(users, type = "list", target) {
  let formattedUsers = "";
  if (type === "list")
    formattedUsers = users.map((user) => `<li>${user.username}</li>`);
  if (type === "option")
    formattedUsers = users.map(
      (user) => `<option value="${user.userId}">${user.username}</option>`
    );

  document.getElementById(target).innerHTML = formattedUsers;
}

export { handleSubmit };
