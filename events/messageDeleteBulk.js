module.exports = (client, messages) => {
	var message = messages.first();
	var server = messages.first().guild.id
	var mcontent = messages.map(c=>c.content)
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
	for(var i = 0; i < mcontent.length; i++){
		message.guild.channels.get(channeltosend).send({embed: {
			color: 15784782,
			description: '**Message sent by ' + message.author + ' deleted in <#' + message.channel.id + '>**\n' + mcontent[i],
			author: {
			name: message.member.displayName,
				icon_url: message.author.displayAvatarURL
			},
			timestamp: new Date()
		}});
	}
};
