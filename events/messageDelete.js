const Discord = require('discord.js');
module.exports = (client, message) => {
	var server = message.guild.id;
	var channeltosend = '417437351766392834';
	var tosend = message.content;
	if(message.member === null) return;
	if(message.attachments.map(c=>c.url).length != 0){
		tosend = message.attachments.map(c=>c.url)[0].toString();
	}
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		description: '**Message sent by ' + message.author + ' deleted in <#' + message.channel.id + '>**\n' + tosend,
		author: {
			name: message.member.displayName,
			icon_url: message.author.displayAvatarURL
		},
		timestamp: new Date()
	}});
};
