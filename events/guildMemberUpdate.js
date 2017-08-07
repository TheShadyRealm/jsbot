module.exports = (client, oldMember, newMember) => {
	var oldroles = oldMember.roles.map(c=>c.id);
	var newroles = newMember.roles.map(c=>c.id);
	var rolechange = (combined(oldroles.concat(newroles)));
	var message = oldMember;
	var server = message.guild.id;
	var channeltosend;
	var tosend;
	if(oldroles.length > newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> removed from ' + message
	} else if(oldroles.length < newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> added to ' + message
	} else if(oldMember.displayName != newMember.displayName){
		tosend = message + "**'s nickname changed from** `" + oldMember.displayName + '`** to** `' + newMember.displayName + '`'
	} else {
		return;
	}
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
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User Change :arrows_clockwise:',
		description: tosend,
		timestamp: new Date()
	}});
};
