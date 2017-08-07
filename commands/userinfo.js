const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      title: ':information_source: User Info',
      description: '`.userinfo [user]` shows some top secret spy-level 5/7 :ok_hand: information about said user :mag:'
    }})
    return;
  }
  var user = message.guild.member(message.mentions.users.first())
  var userRoles = (user.roles.map(c=>c.name))
  var game;
  if(user.presence.game === null){
    game = 'None'
  } else {
    game = user.presence.game.name
  }
  var roles = []
  for(var i = 1; i < userRoles.length; i++){
    roles.push(userRoles[i])
  }
  const embed = new Discord.RichEmbed()
  .setColor(15784782)
  .setTitle(':information_source: User Info')
  .setThumbnail(user.user.avatarURL)
  .addField("Name", user.user.username + '#' + user.user.discriminator, true)
  .addField("Server Nickname", user.displayName, true)
  .addField("ID", user.id, true)
  .addField("Roles (" + roles.length + ")", roles.reverse().join(', '), true)
  .addField("Name Color", user.displayHexColor, true)
  .addField("Status", user.presence.status, true)
  .addField("Now playing", game, true)
  .addField("Joined server at", user.joinedAt, true)
  .addField("Joined Discord at", user.user.createdAt, true)
  message.channel.send({embed})
}
