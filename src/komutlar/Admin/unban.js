module.exports = {
    async run(client, message, args) {
      let id = args[0];
      if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Bu komutu kullanmak için yeterli iznin yok!');
      if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('Bu komutu kullanmak için yeterli iznim yok!');
      if (isNaN(id)) return message.reply('Geçerli bir ID girin.');
      message.guild.fetchBans().then(banList => {
        if (banList.size === 0) return message.reply('Bu sunucuda yasaklanmış biri yok.');
        let bannedUser = banList.find(user => user.user.id === id);
        if (!bannedUser) return message.reply('Bu kullanıcı yasaklanmamış.');
        message.guild.members.unban(bannedUser.user).then(() => {
          message.reply(`\`${bannedUser.user.tag}\` adlı kullanıcının yasağı kaldırıldı.`);
        }).catch(err => {
          console.log(err);
          message.reply('Bir hata oluştu ve yasak kaldırılamadı.');
        });
      }).catch(err => {
        console.log(err);
        message.reply('Bir hata oluştu ve yasak listesi alınamadı.');
      });
    },
    config: {
      name: 'unban',
      description: 'Bir kullanıcının yasağını kaldırır.',
      usage: 'unban <kullanıcı ID>',
      permissions: ['BAN_MEMBERS'],
      aliases: [],
    },
  };
  