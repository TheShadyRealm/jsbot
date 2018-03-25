module.exports = (client, oldRole, newRole) => {
	if(oldRole.name === newRole.name) return;
	var server = oldRole.guild.id
	var channeltosend = '417437351766392834';
	if(oldRole.permissions != newRole.permissions){
		return;
	}
	oldRole.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Name Edit :pencil:',
		description: '**Role name changed from** `' + oldRole.name + '` **to** `' + newRole.name + '`',
		timestamp: new Date()
	}});
};
