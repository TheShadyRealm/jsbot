//invite: https://discordapp.com/oauth2/authorize?client_id=324427383849353219&scope=bot&permissions=2146958591
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const prefix = ".";
var Stockfish = require('stockfish');
var Chess = require('chess.js').Chess;
var temp = [];
var bot = new Discord.Client({forceFetchUsers: true})
var chesses = {};
var stockfishes = {};
var chessmsg1 = {};
var thinking = {};
var CHESS = '.playchess';
var MOVETIME = 300;
var SIDENAMES = {w:'Black', b:'White'};
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}
function strip(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
}

client.on('guildMemberAdd', (guild, member) => {
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
	}
	guild.guild.channels.get(channel.toString()).send("Welcome " + guild +  " to the server " + guild.guild.name + "!").catch(console.error);
	if(channel === "310296871102971905"){
		guild.addRole(guild.guild.roles.find('name', 'The Underground Railroad')).catch(console.error);
	} else if((channel === "325318709906243585") || (channel = "333472444931112971")){
		guild.addRole(guild.guild.roles.find('name', 'Citizen')).catch(console.error);
	} else if(channel === "268089881610158082"){
		guild.addRole(guild.guild.roles.find('name', 'Visitors')).catch(console.error);
	}
	console.log("server.welcome.id " + guild.guild.id + " " + guild.guild.name); console.log("member.welcome.id " + guild.id + " " + guild.displayName); console.log("channel.welcome.id " + this.chan); 
});

client.on('guildMemberRemove', (guild, member) => {
	this.goodbye;
	this.good = guild.guild.id; 
	console.log(this.good);
	if(this.good === "310224842735616020"){ //blueberries
		this.goodbye = "310296871102971905";
	} else if(this.good === "317717365485862922"){ //pentagon
		this.goodbye = "325318709906243585";
	} else if(this.good === "268057683804946437"){ //rchz
		this.goodbye = "268089881610158082";
	} else if(this.good === "272473930520854529"){ //edreams
		this.goodbye = "292476293037948950";
	} else if(this.good === "333471257838485524"){ //new pentagon
		this.goodbye = "333472444931112971"
	}
	guild.guild.channels.get(this.goodbye.toString()).send("Goodbye :cry:... " + guild +  " has left the server " + guild.guild.name + "...");
	console.log("server.goodbye.id " + guild.guild.id + " " + guild.guild.name); console.log("member.goodbye.id " + guild.id + " " + guild.displayName); console.log("channel.goodbye.id " + this.good); 
});

client.on('ready', () => {
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
	client.user.setGame('Betsruner is fat')
	this.date = Date.now();
});

