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
function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}

client.on('ready', () => {
    console.log('The bot is online!');
	this.date = Date.now();
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
	} else if(commandIs("warn", message)){
		if(hasRole(message.member, "Admin") || hasRole(message.member, "Moderator")){
			if(args.length === 1){
				message.channel.send("Warn a user for misbehaving... :smiling_imp: Usage: `.warn (reason) [user]`")
			} else {
				message.mentions.users.first().send("You have been warned in the server for " + (args.join(" ").substring(6)))
				message.reply("User " + (message.mentions.users.first()) + " has been warned :rage:")
			}
		}
	} 
	//help commands
	if(commandIs("help", message)){
		message.author.send("Commands List:\n **Global Prefix: .**\n __Mod commands__ \n **help** - shows this message \n **botinfo** - info about the bot... \n **ping** - pings server and returns with ms \n **uptime** - shows bot uptime \n **purge** - clears the last x messages \n **kick/ban** - kicks/bans the user mentioned \n **repeat** - repeats stuff \n __For Fun Commands__ \n **8ball** - 8-ball? \n **add/delcrush** - WIP trigger bs \n **roll** - roll dice \n **count** - count from min to max \n **rng** - pick x numbers between min and max \n__All of the syntaxes for these commands can be found by just typing the prefix + the command itself into chat__ :smile:")
		message.reply("A list of commands has been sent to your DMs =)")
	} else if(commandIs("botinfo", message)){
		message.reply("JSBot is a bot developed by <@275334018214658060> for absolute fun rofel")
	}
	//for fun commands
	if(commandIs("8ball", message)){
		var replies = ["Yes", "No", "Ask again later", "It is decidely so", "Maybe not...", "Concentrate and ask again", "Cannot predict now", "Very doubtful", "Hell no", "Frick yes", "Mayyyyyybe?", "TOTALLY dude (sarcasm intended)"]
		var result = Math.floor((Math.random()* replies.length) + 0);
		if(args.length === 1){
			message.channel.send("Ask the legendary 8-ball a question! `.8ball [question]`")
		} else {
		message.reply(replies[result])
		}
	} else if(commandIs("roll", message)){
		var nbr = parseInt(args[1]);
		var arr = [];
		if(args.length === 1){
			nbr = 1;
		} 
		if(nbr > 0 && nbr < 101){
			for(var r = 0; r < nbr; r++){
				arr.push(Math.floor((Math.random() * 6) + 1))
			}
			message.reply(":game_die: You rolled a " + arr + "! :game_die:");
		} else {
			message.reply("1-100 dice... stop trying to exploit the system :nerd:")
		}
	} else if(commandIs("happiness", message)){
		if(args.length === 1){
			message.reply("Mention someone first (to make them happy)!")
		} else {
			message.channel.send((message.mentions.users.first()) + " Be happy! :smile: :smiley: :rofl: :laughing: :grin: :grinning: :slight_smile: :sweat_smile: :upside_down:")
		}
	} else if(commandIs("count", message)){
		var count = [];
		if(args.length === 1){
			message.reply("Input a number between 0-999... Usage: `.count min max interval` and NO COUNTING BACKWARDS k?")
		} else {
			var n1 = parseInt(args[1]);
			var n2 = parseInt(args[2]);
			var n3 = parseInt(args[3]);
			if(n1 => 0 && n1 < 1000 && n2 > 0 && n2 < 1000 && n3 < (n2-n1) && n2 > n1 && n3 != 0){
				for(var m = n1; m <= n2; m+=n3){
					count.push(m);
				}
				message.reply(":checkered_flag: Counted " + Math.round(n2/n3) + " numbers: " + count); 
			} else {
				message.reply("Input a number between 0-999... Usage: `.count min max interval` and NO COUNTING BACKWARDS k?")
			}
		}
	} else if(commandIs("rng", message)){
		var rnum = [];
		var r1 = parseInt(args[1]);
		var r2 = parseInt(args[2]);
		var r3 = parseInt(args[3]);
		if(args.length <= 3){
			message.reply("Input a number between one and a million... Usage: `.rng min max # of numbers to generate`")
		} else {
			if(r1 => 0 && r1 < 1000000 && r2 > 0 && r2 < 1000000 && r3 < (r2-r1) && r2 > r1 && r3 > 0){
				for(var n = 0; n < r3; n++){
					rnum.push(Math.floor((Math.random() * r2) + r1))
				}
				message.reply("Your Number(s): " + rnum); 
			} else {
				message.reply("Input a number between one and a million... Usage: `.rng min max # of numbers to generate`")
			}
		}
	} else if(commandIs("uptime", message)){
		var upt = Math.round((Date.now() - this.date)/1000);
		message.reply("**This bot has been alive for:** " + mts(upt));
	}
	if(message.content === "?"){
		message.delete();
		message.reply('kill yourself')
	}
	//WIP THINGY TO REPLACE THE CRUSH THINGY
	var temp = ["hi", "bye"];
	if(message.content.includes(".addthing")){
		this.hi = (args.join(" ").substring(10)).toString();
		temp.push(this.hi);
		console.log(temp.length, temp);
	} 
	for(var x = 0; x < temp.length; x++){
		if(message.content.includes(temp[x])){
			message.reply('hello');
		}
	}
	if(message.content === "logthing"){
		console.log(temp.length); console.log(temp);
	}
	if(message.content.includes("gtg")){
		message.channel.send(":wave: Bye, " + message.author + ", see you later! :raised_hands: ")
	}
	
});
client.login('MzI0NDI3MzgzODQ5MzUzMjE5.DCJiHA.Q6Z16luW1rjfTI-nGV-Q-rM-yFQ');﻿
