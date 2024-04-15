const Discord = require('discord.js');
const ayarlar = require('../../../config.json');
const botName = ayarlar.botName;

exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xD97634)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(':fire: Üzgünüm, bunu yapamazsınız!')
    return message.author.send(ozelmesajuyari);
  }
  let kullanici;
  if (!args[0]) {
    kullanici = message.author;
  } else {
    if (message.mentions.users.first()) {
      kullanici = message.mentions.users.first();
    } else {
      kullanici = client.users.cache.get(args[0]);
    }
    if (!kullanici) {
      return message.channel.send(new Discord.MessageEmbed().setDescription("Geçersiz kullanıcı ID'si veya etiket."));
    }
    if (!message.guild.member(kullanici)) {
      return message.channel.send(new Discord.MessageEmbed().setDescription("Bu kullanıcı bu sunucuda değil."));
    }
  }

  const roller = message.guild.member(kullanici).roles.cache
    .filter(role => role.id !== message.guild.id) // everyone rolünü filtrele
    .map(role => role.toString()) // rolü etikete dönüştür
    .join(", ") || "Bu kullanıcının herhangi bir rolü yok.";

  var Durum = kullanici.presence.status;
  var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))));
  var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))));
  const kullanicibilgi = new Discord.MessageEmbed()
    .setThumbnail(kullanici.avatarURL())
    .setColor(0x808080)
    .setTimestamp()
    .addField('Kullanıcı adı;', kullanici.username)
    .addField('ID;', kullanici.id)
    .addField('Kayıt tarihi;', kullanici.createdAt.toLocaleDateString('tr-TR'))
    .addField('Durum;', durm)
    .addField('Rolleri;', roller)
    .setFooter(`${botName} • Hep Birlikte Daha İleriye`, client.user.avatarURL())
  message.channel.send(kullanicibilgi);
}

module.exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kullanıcı bilgisi', 'kbilgisi'],
  permLevel: 0,
  name: 'kullanıcı-bilgi',
  description: 'Belirtilen kullanıcının bilgilerini gösterir.',
  usage: 'kullanıcı-bilgi [kullanıcı]'
};
