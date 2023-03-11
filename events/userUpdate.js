const moment = require("moment")
let serverSettings = require("../models/serverSettings");
module.exports = class {
    constructor(client) {
        this.client = client;
    }

async run(oldUser, newUser) {
  let server = await serverSettings.findOne({});
  let tag = server.Tag;
  let tag2 = server.Tag2;
  let tag3 = server.Tag3;
  let tag4 = server.Tag4;
  let tag5 = server.Tag5;
  let etiket = server.Etiket;
  let ikinciTag = server.SecondaryTag;
  let member = newUser.client.guilds.cache.get(this.client.config.guildID).members.cache.get(newUser.id);
  let ekip = member.guild.roles.cache.get(`${server.FamilyRole}`);
  let tagsayı = this.client.users.cache.filter(user => user.username.includes(tag)).size;
  
  if (!oldUser.username.includes(tag) || !oldUser.username.includes(tag2) || !oldUser.username.includes(tag3) || !oldUser.username.includes(tag4) || !oldUser.username.includes(tag5) || !oldUser.username.includes(etiket)  && newUser.username.includes(tag) || newUser.username.includes(tag2) || newUser.username.includes(tag3) || newUser.username.includes(tag4) || newUser.username.includes(tag5) || newUser.username.includes(etiket))  {
    await member.roles.add(ekip).catch(console.error);
    if (member.manageable) member.setNickname(member.displayName.replace(ikinciTag, tag)).catch(console.error);
  
    this.client.channels.cache.get(server.JoinFamilyLog).send(`
${member} adlı üye tagımızı kullanıcı adına ekleyerek ailemize katıldı! | Sunucuda bulunan toplam taglı üyemiz: (${tagsayı}) 
─────────────────
Önce: ${oldUser.tag} | Sonra: ${newUser.tag}`).catch();
  }
  else if (oldUser.username.includes(tag) || oldUser.username.includes(tag2) || oldUser.username.includes(tag3) || oldUser.username.includes(tag4) || oldUser.username.includes(tag5) || oldUser.username.includes(etiket) && !newUser.username.includes(tag) || !newUser.username.includes(tag2) || !newUser.username.includes(tag3) || !newUser.username.includes(tag4) || !newUser.username.includes(tag5) || !newUser.username.includes(etiket)) {
  
    if (server && server.TaggedMode == true) {
      if(!member.roles.cache.has(server.VipRole) && !member.roles.cache.has(server.BoosterRole) && !member.roles.cache.has(server.QuarantineRole) && !member.roles.cache.has(server.BannedTagRole) && !member.roles.cache.has(server.SuspectedRole) && !member.roles.cache.has(server.ADSRole)) return await member.roles.set(server.UnregisteredRole).catch(console.error);
     } else
    if (member.manageable) member.setNickname(member.displayName.replace(tag, ikinciTag)).catch(console.error);
      
    let roles = member.roles.cache.clone().filter(e => e.managed || e.position < ekip.position);
    await member.roles.set(roles).catch();

    if (member.roles.cache.get(`${server.BotCommandRole}`)) {
      this.client.channels.cache.get(server.AuthyLeaveLog).send(`
${newUser} adlı üye **${moment(Date.now()).locale("tr").format("LLL")}** tarihinde yetkiyi bıraktı.
Bırakmadan önceki yetkileri:\n${member.roles.cache.filter(rol => ekip.position <= rol.position && !rol.managed).map(x => `<@&${x.id}>`)}
    `);
    } else
      this.client.channels.cache.get(server.LeaveFamilyLog).send(`
${member} adlı üye ( ${tag} ) tagını kullanıcı adından silerek aramızdan ayrıldı! | Sunucuda bulunan toplam taglı üyemiz: (${tagsayı}) 
─────────────────
Önce: ${oldUser.tag} | Sonra: ${newUser.tag}`).catch();
  }

}
};