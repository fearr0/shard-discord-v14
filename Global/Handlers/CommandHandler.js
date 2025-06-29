const { readdirSync } = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = (client) => {
    const basePath = path.join(__dirname, "..", "..", "Commands");
    const commandFolders = readdirSync(basePath);
    for (const folder of commandFolders) {
        const folderPath = path.join(basePath, folder);
        const commandFiles = readdirSync(folderPath).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (!command.name) continue;
            client.commands.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name);
                });
            }
        }
    }

    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return;
        const prefixes = client.config.prefixes;
        const prefixUsed = prefixes.find(p => message.content.startsWith(p));
        if (!prefixUsed) return;

        const args = message.content.slice(prefixUsed.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const commandName = client.commands.has(cmdName) ? cmdName : client.aliases.get(cmdName);
        if (!commandName) return;

        const command = client.commands.get(commandName);
        if (!command) return;

        // Cooldown kontrolü
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 10) * 1000; // default 10 saniye

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - now) / 1000);
                await message.reply({ content: `⏳ Lütfen **${timeLeft}** saniye sonra tekrar deneyin.` });
                return;
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Komutu çalıştır
        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            await message.reply({ content: "Komut çalıştırılırken bir hata oluştu!" });
        }
    });
};
