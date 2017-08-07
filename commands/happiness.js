exports.run = (client, message, args) => {
   if(message.guild.member(message.mentions.users.first()) === null){
     message.channel.send(":thinking: https://www.youtube.com/watch?v=8anp1xJXkU0")
   } else {
     if(args.length === 1){
       message.channel.send({embed: {
       color: 15784782,
       title: 'Happiness... :smile:',
       description: "Mention someone and make their day... :sunrise_over_mountains: "
     }})
     } else {
       message.channel.send({embed: {
         color: 15784782,
         title: ':smile: :smiley: :rofl: :laughing: :grin: :grinning: :slight_smile: :sweat_smile: :upside_down:',
         description: '<@' + (message.guild.member(message.mentions.users.first()).id) + '>, you have been told by <@' + message.author.id + '> to be happy!'
       }})
     }
   }
 }
