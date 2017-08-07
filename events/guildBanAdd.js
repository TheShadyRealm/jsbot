module.exports = (client, guild, user) => {
	var server = guild.id
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
	guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User banned from server :hammer:',
		description: user.username + '** was banned from **' + guild.name,
		timestamp: new Date()
	}});
};
