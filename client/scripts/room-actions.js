import {getRoomUsers, sendMessage, getRoomMessages, createUser, createRoom, joinRoom, getRooms} from "../api.js";
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

function getrandomelement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//add bots for each swtich case, and makes a room for them to be in
async function addBots(quantity, roomId) {
  const word = data;
  const bot1 = createUser("Foodbot");
  const bot2 = createUser("Chairbot");
  const bot3 = createUser("Wisdombot");
  const bot4 = createUser("Basicbot");
  /* read from messages
    if (read.includes("hello")) {
      await sendMessage(roomId, userId, word.Foodbot.greetings)
    }
     */

  switch (quantity) {
    case 1:
      //ikke så viktig med deg
        /*
    const {room} = createRoom(bot1.userId, roomId);
    const {rooms} = getRooms();
      if (rooms.length !== 0) {
        await joinRoom(bot1.userId, room.id);
      }
         */

    const {join} = joinRoom(bot1.userId, roomId);
    const {read} = await getRoomMessages(roomId, bot1.userId);
    const {messages} = await sendMessage(roomId, userId, getrandomelement(word.Foodbot.greetings));
      updateMessageView(messages);
      sendMessandUpdate("hello");

      setTimeout(function(){}, 1000);
    case 2:
    //add two bots
      await createRoom(userId, "Room2");

    case 3:
    // add three
      createRoom(userId, "Room3")



    case 4:
    //add four bouts
      createRoom(userId, "Room4")


  }
}

export function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}
