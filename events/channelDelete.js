module.exports = (client, channel) => {
	if(channel.type != 'text' || channel.type != 'voice') return;
	var server = channel.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '342207572700299264';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else if(server === '333814208334397444'){
		channeltosend = '341805947641135105';
	} else {
		return;
	}
	channel.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Channel Deleted :x: ',
		description: '**Channel deleted: **' + channel.name,
		timestamp: new Date()
	}});
};
