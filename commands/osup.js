const config = require("./../config.json");
const osu = require("osu")(config.osukey);
const Discord = require('discord.js');
function comma(num){
	return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}
exports.run = (client, message, args) => {
  var checkuser = args[1].replace(/[\D]/g, '')
  osu.get_user({
  "u": checkuser
  }).then(function(result) {
      var rawuser = JSON.stringify(result)
      var u = rawuser.replace(/["]\W{2}|["]/g, '');
      console.log(u)
      var username = u.substr(u.indexOf('username') + 8, (u.substr(u.indexOf('username') + 8)).indexOf('count'))
      var hit300 = u.substr(u.indexOf('count300') + 8, (u.substr(u.indexOf('count300') + 8)).indexOf('count100'))
      var hit100 = u.substr(u.indexOf('count100') + 8, (u.substr(u.indexOf('count100') + 8)).indexOf('count50'))
      var hit50 = u.substr(u.indexOf('count50') + 7, (u.substr(u.indexOf('count50') + 7)).indexOf('playcount'))
      var playcount = u.substr(u.indexOf('playcount') + 9, (u.substr(u.indexOf('playcount') + 9)).indexOf('ranked_score'))
      var rankedscore = u.substr(u.indexOf('ranked_score') + 12, (u.substr(u.indexOf('ranked_score') + 12)).indexOf('total_score'))
      var totalscore = u.substr(u.indexOf('total_score') + 11, (u.substr(u.indexOf('total_score') + 11)).indexOf('pp_rank'))
      var pprank = u.substr(u.indexOf('pp_rank') + 7, (u.substr(u.indexOf('pp_rank') + 7)).indexOf('level'))
      var level = ~~(parseFloat(u.substr(u.indexOf('level') + 5, (u.substr(u.indexOf('level') + 5)).indexOf('pp_raw'))))
      var ppraw = ~~(parseFloat(u.substr(u.indexOf('pp_raw') + 6, (u.substr(u.indexOf('pp_raw') + 6)).indexOf('accuracy'))))
      var accuracy = (parseFloat(u.substr(u.indexOf('accuracy') + 8, (u.substr(u.indexOf('accuracy') + 8)).indexOf('count_rank_ss')))).toFixed(2)
      var ss = u.substr(u.indexOf('count_rank_ss') + 13, (u.substr(u.indexOf('count_rank_ss') + 13)).indexOf('count_rank_s'))
      var ufix = (u.substr(u.indexOf('count_rank_ss') + 13))
      var s = ufix.substr(ufix.indexOf('count_rank_s') + 12, (ufix.substr(ufix.indexOf('count_rank_s') + 12)).indexOf('count_rank_a'))
      var a = u.substr(u.indexOf('count_rank_a') + 12, (u.substr(u.indexOf('count_rank_a') + 12)).indexOf('country'))
      var country = u.substr(u.indexOf('country') + 7, (u.substr(u.indexOf('country') + 7)).indexOf('pp_country_rank'))
      var countryrank = u.substr(u.indexOf('country_rank') + 12, (u.substr(u.indexOf('country_rank') + 12)).indexOf('events'))
      const embed = new Discord.RichEmbed()
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setColor(15784782)
      .setTitle('Osu User Lookup: ID - ' + checkuser)
      .setThumbnail('https://cdn.discordapp.com/attachments/275334819737501696/343124152514773012/pp.png')
      .addField('Username', username, true)
      .addField('Hit Score', '**300:** ' + hit300 + ', **100:** ' + hit100 + ', **50:** ' + hit50, true)
      .addField('Play Count', playcount, true)
      .addField('Ranked Score', comma(rankedscore), true)
      .addField('Total Score', comma(totalscore), true)
      .addField('Rank (pp)', comma(pprank), true)
      .addField('pp', comma(ppraw), true)
      .addField('level', level, true)
      .addField('Accuracy', accuracy + '%', true)
      .addField('Grade Count', '**SS:** ' + ss + ', **S:** ' + s + ', **A:** ' + a, true)
      .addField('Country Rank (Country: ' + country + ')', comma(countryrank))
      message.channel.send({embed})
  });
}
