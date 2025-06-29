const { Client, Collection } = require("discord.js");

class CustomClient extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
    }
}

module.exports = CustomClient;