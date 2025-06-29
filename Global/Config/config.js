module.exports = {
    ID: "", // Sunucu ID'sini buraya yazın.
    clientId: "", // Botunuzun clientId'sini buraya yazın.
    token: "", // Botunuzun tokenini buraya yazın.
    mongoURL: "mongodb://localhost:27017/mydatabase", // MongoDB bağlantı URL'sini buraya yazın.
    prefixes: ["!", "."], // Botunuzun kullanacağı prefixleri buraya yazın.

    clientOptions: { // Discord.js client options BU KISMA HİÇ KARIŞMAYIN.
        intents: [3276799], 
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
    },
};