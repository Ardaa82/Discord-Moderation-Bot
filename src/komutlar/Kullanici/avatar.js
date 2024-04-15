const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let kullanıcı = message.mentions.members.first();

    
    if (kullanıcı) {
        const $adista = new Discord.MessageEmbed()
            .setDescription(`${kullanıcı} Kişisinin Profil Resmi`)
            .setColor('#36393F')
            .setImage(kullanıcı.user.avatarURL({ dynamic: true, size: 2048 }))
        message.channel.send($adista)

    } else {
        const $adista = new Discord.MessageEmbed()
            .setDescription(`${message.author} Profil Resmin`)
            .setColor('#36393F')
            .setImage(message.author.avatarURL({ dynamic: true, size: 2048 }))
        message.channel.send($adista)

    }
}

module.exports.config = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    name: 'avatar',
    desc: 'Kişisinin Profil Resmini atar',
    aliases: ['avatar', 'pp'],
};
