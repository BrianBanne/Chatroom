import { getRoomUsers, sendMessage, getRoomMessages } from "../api.js";
import data from '../botinfo.json';

const User = require("./models/user");
const Room = require("./models/room");
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
//add bots for each swtich case, and makes a room for them to be in
function addBots(quantity) {
  const word = data;
  const Foodbot = new User("Foodbot");
  const Chairbot = new User("Chairbot");
  const Wisdombot = new User("Wisdombot");
  const Basicbot = new User("Basicbot");
  switch (quantity) {
    case 1:
    const room1 = new Room("BotRoom1");
    room1.addUser(Foodbot);
      room1.addMessage(Foodbot, word.Foodbot.greetings);
    case 2:
    //add two bots
      const room2 = new Room("BotRoom2");
      room2.addUser(Foodbot, Chairbot);
      room2.addMessage(Foodbot, word.Foodbot.greetings);
      room2.addMessage(Chairbot, word.Chairbot.greetings);
    case 3:
    // add three
      const room3 = new Room("BotRoom3");
      room3.addUser(Foodbot, Chairbot, Wisdombot);
      room3.addMessage(Chairbot, word.Chairbot.greetings);
      room3.addMessage(Wisdombot, word.Wisdombot.greetings);
      room3.addMessage(Foodbot, word.Foodbot.greetings);

    case 4:
    //add four bouts
      const room4 = new Room("BotRoom4");
      room4.addUser(Foodbot, Chairbot, Wisdombot, Basicbot);
      room4.addMessage(Chairbot, word.Chairbot.greetings);
      room4.addMessage(Wisdombot, word.Wisdombot.greetings);
      room4.addMessage(Foodbot, word.Foodbot.greetings);
      room4.addMessage(Basicbot, word.basicbot.billgates);
  }
}

export function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}
