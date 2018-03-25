module.exports = (client, oldEmoji, newEmoji) => {
  var channeltosend = '417437351766392834';
  var tosend;
  if(oldEmoji.name != newEmoji.name){
    tosend = "Emoji name changed from: **" + oldEmoji.name + "** to: **" + newEmoji.name + "**";
  }
  oldEmoji.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Emoji Updated:',
		description: tosend,
		timestamp: new Date()
	}});
};
