exports.run = (client, message, args) => {
  message.channel.send({embed: {
  color: 15784782,
  description: (':ping_pong: **Pong!** Time taken: ' + ~~(client.ping) + 'ms')
  }})
}
