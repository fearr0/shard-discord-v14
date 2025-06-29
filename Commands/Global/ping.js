const { EmbedBuilder } = require("discord.js");
const set = require("../../Global/Config/settings.js");
module.exports = {
    name: "ping",
    aliases: ["ping","ms"],
    description: "Botun pingini gösterir.",
    category: "Global",
    usage: "ping",
    cooldown: 10,

    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setDescription(`🏓 Pong! Gecikme: **${client.ws.ping}ms**`)
            .setColor(set.embedColor);

        message.reply({ embeds: [embed] });
    }
};
