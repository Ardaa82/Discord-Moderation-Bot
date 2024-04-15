const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'oylama',
    aliases: ['vote'],
    description: 'Belirli bir konu hakkında oylama yapar.',
    usage: 'oylama [konu]',
    category: 'Genel'
  },
  run: async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTATOR')) return message.channel.send('Bu komutu kullanmak için `MESAJLARI_YÖNET` yetkisine sahip olmalısın.');

    let oylamaKonu = args.join(' ');
    if (!oylamaKonu) return message.channel.send('Lütfen bir oylama konusu belirtin.');

    const embed = new MessageEmbed()
      .setTitle('OYLAMA')
      .setDescription(oylamaKonu)
      .setColor('RANDOM') 
      .setFooter('Lütfen oylarınızı belirtin (evet/hayır)');

    const msg = await message.channel.send(embed);
    await msg.react('✅');
    await msg.react('❌');
  }
}
