const fs = require('fs');
const path = require('path');
const { prefix } = require('../../../config.json');

// Kullanıcı verilerinin dosya yolu
const userDataFilePath = path.join(__dirname, '../../Data/economyUserData/userData.json');

let userData = {};

// Kullanıcı verilerini yükle
if (fs.existsSync(userDataFilePath)) {
    userData = JSON.parse(fs.readFileSync(userDataFilePath));
} else {
    fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));
}

exports.run = (client, message, args) => {
    const userId = message.author.id;

    if (!userData[userId]) userData[userId] = { lastDaily: 0, money: 0 };

    const currentTime = Date.now();
    const lastDailyTime = userData[userId].lastDaily;
    const dailyCooldown = 4 * 60 * 60 * 1000; // 4 saat

    if (currentTime - lastDailyTime < dailyCooldown) {
        const timeLeft = dailyCooldown - (currentTime - lastDailyTime);
        const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);
        message.reply(`Günlük ödülü almak için ${hoursLeft} saat ${minutesLeft} dakika beklemelisiniz.`);
    } else {
        const dailyReward = Math.floor(Math.random() * 100) + 1; // Rastgele ödül miktarı
        userData[userId].money += dailyReward;
        userData[userId].lastDaily = currentTime;
        fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));
        message.reply(`Günlük ödül olarak ${dailyReward} para aldınız!`);
    }

};

module.exports.config = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    name: 'daily',
    desc: 'Günlük ödül alma komutu',
    aliases: ['günlük', 'daily'],
};
