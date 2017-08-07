const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var getUser = message.guild.member(message.mentions.users.first())
  var getAvatar = getUser.user.displayAvatarURL
  console.log(getAvatar)
  const embed = new Discord.RichEmbed()
  .setTitle(getUser.user.username + '#' + getUser.user.discriminator + "'s avatar")
  .setColor(15784782)
  .setImage(getAvatar)
  message.channel.send({embed})
}
