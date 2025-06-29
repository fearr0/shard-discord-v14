const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, MessageFlags } = require('discord.js');
const set = require('../Global/Config/settings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolver')
        .setDescription('Belirtilen kullanıcıya rol verir veya rolü varsa alır.')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Rol verilecek/alınacak kullanıcı')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Verilecek veya alınacak rol')
                .setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.roles.cache.has(set.YetkiliRoleID)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli yetkiniz yok.', flags: MessageFlags.Ephemeral });
        }

        const member = interaction.options.getMember('kullanici');
        const role = interaction.options.getRole('rol');
        if (!member) return interaction.reply({ content: 'Kullanıcı bulunamadı.', flags: MessageFlags.Ephemeral });
        if (!role) return interaction.reply({ content: 'Rol bulunamadı.', flags: MessageFlags.Ephemeral });

        if (interaction.member.roles.highest.position <= role.position) {
            return interaction.reply({ content: 'Kendi rolünden yüksek veya eşit bir rolü veremez veya alamazsın.', flags: MessageFlags.Ephemeral });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({ content: 'Rol vermek/almak için botun yeterli yetkisi yok.', flags: MessageFlags.Ephemeral });
        }
        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply({ content: 'Botun rolü, işlem yapılacak rolden yüksek olmalı.', flags: MessageFlags.Ephemeral });
        }

        const logKanal = interaction.guild.channels.cache.get(set.roleLog) || interaction.guild.channels.cache.find(ch => ch.name === "role-log");

        try {
            let embed, işlemTipi;

            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                işlemTipi = "Rol Alındı";
                embed = new EmbedBuilder()
                    .setColor(set.embedColor)
                    .setTitle(işlemTipi)
                    .setDescription(`${member} kullanıcısından ${role} rolü başarıyla alındı.`)
                    .setTimestamp();
            } else {
                await member.roles.add(role);
                işlemTipi = "Rol Verildi";
                embed = new EmbedBuilder()
                    .setColor(set.embedColor)
                    .setTitle(işlemTipi)
                    .setDescription(`${member} kullanıcısına ${role} rolü başarıyla verildi.`)
                    .setTimestamp();
            }

            if (logKanal) {
                const logEmbed = new EmbedBuilder()
                    .setColor(set.embedColor)
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    .setTitle(`SlashCommand: ${işlemTipi}`)
                    .addFields(
                        { name: 'Hedef Kullanıcı', value: `${member} (\`${member.id}\`)`, inline: true },
                        { name: 'Rol', value: `${role} (\`${role.id}\`)`, inline: true },
                        { name: 'İşlem Zamanı', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
                    )
                    .setTimestamp();

                await logKanal.send({ embeds: [logEmbed] }).catch(() => { });
            }

            await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error('Rol verme/alma hatası:', error);
            interaction.reply({ content: 'Rol işlemi sırasında bir hata oluştu.', flags: MessageFlags.Ephemeral });
        }
    },
};
