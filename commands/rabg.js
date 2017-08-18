const randomAnimeWallpapers = require('random-anime-wallpapers')
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  randomAnimeWallpapers()
  .then(images => {
    var x = Math.floor(Math.random() * images.length) + 0
    var y = (images.map(m=>m.full))[x]
    const embed = new Discord.RichEmbed()
    .setColor(15784782)
    .setTitle('**Link to this image**')
    .setURL(y)
    .setImage(y)
    message.channel.send({embed})
  })
}
