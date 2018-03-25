module.exports = (client, guild, user) => {
	var server = guild.id
	var channeltosend = '417437351766392834';
	guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User banned from server :hammer:',
		description: user.username + '** was banned from **' + guild.name,
		timestamp: new Date()
	}});
};
