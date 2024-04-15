module.exports = {
async run (client, message, args){
   if(!message.member.hasPermission('MOVE_MEMBERS')) return message.channel.send('Buna iznin yok!!')
   const üye = message.mentions.members.first()
   if(!üye) return message.channel.send('Geçerli bir üye belirtiniz')
   if(!üye.voice.channel) return message.channel.send('Bahsettiğin kişi sesli kanalda değil.')
   if(message.member.voice.channel){
     message.channel.send('Başarıyla taşındı.')
     üye.voice.setChannel(message.member.voice.channel.id)
   }  
   else{
    if (!args[1]) return message.channel.send('Kanal İd giriniz')
    if (İsNaN(args[1])) return message.channel.send('Sadece kanal adını girin')
    message.channel.send('Başarıyla kanala taşındı')
    üye.voice.setChannel(args[1])
   }
}
}
module.exports.config = {
name:"taşı"
}
