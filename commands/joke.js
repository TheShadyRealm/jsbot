var oneLinerJoke = require('one-liner-joke');
exports.run = (client, message, args) => {
  var getRandomJoke = oneLinerJoke.getRandomJoke();
  var s = JSON.stringify(getRandomJoke)
  var body = s.substr(s.indexOf('body') + 7)
  var bodycount = body.indexOf('tags') - 3
  var fullbody = body.substr(0, bodycount)
  console.log(fullbody)
  message.channel.send({embed: {
    color: 15784782,
    title: 'One-Line Jokes :laughing:',
    description: fullbody
  }})
}
