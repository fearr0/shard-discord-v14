const mongoose = require("mongoose");
const config = require("../../Global/Config/config");
module.exports = async (client) => {
    try {
        await mongoose.connect(config.mongoURL, {
        });
        console.log("💻 [DATA] bağlantısı başarılı!");

    } catch (error) {
        console.error("❌ [DATA] bağlantı hatası:", error);
        process.exit(1);
    }
};
