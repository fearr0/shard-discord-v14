const { REST, Routes } = require('discord.js');
const config = require('./Global/Config/config');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, './SlashCommand');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('🔄 Slash komutları deploy ediliyor...');
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.ID), // Sunucu ID ile deploy için
            { body: commands }
        );
        console.log('✅ Slash komutları başarıyla deploy edildi.');
    } catch (error) {
        console.error(error);
    }
})();
