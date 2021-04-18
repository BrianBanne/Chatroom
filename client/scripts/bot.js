import { createUser, getRoomMessages, joinRoom, sendMessage } from "../api.js";

class Bot {
  constructor(name, roomId) {
    this.name = name;
    this.id = "";
    this.roomId = roomId;
    this.count = 0;
  }

  async init() {
    const { user } = await createUser(this.name);
    this.id = user.userId;

    await joinRoom(this.id, this.roomId);
    await this.loadData();
  }

  async loadData() {
    let botInfoJSON = await fetch("botinfo.json").then((res) => res.json());
    //console.log(botInfoJSON);

    let botData = {};
    //ser bedre ut sånn her, men kanskje det ikke funker
    //kan ikke sammenligninger i js
    switch (this.name) {
      case "Wisdombot":
        botData = botInfoJSON.Wisdombot;
        break;
      case "Chairbot":
        botData = botInfoJSON.Chairbot;
        break;
      case "Foodbot":
        botData = botInfoJSON.Foodbot;
        break;
      default:
        botData = botInfoJSON.Basicbot;
    }
    this.moods = botData.mood;
    this.wildcards = botData.wildcards;
    this.explanation = botData.explanation;
  }

  async getMessages(roomId) {
    const { messages } = await getRoomMessages(roomId, this.id);
    return { messages };
  }

  async respond(roomId, msg = "") {
    const { username, message } = msg;
    const lastMessage = message?.text;
    let responseText = "";

    if (this.count > 10) return;

    if (this.count === 10) {
      await sendMessage(roomId, this.id, "bye");
      this.count += 1;
      return;
    }

    if (typeof lastMessage === "undefined")
      responseText = getRandomElement(this.wildcards);
    else if (lastMessage.includes("?"))
      responseText = ` ${getRandomElement(this.explanation)}, ${username}`;
    else if (this.count % 2 === 0)
      responseText = `That makes me feel ${getRandomElement(
        this.moods
      )}, ${username}`;
    else responseText = getRandomElement(this.wildcards);

    this.count += 1;
    return await sendMessage(roomId, this.id, responseText);
  }
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export { Bot as default };
