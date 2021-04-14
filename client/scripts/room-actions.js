import { getRoomMessages, getRoomUsers, sendMessage } from "../api.js";
import Bot from "./bot.js";

//State object handling button-text and bot behaviour
let state = { isBotsAllowedToTalk: false };

const botContainer = getItemFromLocalStorage("bots", true);
const { id: roomId, name: roomName } = getItemFromLocalStorage("swagbot_room");
const { username, userId } = getItemFromLocalStorage("swagbot_user");

const addBotForm = document.getElementById("addBotForm");
const botTalkBtn = document.getElementById("botTalkBtn");
const messageForm = document.getElementById("sendMessage");
const textBox = document.getElementById("msg_input");
document.getElementById("roomTitle").innerHTML = `Room #${roomName}`;

addBotForm.addEventListener("submit", handleAddBots);
botTalkBtn.addEventListener("click", handleBotTalking);
messageForm.addEventListener("submit", handleSendMessage);

//Retrives and renders messages on page load
updateWindow();

function handleBotTalking() {
  if (botContainer.length === 0) {
    alert('You have not added any bots yet')
    return
  }
  state.isBotsAllowedToTalk = !state.isBotsAllowedToTalk;
  console.log("state", state.isBotsAllowedToTalk);

  state.isBotsAllowedToTalk
    ? (botTalkBtn.innerHTML = "Stop the bots!!")
    : (botTalkBtn.innerHTML = "Let them talk!!");
  letTheBotsTalk();
}

async function updateWindow() {
  try {
    const { users } = await getRoomUsers(roomId, userId);
    const { messages } = await getRoomMessages(roomId, userId);
    updateMessageView(messages);
    document.getElementById("user-list").innerHTML = getUserList(users);
  } catch (err) {
    alert(err);
  }
}

async function getLastMessage() {
  const { messages } = await getRoomMessages(roomId, userId);

  return messages[messages.length - 1];
}

async function handleSendMessage() {
  const messageText = textBox.value;
  textBox.value = "";
  try {
    const { messages } = await sendMessage(roomId, userId, messageText);
    updateMessageView(messages);
  } catch (err) {
    alert(err);
  }
}

function handleAddBots() {
  const botQty = parseInt(document.getElementById("bot_qty").value);
  addBots(botQty);
}

//Maps all messages to an <p> element and updates the html
function updateMessageView(messages) {
  if (typeof messages === "undefined") return "";
  let formattedMessages = "";
  messages.map(
    (m) =>
      (formattedMessages += `<p><strong>${m.username}</strong>: ${m.message.text} <p>`)
  );
  document.getElementById("messageContainer").innerHTML = formattedMessages;
  updateScroll();
}

//add bots for each swtich case, and makes a room for them to be in
async function addBots(quantity) {
  console.log("qty", quantity);

  if (quantity >= 1) {
    const bot1 = new Bot("Wisdombot", roomId);
    botContainer.push(bot1);
  }
  if (quantity >= 2) {
    const bot2 = new Bot("Chairbot", roomId);
    botContainer.push(bot2);
  }
  if (quantity >= 3) {
    const bot3 = new Bot("Basicbot", roomId);
    botContainer.push(bot3);
  }
  if (quantity >= 4) {
    const bot4 = new Bot("Basicbot", roomId);

    botContainer.push(bot4);
  }

  botContainer.forEach((bot) => bot.init(roomId));
  localStorage.setItem("bots", JSON.stringify(botContainer));
  alert(`${quantity} bots added`);
}

async function letTheBotsTalk() {
  console.log("in function", state.isBotsAllowedToTalk);
  while (state.isBotsAllowedToTalk) {
    try {
      let lastMessage = await getLastMessage();

      for (const bot of botContainer) {
        await bot.respond(roomId, lastMessage);
      }
      const { messages } = await getRoomMessages(roomId, userId);
      updateMessageView(messages);
    } catch (error) {
      state.isBotsAllowedToTalk = false;
      alert(error);
    }
  }
}

function updateScroll() {
  let element = document.getElementById("messageContainer");
  element.scrollTop = element.scrollHeight;
}

export function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}

function getItemFromLocalStorage(id, isArray = false) {
  let data = localStorage.getItem(id);
  return data ? JSON.parse(data) : isArray ? [] : {};
}
