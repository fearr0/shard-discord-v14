const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun gecikme süresini gösterir.'),
    async execute(interaction, client) {
        const ping = client.ws.ping;
        await interaction.reply({
            content: `🏓 Botun gecikme süresi: ${ping}ms`,
            flags: MessageFlags.Ephemeral
        });
    }
};
