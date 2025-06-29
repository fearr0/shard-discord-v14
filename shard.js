const { ShardingManager } = require("discord.js");
const path = require("path");
const config = require("./Global/Config/config.js");
const manager = new ShardingManager(path.join(__dirname, "./App.js"), { totalShards: "auto", token: config.token });
manager.on("shardCreate", shard => { console.log(`🧩 Shard #${shard.id} başlatıldı.`); });
manager.spawn();