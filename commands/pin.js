var async = require('asyncawait/async');
var await = require('asyncawait/await');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
exports.run = (client, message, args) => {
  if(message.author.id != '275334018214658060' && message.author.id != '245342510598062080' && message.author.id != '294489458554961930') return;
  if(args.length === 1) return;
  var messageid = args[1];
  var findmessage = message.channel.fetchMessage(messageid).then(function(message){
    return i = message
  }).catch(console.error);
  (async(function() {
    await(sleep(500))
    message.guild.channels.get('363176824353849344').send({embed: {
      color: 15784782,
      author: {
        name: i.member.displayName,
        icon_url: i.author.displayAvatarURL
      },
      description: i.content,
      timestamp: new Date()
    }})
  }))();
  message.channel.send("Potentially pinned");
}
