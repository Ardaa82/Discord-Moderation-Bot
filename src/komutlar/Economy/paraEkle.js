const fs = require('fs');
const path = require('path');
const { prefix, botName } = require('../../../config.json');

// Kullanıcı verilerinin dosya yolu
const userDataFilePath = path.join(__dirname, '../../Data/economyUserData/userData.json');

exports.run = (client, message, args) => {
    // Sadece belirli bir kullanıcının bu komutu kullanmasını istiyorsanız, kullanıcının ID'sini burada belirtin.
    const allowedUserId = '728596008401109045';

    // Komutun sadece izin verilen kullanıcı tarafından kullanılmasını sağlayın
    if (message.author.id !== allowedUserId) {
        return message.reply('Bu komutu kullanma izniniz yok.');
    }

    // Eklenecek paranın miktarını alın
    const amountToAdd = parseInt(args[0]);

    // Geçerli bir miktar girilip girilmediğini kontrol edin
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
        return message.reply('Geçerli bir miktar belirtmelisiniz.');
    }

    // Etiketlenen kullanıcının ID'sini alın
    const user = message.mentions.users.first();
    if (!user) {
        return message.reply('Kullanıcıyı etiketlemelisiniz.');
    }
    const userId = user.id;

    // Kullanıcı verilerini yükle
    let userData = {};
    if (fs.existsSync(userDataFilePath)) {
        userData = JSON.parse(fs.readFileSync(userDataFilePath));
    } else {
        fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));
    }

    // Belirtilen kullanıcının var olup olmadığını kontrol edin
    if (!userData[userId]) {
        return message.reply('Belirtilen kullanıcı bulunamadı.');
    }

    // Para ekleyin
    userData[userId].money += amountToAdd;

    // Verileri dosyaya yazın
    fs.writeFileSync(userDataFilePath, JSON.stringify(userData, null, 2));

    // Başarılı bir şekilde mesajı yanıtlayın
    return message.reply(`Başarıyla ${amountToAdd} para eklendi.`);
};

module.exports.config = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    name: 'paraekle',
    desc: 'Belirli bir kullanıcıya para ekler.',
    aliases: ['paraekle'],
};
