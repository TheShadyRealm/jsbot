module.exports = (client, messages) => {
	var message = messages.first();
	var server = messages.first().guild.id;
	var mcontent = messages.map(c=>c.content);
	var acontent = messages.map(c=>c.author);
	var membercontent = messages.map(c=>c.member);
	var channeltosend = '417437351766392834';
	console.log(messages);
	for(var i = 0; i < mcontent.length; i++){
		message.guild.channels.get(channeltosend).send({embed: {
			color: 15784782,
			description: '**Message sent by ' + acontent[i] + ' deleted in <#' + message.channel.id + '>**\n' + mcontent[i],
			author: {
			name: membercontent[i].nickname,
				icon_url: "https://cdn.discordapp.com/avatars/" + acontent[i].id + "/" + acontent[i].avatar + ".png?size=2048"
			},
			timestamp: new Date()
		}});
	}
};
