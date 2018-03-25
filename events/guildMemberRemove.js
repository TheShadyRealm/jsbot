module.exports = (client, guild, member) => {
	var goodbye = '417437450244194306';
	if(goodbye != undefined){
		guild.guild.channels.get(goodbye.toString()).send("Goodbye :cry:... " + guild +  " has left the server " + guild.guild.name + "...");
		console.log("server.goodbye.id " + guild.guild.id + " " + guild.guild.name); console.log("member.goodbye.id " + guild.id + " " + guild.displayName); 
	} else {
		return;
	}
};
