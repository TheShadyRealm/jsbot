module.exports = (client, role) => {
	var channeltosend = '417437351766392834';
	role.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Creation :crossed_swords:',
		description: '**New Role:** `' + role.name + '` **created **',
		timestamp: new Date()
	}});
};
