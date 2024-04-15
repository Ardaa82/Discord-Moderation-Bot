const fs = require('fs');
const path = require('path');
const { botName } = require('../../../config.json');
const Discord = require('discord.js');

// Kullanıcı verilerinin dosya yolu
const userDataFilePath = path.join(__dirname, '../../Data/economyUserData/userData.json');

exports.run = (client, message, args) => {
    fs.readFile(userDataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            return message.reply('Veri dosyası okunurken bir hata oluştu.');
        }

        const userData = JSON.parse(data);
        const sortedUsers = Object.keys(userData).sort((a, b) => userData[b].money - userData[a].money);

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const leaderboardEmbed = new Discord.MessageEmbed()
            .setColor(`#${randomColor}`)
            .setTitle('Coin Sıralaması')
            .setFooter(`${botName} Ekonomi`);

        sortedUsers.slice(0, 10).forEach((userId, index) => {
            const user = client.users.cache.get(userId);
            if (user) {
                leaderboardEmbed.setDescription(
                    `${index + 1}. ${user.username} | ${userData[userId].money} Coins`
                );
            }
        });

        message.channel.send(leaderboardEmbed);
    });
};

module.exports.config = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    name: 'sıralama',
    desc: 'Bakiye sıralamasını gösterir',
    aliases: ['sıralama', 'leaderboard'],
};
