exports.run = (client, message, args) => {
  var maxuse;
  var time;
  if(args.length === 1){
    time = 1800;
    maxuse = 0;
  } else if(args.length === 2){
    time = parseInt(args[1])*60;
    maxuse = 0;
  } else if(args.length === 3){
    time = parseInt(args[1])*60;
    maxuse = parseInt(args[2]);
  } else {
    message.channel.send({embed: {
      color: 15784782,
      title: 'Get a server invite :envelope_with_arrow:',
      description: "`.invite (time) (maximum number of uses)` both fields are optional... time defaults to 30 minutes and max uses is default none"
    }})
    return;
  }
  console.log('invite: ', time + ' ' + maxuse)
  var createdInvite = message.guild.defaultChannel.createInvite(false, time, maxuse).then(function (m){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Get a server invite :envelope_with_arrow:',
      description: m.url
    }})
  }).catch(console.error)
}
