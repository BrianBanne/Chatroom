class Message {
  constructor(text) {
    this.text = text;
    this.timestamp = Date.now();
  }

  getMessage() {
    return { text: this.text, timestamp: this.timestamp };
  }
}

module.exports = Message
