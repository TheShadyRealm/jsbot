module.exports = (client, guild, member) => {
	var channel = '417437450244194306';
	if(channel != undefined){
		guild.guild.channels.get(channel.toString()).send("Welcome " + guild +  " to the server " + guild.guild.name + "!").catch(console.error);
		console.log("server.welcome.id " + guild.guild.id + " " + guild.guild.name); console.log("member.welcome.id " + guild.id + " " + guild.displayName);
		guild.addRole(guild.guild.roles.find('name', 'The Underground Railroad')).catch(console.error);
	} else {
		return;
	}
};
