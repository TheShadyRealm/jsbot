var hexRgb = require('hex-rgb');
var rgbHex = require('rgb-hex');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if(args.length > 2) return;
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Color Hex/RGB',
      description: "Specify a hex color and get some info about it"
    }})
  }
  var toconvert = args.join(' ').substring(5)
  var converted = (hexRgb(toconvert)).join(', ')
  var hex = '#' + rgbHex(converted)
  const embed = new Discord.RichEmbed()
  .setColor(hex)
  .setTitle('Color Hex/RGB')
  .addField('Hex Input', '**' + hex + '**')
  .addField('RGB Equivalent', '**' + converted + '**')
  message.channel.send({embed})
}
