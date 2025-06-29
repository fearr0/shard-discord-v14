const { EmbedBuilder } = require("discord.js");
const set = require("../../Global/Config/settings.js");

module.exports = {
    name: "Shardcheck",
    aliases: ["shardkontrol", "shardinfo"],
    description: "Botun shard sayısı ve önerilen shard sayısını gösterir.",
    category: "Dev",
    usage: ".shardcheck",
    cooldown: 15,

    async execute(client, message, args) {
        try {
            const results = await client.shard.broadcastEval(c => c.guilds.cache.size);
            const guildCount = results.reduce((a, b) => a + b, 0);
            const önerilenShard = Math.ceil(guildCount / 2500);
            const mevcutShard = client.shard.count;

            const embed = new EmbedBuilder()
                .setTitle("Shard Bilgisi")
                .setColor(set.embedColor)
                .setDescription([
                    `🌐 Toplam Sunucu: **${guildCount}**`,
                    `🔢 Mevcut Shard Sayısı: **${mevcutShard}**`,
                    `⚠️ Önerilen Shard Sayısı: **${önerilenShard}**`,
                    mevcutShard < önerilenShard
                        ? "\n⚠️ Shard sayınız önerilenin altında! Lütfen artırmayı düşünün."
                        : mevcutShard === önerilenShard
                            ? "\n✅ Shard sayınız önerilenle eşit."
                            : mevcutShard > önerilenShard
                                ? "\n✅ Shard sayınız önerilenden fazla."
                                : "",
                ].join("\n"))
                .setFooter({ text: `Shard ID: ${client.shard.ids[0]}` });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Shard check komutunda hata:", error);
            await message.reply("⚠️ Shard bilgisi alınırken bir hata oluştu.");
        }
    }
};
