const fs = require('fs');
const path = require('path');
const { botName } = require('../../../config.json');
const Discord = require('discord.js');

// Kullanıcı verilerinin dosya yolu
const userDataFilePath = path.join(__dirname, '../../Data/economyUserData/userData.json');

exports.run = (client, message, args) => {
    const userId = message.author.id;

    // Kullanıcı verilerini yükle
    let userData = {};
    if (fs.existsSync(userDataFilePath)) {
        userData = JSON.parse(fs.readFileSync(userDataFilePath));
    } else {
        fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));
    }

    // Belirli kullanıcının bakiyesini göster
    if (args.length === 0) {
        // Kullanıcının adını al
        const username = message.author.username;

        // Embed oluştur
        const balanceEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${username}`)
            .setDescription(`Cüzdanında ** ${userData[userId].money} ** Coins var.`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(`${botName} • Ekonomi`, client.user.displayAvatarURL());

        // Mesaj ile embedi gönder
        return message.channel.send(balanceEmbed);
    }

    // Başka bir kullanıcının bakiyesini göstermeyi desteklemiyoruz
    return message.reply('Bir kullanıcının bakiyesini görmek için argüman kullanmanıza gerek yok.');
};

module.exports.config = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    name: 'bakiye',
    desc: 'Cüzdanınızı gösterir.',
    aliases: ['cüzdan', 'bakiye'],
};
