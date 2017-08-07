const Discord = require('discord.js');
exports.run = (client, message, args, userID, numID, guessNumID) => {
  console.log(userID, numID, guessNumID)
  var authorID = message.author.id;
  var difficulty = ['easy', 'medium', 'hard', 'expert'];
  var valid;
  var difftype;
  var checkValid = (args.join(" ").substring(18)).toString();
  if(userID.includes(message.author.id)){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Wait...',
      description: "Haven't you already started a game? :thinking:"
    }})
    return;
  } else {
    if(checkValid === difficulty[0]){
      valid = true; difftype = 0; maxN = 1000;
      var randomN = ~~((Math.random()* maxN) + 0);
      userID.push(authorID);
      numID.push(randomN);
      guessNumID.push(1);
      console.log(userID, numID, guessNumID);
    } else if(checkValid === difficulty[1]){
      valid = true; difftype = 1; maxN = 100000;
      var randomN = ~~((Math.random()* maxN) + 0);
      userID.push(authorID);
      numID.push(randomN);
      guessNumID.push(1);
      console.log(userID, numID, guessNumID);
    } else if(checkValid === difficulty[2]){
      valid = true; difftype = 2; maxN = 10000000;
      var randomN = ~~((Math.random()* maxN) + 0);
      userID.push(authorID);
      numID.push(randomN);
      guessNumID.push(1);
      console.log(userID, numID, guessNumID);
    } else if(checkValid === difficulty[3]){
      valid = true; difftype = 3; maxN = 1000000000;
      var randomN = ~~((Math.random()* maxN) + 0);
      userID.push(authorID);
      numID.push(randomN);
      guessNumID.push(1);
      console.log(userID, numID, guessNumID);
    } else {
      valid = false;
      const embed = new Discord.RichEmbed()
      .setColor('#ffe135')
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setTitle('What the hell!')
      .setDescription('You attempted to set the difficulty to: `' + checkValid + '`... try `easy, medium, hard, or expert` instead...')
      .setTimestamp()
      message.channel.send({embed})
      return;
    }
    this.max = maxN
    const embed = new Discord.RichEmbed()
    .setColor('#ffe135')
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setTitle('New game started!')
    .setDescription('Difficulty set to: `' + difficulty[difftype] + '`... numbers will range from `0` to `' + maxN + '`')
    .setTimestamp()
    message.channel.send({embed})
  }
}
