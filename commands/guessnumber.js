const Discord = require('discord.js');
exports.run = (client, message, args, userID, numID, guessNumID) => {
  if(userID.includes(message.author.id)){
    var checkID = userID.indexOf(message.author.id);
    var incr = ['Higher', 'Lower', 'You got it']; var incr1;
    var descIncr = ['higher than', 'lower than', 'exactly']; var descIncr1;
    var checkNum = numID[checkID];
    var guessNum = guessNumID[checkID];
    var checkGuess = parseInt(args[1]); console.log(checkGuess);
    if(isNaN(checkGuess) === true) return;
    if(checkGuess > this.max){
      message.channel.send({embed: {
        color: 15784782,
        title: ':thinking:',
        description: "It's from 0 to **" + this.max + "**... quick reminder"
      }})
      return;
    }
    if(checkGuess === checkNum){
      descIncr1 = 2; incr1 = 2;
      userID.splice(checkID, 1);
      numID.splice(checkID, 1);
      guessNumID.splice(checkID, 1);
    } else if(checkGuess > checkNum){
      descIncr1 = 1; incr1 = 1;
      guessNumID[checkID]++;
    } else if(checkGuess < checkNum){
      descIncr1 = 0; incr1 = 0;
      guessNumID[checkID]++;
    }
  } else {
    const embed = new Discord.RichEmbed()
    .setColor('#FF00FF')
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setTitle('OH NOES')
    .setDescription('Try starting a game first?')
    .setImage('https://vignette4.wikia.nocookie.net/khanacademy/images/2/24/Cs-ohnoes.svg/revision/latest/scale-to-width-down/180?cb=20140917102823')
    .setTimestamp()
    message.channel.send({embed})
    return;
  }
  const embed = new Discord.RichEmbed()
  .setColor('#FF00FF')
  .setAuthor(message.member.displayName, message.author.displayAvatarURL)
  .setTitle(incr[incr1] + '!')
  .setDescription('The number is ' + descIncr[descIncr1] + ' `' + checkGuess + '`')
  .setFooter('Guess #' + guessNum)
  .setTimestamp()
  message.channel.send({embed})
}
