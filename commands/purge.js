exports.run = (client, message, args) => {
		if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
			if(args.length === 1){
        message.channel.send({embed: {
        color: 15784782,
        description: "**ZIS IS EIN TEXTNACHRICHTENREINIGER... IT REINIGS TEXTNACHRICHEN**"
        }})
			} else if(args.length >= 3){
        message.channel.send({embed: {
        color: 15784782,
        description: "The pr0per way to delete would be: `.purge (# of messages to delete)`"
        }})
			} else {
				var msg = parseInt(args[1]) + 1;
				if(isNaN(args.join(" ").substring(7))){
					if((message.guild.member(message.mentions.users.first()))){
            message.channel.send({embed: {
            color: 15784782,
            description: "stop deleting only a specific person's messages... if you want to delete a conversation delete the whole section to avoid people looking like idiots talking to themselves... thanks :blush:"
            }})
					} else {
            message.channel.send({embed: {
            color: 15784782,
            description: "You can't delete a letter amount of messages... that's like going ':b:oneless' miles per hour..."
            }})
					}
				} else if((args.join(" ").substring(7)) < 0){
          message.channel.send({embed: {
          color: 15784782,
          description: "D1CKHEAD! just explain to me htf purging messages can be negative..."
          }})
				} else {
					message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
					message.reply((msg-1) + ' messages successfully deleted!').then(message => message.delete(1575))
				}
			}
		} else {
      message.channel.send({embed: {
      color: 15784782,
      description: "D1CKHEAD! just explain to me htf purging messages can be negative..."
      }}).catch(console.error)
		}
	} 
