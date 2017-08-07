var urban = require('urban');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var search = args.join(' ').substring(4).toString()
  var keyword = urban(search)
  keyword.first(function(json) {
    if(json === undefined) {
      message.channel.send({embed: {
        color: 15784782,
        title: 'Urban Dictionary Search :mag_right:',
        description: 'Could not find that term on the urban dictionary... how rare... :thinking:'
      }})
      return;
    }
    var r = JSON.stringify(json)
    var def2 = ''
    var defstart = r.substr(r.indexOf('definition') + 13)
    var defcount = defstart.indexOf('permalink')
    var def = defstart.substr(0, defcount - 3).replace(/((\s)+(\\[r])+(\\[n])|(^\d))|(\\[r])+(\\[n])/g, '\n')
    var authorstart = r.substr(r.indexOf('author') + 9)
    var authorcount = authorstart.indexOf('word')
    var author = authorstart.substr(0, authorcount - 3)
    var upstart = r.substr(r.indexOf('thumbs_up') + 11)
    var upcount = upstart.indexOf('author')
    var up = upstart.substr(0, upcount - 2)
    var downstart = r.substr(r.indexOf('thumbs_down') + 13)
    var downcount = downstart.indexOf('}')
    var down = downstart.substr(0, downcount)
    var examplestart = r.substr(r.indexOf('example') + 10)
    var examplecount = examplestart.indexOf('thumbs_down')
    var example = examplestart.substr(0, examplecount - 3).replace(/((\s)+(\\[r])+(\\[n])|(^\d))|(\\[r])+(\\[n])/g, '\n')
    if(example === ''){
      example = 'No example found :cry:'
    }
    if(def.split('').length > 2048){
      def2 = def.substr(2048)
      def = def.substr(0, 2047)
      const embed = new Discord.RichEmbed()
      .setColor(15784782)
      .setTitle('Urban Dictionary Search :mag_right:  "' + search + '"')
      .setThumbnail('https://d2gatte9o95jao.cloudfront.net/assets/apple-touch-icon-55f1ee4ebfd5444ef5f8d5ba836a2d41.png')
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setDescription(def)
      .addField('Description Continued (bc it was more than 2048 characters... :stuck_out_tongue:', def2)
      .addField('Example', example)
      .addField('Author', author, true)
      .addField('Ratings', ':thumbsup: ' + up + ' :thumbsdown: ' + down, true)
      message.channel.send({embed})
      return;
    }
    const embed = new Discord.RichEmbed()
    .setColor(15784782)
    .setTitle('Urban Dictionary Search :mag_right:  "' + search + '"')
    .setThumbnail('https://d2gatte9o95jao.cloudfront.net/assets/apple-touch-icon-55f1ee4ebfd5444ef5f8d5ba836a2d41.png')
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setDescription(def + def2)
    .addField('Example', example)
    .addField('Author', author, true)
    .addField('Ratings', ':thumbsup: ' + up + ' :thumbsdown: ' + down, true)
    message.channel.send({embed})
  });
}
