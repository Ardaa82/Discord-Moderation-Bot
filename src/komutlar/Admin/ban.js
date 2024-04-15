module.exports.run = async (client, message, args) => {
    // Komutu kullanan kişinin yetkisi kontrol edilir
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('Dostum yavaş, bu komutu sadece yetkililer kullanabilir!');
    }

  
    // Banlanacak kişi ve sebebi belirlenir
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi";
  
    // Eğer kişi bulunamazsa hata mesajı gönderilir
    if (!member) {
      return message.reply("Lütfen bir kullanıcı belirtin!");
    }
  
    // Eğer bot kullanıcısına veya kendine ban atılmak istenirse hata mesajı gönderilir
    if (member.id === message.author.id) {
      return message.reply("Kendini banlayamazsın!");
    } else if (member.user.bot) {
      return message.reply("Botlara ban atılamaz!");
    }
  
    // Ban işlemi yapılır
    try {
      await member.ban({ reason: reason });
      message.channel.send(`${member} başarıyla banlandı. Sebep: ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply("Ban işlemi yapılırken bir hata oluştu!");
    }
  };
  

  module.exports.config = {
    name: "ban",
    desc: "Ban Komutu",
    aliases: ["ban"]
 }