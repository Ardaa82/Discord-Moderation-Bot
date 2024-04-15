const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db')



const client = new Client({ intents: Object.values(Intents.FLAGS) });

const botungirdinakalid = config.botungirdinakalid;
const prefix = config.prefix;
const token = config.token;
const botName = config.botName;

client.commands = new Collection();


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleykümselam hoşgeldin');
  }
});


//------------------------ ADMİN KOMUTLARINI YÜKLEME  ------------------------
fs.readdir('./src/komutlar/Admin/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} admin komutu yüklendi.`);
  files.forEach(file => {
    const command = require(`./src/komutlar/Admin/${file}`);
    console.log(`-- yüklenen komut: ${file}`);
    client.commands.set(command.config.name, command);
  });
});

//------------------------ KULLANİCİ KOMUTLARINI YÜKLEME  ------------------------
fs.readdir('./src/komutlar/Kullanici/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} kullanıcı komutu yüklendi.`);
  files.forEach(file => {
    const command = require(`./src/komutlar/Kullanici/${file}`);
    console.log(`-- yüklenen komut: ${file}`);
    client.commands.set(command.config.name, command);
  });
});

//------------------------ EKONOMİ KOMUTLARINI YÜKLEME  ------------------------
fs.readdir('./src/komutlar/Economy/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} Ekonomi komutu yüklendi.`);
  files.forEach(file => {
    const command = require(`./src/komutlar/Economy/${file}`);
    console.log(`-- yüklenen komut: ${file}`);
    client.commands.set(command.config.name, command);
  });
});

