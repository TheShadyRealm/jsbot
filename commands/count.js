const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var count = [];
  if(args.length != 4){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Count :one::two::three:',
      description: 'Input a number between 0-999... Usage: `.count min max interval` and NO COUNTING BACKWARDS k?"'
    }})
  } else {
    var n1 = parseInt(args[1]);
    var n2 = parseInt(args[2]);
    var n3 = parseInt(args[3]);
    if(n1 => 0 && n1 < 1000 && n2 > 0 && n2 < 1000 && n3 < (n2-n1) && n2 > n1 && n3 != 0){
      for(var m = n1; m <= n2; m+=n3){
        count.push(m);
      }
      const embed = new Discord.RichEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setColor('#F0DB4E')
      .setTitle(":checkered_flag: Counted " + Math.round(n2/n3) + " numbers: ")
      .setDescription(count.join(', '))
      .setTimestamp()
      message.channel.send({embed})
    } else {
      message.channel.send({embed: {
      color: 15784782,
      title: 'Count :one::two::three:',
      description: 'Input a number between 0-999... Usage: `.count min max interval` and NO COUNTING BACKWARDS k?"'
    }})
    }
  }
}
