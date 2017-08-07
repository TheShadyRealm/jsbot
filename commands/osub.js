const config = require("./../config.json");
const osu = require("osu")(config.osukey);
const Discord = require('discord.js');
function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}
exports.run = (client, message, args) => {
  if(args.length === 1) return;
  var checkmap = args[1].replace(/[\D]/g, '')
  var checkset = args[1].replace(/[/]+[^/]+\w|[:]/g, '')
  console.log(checkmap, checkset)
  if(checkset === 'https/s'){
    osu.get_beatmaps({
      "s": checkmap,
      "limit" : 1
      }).then(function(result) {
        var b = JSON.stringify(result)
        console.log(b)
        var a = b.substr(b.indexOf('artist') + 9)
        var acount = a.indexOf('title')
        var artist = a.substr(0, acount - 3)
        var n = b.substr(b.indexOf('title') + 8)
        var ncount = n.indexOf('creator')
        var name = n.substr(0, ncount - 3)
        var c = b.substr(b.indexOf('creator') + 10)
        var ccount = c.indexOf('bpm')
        var creator = c.substr(0, ccount - 3)
        var bpmf = b.substr(b.indexOf('bpm') + 6)
        var bpmcount = bpmf.indexOf('source')
        var bpm = bpmf.substr(0, bpmcount - 3)
        var l = b.substr(b.indexOf('total_length') + 15)
        var lcount = l.indexOf('hit_length')
        var length = mts(l.substr(0, lcount - 3))
        var max = b.substr(b.indexOf('max_combo') + 12)
        var maxcount = max.indexOf('difficultyrating')
        var maxcombo = max.substr(0, maxcount - 3)
        var d = b.substr(b.indexOf('difficultyrating') + 19)
        var dcount = d.indexOf(']')
        var diff = (d.substr(0, dcount - 2))
        var v = b.substr(b.indexOf('version') + 10)
        var vcount = v.indexOf('file_md5')
        var version = v.substr(0, vcount - 3)
        const embed = new Discord.RichEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL)
        .setColor(15784782)
        .setTitle('Osu Beatmap Lookup: ID - ' + checkmap)
        .setThumbnail('http://pre09.deviantart.net/141d/th/pre/f/2016/115/a/8/osu__logo_by_shadowthegod-da05j13.png')
        .addField('Title', '**[' + artist + ' - ' + name + ']** by ' + creator, true)
        .addField('BPM', bpm, true)
        .addField('Length', length, true)
        .addField('Max Combo', maxcombo, true)
        .addField('Difficulty', parseFloat(diff).toFixed(2) + '☆', true)
        .addField('Version', version, true)
        message.channel.send({embed})
    });
  } else if(checkset === 'https/b'){
    osu.get_beatmaps({
      "b": checkmap
      }).then(function(result) {
        console.log(result)
        var b = JSON.stringify(result)
        var a = b.substr(b.indexOf('artist') + 9)
        var acount = a.indexOf('title')
        var artist = a.substr(0, acount - 3)
        var n = b.substr(b.indexOf('title') + 8)
        var ncount = n.indexOf('creator')
        var name = n.substr(0, ncount - 3)
        var c = b.substr(b.indexOf('creator') + 10)
        var ccount = c.indexOf('bpm')
        var creator = c.substr(0, ccount - 3)
        var bpmf = b.substr(b.indexOf('bpm') + 6)
        var bpmcount = bpmf.indexOf('source')
        var bpm = bpmf.substr(0, bpmcount - 3)
        var l = b.substr(b.indexOf('total_length') + 15)
        var lcount = l.indexOf('hit_length')
        var length = mts(l.substr(0, lcount - 3))
        var max = b.substr(b.indexOf('max_combo') + 12)
        var maxcount = max.indexOf('difficultyrating')
        var maxcombo = max.substr(0, maxcount - 3)
        var d = b.substr(b.indexOf('difficultyrating') + 19)
        var dcount = d.indexOf(']')
        var diff = (d.substr(0, dcount - 2))
        var v = b.substr(b.indexOf('version') + 10)
        var vcount = v.indexOf('file_md5')
        var version = v.substr(0, vcount - 3)
        const embed = new Discord.RichEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL)
        .setColor(15784782)
        .setTitle('Osu Beatmap Lookup: ID - ' + checkmap)
        .setThumbnail('http://pre09.deviantart.net/141d/th/pre/f/2016/115/a/8/osu__logo_by_shadowthegod-da05j13.png')
        .addField('Title', '**[' + artist + ' - ' + name + ']** by ' + creator, true)
        .addField('BPM', bpm, true)
        .addField('Length', length, true)
        .addField('Max Combo', maxcombo, true)
        .addField('Difficulty', parseFloat(diff).toFixed(2) + '☆', true)
        .addField('Version', version, true)
        message.channel.send({embed})
    });
  } else {
    return;
  }
}