//------------------------ EVENTS YÜKLEME KISMI  ------------------------
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./src/events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./src/events/${file}`)];
    console.log("Events başarıyla yüklendi.")
  });
});


//------------------------ BOT SESLİYE GİRMESİ ------------------------
// " botungirdinakalid " kısmı config.json dadır botun başladığında otomatik olarak girdiği sesli kanal idsi ile çalışır
client.on("ready", async () => {
  let aroxVoice = client.channels.cache.get(botungirdinakalid);
  if (aroxVoice) aroxVoice.join().catch(err => console.error("Bot sesli kanala girmeyi başardı."));
});



// Yardım komutu
client.on('message', message => {
  if (message.content === `${prefix}help` || message.content === `${prefix}yardım`) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#7289DA')
      .setTitle(`${botName} - Yardım`)
      .setDescription(`
          _Aşağıdaki komutlarımı kullanarak beni yönetebilirsiniz._

          ** Genel Komutlar **
          ${prefix}genel  - Genel komutları gösterir.

         ** Ekonomi Komutları **
         ${prefix}ekonomi  - Ekonomi komutlarını gösterir.

         ** Admin Komutları **
         ${prefix}admin  - Admin komutlarını gösterir.
  
        `)
      .setFooter(botName, client.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(helpEmbed);
  }
});




// Admin Yardım komutu
client.on('message', message => {
  if (message.content === `${prefix}admin`) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply('Dostum yavaş, bu komutu sadece yetkililer kullanabilir!');
    }

    const adminHelpEmbed = new Discord.MessageEmbed()
      .setColor('#7289DA')
      .setTitle(`${botName} - Admin Yardım`)
      .setDescription('Aşağıdaki komutlar sadece yetkililer tarafından kullanılabilir.')
      .addFields(
        { name: `${prefix}ban`, value: `Sunucudaki seçilen kullanıcıyı banlar` },
        { name: `${prefix}kick`, value: `Sunucudaki seçilen kullanıcıyı kickler.` },
        { name: `${prefix}ping`, value: `Botun pingini gösterir.` },
        { name: `${prefix}oylama`, value: `Oylama başlatır.` },
        { name: `${prefix}temizle`, value: `Sunucuda belirtilen sayıda mesajı siler.` },
        { name: `${prefix}duyuru`, value: `Duyuru yapar.` },
        { name: `${prefix}oy-kick`, value: `Oylama yaparak birini kickler.` },
        { name: `${prefix}slowmode`, value: `Belirtilen kanalın yavaş modunu açar.` },
        { name: `${prefix}unban`, value: `Belirtilen kişinin yasağını kaldırır.` },
        { name: `${prefix}taşı`, value: `Bulunduğunuz sesli sohbet kanalına taşır.` },
        { name: `${prefix}setname`, value: `Etiketlenen kişinin sunucudaki adını değiştirir.` }
      )
      .setFooter(botName, client.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(adminHelpEmbed);
  }
});


// Genel Yardım komutu
client.on('message', message => {
  if (message.content === `${prefix}genel`) {
    const generalHelpEmbed = new Discord.MessageEmbed()
      .setColor('#7289DA')
      .setTitle(`${botName} - Genel Yardım`)
      .setDescription(`
      Aşağıdaki komutlar botun genel kullanımını sağlar.

     ** ${prefix}avatar** | Avatarınızı gösterir.
     ** ${prefix}kullanıcı-bilgi **| Kullanıcı bilgilerinizi gösterir.
     ** ${prefix}sosyal **| Kurucunun sosyal medya hesapları.
     ** ${prefix}sunucu-bilgi **| Sunucu bilgilerini gösterir.
     ** ${prefix}davet **| Botun davet linkini atar.
      `)
      .setFooter(botName, client.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(generalHelpEmbed);
  }
});
// Ekonomi Yardım komutu
client.on('message', message => {
  if (message.content === `${prefix}ekonomi`) {

    const adminHelpEmbed = new Discord.MessageEmbed()
      .setColor('#7289DA')
      .setTitle(`${botName} Ekonomi - Yardım Menüsü`)
      .setDescription(`
    __Ekonomi__
        _Para kazanmanın kolay yolları!_

      **${prefix}daily ** : Günlük paranı alırsın.

      __Kullanıcı__
      _Kullanıcı bilgilendirme_

      **${prefix}bakiye ** : Bakiyeni öğrenirsin.
      **${prefix}sıralama ** : Top 10 zengin listesi.

      > ** DAHA FAZLASI GELİCEK BEKLEMEDE KALIN **
      `)
      .setFooter(botName, client.user.displayAvatarURL());

    message.channel.send(adminHelpEmbed);
  }
});

//------------------------ BOTU SUNUCUYA EKLENDİ KISIM ------------------------
client.on('guildCreate', async guild => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Sunucuya eklediğiniz için teşekkürler!!')
    .setDescription('Sunucu Adı: `' + guild.name + '`')
  const embed2 = new Discord.MessageEmbed()
    .setTitle('Bir sunucuya katıldım')
    .setDescription(`Sunucu Adı: ${guild.name} `)
    .addField(`Sunucu Bilgileri: `, `» Sunucu Sahibi: ${guild.owner} \n» Kişi sayısı: ${guild.memberCount} \n» Rol sayısı: ${guild.roles.cache.size} \n» Sunucu kurulma tarihi: ${guild.createdAt.toLocaleDateString('tr-TR')} \n» Kanal sayısı: ${guild.channels.cache.size} `)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
  guild.owner.send(embed1)
  const channel = client.channels.cache.find(ch => ch.id === '1175831895930577087')
  channel.send(embed2)
})


//------------------------ BOTU SUNUCUDAN ÇIKARILDIĞI KISIM ------------------------
client.on('guildDelete', async guild => {
  const embed1 = new Discord.MessageEmbed()
    .setTitle('Sunucunuzdan çıkardığınız için üzgünüz!!')
    .setDescription('Sunucu Adı: `' + guild.name + '`')
  const embed2 = new Discord.MessageEmbed()
    .setTitle(`Bir sunucudan Çıkarıldım`)
    .setDescription(`Sunucu Adı: ${guild.name} `)
    .addField(`Sunucu Bilgileri: `, `» Sunucu Sahibi: ${guild.owner} \n» Kişi sayısı: ${guild.memberCount} \n» Sunucu kurulma tarihi: ${guild.createdAt.toLocaleDateString('tr-TR')} `)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
  guild.owner.send(embed1)
  const channel = client.channels.cache.find(ch => ch.id === '1175831895930577087')
  channel.send(embed2)
})


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(commandName));

  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply('Komutu çalıştırırken bir hata oluştu!');
  }
});


// Sunucu oluşturma ve proje aktivitesi sağlama.
const express = require('express');
const app = express();
const port = 3000;

// Web sunucu
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
});



client.login(token);
