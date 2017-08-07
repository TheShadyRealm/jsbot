exports.run = (client, message, args) => {
  message.delete()
  var space = args.join(" ").substring(7)
  var tosend = space.split('')
  message.channel.send(tosend.join(' ') + ' **- ' + message.author.username + ' 2017**')
}
