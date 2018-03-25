module.exports = (client, emoji) => {
  const Discord = require('discord.js');
  var channeltosend = '417437351766392834';
  const embed = new Discord.RichEmbed()
  .setColor("#D50000")
  .setAuthor('Emoji Deleted:', "https://images-ext-2.discordapp.net/external/j54mKISgUCq97dPStacT36ceRFA0qjHbnT1xffzO1yU/https/i.imgur.com/SPeiFGu.png")
  .setDescription("Emoji: " + emoji.name + " deleted\n")
  .setImage(emoji.url)
  .setTimestamp();
  emoji.guild.channels.get(channeltosend).send({embed});
};
