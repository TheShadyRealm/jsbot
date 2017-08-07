exports.run = (client, message, args) => {
  var reverse = args.join(" ").substring(9)
  var arr = (reverse.split('')).reverse()
  message.channel.send({embed: {
    color: 15784782,
    author: {
      name: message.member.displayName,
      icon_url: message.author.displayAvatarURL
    },
    title: 'Reverse text :upside_down:',
    description: "**Original**\n" + reverse + "\n**Reversed**\n" + arr.join('')
  }})
}
