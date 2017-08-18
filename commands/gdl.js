const Discord = require('discord.js');
const GDClient = require("node-geometry-dash");
const GD = new GDClient({
  username: "...",  // doesn't work yet :/
  password: "..."   // doesn't work yet :/
});
exports.run = (client, message, args) => {
  var query = args.join(' ').substring(5)
  GD.levels(query).then(levels => {
    console.log(levels[0])
    var l = levels[0]
    const embed = new Discord.RichEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setColor(15784782)
    .setTitle('Geometry Dash Level Search')
    .setDescription(query)
    .setThumbnail('https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.PNG')
    .setTimestamp()
    .addField('Name', l.name, true)
    .addField('ID', l.id, true)
    .addField('Author', l.author.name, true)
    .addField('Difficulty', l.difficulty + ' (err?)', true)
    .addField('Stars', l.stars, true)
    .addField('Length', l.length, true)
    .addField('Description', l.description, true)
    .addField('Version', l.version, true)
    .addField('Downloads', l.downloads, true)
    .addField('Coins', l.coins, true)
    .addField('Featured', l.featured, true)
    .addField('Epic', l.epic, true)
    .addField('Song', 'Guess this \isn\'t working yet...', true)
    message.channel.send({embed})
  });
}