client.on('message', message => {
	var msg1 = strip(message.content);
	if(message.author.bot) return;
	if(message.content === "?" && message.guild.id != '268057683804946437' && message.guild.id != "272473930520854529"){
		message.delete();
		message.reply('KYS')
	}
	//leveling system
	/*
	if (!points[message.author.id]) points[message.author.id] = {
		points: 0,
		level: 0
	};
	let userData = points[message.author.id];
		userData.points++;
	let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
	if (curLevel > userData.level) {
		userData.level = curLevel;
		message.reply('You"ve leveled up to level ' + curLevel + '! Keep racking up those points lmao');
	}

	if(message.content.startsWith("level", message)) {
		message.reply('You are currently level ' + userData.level + ' with ' + userData.points + ' points.');
	}
	fs.writeFile("./points.json", JSON.stringify(points), (err) => {
		if (err) console.error(err)
	});
	*/
	//mod commands
	var args = message.content.split(/[ ]+/);
	if(message.content.startsWith(prefix + "ping")){
		message.reply('**Pong!** Time taken: ' + ~~(client.ping) + 'ms')
	} else if(message.content.startsWith(prefix + "rank")){
		if(args.length === 1){
			message.channel.send("Nice rank you got there... try using: `.rank [integer]`")
		} else if (args.length === 2){
			message.channel.send('wow ur a rank ' + args[1] + ", **aren't you great**")
		} else {
			message.channel.send("What did you even type...? Try: `.rank [integer]`")
		}
	} else if(message.content.startsWith(prefix + "repeat")){
		if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
			var badstuff = [".ban", ".kick", ".purge"];
			if(args.length === 1){
				message.channel.send("Type something for the bot to repeat! Use: `.repeat [message]`")
			} else {
				for(var x = 0; x < badstuff.length; x++){
					if(message.content.includes(badstuff[x])){
						message.reply("stop trying to abuse... cuz that won't work :3")
					}
				}
					message.channel.send(args.join(" ").substring(8));
			}
		}
	} else if(message.content.startsWith(prefix + "adminsonly")){
		if(message.member.permissionsIn(message.channel).has('ADMINISTRATOR')){
			message.reply("Congrats, you have the admin role! Don't abuse...")
		} else {
			message.reply("You're not an `Admin`... yet...")
		}
	} else if(message.content.startsWith(prefix + "purge")){
		if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
			if(args.length === 1){
			message.channel.send("**ZIS IS EIN TEXTNACHRICHTENREINIGER... IT REINIGS TEXTNACHRICHEN**")
			} else if(args.length >= 3){
				message.channel.send("The pr0per way to delete would be: `.purge (# of messages to delete)`")
			} else {
				var msg = parseInt(args[1]) + 1;
				if(isNaN(args.join(" ").substring(7))){
					if((message.guild.member(message.mentions.users.first()))){
						message.channel.send("stop deleting only a specific person's messages... if you want to delete a conversation delete the whole section to avoid people looking like idiots talking to themselves... thanks :blush:")
					} else {
						message.channel.send("You can't delete a letter amount of messages... that's like going 'meme' miles per hour...")
					}
				} else {
					message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
					message.reply(msg-1 + ' messages successfully deleted!').then(message => message.delete(1575))
				}
			}
		} else {
			message.reply("You do not have the perms to delete messages... nice try...")
		}
	} else if(message.content.startsWith(prefix + "kick")){
		this.vic = message.guild.member(message.mentions.users.first())
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("stop trying to exploit this bot smh...")
		} else {
			if(message.member.permissionsIn(message.channel).has('KICK_MEMBERS') && this.vic.kickable === true){
				if(args.length === 1){
					message.channel.send("Kick a user (u sure about dat boi?) Usage: `.kick [user to kick]`")
				} else {
					this.vic.kick().catch(console.error);
				}
			} else {
				message.reply("Are you trying to kick someone that's superior to you? Or am I too low on the role hierarchy :cry:")
			}
		}
	} else if(message.content.startsWith(prefix + "ban")){
		this.vic = message.guild.member(message.mentions.users.first())
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("stop trying to exploit this bot smh...")
		} else {
			if(message.member.permissionsIn(message.channel).has('BAN_MEMBERS') && this.vic.bannable === true){
				if(args.length === 1){
					message.channel.send("BAN a user :hammer: Usage: `.ban [user to totally demolish]`")
				} else {
					this.vic.ban().catch(console.error);
					message.reply("User " + this.vic + " has been banned from the server. :rage:")
					console.log(this.vic + ' was banned from the server')
				}
			} else {
				message.reply("Are you trying to ban someone that's superior to you? Or am I too low on the role hierarchy :cry:")
			}
		}
	} else if(message.content.startsWith(prefix + "warn")){
		if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES', 'MANAGE_ROLES')){
			if(args.length === 1){
				message.channel.send("Warn a user for misbehaving... :smiling_imp: Usage: `.warn [user] (reason)`")
			} else {
				var x = (message.mentions.users.first().toString().length) + 2;
				console.log(x);
				message.mentions.users.first().send("You have been warned in the server for **" + (args.join(" ").substring(6 + x)) + "**")
				message.reply("User " + (message.mentions.users.first()) + " has been warned for **" + (args.join(" ").substring(6 + x)) + "**")
			}
		}
	} else if(message.content.startsWith(prefix + "mute")){
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("stop trying to exploit this bot smh...")
		} else {
			if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES')){
				if(args.length === 1){
					message.channel.send("channel mute someone :mute: from the channel. Usage: `.mute [user]`")
				} else {
					message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
						SEND_MESSAGES: false, ATTACH_FILES: false
					}).catch(console.error)
					message.reply(message.guild.member(message.mentions.users.first()) + " has been muted in this channel... i think... :mute:")
				}
			}
		}
	} else if(message.content.startsWith(prefix + "unmute")){
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("stop trying to exploit this bot smh...")
		} else {
			if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES')){
				if(args.length === 1){
					message.channel.send("unmute someone from the channel. Usage: `.unmute [user]`")
				} else {
					message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
						SEND_MESSAGES: true, ATTACH_FILES: true
					}).catch(console.error)
					message.reply(message.guild.member(message.mentions.users.first()) + " has been unmuted in this channel... but were they ever muted...??? :thinking:")
				}
			}
		}
	}
	//help commands
	if(message.content.startsWith(prefix + "help")){
		message.author.send("Commands List:\n **Global Prefix: .**\n __Mod commands__ \n **help** - shows this message \n **botinfo** - info about the bot... \n **ping** - pings server and returns with ms \n **uptime** - shows bot uptime \n **warn [user] (reason)** - warns a user for being a meme \n **purge [# of msgs]** - clears the last x messages \n **kick/ban [user]** - kicks/bans the user mentioned \n **mute/unmute [user]** - mutes and unmutes a user \n **repeat [text]** - repeats stuff \n __For Fun Commands__ \n **8ball [question]** - 8-ball? \n **add/deltrash [text]** - add trashy triggers \n **roll (amt of dice)** - roll dice \n **kill [user]** - become a serial killer =) \n **count [min, max] (count by)** - count from min to max \n **rng [min, max, amt of numbers]** - pick x numbers between min and max \n **happiness [user]** - tell a user to stop being salty :) \n **cclist** - lists all custom commands \n **rem** - ゼロから始める異世界生活 :heart: \n **duel [user]** - duel a user (this is totally rng btw) \n **playchess [move in algebraic notation]** - play the bot in a game of chess... but you'll lose...\n__Code for this bot can be found here: https://github.com/TheShadyRealm/jsbot :smile: (holy crap jsbot is in javascript??? :scream:)__ \n **Invite link (highly not recommended):** :smiley:: http://bit.ly/JSBot")
		message.reply("A list of commands has been sent to your DMs =)")
	} else if(message.content.startsWith("botinfo", message)){
		message.reply("JSBot is a bot garbagely coded by <@275334018214658060> for absolute fun and dank memes rofel")
	}
	//for fun commands
	if(message.content.startsWith(prefix + "8ball")){
		var replies = ["Yes", "No", "Ask again later", "It is decidely so", "Maybe not...", "Concentrate and ask again", "Cannot predict now", "Very doubtful", "Hell no", "Frick yes", "Mayyyyyybe?", "TOTALLY dude (sarcasm intended)"]
		var result = Math.floor((Math.random()* replies.length) + 0);
		if(args.length === 1){
			message.channel.send("Ask the legendary 8-ball a question! `.8ball [question]`")
		} else {
		message.reply(replies[result])
		}
	} else if(message.content.startsWith(prefix + "roll")){
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
	} else if(message.content.startsWith(prefix + "happiness")){
		if(args.length === 1){
			message.reply("Mention someone first (to make them happy)!")
		} else {
			message.channel.send((message.mentions.users.first()) + " Be happy! :smile: :smiley: :rofl: :laughing: :grin: :grinning: :slight_smile: :sweat_smile: :upside_down:")
		}
	} else if(message.content.startsWith(prefix + "count")){
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
	} else if(message.content.startsWith(prefix + "rng")){
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
	} else if(message.content.startsWith(prefix + "uptime")){
		var upt = Math.round((Date.now() - this.date)/1000);
		message.reply("**This bot has been alive for:** " + mts(upt));
	} else if(message.content.startsWith(prefix + "kill")){
		var method = [" 360 noscoped ", " knifed ", " threw a combustable lemon at ", " shot a portal inside of ", " threw a knife that lodged into ", " took a gun from the table and immediately turned and shot ", " attached a grenade to an arrow and shot ", " blew a poison dart at ", " thrusted a sword hard into ", " ate "]
		this.res = (Math.floor(Math.random() * (method.length - 1)) + 0)
		if(message.author.id === message.guild.member(message.mentions.users.first()).id){
			message.channel.send("if you want to kill yourself, i recommend draino... way more effective than bleach tbh")
		} else {
			message.channel.send(message.author + method[this.res] + message.guild.member(message.mentions.users.first()) + " :skull_crossbones: **RIP** :skull_crossbones:").catch(console.error)
			message.reply("You received " + (Math.floor(Math.random() * 100) + 1) + " style points")
		}
	} else if(message.content.startsWith(prefix + "cclist")){
		message.reply("**list of custom (useless af) commands:** 'arcanestrats', 'calculus', 'cancer', 'ecksdee', 'exposed', 'fail', 'fidgetspinner', 'gj', 'gotem', 'hate', 'heckoff', 'hierarchy', 'justno', 'pranked', 'questionmark', 'roflcopter', 'salty', 'siblingdrama', 'trash'")
	} else if(message.content.startsWith(prefix + "rem")){
		var list = ['https://vignette1.wikia.nocookie.net/rezero/images/0/02/Rem_Anime.png/revision/latest?cb=20160730213532',
		'https://images6.alphacoders.com/710/710132.png',
		'http://i.imgur.com/sGwXxVx.jpg',
		'http://www.wallpapermaiden.com/wallpaper/1453/download/1920x1080/rem-sad-face-re-zero-kara-hajimeru-isekai-seikatsu.png',
		'https://images6.alphacoders.com/713/713819.jpg',
		'http://i.imgur.com/451j71W.jpg',
		'https://images5.alphacoders.com/700/thumb-1920-700733.png',
		'https://images3.alphacoders.com/734/thumb-1920-734139.png',
		'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2029741.jpg',
		'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2010867.jpg',
		'http://orig02.deviantart.net/0b36/f/2016/149/c/b/tumblr_o6fxqn1obs1u0xk60o1_1280_by_sakamileo-da47099.png',
		'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2035148.jpg',
		'http://blog.honeyfeed.fm/wp-content/uploads/2016/12/Rem-Re-Zero-kara-Hajimeru-Isekai-Seikatsu-wallpaper.jpg',
		'https://i0.wp.com/thehypedgeek.com/wp-content/uploads/2017/04/rem-re-zero.jpg?fit=1200%2C675',
		'https://images7.alphacoders.com/697/thumb-1920-697788.png',
		'https://s-media-cache-ak0.pinimg.com/originals/c2/bc/47/c2bc477254140f6997189faf600fbfb6.jpg',
		'https://images8.alphacoders.com/717/thumb-1920-717378.png',
		'http://img1.ak.crunchyroll.com/i/spire1/8867d2bb754124748129715a8456c7c41474246363_full.jpg',
		'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2004344.jpg',
		'http://i.imgur.com/OBic1GH.png',
		'https://t1.rbxcdn.com/b6d34ba1996e0d28077732a83bb8472c',
		'https://images-ext-1.discordapp.net/external/62irxlzwn07MzOKdKoUFSwRB5RbTzNOK3oS0pDkdQKc/https/cdn.discordapp.com/attachments/333500092382314516/333777091352854530/701236_1.jpg?width=250&height=250',
		'https://images3.alphacoders.com/718/thumb-1920-718522.png',
		'http://www.005.tv/uploads/allimg/161102/13-1611021Q924b8.jpg',
		'https://s-media-cache-ak0.pinimg.com/736x/3a/8a/12/3a8a1220b7240d766b84d07a1fc67b78.jpg',
		'https://images2.alphacoders.com/711/thumb-350-711907.png',
		'https://images2.alphacoders.com/728/thumb-350-728112.png',
		'https://images7.alphacoders.com/700/thumb-350-700047.jpg',
		'http://wallpapercave.com/wp/wp1860747.png',
		'https://images3.alphacoders.com/728/thumb-350-728202.jpg',
		'http://wallpapercave.com/wp/wp1860738.png',
		'https://qph.ec.quoracdn.net/main-qimg-f57f05966fe66349636f615996195494.webp',
		'http://livedoor.blogimg.jp/shachiani/imgs/8/f/8fa01ea6-s.jpg',
		'https://wallpaperscraft.com/image/rem_re_zero_girl_anime_112238_2560x1024.jpg',
		'http://i0.kym-cdn.com/photos/images/original/001/153/038/325.png',
		'https://wallpaperscraft.com/image/re_zero_rem_anime_girl_art_112246_3840x2160.jpg',
		'http://img15.deviantart.net/a6c5/i/2016/183/f/1/re_zero_rem_and_ram_by_edge_mokku-da8glfe.png',
		'https://images4.alphacoders.com/724/thumb-1920-724619.png',
		'https://s-media-cache-ak0.pinimg.com/236x/a0/8d/7f/a08d7f3ba972b9bf8beb56ce25b2e798.jpg'
		];
		var randpic = ~~((Math.random() * list.length) + 0)
		const embed = new Discord.RichEmbed()
		.setColor(8375551)
		.setImage(list[randpic]);
		message.channel.send({embed});
	} else if(message.content.startsWith(prefix + "duel")){
		if(args.length === 1){
			message.channel.send("Duel someone for fun =) `.duel [user]`")
		} else if(message.guild.member(message.mentions.users.first()) === null) { //if duels nobody (shut up alex)
			message.channel.send("Mention someone to duel them... you can't duel pixels on a computer screen...")
		} else if(((message.guild.member(message.mentions.users.first())).displayName)=== message.member.displayName){ //if duels itself
			message.channel.send('yea listen up kid... if you want to duel yourself i can just come in there and destroy you and your clone... now choose someone else kthx')
		} else if((message.guild.member(message.mentions.users.first()).id) === '324427383849353219'){ //if duels jsbot
			message.channel.send("Let the duel between " + message.author + " and " + message.guild.member(message.mentions.users.first()) + " begin! " + message.guild.member(message.mentions.users.first()) + " will go first!")
			message.channel.send('**JSBot** aimed its rocket launcher at **' + message.member.displayName + '** ... it deals 99999999 damage!')
			message.channel.send("After 1 round... **" + message.author + "** has been defeated by **<@324427383849353219>, who wins with ∞ HP remaining!**")	
		} else {
			var dn1 = [];
			var dn2 = [];
			var decr;
			var hp = 50;
			var hp1 = 50;
			var p1 = message.member.displayName;
			var p2 = (message.guild.member(message.mentions.users.first()).displayName);
			message.channel.send("Let the duel between " + message.author + " and " + message.guild.member(message.mentions.users.first()) + " begin! " + message.author + " will go first!")
			for(var i = 50; i >= 0; i-=decr){
				decr = ~~((Math.random()* 15) + 5);
				console.log("hp left " + i); console.log("damage taken " + decr); console.log(dn1);
				dn1.push(decr);
				if(decr > i && i != 0){
					var y = decr;
					dn1.push(y);
					dn1.pop();
					console.log(dn1);
				}
			}
			for(var j = 50; j >= 0; j-=decr){
				decr = ~~((Math.random()* 15) + 5);
				console.log("hp left " + j); console.log("damage taken " + decr); console.log(dn2);
				dn2.push(decr);
				if(decr > j && j != 0){
					var z = decr;
					dn2.push(y);
					dn2.pop();
					console.log(dn2);
				}
			}
			var way = ['threw a grenade into',
			'kicked',
			'punched',
			'one punched',
			'headshot',
			'fully-charged bodyshot',
			'shot a rocket at',
			'trickstabbed',
			'blew up a sticky bomb attached to',
			'shot a million dollars worth of minigun bullets into',
			'used a bat to whack',
			'market gardened',
			'used a flamethrower to burn',
			'used a shotgun to shoot',
			'used a revolver to shoot',
			'backstabbed',
			'pulse shot',
			'launched an energy orb at',
			'threw a cube at',
			'shot a portal inside',
			'shot a heat-seeking missile at',
			'blew up',
			'threw a shuriken at',
			'used a lightsaber to slice',
			'dropped a nuke on',
			'poked'
			] //needs more tbh
			var battlelength = (dn1.length + dn2.length)
			var set1 = 0;
			var set2 = 0;
			var hp1 = 50;
			var hp2 = 50;
			for(var p = 0; p <= battlelength; p++){
				var tokill = ~~((Math.random()* way.length) + 0)
				var dam1;
				var dam2;
				if(p%2 === 0){
					dam1 = dn1[set1];
					hp1 = hp1 - dam1;
					message.channel.send('**' + p1 + ' **' + way[tokill] + '** ' + p2 + '**... it deals ' + dam1 + ' damage! **' + p2 + '** has ' + hp1 + ' HP remaining!')
					set1++;
				} else if(p%2 === 1){
					dam2 = dn2[set2];
					hp2 = hp2 - dam2;
					message.channel.send('**' + p2 + ' **' + way[tokill] + '** ' + p1 + '**... it deals ' + dam2 + ' damage! **' + p1 + '** has ' + hp2 + ' HP remaining!')
					set2++;
				}
				if(hp1 <= 0){
					message.channel.send("After " + (p+1) + " rounds... **" + message.guild.member(message.mentions.users.first()) + "** has been defeated by **" + message.author + ", who wins with " + hp2 + " HP remaining!**")	
					return;
				} else if(hp2 <= 0){
					message.channel.send("After " + (p+1) + " rounds... **" + message.author + "** has been defeated by **" + message.guild.member(message.mentions.users.first()) + ", who wins with " + hp1 + " HP remaining!**")
					return;
				}
			}
		}
	} else if(msg1.indexOf(CHESS) === 0) { 
	/*
	* original code: https://github.com/daniel-lawrence-lu/discord-woofbot
	* that original code was very broken and required some fixing... so i fixed it all and added a better GUI :3
	*/
		function end_game(id, resign, quiet) {
			if(chesses[id] === undefined) return;
			if(!quiet) {
				var winner;
				if(resign) {
					winner = SIDENAMES[chesses[id].turn()] + ' wins by resignation!';
				} else if(chesses[id].in_checkmate()) {
					winner = SIDENAMES[chesses[id].turn()] + ' wins by checkmate!';
				} else if(chesses[id].in_stalemate()) {
					winner = 'Draw by stalemate!';
				} else if(chesses[id].in_threefold_repetition()) {
					winner = 'Draw by threefold repetition!';
				} else if(chesses[id].insufficient_material()) {
					winner = 'Draw by insufficient material!';
				} else if(chesses[id].in_draw()) {
					winner = 'Draw!';
				}	
				const embed = new Discord.RichEmbed()
				.setColor('#D3D3D3')
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setTitle(chessmsg1[id])
				.setImage('http://i.imgur.com/w4TR9IT.png')
				.addField(winner, chesses[id].pgn({newline_char: '\n'}), true)
				message.reply({embed})
			}	
			console.log('Chess game end: ', message.member.nickname, message.guild.name);
			delete chesses[id];
			delete stockfishes[id];
			delete thinking[id];
		}
        var id = message.author.id + '!?#' + message.guild.id;
        chessmsg1[id] = (args.join(" ").substring(11)).toString();
        if(chesses[id] === undefined) {
            chesses[id] = new Chess();
            console.log('Chess game: ', message.member.displayName, message.guild.name);
            thinking[id] = false;
            stockfishes[id] = Stockfish();
            stockfishes[id].postMessage('setoption name Contempt value 30');
            stockfishes[id].postMessage('setoption name Skill Level value 20');
            stockfishes[id].postMessage('ucinewgame');
            stockfishes[id].postMessage('isready');
            stockfishes[id].onmessage = function(event) {
                //console.log(event);
                var line;
                if(event && typeof event === 'object') {
                    line = event.data;
                } else {
                    line = event;
                }
                var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                if(match) {
                    var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
					const embed = new Discord.RichEmbed()
					.setColor('#D3D3D3')
					.setAuthor(message.member.displayName, message.author.displayAvatarURL)
					.setTitle('Playing white against JSBot')
					.setDescription(chessmsg1[id] + ' ' + m.san)
					.setImage(get_fen_img(id))
                    message.reply({embed});
                    thinking[id] = false;
                    if(chesses[id].game_over()) {
                        end_game(id, false, false);
                    }
                }
            }
        }
        var move = strip(msg1.substring(CHESS.length + 1));
        if(move === 'resign') {
            end_game(id, true, false);
            return;
        }
        if(thinking[id] === true) {
            message.reply(chessmsg1[id] + "I'm still thinking...");
            return;
        }
        if(move !== 'skip' && chesses[id].move(move, {sloppy: true}) === null) {
            message.reply(chessmsg1[id] + ':thinking: That, sir, looks like an illegal move... Your valid moves are: **' + chesses[id].moves().join(', ') + 
                    '**\n' + get_fen_img(id));
            return;
        }
        thinking[id] = true;
        stockfishes[id].postMessage('position fen ' + chesses[id].fen());
        stockfishes[id].postMessage('go movetime ' + MOVETIME);
        if(chesses[id].game_over()) {
            end_game(id, false, false);
        }
    } else if(message.content.startsWith(prefix + "daystillschool")){
		var countDownDate = new Date("Aug 14, 2017 08:10:00").getTime();
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		const current = ('Time until school starts again... :cry:: **' + days + "d " + hours + "h " + minutes + "m " + seconds + "s**").toString();
		message.reply(current);
		if (distance < 0) {
			clearInterval(x);
			message.channel.send("wb to school :)")
		}
	}
	
	//actually working crush array (any other ideas for it tho?)
	if(message.content.startsWith(prefix + ".addtrash")){
		this.hi = (args.join(" ").substring(10)).toString();
		temp.push(this.hi);
		message.reply(this.hi + " has been added to the list")
		console.log(temp.length, temp);
	} else if(message.content.startsWith(prefix + ".cleartrash") && message.author.id === '275334018214658060'){
		message.channel.send("The list has been cleared")
		temp = [];
	} else if(message.content.startsWith(prefix + ".deltrash")){
		this.del = (args.join(" ").substring(10)).toString();
		this.cow;
		for(var d = 0; d < temp.length; d++){
			if(message.content.includes(this.del[d])){
				console.log(d);
				this.cow = d; 
				console.log(this.cow);
				temp.splice(this.cow, 1)
			}
		}
		message.channel.send(this.del + " has been removed from the list")
	}
	for(var x = 0; x < temp.length; x++){
		if(message.content.includes((temp[x]))){
			message.channel.send('WHAT UNBELIEVABLE GARBAGE :recycle::newspaper2:');
		}
	}
	//custom commands and responses shit
	if(message.content.includes("gtg")){
		message.channel.send(":wave: Bye, " + message.author + ", see you later! :raised_hands: ")
	}
	if(message.content.toLowerCase().includes("ravi") && message.guild.id === "333471257838485524"){
		message.delete();
		message.channel.send("shhhhhh... don't wake up the legendary dick tater... :sleeping:")
	} 
	let responseObject = {
		"ayy": "ayylmao",
		"wat": "say what?",
		"meme": "dank",
		"ded": "is it rly tho?",
		"...": "triple periods r the best aren't they ;)",
		"ok": "ko",
		"cancer": "means crab in latin",
		"pr0 strats": "something you may never have... :thinking:",
		"fuck you" : "why you gotta be so rude...",
		"=_=" : "right back at ya",
		"what" : "is going on",
		"aya" : "is the worst sister ever",
		"carcar" : "is the worst brother ever"
	};
	if(responseObject[message.content]){
		message.channel.send(responseObject[message.content]);
	}
	var customcomlist = ['https://cdn.discordapp.com/attachments/275334819737501696/319984630499377153/unknown.png',
	'http://www.mast.queensu.ca/~mikeroth/oldteaching/calculus/handouts/anigraph.gif',
	'https://cdn.discordapp.com/attachments/275334819737501696/320010992937598977/cancer.PNG',
	'https://cdn.discordapp.com/attachments/275334819737501696/320005546508025857/ecksdee.png',
	'https://cdn.discordapp.com/attachments/311673082421182474/315944617478586378/raviexposed.png',
	'http://www.pbh2.com/wordpress/wp-content/uploads/2013/10/bike-jump-fail.gif',
	'http://image.11st.my/g3/6/0/5/6/7/2/35605672_A3_V3.gif',
	'https://cdn.discordapp.com/attachments/275334819737501696/320296042513825792/gj.PNG',
	'https://cdn.discordapp.com/attachments/275334819737501696/320004386002698241/itsgotem.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320054108650471425/hate.png',
	'https://cdn.discordapp.com/attachments/311673082421182474/319984144958488577/heckoff.PNG',
	'https://cdn.discordapp.com/attachments/275334819737501696/320050882827780106/hierarchy.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320012226842853376/justno.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320018557217931264/pranked.PNG',
	'https://cdn.discordapp.com/attachments/308678580496498699/314595443134693377/triggger.png',
	'http://i1.kym-cdn.com/photos/images/newsfeed/000/296/199/9ff.gif',
	'https://cdn.discordapp.com/attachments/275334819737501696/320019929233489940/salted.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320008151904813056/siblingdrama.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320017022308057090/realtrash.png'
	];
	var customtriggerlist = ['arcanestrats',
	'calculus',
	'cancer',
	'ecksdee',
	'exposed',
	'fail',
	'fidgetspinner',
	'gj',
	'gotem',
	'hate',
	'heckoff',
	'hierarchy',
	'justno',
	'pranked',
	'questionmark',
	'roflcopter',
	'salty',
	'siblingdrama',
	'trash'
	];
	var customresponselist = ['get your very own arcane wizard today for 6 easy payments of $69.99!',
	'right like i would know that (actually i do) now get back to work!',
	'lets help prevent cancer together ;)',
	'u laughing that hard? xD',
	'woah exposed!!',
	'how can you fail at this? it isnt even a test...',
	'have some free autism',
	'GOOD JOB',
	'GOTEM!!!',
	'"Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering." - Yoda',
	'some next level hecking',
	'"PROPER" server hierarchy (inside joke rofl)',
	'*sigh*   just... no',
	'youve been PRANKED son',
	'some next gen question mark strats',
	'R O F L',
	'u 2 SALTI? just admit it :)',
	'the only *PROPER* way to sibling drama',
	'what is this TRASH :/'
	]
	for(var i = 0; i < customcomlist.length; i++){
		if(message.content === prefix + customtriggerlist[i]){
			var x = i;
			const embed = new Discord.RichEmbed()
			.setColor("#b942f4")
			.setAuthor(message.member.displayName, message.author.displayAvatarURL)
			.setTitle(customresponselist[x])
			.setFooter("Cool Custom Commands 8)", 'https://t3.rbxcdn.com/acd7701fc57d046a4eac7812ceb87843')
			.setTimestamp()
			.setImage(customcomlist[x]);
			message.channel.send({embed});
		}
	}
});
/*
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
*/
client.login(config.token);﻿
