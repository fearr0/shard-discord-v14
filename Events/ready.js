const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`✅ ${client.user.tag} başarıyla giriş yaptı.`);

        // Bot başlatıldığında görünmez (invisible) olarak başlatılır
        client.user.setPresence({
            activities: [
                {
                    name: 'Gizli modda izliyorum...',
                    type: ActivityType.Watching,
                },
            ],
            status: 'invisible',
        });

        // ⬇️ Durum mesajları her 10 saniyede bir değişir
        // Bu aktiviteler yalnızca embeddeki yazıyı değiştirir, görünürlük sabit kalır (invisible)
        // Eğer botun yeniden "online" görünmesini istersen aşağıdaki status: 'invisible' satırını status: 'online' yapman yeterli
        const aktiviteler = [
            { name: 'Sistemi gölgelerde izliyorum...', type: ActivityType.Watching },
            { name: 'Verileri işliyorum...', type: ActivityType.Playing },
            { name: '/yardım komutunu fısıldıyorum...', type: ActivityType.Listening },
            { name: `${client.guilds.cache.size} sunucunun gölgesindeyim...`, type: ActivityType.Watching },
        ];

        let index = 0;

        setInterval(() => {
            const aktivite = aktiviteler[index % aktiviteler.length];

            client.user.setPresence({
                activities: [aktivite],
                status: 'invisible', // 👈 Bot invisible kalmaya devam eder (online yapmak istersen burayı 'online' yapman yeterlidir)
            });

            index++;
        }, 10000);
    },
};
