exports.run = (client, message, args, mutedArr) => {
		var tosend = "You can't unmute this person..."
		if(args.length === 1){
			message.channel.send({embed: {
				color: 15784782,
				title: 'Unmute User :speaker: ',
				description: 'Unmute someone from the channel :no_mouth:'
			}})
			return;
		}
		if(message.guild.member(message.mentions.users.first()) === null){
			message.channel.send({embed: {
				color: 15784782,
				title: 'Mute User :mute: ',
				description: "So first you tried to mute air... now you're trying to unmute the protons and electrons? :atom: "
			}})
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES')){
				if(mutedArr.includes(message.guild.member(message.mentions.users.first()).id)){
					mutedArr.splice(mutedArr.indexOf((message.guild.member(message.mentions.users.first()).id)), 1)
					message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
						SEND_MESSAGES: true, ATTACH_FILES: true
					}).catch(console.error)
					tosend = message.guild.member(message.mentions.users.first()) + " has been unmuted in this channel...:thinking:"
				} else {
					tosend = "Pretty sure you didn't mute this user... at least not with me..."
				}
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: 'Unmuting user: ' + (message.guild.member(message.mentions.users.first()).displayName) + ' :speaker:' ,
			description: ':loudspeaker: ' + message.author + ', ' + tosend
		}})
	}
