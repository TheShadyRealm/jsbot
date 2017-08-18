const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var emojis = [];
  var emojiID = message.guild.emojis.map(m=>m.id)
  var emojiNames = message.guild.emojis.map(m=>m.name)
  for(var i = 0; i < emojiID.length; i++){
    emojis.push('<:' + emojiNames[i] + ':' + emojiID[i] + '>' )
  }
  var ecf = message.guild.explicitContentFilter.toString();
  var ecfText;
  var vl = message.guild.verificationLevel.toString();
  var vlText;
  if(ecf === '0'){
    ecfText = "None"
  }
  if(ecf === '1'){
    ecfText = "Scan messages from members without a role"
  }
  if(ecf === '2'){
    ecfText = "Scan  messages sent by all members"
  }
  if(vl === '0'){
    vlText = "None"
  }
  if(vl === '1'){
    vlText = "Low"
  }
  if(vl === '2'){
    vlText = "Medium"
  }
  if(vl === '3'){
    vlText = "(╯°□°）╯︵ ┻━┻"
  }
  if(vl === '4'){
    vlText = "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"
  }
  console.log(message.guild.members.filter(m=>m.type==='bot').size)
  const embed = new Discord.RichEmbed()
  .setColor(15784782)
  .setImage(message.guild.iconURL)
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription("Server ID: " + message.guild.id)
  .addField("Default Channel", message.guild.defaultChannel, true)
  .addField("Default Role", message.guild.defaultRole, true)
  .addField("Region", message.guild.region, true)
  .addField("Total Members", message.guild.memberCount, true)
  .addField("Roles", message.guild.roles.size, true)
  .addField("Emoji Count", message.guild.emojis.size, true)
  .addField("Channels" + ' (' + message.guild.channels.size + ' total)', 'Text: ' + message.guild.channels.filter(c=>c.type==="text").size + ', Voice: ' + message.guild.channels.filter(c=>c.type==="voice").size, true)
  .addField("Explicit Content Filter", ecfText, true)
  .addField("Verification Level", vlText, true)
  .addField("Owner", message.guild.owner + " (ID: " + message.guild.ownerID + ')')
  .addField("Created", message.guild.createdAt.toString(), true)
  message.channel.send({embed})
  message.channel.send('**Full Emoji List:** ' + emojis.join(''))
}
