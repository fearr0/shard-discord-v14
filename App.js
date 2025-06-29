const CustomClient = require("./Global/Structures/CustomClient.js");
const config = require("./Global/Config/config.js");

const client = new CustomClient(config.clientOptions);
client.config = config;

["MongoHandler", "CommandHandler", "EventHandler","SlashCommandHandler"].forEach(handler => {
    require(`./Global/Handlers/${handler}`)(client);
});

client.login(config.token).then(() => {
}).catch(console.error);
