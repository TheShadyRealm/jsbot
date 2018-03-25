module.exports = (client, channel) => {
	if(channel.type != 'text' || channel.type != 'voice') return;
	var server = channel.guild.id
	var channeltosend = '417437351766392834';
	channel.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Channel Created :tools: ',
		description: '**New channel created: **<#' + channel.id + '>',
		timestamp: new Date()
	}});
};
