module.exports = (client, oldMessage, newMessage) => {
	if(oldMessage.content === newMessage.content) return;
	var message = oldMessage;
	if(message.author.bot) return;
	var server = message.guild.id;
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '342207572700299264';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else if(server === '333814208334397444'){
		channeltosend = '341805947641135105';
	}  else {
		return;
	}
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Message Edited :pencil2:',
		description: '**Message sent by ' + message.author + ' edited from**\n' + oldMessage + '\n**to** \n' + newMessage + '\n**in channel <#' + message.channel.id + '>**',
		timestamp: new Date()
	}});
};
