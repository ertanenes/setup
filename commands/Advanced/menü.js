const Command = require("../../base/Command.js");
const Custom = require("../../models/_model");
const Discord = require("discord.js");
const moment = require("moment")

class Menu extends Command {
    constructor(client) {
        super(client, {
            name: "menü",
            usage: ".menü [@user]",
            category: "!Meriaz",
            description: "Belirttiğiniz kullanıcının komut bloğunu kaldırır.",
            aliases: ["menu"]
        });
    }
/**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */
    async run(message, args, data, client, member) {
        let Data = await Custom.find({})
        let comp;
        let defa = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setCustomId("ekle")
            .setLabel("Menü Oluşturmaya Başla!")
            .setEmoji("🎉")
            .setStyle("DANGER")
        )
        if(Data && Data.length >= 1) {
            
            let listele = []
            Data.forEach(async (x) => {
                listele.push({label: x.Name, description: `${moment(x.Date)} ${message.guild.members.cache.get(x.Author) ? `- ${message.guild.members.cache.get(x.Author).user.tag}` : ""}`, value: x.Name})
            })
            comp = [defa, new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                .setCustomId("sil")
                .setPlaceholder("Silmek istediğin menüyü seç!")
                .addOptions(
                    listele
                ),
                   
            ),new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                .setCustomId("kur")
                .setPlaceholder("Kurmamı istediğin menüyü seç!")
                .addOptions(
                    listele
                ),
                   
            )]
        } else {
            comp = [defa]
        }
    
        message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`Merhaba! **${message.member.user.tag}** :tada:

    **${message.guild.name}** sunucusuna ait olan menüler altta menü şeklinde listelenmektedir hiç oluşturmadıysanız butona basarak başlıyabilirsiniz
    \`1.Adım\` Menü etkileşiminin üstünde gözükecek texti girin.
    \`2.Adım\` Menünün üsttünde olması gereken texti girin. (Emojilerden faydalabilirsiniz)
    \`3.Adım\` Menüde kullancağınız rolleri etiketleyin (toplu şekilde)`)], components: comp}).then(async (msg) => {
                        const filter = i => i.user.id == message.member.id 
                        const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })
                        collector.on("collect", async (i) => {
                            if(i.customId == "sil") {
                                await Custom.deleteOne({Name: i.values})
                                i.reply({content: `:white_check_mark: Başarıyla **${i.values}** isimli rol seçim menüsü silindi.`, ephemeral: true})
                                msg.delete().catch(err => {})
                            }
                            if(i.customId == "kur") {
                                let kurulcak = await Custom.findOne({Name: i.values})
                                if(kurulcak) {
                                    let Opt = []
                                    kurulcak.Roles.forEach(r => {
                                        Opt.push({label: message.guild.roles.cache.get(r) ? message.guild.roles.cache.get(r).name : "@Rol Bulunamadı!",
                                        emoji: { "id": "996838388630036490" },
                                    value: r})
                                    })
                                    let listMenu = new Discord.MessageActionRow().addComponents(
                                        new Discord.MessageSelectMenu()
                                        .setCustomId(kurulcak.Secret)
                                        .setPlaceholder(`${kurulcak.Name}`)
                                        .setOptions(
                                            [Opt, {"label": "Rol İstemiyorum", "value": "rolsil", "emoji": "🗑️"}]
                                        )
                                    )
                                    message.channel.send({content: `${kurulcak.Text}`, components: [listMenu]}).then(async (oluşturuldu) => {
                                        var filter = i => i.customId == kurulcak.Secret
                                        let collector = oluşturuldu.createMessageComponentCollector({filter: filter})
                                        collector.on('collect', async (i) => {
                                            const member = await client.guilds.cache.get(ayarlar.guildID).members.fetch(interaction.member.user.id)
                                            if (!member) return;
                                            let Data = await Custom.findOne({Secret: kurulcak.Secret})
                                            let customMap = new Map()
                                            Data.Roles.forEach(r => customMap.set(r, r))
                                              let roles = Data.Roles
                                              var role = []
                                              for (let index = 0; index < i.values.length; index++) {
                                                let ids = i.values[index]
                                                let den = customMap.get(ids)
                                                role.push(den)
                                              }
                                              if (i.values[0] === "rolsil") {
                                                await member.roles.remove(roles)
                                              } else {
                                                if (!i.values.length) {
                                                    await member.roles.remove(roles).catch(err => {})
                                                  } else {
                                                    await member.roles.remove(roles).catch(err => {})
                                                    await member.roles.add(role).catch(err => {})
                                                  }
                                              }
                                              i.reply({ content: ":white_check_mark: Rolleriniz güncellendi.", ephemeral: true })
                                        })
                                    })
                                    i.reply({content: `:white_check_mark: Başarıyla **${kurulcak.Name}** isimli rol seçim menüsü kuruldu.`, ephemeral: true})
                                    msg.delete().catch(err => {})
                                }
                            }
                            if(i.customId == "ekle") {
                                msg.delete().catch(err => {})
                                message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
                                \`1.Adım\` Menü etkileşiminin üstünde gözükecek texti girin 
                                1.adımı uygulayınız...:tada:`)]}).then(async (isimbelirleme) => {
        let rolSeçim = {
            Name: String,
            Roles: Array,
            Text: String,
            Date: Date.now(),
            Secret: secretOluştur(10),
            Author: message.member.id,
        }
        var filt = m => m.author.id == message.member.id
        let collector = isimbelirleme.channel.createMessageCollector({filter: filt, time: 60000, max: 1, errors: ["time"]})
        collector.on("collect", async (m) => {
            let mesaj = m.content
            if(mesaj == "iptal" || mesaj == "ıptal") {
                return isimbelirleme.edit({content: null, embeds: [new Discord.MessageEmbed().setDescription(`:white_check_mark: Başarıyla rol seçim menü oluşturma aracı iptal edildi.`)]}).then(x => {
                    setTimeout(() => {
                        isimbelirleme.delete().catch(err => {})
                    }, 15000);
                })
            }
            rolSeçim.Name = mesaj
            message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            \`1.Adım\` = \`${rolSeçim.Name}\`
            2.adımı uygulayınız...:tada:`)]})
    .then(async (açıklamabelirleme) => {
        var filt = m => m.author.id == message.member.id
        let collector = açıklamabelirleme.channel.createMessageCollector({filter: filt, time: 60000, max: 1, errors: ["time"]})
        collector.on("collect", async (m) => {
            let mesaj = m.content
            if(mesaj == "iptal" || mesaj == "ıptal") {
                return açıklamabelirleme.edit({content: null, embeds: [new Discord.MessageEmbed().setDescription(`:white_check_mark: Başarıyla rol seçim menü oluşturma aracı iptal edildi.`)]}).then(x => {
                    setTimeout(() => {
                        açıklamabelirleme.delete().catch(err => {})
                    }, 15000);
                })
            }
            rolSeçim.Text = m.content
            açıklamabelirleme.delete().catch(err => {})
            message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            \`1.Adım\` = \`${rolSeçim.Name}\`
            \`2.Adım\` = \`${rolSeçim.Text}\`
            3.adımı uygulayınız...:tada:`)]}).then(async (rolbelirleme) => {
        var filt = m => m.author.id == message.member.id
        let collector = msg.channel.createMessageCollector({filter: filt, time: 60000, max: 1, errors: ["time"]})
        collector.on("collect", async (m) => {
            let mesaj = m.content
            if(mesaj == "iptal" || mesaj == "ıptal") {
               return rolbelirleme.edit({content: null, embeds: [new Discord.MessageEmbed().setDescription(`:white_check_mark: Başarıyla rol seçim menü oluşturma aracı iptal edildi.`)]}).then(x => {
                    setTimeout(() => {
                        rolbelirleme.delete().catch(err => {})
                    }, 15000);
                })
            }
            rolbelirleme.delete().catch(err => {})
            let rolPushing = []
            if(m.mentions.roles.size >= 1) {
              rolPushing = m.mentions.roles.map(role => role.id)
            } else {
              let argss = m.content.split(" ");
              argss = argss.splice(0)
              let rolVerAbime = argss.filter(role => message.guild.roles.cache.some(role2 => role == role2.id))
              rolPushing.push(...rolVerAbime)
            }
            rolSeçim.Roles = rolPushing
            message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`
            \`1.Adım\` = \`${rolSeçim.Name}\`
            \`2.Adım\` = \`${rolSeçim.Text}\`
            \`3.Adım\` = ${rolSeçim.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")}
:tada::tada::tada: Başarıyla **${rolSeçim.Name}** isimli rol seçim menüsü \`${moment(Date.now())}\` tarihinde oluşturuldu.`)]}).then(async (oluşturuldu) => {
        let secretKodu = secretOluştur(10)
        await Custom.updateOne({Name: rolSeçim.Name}, { $set: { "Text": rolSeçim.Text, "Roles": rolSeçim.Roles, "Date": Date.now(), Secret: secretKodu, "Author": message.member.id,  }}, {upsert: true})
        
    })
        })
    })
        })
    })
            isimbelirleme.delete().catch(err => {})
    
    
        })
    
    })
    
                            }
                        })
    
        })
    }
}

module.exports = Menu;


function secretOluştur(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }