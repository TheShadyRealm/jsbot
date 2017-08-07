exports.run = (client, message, args) => {
		var upt = Math.round((Date.now() - this.date)/1000);
		message.channel.send({embed: {
			color: 15784782,
			title: ':timer: JSBot Uptime:',
			description: '<@' + message.author.id + '>, This bot has been alive for **' + mts(upt) + '** :clock10:'
		}})
	}
