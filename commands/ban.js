exports.run = (client, message, args) => {
		var tosend;
		this.vic = message.guild.member(message.mentions.users.first())
		if(args.length === 1){
			message.channel.send({embed: {
				color: 15784782,
				title: ':hammer: Ban user ',
				description: "BAN a user :hammer: Usage: `.ban [user to totally demolish]`"
			}})
			return;
		}
		if(this.vic === null){
			message.channel.send({embed: {
				color: 15784782,
				title: ':hammer: Ban user ',
				description: "be sure you mention the person you want to ban..."
			}})
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('BAN_MEMBERS') && this.vic.bannable === true){
				if(message.member.highestRole.position > this.vic.highestRole.position){
					this.vic.ban().catch(console.error);
					tosend = ("user " + this.vic + " has been banned from the server. :rage:")
					console.log(this.vic + ' was banned from the server')
				} else {
					tosend = "Are you trying to ban someone that has a higher role than you...?"
				}
			} else {
				tosend = "I can't ban this person... they have a higher role than I do... don't they... or maybe you don't have permission to ban..."
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ':hammer: Ban user: ' + this.vic.displayName,
			description: message.author + ", " + tosend
		}})
	}
