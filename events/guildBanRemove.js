module.exports = (client, guild, user) => {
	var server = guild.id
	var channeltosend = '417437351766392834';
	guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User unbanned from server :white_check_mark:',
		description: user.username + '** was unbanned from **' + guild.name,
		timestamp: new Date()
	}});
};
