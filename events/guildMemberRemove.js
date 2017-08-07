module.exports = (client, guild, member) => {
	var goodbye;
	var good = guild.guild.id;
	console.log(good, goodbye);
	if(good === "310224842735616020"){ //blueberries
		goodbye = "310296871102971905";
	} else if(good === "317717365485862922"){ //pentagon
		goodbye = "325318709906243585";
	} else if(good === "268057683804946437"){ //rchz
		goodbye = "268089881610158082";
	} else if(good === "272473930520854529"){ //edreams
		goodbye = "292476293037948950";
	} else if(good === "333471257838485524"){ //new pentagon
		goodbye = "333472444931112971"
	} else if(good === "333814208334397444"){ //aramoor academy
		goodbye = "341788382760009729"
	}
	if(goodbye != undefined){
		guild.guild.channels.get(goodbye.toString()).send("Goodbye :cry:... " + guild +  " has left the server " + guild.guild.name + "...");
		console.log("server.goodbye.id " + guild.guild.id + " " + guild.guild.name); console.log("member.goodbye.id " + guild.id + " " + guild.displayName); console.log("channel.goodbye.id " + good);
	} else {
		return;
	}
};
