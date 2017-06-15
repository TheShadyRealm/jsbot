const Discord = require('discord.js');
const client = new Discord.Client();

function commandIs(str, msg){
	return msg.content.toLowerCase().startsWith("." + str)
}
function pluck(array) {
	return array.map(function(item) { return item["name"]; });
}
function hasRole(mem, role) {
	if(pluck(mem.roles).includes(role)){
		return true;
	} else {
		return false;
	}
}

client.on('ready', () => {
    console.log('The bot is online!');
});

//mod commands
client.on('message', message => {
	var args = message.content.split(/[ ]+/);
	if(commandIs("ping", message)){
		message.reply('**Pong!** Time taken: ' + client.ping + 'ms')
	} else if(commandIs("rank", message)){
		if(args.length === 1){
			message.channel.send("Nice rank you got there... try using: `.rank [integer]`")
		} else if (args.length === 2){
			message.channel.send('wow ur a rank ' + args[1] + ", **aren't you great**")
		} else {
			message.channel.send("What did you even type...? Try: `.rank [integer]`")
		}
	} else if(commandIs("repeat", message)){
		if(args.length === 1){
			message.channel.send("Type something for the bot to repeat! Use: `.repeat [message]`")
		} else {
			message.channel.send(args.join(" ").substring(8));
		}
	} else if(commandIs("adminsonly", message)){
		if(hasRole(message.member, "Admin") || hasRole(message.member, "Administrator")){
			message.reply("Congrats, you have the admin role! Don't abuse...")
		} else {
			message.reply("You're not an `Admin`... yet...")
		}
	} else if(commandIs("purge", message)){
		if(hasRole(message.member, "Admin") || hasRole(message.member, "Moderator")){
			if(args.length >= 3){
				message.channel.send("The pr0per way to delete would be: `.purge (# of messages to delete)`")
			} else {
				var msg;
				if(args.length === 1){
					msg = 2;
				} else {
					msg = parseInt(args[1]) + 1;
				}
				message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
				message.reply(msg-1 + ' messages successfully deleted!')
			}
		} else {
			message.reply("You do not have the perms to delete messages... nice try...")
		}
	} else if(commandIs("kick", message)){
		this.vic = message.guild.member(message.mentions.users.first())
		if(hasRole(message.member, "Admin") || hasRole(message.member, "Moderator")){
			if(args.length === 1){
				message.channel.send("Kick a user (u sure about dat boi?) Usage: `.kick [user to kick]`")
			} else {
				this.vic.kick().catch(console.error);
				message.reply("User " + this.vic + " has been kicked from the server. :boot:")
				console.log(this.vic + ' was kicked from the server')
			}
		}
	} else if(commandIs("ban", message)){
		if(hasRole(message.member, "Admin")){
			if(args.length === 1){
				message.channel.send("BAN a user :hammer: Usage: `.ban [user to totally demolish]`")
			} else {
				this.vic.ban().catch(console.error);
				message.reply("User " + this.vic + " has been banned from the server. :rage:")
				console.log(this.vic + ' was banned from the server')
			}
		}
	} 
	//help commands
	if(commandIs("help", message)){
		message.author.sendMessage("Commands List:\n **Global Prefix: .**\n __Mod commands__ \n **help** - shows this message \n **botinfo** - info about the bot... \n **ping** - pings server and returns with ms \n **purge** - clears the last x messages \n **kick/ban** - kicks/bans the user mentioned \n **repeat** - repeats stuff \n __For Fun Commands__ \n **8ball** - 8-ball? \n **add/delcrush** - WIP trigger bs")
		message.reply("A list of commands has been sent to your DMs =)")
	} else if(commandIs("botinfo", message)){
		message.reply("JSBot is a bot developed by <@275334018214658060> for absolute fun rofel")
	}
	//for fun commands
    var i = 0;
	var crushes = ["lindsay", "sydney"];
	if(commandIs("addcrush", message)){
		if(args.length === 1){
			message.channel.send("Put in your crush with `.addcrush [some girl]`")
		} else {
			this.n = (args.join(" ").substring(10));
			message.channel.send(this.n + ' has been added to the crush list');
			crushes.push(this.n); console.log(crushes); console.log(crushes.length);
		}
	}
	for(var c = 0; c < crushes.length; c++){
		if(message.content.toLowerCase().includes(crushes[c])){
			message.channel.send("<3")
			console.log(crushes);
		}
	}
	if(commandIs("delcrush", message)){
		if(args.length === 1){
			message.channel.send("DELETE UR CRUSH?!? `.delcrush [some girl]`")
		} else {
			message.channel.send(this.n + ' has been removed from the crush list');
			crushes.splice(2,1); console.log(crushes);
		}
	} 
	if(commandIs("8ball", message)){
		var replies = ["Yes", "No", "Ask again later", "It is decidely so", "Maybe not...", "Concentrate and ask again", "Cannot predict now", "Very doubtful", "Hell no", "Frick yes", "Mayyyyyybe?", "TOTALLY dude (sarcasm intended)"]
		var result = Math.floor((Math.random()* replies.length) + 0);
		if(args.length === 1){
			message.channel.send("Ask the legendary 8-ball a question! `.8ball [question]`")
		} else {
		message.reply(replies[result])
		}
	} else if(commandIs("roll", message)){
		var nbr = parseInt(args[1])
		var arr = [];
		if(args.length === 1){
			nbr = 1;
		} 
		if(nbr > 0 && nbr < 101){
			for(var r = 0; r < nbr; r++){
				arr.push(Math.floor((Math.random() * 6) + 1))
			}
			message.reply("You rolled a " + arr + "!");
		} else {
			message.reply("1-100 dice... stop trying to exploit the system :nerd:")
		}
	} else if(commandIs("happiness", message)){
		if(args.length === 1){
			message.reply("Mention someone first (to make them happy)!")
		} else {
			message.channel.send((message.mentions.users.first()) + " Be happy! :smile: :smiley: :rofl: :laughing: :grin: :grinning: :slight_smile: :sweat_smile: :upside_down:")
		}
	}
});
client.login('MzI0NDI3MzgzODQ5MzUzMjE5.DCJiHA.Q6Z16luW1rjfTI-nGV-Q-rM-yFQ');﻿