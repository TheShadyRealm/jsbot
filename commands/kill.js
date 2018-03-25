exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  if(message.guild.member(message.mentions.users.first()) === null){
    message.reply("stop trying to exploit this bot smh...")
    return;
  } else if(message.author.id === '315123695129591823'){
    message.reply("<@315123695129591823> attempted to stab " + (message.guild.member(message.mentions.users.first()).id) + " but miserably failed and stabbed himself instead...")
  } else if((message.guild.member(message.mentions.users.first()).id) === '324427383849353219'){
    message.reply("you really think you can kill me? HA think again!")
    return;
  } else {
    var method = [" 360 noscoped ",
    " knifed ",
    " threw a combustable lemon at ",
    " shot a portal inside of ",
    " threw a knife that lodged into ",
    " took a gun from the table and immediately turned and shot ",
    " attached a grenade to an arrow and shot ",
    " blew a poison dart at ",
    " thrusted a sword hard into ",
    " ate "];
    this.res = (Math.floor(Math.random() * (method.length - 1)) + 0)
    if(message.author.id === message.guild.member(message.mentions.users.first()).id){
      message.channel.send("if you want to kill yourself, i recommend draino... way more effective than bleach tbh")
    } else {
      const embed = new Discord.RichEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setColor('#F0DB4E')
      .setTitle(":skull_crossbones: **RIP** :skull_crossbones:")
      .addField(message.member.displayName + method[this.res] + message.guild.member(message.mentions.users.first()).displayName, 'and received ' + (Math.floor(Math.random() * 100) + 1) + " style points")
      message.channel.send({embed})
    }
  }
}
