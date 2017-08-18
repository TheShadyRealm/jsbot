var datenow = require('../bot.js').time
function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}
exports.run = (client, message, args) => {
		var upt = Math.round((Date.now() - datenow())/1000);
		message.channel.send({embed: {
			color: 15784782,
			title: ':timer: JSBot Uptime:',
			description: '<@' + message.author.id + '>, This bot has been alive for **' + mts(upt) + '** :clock10:'
		}})
	}
