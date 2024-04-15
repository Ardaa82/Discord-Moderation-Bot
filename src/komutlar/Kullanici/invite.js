const Discord = require('discord.js');

exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(`**Botun davet bağlantısı: **[**Tıkla**](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=8)`)
    message.author.send(embed);
}

module.exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['botu ekle', 'botu davet et', 'botuekle', 'invite'],
  permLevel: 0,
  name: 'davet',
  description: 'Botun davet bağlantısını gönderir.',
  usage: 'davet'
};