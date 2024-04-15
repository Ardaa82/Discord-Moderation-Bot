const Discord = require('discord.js');
const config = require('../../../config.json');
const botName = config.botName;

exports.run = (client, message, args) => {
    const Embed = new Discord.MessageEmbed()
        .setTitle(`Arda • ${botName}`)
        .setDescription('Yapımcımın Sosyal Medya Hesapları :')
        .addFields({ name: 'İnstagram', value: '[Takip Et](https://www.instagram.com/ardaterz_/)' })
        .addFields({ name: 'Discord', value: `[Katıl](https://discord.gg/NGBF9MHJwh)` })
        .addFields({ name: 'Github', value: '[Bakılacak Bir yer](https://github.com/Ardaa82)' })
        .setFooter(`${botName} • Hep Birlikte Daha İleriye`, client.user.displayAvatarURL())
        .setColor('RANDOM');
    message.channel.send(Embed);
};

module.exports.config = {
    name: "sosyal",
    desc: "Kurucumun Sosyal Medya Hesaplarını Gösterir.",
    aliases: ["sosyal", "kurucusosyal", "sosyalmedya", "kurucu", "sosyal-medya"]
};
