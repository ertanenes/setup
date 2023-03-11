const Command = require("../../base/Command.js");
const Discord = require("discord.js")
let serverSettings = require("../../models/serverSettings");
const moment = require("moment")
const axios = require('axios')
require("moment-duration-format")
moment.locale("tr")
class Merimkur extends Command {
    constructor(client) {
        super(client, {
            name: "ramalkur",
            usage: ".ramalkur [@user]",
            category: "ramal",
            description: "Belirttiğiniz kişinin profil bilgilerini görürsünüz.",
            aliases: ["ramalkur"]
        });
    }

    async run (message, args, perm) { 
        let server = await serverSettings.findOne({
          guildID: message.guild.id
      });
      if(!message.member.permissions.has("ADMINISTRATOR")) return;
     
        message.channel.send(`Yapmak İstediğin Kurulumu Seçiniz.`)
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId('merilogs')
                .setPlaceholder('Kuruluma başlamak için tıkla!')
                .addOptions([
                    {
                        label: 'Emojileri Kur!',
                        description: 'Emojileri sunucuya yükler.',
                        value: 'meriemoji',
                    },
                    {
                        label: 'Logları Kur!',
                        description: 'Logları sunucuya yükler.',
                        value: 'merilogs',
                    },
                ]),
        );
  let msg = await message.channel.send({ components: [row] })
  var filter = (menu) => menu.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, max: 2, time: 30000 })
 
  collector.on("collect", async (menu) => {
     if(menu.values[0] === "meriemoji") {
        msg.edit({ components: [row] }); 

        let ramal_vunmute = "https://cdn.discordapp.com/emojis/933325556722847786.webp?size=96&quality=lossless";
        let ramal_slotgif = "https://cdn.discordapp.com/emojis/926963384556093520.gif?size=96&quality=lossless";
        let ramal_patlican = "https://cdn.discordapp.com/emojis/926963384623181874.webp?size=96&quality=lossless";
        let ramal_unmute = "https://cdn.discordapp.com/emojis/933325273632489512.webp?size=96&quality=lossless";
        let coin = "https://cdn.discordapp.com/emojis/926963384623173633.webp?size=96&quality=lossless";
        let coinflip = "https://cdn.discordapp.com/emojis/926963384786763796.gif?size=96&quality=lossless";
        let no_ramal = "https://cdn.discordapp.com/emojis/929716459461042248.webp?size=96&quality=lossless";
        let yes_ramal = "https://cdn.discordapp.com/emojis/990569138160279612.gif?size=96&quality=lossless";
        let ramal_kalp = "https://cdn.discordapp.com/emojis/926963384774197298.webp?size=96&quality=lossless";
        let ramal_kiraz = "https://cdn.discordapp.com/emojis/926963384350539797.webp?size=96&quality=lossless";
        let ramal_mute = "https://cdn.discordapp.com/emojis/929716460010500106.webp?size=96&quality=lossless";
        let ramal_para = "https://cdn.discordapp.com/emojis/926963384937762916.gif?size=96&quality=lossless";
        let ramal_star = "https://cdn.discordapp.com/attachments/827439712834158622/827439871505072178/star.gif";
        let ramal_erkek = "https://cdn.discordapp.com/emojis/981204949599936552.gif?size=96&quality=lossless";
        let ramal_kadin = "https://cdn.discordapp.com/emojis/981204937994293328.gif?size=96&quality=lossless";
    
        menu.reply("Emojileri Kurmaya Başlıyorum.")
        message.guild.emojis.create(ramal_vunmute, "ramal_vunmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_slotgif, "ramal_slotgif").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_patlican, "ramal_patlican").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_unmute, "ramal_unmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(coin, "coin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(coinflip, "coinflip").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(no_ramal, "no_ramal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(yes_ramal, "yes_ramal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_kalp, "ramal_kalp").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_kiraz, "ramal_kiraz").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_mute, "ramal_mute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_para, "ramal_para").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_star, "ramal_star").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_erkek, "ramal_erkek").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
        message.guild.emojis.create(ramal_kadin, "ramal_kadin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
     
        return;
    } 
    else if(menu.values[0] === "merilogs") {

        msg.edit({ components: [row] }); 
     
        menu.reply(`Logları Kurmaya Başlıyorum.`)
        const parent = await message.guild.channels.create('Ramal Logs', { type: 'GUILD_CATEGORY' });
     await message.guild.channels.create('join-family', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('leave-family', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('yetkili-tag-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('yasaklı-tag', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('booster-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('command-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('command-block', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('moderation-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('rol-yönet-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('register-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('cezai-işlem-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('yasak-kaldırma-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('stream-denetleme-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('stream-cezalı±-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('basit-nickname', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('voice-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('nickname-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('message-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('discord-user-log', { type: 'GUILD_TEXT', parent: parent.id });
    await message.guild.channels.create('invite-tracker', { type: 'GUILD_TEXT', parent: parent.id });
    message.channel.send(`Loglar Başarıyla Kuruldu.`)
 

      
        }
    })
    }
}

module.exports = Merimkur;