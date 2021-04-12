import { getRoomUsers, sendMessage, getRoomMessages } from "../api.js";

const roomId = localStorage.getItem("swagbot_room");
const { username, id: userId } = localStorage.getItem("swagbot_user")
  ? JSON.parse(localStorage.getItem("swagbot_user"))
  : null;

/*  document.getElementById("swagbot_user").innerHTML =
  username !== undefined ? username : ""; */

updateWindow();
//Pulls data from the API every 5 seconds
setInterval(function () {
  updateWindow();
}, 5000);

async function updateWindow() {
  try {
    const response = await getRoomUsers(roomId, userId);
    const { messages, room } = await getRoomMessages(roomId, userId);
    updateMessageView(messages);
    document.getElementById("user-list").innerHTML = getUserList(response);
  } catch (err) {
    alert(err);
  }
}

const messageForm = document.getElementById("sendMessage");
messageForm.addEventListener("submit", handleSendMessage);
const textBox = document.getElementById("msg_input");

async function handleSendMessage() {
  const messageText = textBox.value;
  textBox.value = "";
  try {
    const { messages, room } = await sendMessage(roomId, userId, messageText);
    console.log("res,", messages);
    updateMessageView(messages);
  } catch (err) {
    alert(err);
  }
}

function updateMessageView(messages) {
  if (typeof messages === "undefined") return "";
  let formattedMessages = "";
  messages.map(
    (m) => (formattedMessages += `<p>${m.user.username}: ${m.message} <p>`)
  );

  document.getElementById("messageContainer").innerHTML = formattedMessages;
}

export function getUserList(users) {
    let userList = ""
    users.map((user, idx) => (userList += `<li >${user.username}</li>`));
    return userList;
  }
  
