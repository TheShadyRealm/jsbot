exports.run = (client, message, args) => {
   var tosend;
   if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES', 'MANAGE_ROLES')){
     if(args.length === 1){
       tosend = "Warn a user for misbehaving... :smiling_imp: Usage: `.warn [user] (reason)`"
     } else {
       console.log(args[1].length)
       var x = args[1].length + 1;
       console.log(x);
       message.mentions.users.first().send("You have been warned in the server " + message.guild.name + " for **" + (args.join(" ").substring(6 + x)) + "**")
       tosend = "user " + (message.mentions.users.first()) + " has been warned for **" + (args.join(" ").substring(6 + x)) + "**"
     }
   }
   message.channel.send({embed: {
     color: 15784782,
     title: 'Warn user :smiling_imp: ',
     description: message.author + ", " + tosend
   }})
 }
