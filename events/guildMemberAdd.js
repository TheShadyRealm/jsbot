module.exports = (client, guild, member) => {
	var channel;
	var chan = guild.guild.id;
	if(chan === "310224842735616020"){ //blueberries
		channel = "310296871102971905";
	} else if(chan === "317717365485862922"){ //pentagon
		channel = "325318709906243585";
	} else if(chan === "268057683804946437"){ //rchz
		channel = "268089881610158082";
	} else if(chan === "272473930520854529"){ //edreams
		channel = "292476293037948950";
	} else if(chan === "333471257838485524"){ //new pentagon
		channel = "333472444931112971"
	} else if(chan === "333814208334397444"){ //aramoor academy
		channel = "341788382760009729"
	}
	if(channel != undefined){
		guild.guild.channels.get(channel.toString()).send("Welcome " + guild +  " to the server " + guild.guild.name + "!").catch(console.error);
		if(channel === "310296871102971905"){
			guild.addRole(guild.guild.roles.find('name', 'The Underground Railroad')).catch(console.error);
		} else if((channel === "325318709906243585") || (channel = "333472444931112971")){
			//guild.addRole(guild.guild.roles.find('name', 'Citizen')).catch(console.error);
		} else if(channel === "268089881610158082"){
		guild.addRole(guild.guild.roles.find('name', 'Visitors')).catch(console.error);
		}
		console.log("server.welcome.id " + guild.guild.id + " " + guild.guild.name); console.log("member.welcome.id " + guild.id + " " + guild.displayName); console.log("channel.welcome.id " + chan);
	} else {
		return;
	}
};
