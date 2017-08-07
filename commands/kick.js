exports.run = (client, message, args) => {
		var tosend;
		this.vic = message.guild.member(message.mentions.users.first())
		if(args.length === 1){
			message.channel.send({embed: {
				color: 15784782,
				title: ':boot: Kick user ',
				description: "Kick a user (u sure about dat boi?) Usage: `.kick [user to kick]`"
			}})
			return;
		}
		if(message.guild.member(message.mentions.users.first()) === null){
			message.channel.send({embed: {
				color: 15784782,
				title: ':boot: Kick user',
				description: "be sure you mention the person you want to kick..."
			}})
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('KICK_MEMBERS') && this.vic.kickable === true){
				if(message.member.highestRole.position > this.vic.highestRole.position){
					this.vic.kick().catch(console.error);
					tosend = "User " + this.vic + " has been kicked from the server. :dash:"
					console.log(this.vic + ' was kicked from the server')
				} else {
					tosend = "Are you trying to kick someone that has a higher role than you...?"
				}
			} else {
				tosend = "Are you trying to kick someone that's superior to you? Or am I too low on the role hierarchy :cry:"
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ':boot: Kick user: ' + this.vic.displayName,
			description: message.author + ", " + tosend
		}})
	}
