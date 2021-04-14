import { createUser, getRoomMessages, joinRoom, sendMessage } from "../api.js";
import * as data from '../botinfo.json';
class Bot {
  constructor(name, roomId) {
    this.name = name;
    this.id = "";
    this.roomId = roomId;
    if (name === "Wisdombot") {
      this.catchphrase = data.Wisdombot.catchphrase.values;
      this.mood = data.Wisdombot.mood;
      this.topics = data.Wisdombot.topics;
      this.explanation = data.Wisdombot.explanation;
      this.greetings = data.Wisdombot.greetings;
      this.composer = data.Wisdombot.composer;
      this.wildcards = data.Wisdombot.wildcards;
      this.badword = data.Wisdombot.meanings.bad;
      this.goodword = data.Wisdombot.meanings.good;
    } else if (name === "Foodbot") {
      this.food = data.Foodbot.food;
      this.mood = data.Foodbot.mood;
      this.topics = data.Foodbot.topics;
      this.explanation = data.Foodbot.explanation;
      this.greetings = data.Foodbot.greetings;
      this.wildcards = data.Foodbot.wildcards;
      this.badword = data.Foodbot.meanings.bad;
      this.goodword = data.Foodbot.meanings.good;
    } else if(name === "Chairbot") {
      this.catchphrase = data.Chairbot.chairs.values;
      this.mood = data.Chairbot.mood;
      this.greetings = data.Chairbot.greetings;
      this.wildcards = data.Chairbot.wildcards;
      this.badword = data.Chairbot.meanings.bad;
      this.goodword = data.Chairbot.meanings.good;
    } else if (name === "basicbot") {
      this.SWchara = data.basicbot.starwars.characters;
      this.catchphrase = data.basicbot.starwars.force;
      this.SWmovies = data.basicbot.starwars.movies;
      this.topics = data.basicbot.hobbies.interests;
      this.explanation = data.basicbot.hobbies.explanation;
      this.billgatesfacts = data.basicbot.billgates;
      this.drinkwater = data.basicbot.water.drinkmore;
      this.albums = data.basicbot.favorite.discography;
      this.movies = data.basicbot.favorite.movies;
      this.computerparts = data.basicbot.favorite.computerparts;
      this.wildcards = data.basicbot.wildcards;
      this.badmood = data.basicbot.mood.bad;
      this.goodmood = data.basicbot.mood.good;
      this.explanation = data.basicbot.explain;

    }
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
