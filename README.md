# 🤖 Discord Bot - [Shardli-Discord-V14-Bos-Altyapi]

Bu proje, Discord.js v14 kullanılarak geliştirilmiş, özelleştirilebilir ve modüler yapıya sahip bir Discord bot altyapısıdır.Tamamen sade bir şekilde tasarlanmış bu altyapı sayesinde kendi botunuzu düzenli ve temiz bir şekilde geliştirebilirsiniz.

## 📦 Gerekli Modülleri Yükleyin

Aşağıdaki adımları izleyerek botu kolayca kurabilirsiniz:

moduleStart.bat
Bu komut, node_modules klasörünü oluşturur ve gerekli tüm bağımlılıkları otomatik olarak yükler.

## ⚙️ Yapılandırmaları Doldurun

/Global/Config/config.js gibi yapılandırma dosyalarını açarak aşağıdaki bilgileri eksiksiz doldurun:

```js
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
```

Gerekli ayarlar yapılmazsa bot düzgün çalışmayacaktır.

## 🧠 Shard Sistemi

Bu bot shard sistemi ile çalışacak şekilde yapılandırılmıştır. Bu nedenle botu başlatmak için klasik node app.js yerine aşağıdaki komutu kullanmanız gerekir:

node shard.js

Shard sistemi sayesinde bot büyük sunucularda performanslı çalışır. Discord’un önerdiği bir yöntemdir.


```js
Discord-V14/
│
├── bot/                 # Botun ana çalışma klasörü
│   ├── commands/        # Prefix (örneğin ".komut") ile çalışan komut dosyaları
│   ├── events/          # Discord eventlerini (örneğin messageCreate, ready) içeren dosyalar
│   ├── slashCommands/   # Slash komutları ("/komut") burada yer alır
│
├── global/              # Proje genelinde kullanılan dosyalar ve yapılar
│   ├── Assets/          # Yazı tipleri, resimler, ikonlar ve diğer statik medya dosyaları
│   ├── Config/          # Bot ayarları, token, ID gibi yapılandırma dosyaları
│   ├── Database/        # MongoDB modelleri veya başka veri tabanı dosyaları
│   ├── Handler/         # Komut, event ve slash command yükleyici (handler) sistemleri
│   ├── Structures/      # Özel Client sınıfı (CustomClient.js) ve diğer özel yapılar
│
├── shard.js             # Botun shard işlemini başlatan ana dosya
├── moduleStart.bat      # Gerekli modülleri otomatik kurmak için script dosyası
└── package.json         # Projenin bağımlılıklarını ve scriptlerini tanımlayan dosya

```
