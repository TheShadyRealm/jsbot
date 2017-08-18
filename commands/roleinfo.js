const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Role Info :information_source:',
      description: "`.roleinfo [role mention/role name (caps matter!)]` to find information about a role :smiley:"
    }})
  }
  var findRole = message.mentions.roles.first();
  if(!message.content.includes(message.mentions.roles.first())){
    findRole = message.guild.roles.find('name', args.join(' ').substring(10))
  }
  if(findRole === undefined || findRole === null){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Role Info :information_source:',
      description: "Make sure the role you entered is a valid role mention or role name... lol"
    }})
    return;
  }
  console.log()
  const embed = new Discord.RichEmbed()
  .setColor(15784782)
  .setTitle(':information_source: Role Info')
  .setThumbnail(findRole.guild.iconURL)
  .addField('Name', findRole.name, true)
  .addField('ID',  findRole.id, true)
  .addField('Color', findRole.hexColor, true)
  .addField('Position (highest # on top)', findRole.calculatedPosition, true)
  .addField('Created At', findRole.createdAt, true)
  .addField('Mentionable', findRole.mentionable, true)
  .addField('Hoist', findRole.hoist, true)
  .addField('Non-User Managed', findRole.managed, true)
  .addField('User(s) With Role', (findRole.members.map(m=>m.displayName)).join(', '), true)
  message.channel.send({embed})
}
