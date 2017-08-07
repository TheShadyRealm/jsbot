const Discord = require('discord.js');
const fs = require("fs");
const wordListPath = require('word-list');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const wordnet = require('wordnet');
exports.run = (client, message, args) => {
  if(args.length === 1) return;
  var word = args[1]
  var defArray = []
  if(!wordArray.includes(word)){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: ':notebook_with_decorative_cover: Definition(s) for "' + word + '"',
      description: 'I don\'t think that word is english... or it\'s probably super obvious :thinking:'
    }})
    return;
  }
  wordnet.lookup(word, function(err, definitions) {
    definitions.forEach(function(definition) {
      var s = definition.glossary.replace(/[;]/g, '\n')
      defArray.push(s)
    });
    const embed = new Discord.RichEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setColor(15784782)
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikt_dynamic_dictionary_logo.svg/2000px-Wikt_dynamic_dictionary_logo.svg.png')
    .setTitle(':notebook_with_decorative_cover: Definition(s) for "' + word + '"')
    .setDescription(defArray.join('\n'))
    .setFooter('Provided by WordNet LMAO', 'https://lh3.googleusercontent.com/klzb6YkXqOtUhJ0ToAu9H1-FW5p-ORdeiSedoezeiyGPe_FYHUtC-EMs1AhqSyJG1OU=w170')
    .setTimestamp()
    message.channel.send({embed})
  });
}
