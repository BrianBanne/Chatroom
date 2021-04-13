import { getRoomUsers, sendMessage, getRoomMessages } from "../api.js";

const roomId = localStorage.getItem("swagbot_room");
const { username, userId } = localStorage.getItem("swagbot_user")
  ? JSON.parse(localStorage.getItem("swagbot_user"))
  : null;

/*  document.getElementById("swagbot_user").innerHTML =
  username !== undefined ? username : ""; */

updateWindow();
//Pulls data from the API every 5 seconds
/* setInterval(function () {
  updateWindow();
}, 5000);
 */
async function updateWindow() {
  try {
    const { users } = await getRoomUsers(roomId, userId);
    const { messages, room } = await getRoomMessages(roomId, userId);
    console.log(messages);
    updateMessageView(messages);
    document.getElementById("user-list").innerHTML = getUserList(users);
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
    const { messages } = await sendMessage(roomId, userId, messageText);
    console.log("res,", messages);
    updateMessageView(messages);
  } catch (err) {
    alert(err);
  }
}

function updateMessageView(messages) {
  console.log(messages);
  if (typeof messages === "undefined") return "";
  let formattedMessages = "";
  messages.map(
    (m) => (formattedMessages += `<p>${m.username}: ${m.message.text} <p>`)
  );

  document.getElementById("messageContainer").innerHTML = formattedMessages;
}

function addBots(quantity) {
  switch (quantity) {
    case 1:
    //add 1 bot
    case 2:
    //add two bots
    case 3:
    // add three

    case 4:
    //add four bouts
  }
}

export function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}
