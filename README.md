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
  token: "DISCORD_BOT_TOKENINIZ",
  prefix: ".",
  mongoURL: "MONGODB_BAGLANTISI",
  ownerID: ["KENDI_IDNIZ"]
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
├── bot/
│   ├── commands/        # Komutlar
│   ├── events/          # Eventler
│
├── global/
│   ├── Assets/          # Yazı tipleri, resimler, statik dosyalar
│   ├── Config/          # Ayar dosyaları
│   ├── Database/        # Database model dosyaları
│   ├── Handler/         # Handler sistemleri (komut, event yükleyici vs.)
│   ├── Structures/      # CustomClient.js (client)
│
├── shard.js             # Shard başlatıcı
├── moduleStart.bat      # Otomatik modül kurulum scripti
└── package.json
```
