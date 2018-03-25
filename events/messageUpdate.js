module.exports = (client, oldMessage, newMessage) => {
	if(oldMessage.content === newMessage.content) return;
	var message = oldMessage;
	if(message.author.bot) return;
	var server = message.guild.id;
	var channeltosend = '417437351766392834';
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Message Edited :pencil2:',
		description: '**Message sent by ' + message.author + ' edited from**\n' + oldMessage + '\n**to** \n' + newMessage + '\n**in channel <#' + message.channel.id + '>**',
		timestamp: new Date()
	}});
};
