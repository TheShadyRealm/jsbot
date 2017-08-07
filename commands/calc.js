const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var method = (args.join(" ").substring(5)).toString();
  var num1 = parseInt(args[1]);
  var num2;
  var ymbol;
  if(method.includes("+")){
   symbol = '+'
   num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
   var returns = num1 + num2;
  } else if(method.includes("-")){
   symbol = '-'
   num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
   var returns = num1 - num2;
  } else if(method.includes("/")){
   symbol = '/'
   num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
   var returns = num1 / num2;
  } else if(method.includes("*")){
   symbol = '*'
   num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
   var returns = num1 * num2;
  } else if(method.includes("^")){
   symbol = '^'
   num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
   var returns = Math.pow(num1, num2);
  } else {
   return;
  }
  if(isNaN(num1) || isNaN(num2)){
   message.reply("2b or not 2b... that is the question...")
   return;
  }
  const embed = new Discord.RichEmbed()
  .setAuthor(message.member.displayName, message.author.displayAvatarURL)
  .setColor('#98ff98')
  .setTitle(':gear: Simple Calculation :gear: ')
  .addField('Expression: `' + num1 + '`' + symbol +  '`' + num2 + '`', 'Result: `' + returns + '`')
  message.channel.send({embed})
}
