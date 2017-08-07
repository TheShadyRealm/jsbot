exports.run = (client, message, args, mutedArr) => {
   var tosend;
   if(args.length === 1){
     message.channel.send({embed: {
       color: 15784782,
       title: 'Mute User :mute: ',
       description: 'Mute a user from the channel :x:'
     }})
     return;
   }
   if(message.guild.member(message.mentions.users.first()) === null){
     message.channel.send({embed: {
       color: 15784782,
       title: 'Mute User :mute: ',
       description: 'What are you trying to do... mute air?'
     }})
     return;
   } else {
     if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES') && !message.guild.member(message.mentions.users.first()).permissionsIn(message.channel).has('ADMINISTRATOR')){
       if(mutedArr.includes(message.guild.member(message.mentions.users.first()).id)){
         tosend = "Didn't you already mute this user?"
       } else {
         message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
           SEND_MESSAGES: false, ATTACH_FILES: false
         }).catch(console.error)
         tosend = message.guild.member(message.mentions.users.first()) + " has been muted in this channel... i think... :white_check_mark: "
         mutedArr.push(message.guild.member(message.mentions.users.first()).id)
       }
     } else {
       tosend = "Make sure you have permissions to mute this user... or maybe they just can't be muted... damn what a god"
     }
   }
   message.channel.send({embed: {
     color: 15784782,
     title: 'Muting user: ' + (message.guild.member(message.mentions.users.first()).displayName) + ' :mute:' ,
     description: ':loudspeaker: ' + message.author + ', ' + tosend
   }})
 }
