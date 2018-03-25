module.exports = (client, role) => {
	var channeltosend = '417437351766392834';
	role.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Deletion :recycle:',
		description: '**Role:** `' + role.name + '` **deleted**',
		timestamp: new Date()
	}});
};
