module.exports = {
async run(client, message, args){
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply('Bu komutu kullanmak için gerekli yetkiye sahip değilsin!')
    let member = message.mentions.members.first()
    if (!member) return message.reply("Lütfen birini etiketle")
    member.setNickname(args.slice(1).join(" "))
    message.channel.send(`Başarıyla **${member.user.username}** adlı kişinin adı **${args.slice(1).join(" ")}** oldu.`)
}
}
module.exports.config = {
name:"isimdeğiştir",
desc: "Kullanıcının ismini değiştirir.",
aliases: ["setname","isimdeğiştir"]
}