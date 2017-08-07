var upsidedown = require('upsidedown');
exports.run = (client, message, args) => {
  if(args.length === 1){
    message.channel.send({embed: {
    color: 15784782,
    title: 'Flip a user (╯°□°）╯︵ ┻━┻',
    description: 'Flip a user in this server... it also flips their username (if i have the permissions to)... so be careful NO ABUSE KK?'
  }})
  return;
  }
  if(message.guild.member(message.mentions.users.first()) === null) return;
  var text = message.guild.member(message.mentions.users.first()).displayName
  message.channel.send({embed: {
    color: 15784782,
    title: 'OwO! ' + message.guild.member(message.mentions.users.first()).displayName + ' has been flipped! :scream:',
    description: '(╯°□°）╯︵ ' + upsidedown(text)
  }})
  if(!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) return;
  message.guild.member(message.mentions.users.first()).setNickname(upsidedown(text)).catch(console.error)
}
