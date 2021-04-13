import {getRoomMessages, sendMessage} from "../api";

class Bot {

    constructor(name){
        this.name = name
        this.favourite = {}
    }

    async load(self, path) {
        const file = await fetch(path).then(res => res.json())
        let data = JSON.load(file);
        console.log(file);
        name = self.name.lower(); //???

        let botdata = {};


        if (name === "Wisdombot" || name === "Foodbot" || name === "chairdude") {
            botdata = data[name];
        } else {
            botdata=data["basicbot"];
        }


        //log file. to this.
    }

    respond(self, input) {
        if (readmessages().includes("hello") || readmessages().includes("hi")) {
            sendMessage(roomId, userId, self.greetings.values())
        }
        //if read includes bye "botname -- leave
        // grei mal å gå ut ifra eller hva tenker du? hentet litt inspo fra ditt forrige prosjekt
        //og merga det med mine metoder :P
    }



}
function readmessages() {
   return getRoomMessages();

}