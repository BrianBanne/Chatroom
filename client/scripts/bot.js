class Bot {
    constructor(name){
        this.name = name
        this.favourite = {}
    }

    load(path){
        const file = await fetch(path).then(res => res.json())
        console.log(file);

        //log file. to this.
    }

    respond(input) {
        // do something
    }


}