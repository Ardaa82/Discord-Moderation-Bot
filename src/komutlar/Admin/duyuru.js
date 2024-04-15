const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Dostum yavaş bu komutu sadece yetkililer kullanabilir.');{

    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Yazmam İçin Birşey Yazmalısın!');
    message.delete();
    const embed = new Discord.MessageEmbed()
        .setAuthor('')
        .setColor('FF0000')
        .setDescription(`${mesaj}`)
        .setAuthor('')
        .setFooter(`Weise Bot • Mesaj Gönderme Saati: ${new Date().toLocaleTimeString()}`, client.user.displayAvatarURL())
    return message.channel.send(embed);
};
}

module.exports.config = {
    enabled: true,
    guildOnly: false,
    aliases: ['duyuryap', 'duyur'],
    permLevel: 2,
    name: 'duyuru',
    description: 'Güzel Bir Duyuru Görünümü Sağlar.',
    usage: 'duyuru [Duyuruda Yazıcak Şey]'
};
