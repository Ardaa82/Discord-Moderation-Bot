const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const sunucuID = "888765221139775509"; // Sunucu ID'si burada
    if (message.guild.id !== sunucuID) { // Sadece belirli sunucuda çalışması için kontrol
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle(':x: Hata :x:')
          .setDescription('Bu komut sadece belirli bir sunucuda kullanılabilir.')
      );
    }
  
  const isim = args[0];
  if (!isim) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Hata :x:')
        .setDescription('**Kullanım:** İsim, Yaş, Günlük Aktiflik Süresi, İstediğin Yetki')
    );
  }

  const yaş = args[1];
  if (!yaş) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Hata :x:')
        .setDescription('Yaşını belirtmedin?')
    );
  }

  const aktiflik = args[2];
  if (!aktiflik) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Hata :x:')
        .setDescription('Günlük aktiflik süreni belirtmedin?')
    );
  }

  const yetki = args.slice(3).join(' ');
  if (!yetki) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Hata :x:')
        .setDescription('Hangi yetkiyi istediğini belirtmedin?')
    );
  }

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(':white_check_mark: Başarılı :white_check_mark:')
      .setDescription('Başvurun başarıyla gönderildi!')
  );

  const başvuruKanalı = client.channels.cache.get('1175831895930577087');
  if (!başvuruKanalı) {
    return console.error('Başvuru kanalı bulunamadı.');
  }

  başvuruKanalı.send(
    new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Yeni Başvuru!')
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setThumbnail(message.author.displayAvatarURL())
      .addField('Başvuruyu Yapan', `**${message.author.tag}**`)
      .addField('İsmi', isim)
      .addField('Yaşı', yaş)
      .addField('Günlük Aktiflik Süresi', aktiflik)
      .addField('Başvurduğu Yetki', yetki)
      .setFooter(`${message.author.username} Tarafından Başvuruldu`, message.author.displayAvatarURL(), `${message.channel.name} Kanalında kullanıldı.`)
  );
};

module.exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvur'],
  permLevel: 0,
  name: 'başvur',
  description: 'Yetkili Başvuru Sistemi',
  usage: 'başvur'
};