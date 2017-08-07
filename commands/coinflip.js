var async = require('asyncawait/async');
var await = require('asyncawait/await');
exports.run = (client, message, args) => {
  var coin;
  var flip = ~~((Math.random()* 2) + 1)
  console.log(flip)
  if(flip === 1){
    coin = 'heads'
  } else if(flip === 2){
    coin = 'tails'
  }
  (async (function(){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Flip a coin! :moneybag:',
      description: "Call the flip!"
    }}).then(message => message.delete(2250))
          await(sleep(2350));
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Flip a coin! :moneybag:',
      description: "Flipped a coin... it's " + coin + '!'
    }})
      }))();
}
