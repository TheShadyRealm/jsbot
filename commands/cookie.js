const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Give a user a cookie! :cookie:',
      description: "`.cookie [user]` gives given user a given cookie given! (wut)"
    }})
    return;
  }
  if(message.guild.member(message.mentions.users.first()) === null) return;
  if(message.guild.member(message.mentions.users.first()).id === message.author.id){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Give a user a cookie! :cookie:',
      description: "Awww... you have no friends to give a cookie to... go make some... then give THEM a cookie :smile:"
    }})
    return;
  }
  var cookieuser = message.guild.member(message.mentions.users.first())
  const embed = new Discord.RichEmbed()
  .setColor(15784782)
  .setAuthor(message.member.displayName, message.author.avatarURL)
  .setThumbnail('https://cdn.discordapp.com/emojis/317089362334580736.png')
  .setDescription(message.author + ' has given ' + cookieuser + ' a cookie! :cookie:')
  message.channel.send({embed})
}
