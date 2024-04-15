module.exports.run = async (client, message, args) => {
    // Komutu kullanan kişinin yetkisi kontrol edilir
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin!");
    }
  
    // Kicklenecek kişi ve sebebi belirlenir
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi";
  
    // Eğer kişi bulunamazsa hata mesajı gönderilir
    if (!member) {
      return message.reply("Lütfen bir kullanıcı belirtin!");
    }
  
    // Eğer bot kullanıcısına veya kendine kick atılmak istenirse hata mesajı gönderilir
    if (member.id === message.author.id) {
      return message.reply("Kendini kickleyemezsin!");
    } else if (member.user.bot) {
      return message.reply("Botlara kick atılamaz!");
    }
  
    // Kick işlemi yapılır
    try {
      await member.kick(reason);
      message.channel.send(`${member} başarıyla kicklendi. Sebep: ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply("Kick işlemi yapılırken bir hata oluştu!");
    }
  };
  

  module.exports.config = {
    name: "kick",
    desc: "Kick Komutu",
    aliases: ["kick"]
 }