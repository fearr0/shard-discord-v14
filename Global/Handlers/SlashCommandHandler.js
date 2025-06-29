const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const slashCommandsPath = path.join(__dirname, '../../SlashCommand/');
    const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const filePath = path.join(slashCommandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[✔] Slash Komut Yüklendi: ${command.data.name}`);
        } else {
            console.log(`[UYARI] ${file} dosyasında 'data' veya 'execute' yok.`);
        }
    }
};
