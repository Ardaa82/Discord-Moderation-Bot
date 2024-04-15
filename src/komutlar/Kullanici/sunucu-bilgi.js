module.exports = {
    async run (client, message, async){
        const {MessageEmbed} = require('discord.js')
        var guild = message.guild
        var kanallar = guild.channels.cache
        var üyeler = guild.members.cache
        var emojiler = guild.emojis.cache
        var roller = guild.roles.cache
        var embed = new MessageEmbed()
        .setTitle(`${guild.name} adlı sunucunun bilgileri:`)
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addField(`**TEMEL BİLGİLER**`,[
          `**Sunucu Adı:** ${guild.name}`,
          `**Sunucu Id:** ${guild.id}`,
          `**Sunucu Sahibi:** <@${guild.owner.id}>`,
        ])
        .addField(`**İSTATİSTİKLER**`,[
            `**Kullanıcı Sayısı:** ${üyeler.filter(üye => !üye.user.bot).size}`,
            `**Bot Sayısı:** ${üyeler.filter(üye => üye.user.bot).size}`,
            `**Emoji Sayısı:** ${emojiler.size}`,
            `**Rol Sayısı:** ${roller.filter(rol => rol.name !== '@everyone').size}`,
            `**Metin Kanalı Sayısı:** ${kanallar.filter(kanal => kanal.type === 'text').size}`,
            `**Ses Kanalı Sayısı:** ${kanallar.filter(kanal => kanal.type === 'voice').size}`,
            `**Kategori Sayısı:** ${kanallar.filter(kanal => kanal.type === 'category').size}`
        ])
        .addField(`**DURUMLAR**`,[
            `**Çevrimiçi Üye Sayısı:** ${üyeler.filter(üye => üye.presence.status === 'online').size}`,
            `**Boşta:** ${üyeler.filter(üye => üye.presence.status === 'idle').size}`,
            `**Rahatsız Etmeyin:** ${üyeler.filter(üye => üye.presence.status === 'dnd').size}`,
            `**Çevrimdışı  Üye Sayısı:** ${üyeler.filter(üye => üye.presence.status === 'offline').size}`
        ])
        .setFooter('Weise Bot • Hep Birlikte Daha İleriye', client.user.displayAvatarURL(),)
        .setTimestamp()
        message.channel.send(embed)
    }
}
module.exports.config = {
  name:"sunucu-bilgi"
}