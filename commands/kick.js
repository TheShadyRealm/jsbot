exports.run = (client, message, args) => {
		var tosend;
		this.vic = message.guild.member(message.mentions.users.first())
		if(args.length === 1){
			message.channel.send({embed: {
				color: 15784782,
				title: ':boot: Kick user ',
				description: "Kick a user (u sure about dat boi?) Usage: `.kick [user to kick] (reason)`"
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
					var reason = args.join(' ').substring(6+args[1].length)
					this.vic.kick(reason).catch(console.error);
					tosend = "User " + this.vic + " has been kicked from the server for `" + reason + "` :dash:"
					console.log(this.vic + ' was kicked from the server ' + message.guild.name)
				} else {
					tosend = "Are you trying to kick someone that has a higher role than you...?"
				}
			} else {
				tosend = "Are you trying to kick someone that's superior to you? Or am I too low on the role hierarchy... or do you not have the permissions to... :cry:"
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ':boot: Kick user: ' + this.vic.displayName,
			description: message.author + ", " + tosend
		}})
	}
