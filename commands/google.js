var google = require('google')
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  google.resultsPerPage = 1
  var searches = [];
  var nextCounter = 0
  google(args.join(' ').substring(8), function (err, res){
    if (err) console.error(err)
    for (var i = 0; i < res.links.length; ++i) {
      var link = res.links[i];
      searches.push('**' + link.title + '**' + link.href + link.description + "\n")
      if(searches[i].includes('null')){
        searches.splice(i, 1)
      }
      console.log(link.title + ' - ' + link.href)
      console.log(link.description + "\n")
    }
    if (nextCounter < 4) {
      nextCounter += 1
      if (res.next) res.next()
    }
    if(searches.length === 5){
      const embed = new Discord.RichEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setThumbnail('https://static.linder.kr/enterprise/assets/google_500-e946e038f46a393f8fcbaae7780daa030b5a93f730394cef758c48e6ccbf24b9.png')
      .setColor(15784782)
      .setTitle('Google Search: "' + args.join(' ').substring(8) + '" :mag_right:')
      .setDescription(searches.join('\n'))
      .setFooter('Powered by NOT google LOL', 'http://www.sucaijiayuan.com/uploads/allimg/130308/2-13030QQ630.png')
      message.channel.send({embed})
    }
  })
}
