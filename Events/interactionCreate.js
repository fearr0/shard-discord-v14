const {MessageFlags} = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const client = interaction.client;

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error('Komut çalıştırılırken hata:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Komut çalıştırılırken hata oluştu.', flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: 'Komut çalıştırılırken hata oluştu.', flags: MessageFlags.Ephemeral });
            }
        }
    }
  };