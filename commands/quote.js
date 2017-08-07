var async = require('asyncawait/async');
var await = require('asyncawait/await');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
exports.run = (client, message, args) => {
  if(message.author.id != '275334018214658060') return;
  if(args.length === 1) return;
  var messageid = args[1];
  var findmessage = message.channel.fetchMessage(messageid).then(function(message){
    return i = message
  }).catch(console.error);
  (async(function() {
    await(sleep(500))
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: i.member.displayName,
        icon_url: i.author.displayAvatarURL
      },
      title: 'Quoting message with ID ' + args[1],
      description: i.content
    }})
  }))();
}
