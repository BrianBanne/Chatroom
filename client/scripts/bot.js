import { createUser, getRoomMessages, joinRoom, sendMessage } from "../api.js";
import * as data from '../botinfo.json';
class Bot {
  constructor(name, roomId) {
    this.name = name;
    this.id = "";
    this.roomId = roomId;
    //if name == blabla this.options = custom shit for hver bot
    //custom for each json thingy
    this.greetings = data.Foodbot.greetings;
    this.options = ["Hello", "How are you", "Im fine", "Fockk off", 'Wazzao', 'Im tired', 'Jadda', 'Hurray', 'I love ndoe', 'I love Java'];
  }

  async init(roomId) {
    const { userId } = await createUser(this.name);
    this.id = userId;
    const { room } = await joinRoom(userId, roomId);
  }

  async getMessages(roomId) {
    const { messages } = await getRoomMessages(roomId, this.id);
  }

  async respond(roomId, lastMessage = "") {
    const randomMessage = this.options[
      Math.floor(Math.random() * this.options.length)
    ];

    const { messages } = await sendMessage(roomId, this.id, randomMessage);
    return { messages };
  }

  /*    load(self, path) {
    const file = await fetch(path).then((res) => res.json());
    console.log(file);
    name = self.name.lower(); //???

    let botdata;

    if (name === "Wisdombot" || name === "Foodbot" || name === "chairdude") {
      botdata = data[name];
    } else {
      botdata = data["basicbot"];
    }

    //log file. to this.
  } 

  respond(self, input) {
    if (readmessages().includes("hello") || readmessages().includes("hi")) {
      sendMessage(roomId, userId, self.greetings.values());
    }
    //if read includes bye "botname -- leave
    // grei mal å gå ut ifra eller hva tenker du? hentet litt inspo fra ditt forrige prosjekt
    //og merga det med mine metoder :P
  }*/
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function readmessages() {
  return getRoomMessages();
}

export { Bot as default };
