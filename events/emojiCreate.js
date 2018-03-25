module.exports = (client, emoji) => {
  const Discord = require('discord.js');
  var channeltosend = '417437351766392834';
  const embed = new Discord.RichEmbed()
  .setColor('#76FF03')
  .setAuthor('Emoji Created:', "https://images-ext-1.discordapp.net/external/cU8b5WEWePPXxYQOJh5WW15MeZC58yr8yx8JfwB9Ais/https/i.imgur.com/R8g3toc.png")
  .setDescription("Emoji: " + emoji.name + " created\n")
  .setImage(emoji.url)
  .setTimestamp();
  emoji.guild.channels.get(channeltosend).send({embed});
};
