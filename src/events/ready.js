const ayarlar = require('../../config.json');
const prefix = ayarlar.prefix;

module.exports = (client) => {
  const activitiesList = [
    `${prefix}yardım`,
    `${client.guilds.cache.array().length} sunucuda aktifim`,
    `modded by Arda`,
  ];
  let i = 0;
  
  console.log(`Bot ${client.user.tag} adı ile giriş yaptı!`);
  
  client.user.setActivity(activitiesList[0], { type: 'WATCHING' });
  client.user.setStatus('idle'); 
  
  setInterval(() => {
    i = i < activitiesList.length - 1 ? i + 1 : 0;
    client.user.setActivity(activitiesList[i], { type: 'WATCHING' });
  }, 300000);
};
