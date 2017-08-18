exports.run = (client, message, args, colorrole) => {
  if(message.author.id === '272473368840634378'){
    message.channel.send({embed: {
      color: 15784782,
      description:'Haii ravi... i know you :heart: me :blush:'
    }})
    return;
  } else if(message.author.id === '275334018214658060'){
    if(args.length === 1){
      message.channel.send({embed: {
        color: 15784782,
        title: ':rainbow: Randomized Role Colors :paintbrush:',
        description:'`.colorrole [role]` Randomizes the role color of the specified role :thinking:'
      }})
    }
    if(!message.content.includes(message.mentions.roles.first())) return;
    if(message.mentions.roles.first() === null) return;
    if(args[1] === 'stop'){
      colorrole.splice(colorrole.indexOf(message.mentions.roles.first()), 1)
      message.channel.send({embed: {
        color: 15784782,
        title: ':rainbow: Randomized Role Colors :paintbrush:',
        description:'The role **"' + message.mentions.roles.first().name + '"** has now dropped the color randomization :disappointed_relieved:'
      }})
    } else {
      colorrole.push(message.mentions.roles.first())
      message.channel.send({embed: {
        color: 15784782,
        title: ':rainbow: Randomized Role Colors :paintbrush:',
        description:'The role **"' + message.mentions.roles.first().name + '"** now has randomized colors :smiley:'
      }})
      setInterval(function(){
        for(var i = 0; i < colorrole.length; i++){
            colorrole[i].setColor('RANDOM').catch(console.error)
        }
      }, 5000);
    }
  } else {
    return;
  }
}
