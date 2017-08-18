const Discord = require('discord.js');
exports.run = (client, message, args) => {
  for(var i = 0; i < message.guild.emojis.size; i++){
    if(args.join(' ').substring(7).includes((message.guild.emojis.map(m=>m.name))[i])){
      const embed = new Discord.RichEmbed()
      .setColor(15784782)
      .setImage((message.guild.emojis.map(m=>m.url))[i])
      message.channel.send({embed})
    }
  }
}
