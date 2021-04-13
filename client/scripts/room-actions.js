import { getRoomMessages, getRoomUsers, sendMessage } from "../api.js";
import Bot from "./bot.js";

const { id: roomId, name: roomName } = JSON.parse(
  localStorage.getItem("swagbot_room")
);

const { username, userId } = localStorage.getItem("swagbot_user")
  ? JSON.parse(localStorage.getItem("swagbot_user"))
  : null;

document.getElementById("roomTitle").innerHTML = `Room #${roomName}`;

updateWindow();
//Pulls data from the API every 5 seconds
/* setInterval(function () {
  updateWindow();
}, 5000);
 */
async function updateWindow() {
  try {
    const { users } = await getRoomUsers(roomId, userId);
    const { messages } = await getRoomMessages(roomId, userId);
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

const addBotForm = document.getElementById("addBotForm");
addBotForm.addEventListener("submit", handleAddBots);

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

function handleAddBots() {
  const botQty = document.getElementById("bot_qty").value;
  console.log(botQty, "# of bots");

  addBots(botQty, roomId);
}

//Maps all messages to an <p> element and updates the html
function updateMessageView(messages) {
  console.log(messages);
  if (typeof messages === "undefined") return "";
  let formattedMessages = "";
  messages.map(
    (m) => (formattedMessages += `<p>${m.username}: ${m.message.text} <p>`)
  );

  document.getElementById("messageContainer").innerHTML = formattedMessages;
}

//add bots for each swtich case, and makes a room for them to be in
async function addBots(quantity, roomId) {
  console.log("qty", quantity);

  const bot1 = new Bot("Bottefar", roomId);
  bot1.init(roomId);
  console.log(bot1);

  setInterval(async () => {
    const { messages } = await bot1.respond(roomId);
    updateMessageView(messages);
  }, 3000);

  switch (quantity) {
    case 1:

    /*     setTimeout(function () {}, 1000);
    case 2:
      //add two bots
      await createRoom(userId, "Room2");

    case 3:
      // add three
      createRoom(userId, "Room3");

    case 4:
      //add four bouts
      createRoom(userId, "Room4"); */
  }
}

export function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}
