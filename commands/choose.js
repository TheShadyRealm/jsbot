exports.run = (client, message, args) => {
  var tosend;
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Choose :scroll: ',
      description: 'Choose from a list of items... `choose [option1;option2;option3;etc]`'
    }})
  } else {
    var options = args.join(' ').substring(8).split(/[;\t]+/);
    var x = ~~((Math.random()* options.length) + 0)
    console.log(x)
    var pick = options[x]
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Choose :scroll: ',
      description: '**Choosing from list**\n' + options.join(', ') + '\n**Chose**\n' + pick
    }})
  }
}
