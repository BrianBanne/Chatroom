import { createUser, getRoomMessages, joinRoom, sendMessage } from "../api.js";

class Bot {
  constructor(name, roomId) {
    this.name = name;
    this.id = "";
    this.roomId = roomId;
    this.count = 0;
  }

  async init(roomId) {
    const { userId } = await createUser(this.name);
    this.id = userId;
    await joinRoom(userId, roomId);
    await this.loadData();
  }

  async loadData() {
    let botInfoJSON = await fetch("botinfo.json").then((res) => res.json());
    //console.log(botInfoJSON);

    let botData = {};

    if (this.name == "Wisdombot") botData = botInfoJSON.Wisdombot;
    else if (this.name == "Chairbot") botData = botInfoJSON.Chairbot;
    else botData = botInfoJSON.Basicbot;

    this.moods = botData.mood;
    this.wildcards = botData.wildcards;
    //this.meanings = botData.meanings;
  }

  async getMessages(roomId) {
    const { messages } = await getRoomMessages(roomId, this.id);
    return { messages };
  }

  async respond(roomId, lastMessage = "") {
    const { username, message } = lastMessage;
    
    const text = message?.text
    //Adds some random delay to each response, preventing the bots go haywire
    await sleep(getRandomResponseTime());

    //temporary solution bypassing bot respons, but still in the room
    if (this.count > 10) return;

    if (this.count === 10) {
      await sendMessage(roomId, this.id, "Bye bye");

      return;

      //TODO: make boot leave room? maybe
    }
    //TODO analyze input from 'text'

    let responseText = "";
    console.log(this.count);

    if (this.count % 2 === 0) {
      responseText = `That make me feel ${getRandomElement(
        this.moods
      )} ${username}`;
    } else {
      responseText = getRandomElement(this.wildcards);
    }
    await sendMessage(roomId, this.id, responseText);

    this.count += 1;
  }

  /* respond(self, input) {
    if (readmessages().includes("hello") || readmessages().includes("hi")) {
      sendMessage(roomId, userId, self.greetings.values());
    }
    //if read includes bye "botname -- leave
    // grei mal å gå ut ifra eller hva tenker du? hentet litt inspo fra ditt forrige prosjekt
    //og merga det med mine metoder :P
  } */
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomResponseTime() {
  return 2 + Math.random() * 4000;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function readmessages() {
  return getRoomMessages();
}

export { Bot as default };

/*if (name === "Wisdombot") {
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

}*/
