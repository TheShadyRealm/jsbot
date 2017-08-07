const Discord = require('discord.js');
exports.run = (client, message, args) => {
  console.log('calculating love for:', args[1], args[2])
  if(args.length === 1){
    message.reply("Calculate the chance of love between two users... :kissing_heart: `.lovecalc [user 1] [user 2]`")
    return;
  }
  if(args[1] === undefined || args[2] === undefined){
    message.reply('Make sure to mention 2 people for this command to work... :blush:')
    return;
  }
  if(!args[1].includes('<') || !args[2].includes('<')){
    message.reply('Make sure you mention the user... :kissing_heart:')
    return;
  }
  var user1 = args[1].split('');
  var user2 = args[2].split('');
  var alg = user1.concat(user2);
  var numcount = 0;
  var multiplier = 2;
  var addiplier = 3;
  var finalnumber;
  for(var i = 0; i < alg.length; i++){
    if(parseInt(alg[i]) === 3){
      numcount++;
    }
    if(parseInt(alg[i]) === 4 || parseInt(alg[i]) === 9 || parseInt(alg[i]) === 8){
      multiplier++;
    }
    if(parseInt(alg[i]) === 7){
      addiplier++;
    }
  }
  console.log(multiplier, numcount, addiplier)
  finalnumber = numcount*multiplier+addiplier;
  if(finalnumber > 100){
    finalnumber = finalnumber - 80;
  }
  if(finalnumber <= 40){
    symbol = ':broken_heart:'
  } else if(finalnumber < 80 && finalnumber > 40){
    symbol = ':heart:'
  } else {
    symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
  }
  if(args[1] === '<@!275334018214658060>' && args[2] === '<@!272780089488572428>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!272780089488572428>'){
    finalnumber = 100;
    symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
  }
  if(args[1] === '<@!275334018214658060>' && args[2] === '<@!245342510598062080>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!245342510598062080>'){
    finalnumber = 100;
    symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
  }
  if(args[1] === '<@!275334018214658060>' && args[2] === '<@!272473368840634378>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!272473368840634378>'){
    finalnumber = 101;
    symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
  }
  const embed = new Discord.RichEmbed()
  .setAuthor(message.member.displayName, message.author.displayAvatarURL)
  .setColor('#F0DB4E')
  .setTimestamp()
  .setFooter("Love Calculator (gone lovely)", 'https://cdn.shopify.com/s/files/1/1061/1924/products/Beating_Pink_Heart_Emoji_large.png?v=1480481034')
  .setTitle('Love calculator... :revolving_hearts:')
  .setDescription('The results of the love calculation between ' + args[1] + ' and ' + args[2] + ' is **' + finalnumber + '%** ' + symbol)
  message.channel.send({embed})
}
