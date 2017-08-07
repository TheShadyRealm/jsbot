exports.run = (client, message, args) => {
		message.channel.send({embed: {
			color: 15784782,
			title: ':newspaper: List of custom (useless af) commands:',
			description: customtriggerlist.join(', ')
		}})
	}
