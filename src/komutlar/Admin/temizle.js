const discord = require('discord.js');


module.exports.run = async function(client, message, args){
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Dostum yavaş bu komutu sadece yetkililer kullanabilir.');

  const amount = args[0] > 100 ? 100 : args[0] < 1 ? 1 : args[0]; // Silinecek mesaj sayısı
  await message.channel.bulkDelete(amount);
  message.channel.send(`${amount} tane mesaj sildim`)
    .then(msg => {
      msg.delete({timeout: 2000}); // 2 saniye sonra mesajı siler
    });
}



module.exports.config = {
   name: "temizle",
   desc: "Temizle Komutu",
   aliases: ["clear", "sil", "temizle"]
}