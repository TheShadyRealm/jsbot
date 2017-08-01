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
var numID = [];
var userID = [];
var guessNumID = [];
var yw = require('weather-yahoo');
var ans = {};
var mutedArr = [];
var Forecast = require('forecast');
var stopwatchID = [];
var stopwatchDate = [];
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Bitfield = require("bitfield");
var translate = require('node-google-translate-skidz');
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
	]; //for ending couple lines
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
var forecast = new Forecast({
  service: 'darksky',
  key: config.apikey,
  units: 'fahrenheit',
  cache: true,     
  ttl: {            
    minutes: 27,
    seconds: 45
  }
});
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}		
function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}
function strip(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function toLetters(x){
	return x.replace(/[^A-Za-z0-9]/g, '');
}
function toReact(x){
	return x.replace(/[^A-Za-z0-9\t]/g, '');
}
function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
}

function combined(array){
    var a = array.concat();
	var x = [];
    for(var i = 0; i < a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j]){
				x.push(a[j])
                a.splice(j--, 1)
			}
        }
    }
	for(var f = 0; f < x.length; f++){
		a.splice(a.indexOf(x[f]), 1)
	}
    return a;
}

function convert(t){
  var orig = new Date(t * 1000);
  var hour = orig.getHours();
  var min = orig.getMinutes();
  var sec = orig.getSeconds();
  return hour + (9<min?':':':0') + min + (9<sec?':':':0') + sec;
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
});

client.on('guildMemberRemove', (guild, member) => {
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
});

client.on('ready', () => {
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
	client.user.setGame("la sauvegarde de la salle d'attente, c'est de la triche !")
	this.date = Date.now();
});

client.on('messageReactionAdd', (messageReaction, user) => {	
	if(messageReaction.emoji.toString() === '📌' && messageReaction.count === 3){
		messageReaction.message.pin()
	}
});
//message logs
client.on('messageDelete', message => {
	var server = message.guild.id;
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		description: '**Message sent by ' + message.author + ' deleted in <#' + message.channel.id + '>**\n' + message.content,
		author: {
			name: message.member.displayName,
			icon_url: message.author.displayAvatarURL
		},
		timestamp: new Date()
	}});
});

client.on('messageDeleteBulk', messages => {
	var message = messages.first();
	var server = messages.first().guild.id
	var mcontent = messages.map(c=>c.content)
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	for(var i = 0; i < mcontent.length; i++){
		message.guild.channels.get(channeltosend).send({embed: {
			color: 15784782,
			description: '**Message sent by ' + message.author + ' deleted in <#' + message.channel.id + '>**\n' + mcontent[i],
			author: {
			name: message.member.displayName,
				icon_url: message.author.displayAvatarURL
			},
			timestamp: new Date()
		}});
	}
});
	
client.on('messageUpdate', (oldMessage, newMessage) => {
	var message = oldMessage;
	if(message.author.bot) return;
	var server = message.guild.id;
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Message Edited :pencil2:',
		description: '**Message sent by ' + message.author + ' edited from**\n' + oldMessage + '\n**to** \n' + newMessage + '\n**in channel <#' + message.channel.id + '>**',
		timestamp: new Date()
	}});
});
//member logs
client.on('guildMemberUpdate', (oldMember, newMember) => {
	var oldroles = oldMember.roles.map(c=>c.id);
	var newroles = newMember.roles.map(c=>c.id);
	var rolechange = (combined(oldroles.concat(newroles)));
	var message = oldMember;
	var server = message.guild.id;
	var channeltosend;
	var tosend;
	if(oldroles.length > newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> removed from ' + message  
	} else if(oldroles.length < newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> added to ' + message
	} else if(oldMember.displayName != newMember.displayName){
		tosend = message + "**'s nickname changed from** `" + oldMember.displayName + '`** to** `' + newMember.displayName + '`'
	} else {
		return;
	}
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	message.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User Change :arrows_clockwise:',
		description: tosend,
		timestamp: new Date()
	}});
});
//role logs
client.on('roleCreate', role => {
	var server = role.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	role.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Creation :crossed_swords:',
		description: '**New Role:** `' + role.name + '` **created **', 
		timestamp: new Date()
	}});
});

client.on('roleUpdate', (oldRole, newRole) => {
	var server = oldRole.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	if(oldRole.permissions != newRole.permissions){
		return;
	}
	oldRole.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Name Edit :pencil:',
		description: '**Role name changed from** `' + oldRole.name + '` **to** `' + newRole.name + '`', 
		timestamp: new Date()
	}});
});

client.on('roleDelete', role => {
	var server = role.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	role.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Role Deletion :recycle:',
		description: '**Role:** `' + role.name + '` **deleted**', 
		timestamp: new Date()
	}});
});
//ban logs
client.on('guildBanAdd', (guild, user) => {
	var server = guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User banned from server :hammer:',
		description: user.username + '** was banned from **' + guild.name, 
		timestamp: new Date()
	}});
});

client.on('guildBanRemove', (guild, user) => {
	var server = guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User unbanned from server :white_check_mark:',
		description: user.username + '** was unbanned from **' + guild.name, 
		timestamp: new Date()
	}});
});

client.on('channelCreate', channel => {
	if(channel.type != 'text' || channel.type != 'voice') return;
	var server = channel.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	channel.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Channel Created :tools: ',
		description: '**New channel created: **<#' + channel.id + '>', 
		timestamp: new Date()
	}});
});

client.on('channelDelete', channel => {
	if(channel.type != 'text' || channel.type != 'voice') return;
	var server = channel.guild.id
	var channeltosend;
	if(server === '310224842735616020'){
		channeltosend = '324667410605015041';
	} else if(server === '333471257838485524'){
		channeltosend = '340740982544793600';
	} else if(server === '272473930520854529'){
		channeltosend = '293840751836659714';
	} else {
		return;
	}
	channel.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'Channel Deleted :x: ',
		description: '**Channel deleted: **' + channel.name, 
		timestamp: new Date()
	}});
});

client.on('message', message => {
	if(message.author.id === '171696920324997121'){
		message.member.addRole(message.member.guild.roles.find('name', 'Hmmm'))
	}
	if(message.author.bot) return;
	var args = message.content.split(/[ ]+/);
	var msg1 = strip(message.content);
	var randomN;
	var maxN;	
	if(message.content.startsWith(prefix + "translate")){
		if(args.length < 4){
			message.channel.send({embed: {
				color: 15784782,
				author: {
					name: message.member.displayName,
					icon_url: message.author.displayAvatarURL
				},
				title: 'Translate 🈳',
				description: "Translate some text from one language into another! (To see supported langauges check out this link: 'https://www.sitepoint.com/iso-2-letter-language-codes/') `.translate [input language] [output langauge] [text]`"
			}})
		} else {
			var fromL; var fromLN;
			var toL; var toLN;
			var languages = ['ab', 'aa', 'af', 'sq', 'am', 'ar', 'hy', 'as', 'ay', 'az', 'ba', 'eu', 'bn', 'dz', 'bh', 'bi', 'br', 'bg', 'my', 'be', 'km', 'ca', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fo', 'fj', 'fi', 'fr', 'fy', 'gd', 'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ha', 'iw', 'hi', 'hu', 'is', 'in', 'ia', 'ie', 'ik', 'ga', 'it', 'ja', 'jw', 'kn', 'ks', 'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'ln', 'lt', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om', 'ps', 'fa', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 'ru', 'sm', 'sg', 'sa', 'sr', 'sh', 'st', 'tn', 'sn', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'uk', 'ur', 'uz', 'vi', 'vo', 'cy','wo', 'xh', 'ji', 'yo', 'zu']
			var languageNames = ['Abkhazian','Afar','Afrikaans','Albanian','Amharic','Arabic','Armenian','Assamese','Aymara','Azerbaijani','Bashkir','Basque','Bengali, Bangla','Bhutani','Bihari','Bislama','Breton','Bulgarian','Burmese','Byelorussian','Cambodian','Catalan','Chinese','Corsican','Croatian','Czech','Danish','Dutch','English','Esperanto','Estonian','Faeroese','Fiji','Finnish','French','Frisian','Gaelic (Scots Gaelic)','Galician','Georgian','German','Greek','Greenladic','Guarani','Gujarati','Hausa','Hebrew','Hindi','Hungarian','Icelandic','Indonesian','Interlingua','Interlingue','Inupik','Irish','Italian','Japanese','Javanese','Kannada','Kashmiri','Kazakh','Kinyarwanda','Kirghiz','Kirundi','Korean','Kurdish','Laothian','Latin','Latvian, Lettish','Lingala','Lithuanian','Macedonian','Malagas','Malay','Malayalam','Maltese','Maori','Marathi','Moldavian','Mongolian','Nauru','Nepali','Norwegian','Occitan','Oriya','Oromo, Afan','Pashto, Pushto','Persian','Polish','Portuguese','Punjabi','Quechua','Rhaeto-Romance','Romanian','Russian','Samoan','Sangro','Sanskrit','Serbian','Serbo-Croatian','Sesotho','Setswana','Shona','Sindhi','Singhalese','Siswati','Slovak','Slovenian','Somali','Spanish','Sudanese','Swahili','Swedish','Tagalog','Tajik','Tamil','Tatar','Tegulu','Thai','Tibetan','Tigrinya','Tonga','Tsonga','Turkish','Turkmen','Twi','Ukrainian','Urdu','Uzbek','Vietnamese','Volapuk','Welsh','Wolof','Xhosa','Yiddish','Yoruba','Zulu']
			for(var i = 0; i < languages.length; i++){
				if(args[1].toLowerCase().toString() === languages[i]){
					fromL = languages[i]
					fromLN = languageNames[i]
				}
				if(args[2].toString() === languages[i]){
					toL = languages[i]
					toLN = languageNames[i]
				} 
				var textNumber = 13 + args[2].length + args[1].length 
				var text = args.join(' ').substring(textNumber)
			}
			if(fromL === undefined || toL === undefined || text === undefined) return;
			console.log(fromL, toL, text)
			translate({
			  text: text,
			  source: fromL,
			  target: toL
			}, function(result) {
				var display = JSON.stringify(result)
				var trans = display.substr(display.indexOf('"translation":') + 15)
				var limit = trans.indexOf('"}')
				var output = trans.substr(0, limit)
				const embed = new Discord.RichEmbed()
				.setColor(15784782)
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
				.setTitle("Translate 🈳")
				.setDescription('**Original (' + fromLN + ')**\n' + text + '\n**Translated (' + toLN + ')**\n' + output)
				.setTimestamp()
				.setFooter("Powered by GOOGLE translate", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png")
				message.channel.send({embed})
			});
		}	
	}
	if(message.content.startsWith(prefix + "react")){
		var a = 0; var b = 0; var c = 0; var d = 0; var e = 0; var f = 0; var g = 0; var h = 0; var letteri = 0; var j = 0; var k = 0; var l = 0; var m = 0; var n = 0; var o = 0; var p = 0; var q = 0; var r = 0; var s = 0; var t = 0; var u = 0; var v = 0; var w = 0; var x = 0; var y = 0; var z = 0;
		var reactarray = [];
		if(args.length === 1){
			return;
		} else {
			var msgReact = (toReact(args.join(' ').substring(7))).toLowerCase().split('')
			console.log(msgReact)
			for(var i = 0; i < msgReact.length; i++){
				if(msgReact[i] === 'a' && msgReact[i+1] === 'b' && msgReact[i+2] === 'c'){
					if(reactarray.includes('🔤')) continue;
					msgReact.splice(i, 2)
					reactarray.push('🔤')
				} else if(msgReact[i] === 'i' && msgReact[i+1] === 'i'){
					if(reactarray.includes('⏸')) continue;
					msgReact.splice(i, 1)
					reactarray.push('⏸')
				} else if(msgReact[i] === 'o' && msgReact[i+1] === 'o'){
					msgReact.splice(i, 1)
					reactarray.push('🈁')
				} else if(msgReact[i] === 's' && msgReact[i+1] === 'o' && msgReact[i+2] === 's'){
					msgReact.splice(i, 2)
					reactarray.push('🆘')
				} else if(msgReact[i] === 'i' && msgReact[i+1] === 'd'){
					msgReact.splice(i, 1)
					reactarray.push('🆔')
				} else if(msgReact[i] === '1' && msgReact[i+1] === '0' && msgReact[i+1] === '0'){
					msgReact.splice(i, 2)
					reactarray.push('💯')
				} else if(msgReact[i] === 'n' && msgReact[i+1] === 'g'){
					msgReact.splice(i, 1)
					reactarray.push('🆖')
				} else if(msgReact[i] === 'o' && msgReact[i+1] === 'k'){
					msgReact.splice(i, 1)
					reactarray.push('🆗')
				} else if(msgReact[i] === 'z' && msgReact[i+1] === 'z' && msgReact[i+2] === 'z'){
					msgReact.splice(i, 2)
					reactarray.push('💤')
				} else if(msgReact[i] === 'o' && msgReact[i+1] === 'n'){
					msgReact.splice(i, 1)
					reactarray.push('🔛') 
				} else if(msgReact[i] === 'c' && msgReact[i+1] === 'o' && msgReact[i+2] === 'o' && msgReact[i+3] === 'l'){
					msgReact.splice(i, 3)
					reactarray.push('🆒') 
				} else if(msgReact[i] === 'a'){
					var aa = ['🇦', '🅰', '🍙', '🔼']
					reactarray.push(aa[a])
					a++
				} else if(msgReact[i] === 'b'){
					var aa = ['🇧', '🅱']
					reactarray.push(aa[b])
					b++
				} else if(msgReact[i] === 'c'){
					var aa = ['🇨', '©', '🗜', '☪', '🇹🇷']
					reactarray.push(aa[c])
					c++
				} else if(msgReact[i] === 'd'){
					var aa = ['🇩', '↩'] 
					reactarray.push(aa[d])
					d++
				} else if(msgReact[i] === 'e'){
					var aa = ['🇪', '📧', '💶']
					reactarray.push(aa[e])
					e++
				} else if(msgReact[i] === 'f'){
					var aa = ['🇫', '🎏']
					reactarray.push(aa[f])
					f++
				} else if(msgReact[i] === 'g'){
					var aa = ['🇬', '⛽'] 
					reactarray.push(aa[g])
					g++
				} else if(msgReact[i] === 'h'){
					var aa = ['🇭', '♓']
					reactarray.push(aa[h])
					h++
				} else if(msgReact[i] === 'i'){
					var aa = ['🇮', 'ℹ', '🚹']  
					reactarray.push(aa[letteri])
					letteri++
				} else if(msgReact[i] === 'j'){
					var aa = ['🇯', '🗾']
					reactarray.push(aa[j])
					j++
				} else if(msgReact[i] === 'k'){
					var aa = ['🇰', '🎋']
					reactarray.push(aa[k])
					k++
				} else if(msgReact[i] === 'l'){
					var aa = ['🇱', '👢', '💷']
					reactarray.push(aa[l])
					l++
				} else if(msgReact[i] === 'm'){
					var aa = ['🇲', 'Ⓜ', '📉']
					reactarray.push(aa[m])
					m++
				} else if(msgReact[i] === 'n'){
					var aa = ['🇳', '♑', '🎵']
					reactarray.push(aa[n])
					n++
				} else if(msgReact[i] === 'o'){
					var aa = ['🇴', '🅾', '⭕', '🔘', '⏺', '⚪', '⚫', '🔵', '🔴', '💫']
					reactarray.push(aa[o])
					o++
				} else if(msgReact[i] === 'p'){
					var aa = ['🇵', '🅿']
					reactarray.push(aa[p])
					p++
				} else if(msgReact[i] === 'q'){
					var aa = ['🇶', '♌']
					reactarray.push(aa[q])
					q++
				} else if(msgReact[i] === 'r'){
					var aa = ['🇷', '®']
					reactarray.push(aa[r])
					r++
				} else if(msgReact[i] === 's'){
					var aa = ['🇸', '💲', '⚡', '💰']
					reactarray.push(aa[s])
					s++
				} else if(msgReact[i] === 't'){
					var aa = ['🇹', '✝', '➕', '🎚', '🌴']
					reactarray.push(aa[t])
					t++
				} else if(msgReact[i] === 'u'){
					var aa = ['🇺', '⛎', '🐉']
					reactarray.push(aa[u])
					u++
				} else if(msgReact[i] === 'v'){
					var aa = ['🇻', '♈', '☑']
					reactarray.push(aa[v])
					v++
				} else if(msgReact[i] === 'w'){
					var aa = ['🇼', '〰', '📈']
					reactarray.push(aa[w])
					w++
				} else if(msgReact[i] === 'x'){
					var aa = ['🇽', '❎', '✖', '❌', '⚒']
					reactarray.push(aa[x])
					x++
				} else if(msgReact[i] === 'y'){
					var aa = ['🇾', '💴', '✌']
					reactarray.push(aa[y])
					y++
				} else if(msgReact[i] === 'z'){
					var aa = ['🇿']
					reactarray.push(aa[z])
				}
				if(msgReact[i] === '1'){
					reactarray.push('1⃣')
				} else if(msgReact[i] === '2'){
					reactarray.push('2⃣')
				} else if(msgReact[i] === '3'){
					reactarray.push('3⃣')
				} else if(msgReact[i] === '4'){
					reactarray.push('4⃣')
				} else if(msgReact[i] === '5'){
					reactarray.push('5⃣')
				} else if(msgReact[i] === '6'){
					reactarray.push('6⃣')
				} else if(msgReact[i] === '7'){
					reactarray.push('7⃣')
				} else if(msgReact[i] === '8'){
					reactarray.push('8⃣')
				} else if(msgReact[i] === '9'){
					reactarray.push('9⃣')
				} else if(msgReact[i] === '0'){
					reactarray.push('0⃣')
				} 
			}
			(async (function demo() {
                var kms = message.channel.fetchMessages({limit: 2})
                for(var fuk = 0; fuk < reactarray.length; fuk++){
				kms.then(m =>                     
                    m.last().react(reactarray[fuk]))
                    await(sleep(615));
                }
            }))();
		}
	}
	if(message.content.startsWith(prefix + "slot")){
		var slotarray = [':watermelon:',':bell:',':seven:',':lemon:',':cherries:',':grapes:',':gem:']
		var symbolslot = [];
		var z = [];
		var name = 'You lose... :disappointed_relieved:'
		var value = 'RIP! Better luck next time...' 
		for(var i = 0; i < 9; i++){
			var x = ~~((Math.random()* 6) + 0)
			z.push(x)
			symbolslot.push(slotarray[x])
		}
		console.log(z, symbolslot)
		if(z[3] === z[4] && z[4] === z[5] || z[0] === z[1] && z[1] === z[2] || z[6] === z[7] && z[7] === z[8] || z[0] === z[4] && z[4] === z[8] || z[2] === z[4] && z[4] === z[6]){
			name = 'You win!'
			value = 'Congrats! :money_mouth: :dollar: :money_mouth: '
		}
		message.channel.send({embed: {
			color: 15784782,
			author: {
				name: message.member.displayName,
				icon_url: message.author.displayAvatarURL			
			},
			title: 'Slot Machine :round_pushpin:',
			description: '*Wins by any diagonals or horizontal lines*\n\n--'  + symbolslot[0] + symbolslot[1] + symbolslot[2] + ' --\n**> **' + symbolslot[3] + symbolslot[4] + symbolslot[5] + '** <**\n--' + symbolslot[6] + symbolslot[7] + symbolslot[8] + ' --',
			fields: [{
				name: name,
				value: value
			}]
		}})
	}
	if(message.content.startsWith(prefix + "choose")){
		var tosend;
		if(args.length === 1){
			message.channel.send({embed: {
				color: 15784782,
				author: {
					name: message.member.displayName,
					icon_url: message.author.displayAvatarURL
				},
				title: 'Choose :scroll: ',
				description: 'Choose from a list of items... `choose [option1;option2;option3;etc]`'
			}})
		} else {
			var options = args.join(' ').substring(8).split(/[;\t]+/);
			var x = ~~((Math.random()* options.length) + 0)
			console.log(x)
			var pick = options[x]
			message.channel.send({embed: {
				color: 15784782,
				author: {
					name: message.member.displayName,
					icon_url: message.author.displayAvatarURL
				},
				title: 'Choose :scroll: ',
				description: '**Choosing from list**\n' + options.join(', ') + '\n**Chose**\n' + pick
			}})
		}
	}
	if(message.content.startsWith(prefix + "guessnumberstart")){
		var authorID = message.author.id;
        var difficulty = ['easy', 'medium', 'hard', 'expert'];
        var valid;
		var difftype;
        var checkValid = (args.join(" ").substring(18)).toString();
		if(userID.includes(message.author.id)){
			message.reply("Didn't you already start a game?")
			return;
		} else {
			if(checkValid === difficulty[0]){
				valid = true; difftype = 0; maxN = 1000;
				var randomN = ~~((Math.random()* maxN) + 0);
				userID.push(authorID);
				numID.push(randomN);
				guessNumID.push(1);
				console.log(userID, numID, guessNumID);
			} else if(checkValid === difficulty[1]){
				valid = true; difftype = 1; maxN = 100000;
				var randomN = ~~((Math.random()* maxN) + 0);
				userID.push(authorID);
				numID.push(randomN);
				guessNumID.push(1);
				console.log(userID, numID, guessNumID);
			} else if(checkValid === difficulty[2]){
				valid = true; difftype = 2; maxN = 10000000;
				var randomN = ~~((Math.random()* maxN) + 0);
				userID.push(authorID);
				numID.push(randomN);
				guessNumID.push(1);
				console.log(userID, numID, guessNumID);
			} else if(checkValid === difficulty[3]){
				valid = true; difftype = 3; maxN = 1000000000;
				var randomN = ~~((Math.random()* maxN) + 0);
				userID.push(authorID);
				numID.push(randomN);
				guessNumID.push(1);
				console.log(userID, numID, guessNumID);
			} else {
				valid = false;
				const embed = new Discord.RichEmbed()
				.setColor('#ffe135')
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setTitle('What the hell!')
				.setDescription('You attempted to set the difficulty to: `' + checkValid + '`... try `easy, medium, hard, or expert` instead...')
				.setTimestamp()
				message.channel.send({embed})
				return;
			}
			this.max = maxN
			const embed = new Discord.RichEmbed()
			.setColor('#ffe135')
			.setAuthor(message.member.displayName, message.author.displayAvatarURL)
			.setTitle('New game started!')
			.setDescription('Difficulty set to: `' + difficulty[difftype] + '`... numbers will range from `0` to `' + maxN + '`')
			.setTimestamp()
			message.channel.send({embed})
		}
	} else if(message.content.startsWith(prefix + "guessnumber")){
		if(userID.includes(message.author.id)){
			var checkID = userID.indexOf(message.author.id);
			var incr = ['Higher', 'Lower', 'You got it']; var incr1;
			var descIncr = ['higher than', 'lower than', 'exactly']; var descIncr1;
			var checkNum = numID[checkID];
			var guessNum = guessNumID[checkID];
			var checkGuess = parseInt(args[1]); console.log(checkGuess);
			if(isNaN(checkGuess) === true) return;
			if(checkGuess > this.max){
				message.reply("It's from 0 to **" + this.max + "**... quick reminder")
				return;
			}
			if(checkGuess === checkNum){
				descIncr1 = 2; incr1 = 2;
				userID.splice(checkID, 1);
				numID.splice(checkID, 1); 
				guessNumID.splice(checkID, 1);
			} else if(checkGuess > checkNum){
				descIncr1 = 1; incr1 = 1;
				guessNumID[checkID]++;
			} else if(checkGuess < checkNum){
				descIncr1 = 0; incr1 = 0;
				guessNumID[checkID]++;
			}
		} else {
			const embed = new Discord.RichEmbed()
			.setColor('#FF00FF')
			.setAuthor(message.member.displayName, message.author.displayAvatarURL)
			.setTitle('OH NOES')
			.setDescription('Try starting a game first?')
			.setImage('https://vignette4.wikia.nocookie.net/khanacademy/images/2/24/Cs-ohnoes.svg/revision/latest/scale-to-width-down/180?cb=20140917102823')
			.setTimestamp()
			message.channel.send({embed})
			return;
		}
		const embed = new Discord.RichEmbed()
		.setColor('#FF00FF')
		.setAuthor(message.member.displayName, message.author.displayAvatarURL)
		.setTitle(incr[incr1] + '!')
		.setDescription('The number is ' + descIncr[descIncr1] + ' `' + checkGuess + '`')
		.setFooter('Guess #' + guessNum)
		.setTimestamp()
		message.channel.send({embed})
	} else if(message.content.startsWith(prefix + "weather")){
		var zip = (args.join(" ").substring(8));
		yw.getSimpleWeather(zip).then(function(res){
		ans=res;
		var t = JSON.stringify(res)
		var high = t.substr(t.indexOf('"day"') + 20, 2);
		var low = t.substr(t.indexOf('"day"') + 31, 2);
		var descDesc = t.substr(t.indexOf('condition') + 12);
		var sub = descDesc.indexOf('"}')
		var desc = descDesc.substr(0, sub);
		var emoji;
		var latString = (t.substr(t.indexOf('lat')+6));
		var findLat = latString.indexOf("long")-3;
		var lat = latString.substr(0, findLat);
		var longString = (t.substr(t.indexOf('long')+7));
		var findLong = longString.indexOf("}")-1;
		var lonG = longString.substr(0, findLong);
		forecast.get([lat + ',' + lonG], true, function(err, weather) {
			if(err) return console.dir(err);
			var o = JSON.stringify(weather);
			var temp = parseInt(o.substr(o.indexOf('temperature')+13, 5));
			var feelslike = Math.round(o.substr(o.indexOf('apparentTemperature')+21, 5));
			var humidityH = o.substr(o.indexOf('humidity')+12);
			var humidityCount = humidityH.indexOf(',');
			var humidity = humidityH.substr(0, humidityCount)
			var precipProb = o.substr(o.indexOf('precipProbability')+19);
			var precipCount = (precipProb.indexOf(',"'));
			var precip = precipProb.substr(0, precipCount);
			var sunriseSun = o.substr(o.indexOf('sunriseTime')+13);
			var sunriseCount = sunriseSun.indexOf(",");
			var sunrise = convert(sunriseSun.substr(0, sunriseCount));
			var sunsetSun = o.substr(o.indexOf('sunsetTime')+12);
			var sunsetCount = sunsetSun.indexOf(",");
			var sunset = convert(sunsetSun.substr(0, sunsetCount));
			if(desc === 'Sunny'){
				emoji = ":sunny:"
			} else if(desc === 'Cloudy'){
				emoji = ":cloud:"
			} else if(desc === 'Mostly Sunny'){
				emoji = ":white_sun_cloud:"
			} else if(desc === 'Partly Cloudy'){
				emoji = ":partly_sunny:"
			} else if(desc === 'Mostly Clear'){
				emoji = ":large_blue_circle:"
			} else if(desc === 'Mostly Cloudy'){
				emoji = ":cloud::cloud:"
			} else if(desc === 'Scattered Showers'){
				emoji = ":cloud_rain:"
			} else if(desc === 'Thunderstorms'){
				emoji = ":thunder_cloud_rain:"
			} else if(desc === 'Clear'){
				emoji = ':white_circle:'
			}
			const embed = new Discord.RichEmbed()
			.setAuthor(message.member.displayName, message.author.displayAvatarURL)
			.setColor('#F0DB4E')
			.setTitle('Weather and other info for `' + zip + '`')
			.addField(emoji + ' ' + desc + ' ' + temp + '°F', ':arrow_up: High: ' + high + '°F \n:arrow_down: Low: ' + low + '°F\n:dash: Feels Like: ' + feelslike + '°F\n:thermometer: Humidity: ' + humidity + '%\n:droplet: Chance of Precipitation: ' + precip + '%\n:sunrise_over_mountains: Sunrise: ' + sunrise + ' PST\n:city_sunset: Sunset: ' + sunset + ' PST\n:straight_ruler: Coordinates: [' + lat + ', ' + lonG + ']')
			.setFooter('Provided by darksky and YAHOO WEATHER', 'https://canoe-camping.com/wp-content/uploads/2016/06/weather-ying-and-yang.jpg')
			.setTimestamp()
			message.channel.send({embed})
			});
		});		
	return;
	}
	if(message.content.startsWith(prefix + "lovecalc") || message.content.startsWith(prefix + "lc")){
		console.log('calculating love for:', args[1], args[2])
		if(args.length === 1){
			message.reply("Calculate the chance of love between two users... :kissing_heart: `.lovecalc [user 1] [user 2]`")
			return;
		}
		if(args[1] === undefined || args[2] === undefined){
			message.reply('Make sure to mention 2 people for this command to work... :blush:')
			return;
		}
		if(!args[1].includes('<') || !args[2].includes('<')){
			message.reply('Make sure you mention the user... :kissing_heart:')
			return;
		}
		var user1 = args[1].split('');
		var user2 = args[2].split('');
		var alg = user1.concat(user2);
		var numcount = 0;
		var multiplier = 2;
		var addiplier = 3;
		var finalnumber;
		for(var i = 0; i < alg.length; i++){
			if(parseInt(alg[i]) === 3){
				numcount++;
			} 
			if(parseInt(alg[i]) === 4 || parseInt(alg[i]) === 9 || parseInt(alg[i]) === 8){
				multiplier++;
			}
			if(parseInt(alg[i]) === 7){
				addiplier++;
			}
		}
		console.log(multiplier, numcount, addiplier)
		finalnumber = numcount*multiplier+addiplier;
		if(finalnumber > 100){
			finalnumber = finalnumber - 80;
		} 
		if(finalnumber <= 40){
			symbol = ':broken_heart:'
		} else if(finalnumber < 80 && finalnumber > 40){
			symbol = ':heart:'
		} else {
			symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
		}
		if(args[1] === '<@!275334018214658060>' && args[2] === '<@!272780089488572428>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!272780089488572428>'){
			finalnumber = 100;
			symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
		}
		if(args[1] === '<@!275334018214658060>' && args[2] === '<@!245342510598062080>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!245342510598062080>'){
			finalnumber = 100;
			symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
		}
		if(args[1] === '<@!275334018214658060>' && args[2] === '<@!272473368840634378>' || args[2] === '<@!275334018214658060>' && args[1] === '<@!272473368840634378>'){
			finalnumber = 101;
			symbol = '::kissing_heart: :two_hearts: :kissing_heart:'
		}
		const embed = new Discord.RichEmbed()
		.setAuthor(message.member.displayName, message.author.displayAvatarURL)
		.setColor('#F0DB4E')
		.setTimestamp()
		.setFooter("Love Calculator (gone lovely)", 'https://cdn.shopify.com/s/files/1/1061/1924/products/Beating_Pink_Heart_Emoji_large.png?v=1480481034')
		.setTitle('Love calculator... :revolving_hearts:')
		.setDescription('The results of the love calculation between ' + args[1] + ' and ' + args[2] + ' is **' + finalnumber + '%** ' + symbol)
		message.channel.send({embed})
	}
	if(message.content.startsWith(prefix + "serverinfo")){
		var emojis = [];
		var emojiID = message.guild.emojis.map(m=>m.id)
		var emojiNames = message.guild.emojis.map(m=>m.name)
		for(var i = 0; i < emojiID.length; i++){
			emojis.push('<:' + emojiNames[i] + ':' + emojiID[i] + '>' )
		}
		var ecf = message.guild.explicitContentFilter.toString();
		var ecfText;
		var vl = message.guild.verificationLevel.toString();
		var vlText;
		if(ecf === '0'){
			ecfText = "None"
		}
		if(ecf === '1'){
			ecfText = "Scan messages from members without a role"
		}
		if(ecf === '2'){
			ecfText = "Scan  messages sent by all members"
		}
		if(vl === '0'){
			vlText = "None"
		}
		if(vl === '1'){
			vlText = "Low"
		}
		if(vl === '2'){
			vlText = "Medium"
		}
		if(vl === '3'){
			vlText = "(╯°□°）╯︵ ┻━┻"
		}
		if(vl === '4'){
			vlText = "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"
		}
		const embed = new Discord.RichEmbed()
		.setColor(15784782)
		.setImage(message.guild.iconURL)
		.setAuthor(message.guild.name, message.guild.iconURL)
		.setDescription("Server ID: " + message.guild.id)
		.addField("Default Channel", message.guild.defaultChannel, true)
		.addField("Default Role", message.guild.defaultRole, true)
		.addField("Region", message.guild.region, true)
		.addField("Total Members", message.guild.memberCount, true)
		.addField("Roles", message.guild.roles.size, true)
		.addField("Emoji Count", message.guild.emojis.size, true)
		.addField("Channels" + ' (' + message.guild.channels.size + ' total)', 'Text: ' + message.guild.channels.filter(c=>c.type==="text").size + ', Voice: ' + message.guild.channels.filter(c=>c.type==="voice").size, true)
		.addField("Explicit Content Filter", ecfText, true)
		.addField("Verification Level", vlText, true)
		.addField("Owner", message.guild.owner + " (ID: " + message.guild.ownerID + ')')
		.addField("Created", message.guild.createdAt.toString(), true)
		message.channel.send({embed})
		message.channel.send('**Full Emoji List:** ' + emojis.join(''))
	}
	if(message.content.startsWith(prefix + "flip")){
		var coin;
		var flip = ~~((Math.random()* 2) + 1)
		console.log(flip)
		if(flip === 1){
			coin = 'heads'
		} else if(flip === 2){
			coin = 'tails'
		}
		(async (function(){
			message.channel.send({embed: {
				color: 15784782,
				author: {
					name: message.member.displayName,
					icon_url: message.author.displayAvatarURL
				},
				title: 'Flip a coin! :moneybag:',
				description: "Call the flip!"
			}}).then(message => message.delete(2250))
            await(sleep(2350));
			message.channel.send({embed: {
				color: 15784782,
				author: {
					name: message.member.displayName,
					icon_url: message.author.displayAvatarURL
				},
				title: 'Flip a coin! :moneybag:',
				description: "Flipped a coin... it's " + coin + '!'
			}})
        }))();
		
	}
	if(message.content.startsWith(prefix + "reverse")){
		var reverse = args.join(" ").substring(9)
		var arr = (reverse.split('')).reverse()
		message.channel.send({embed: {
			color: 15784782,
			author: {
				name: message.member.displayName,
				icon_url: message.author.displayAvatarURL
			},
			title: 'Reverse text :upside_down:',
			description: "**Original**\n" + reverse + "\n**Reversed**\n" + arr.join('')
		}})
	}
	if(message.content.startsWith(prefix + "space")){
		message.delete()
		var space = args.join(" ").substring(7)
		var tosend = space.split('')
		message.channel.send(tosend.join(' ') + ' **- ' + message.author.username + ' 2017**')
	}
	var regional = [];
	if(message.content.startsWith(prefix + "regionaltype")){
		if(args.length === 1){
			message.reply("Regionalize some text... :smiley: `.regionaltype [text a-z letters, 1-9 numbers]`")
		} else { 
			for(var x = 1; x < args.length; x++){
				var z = toLetters(args[x].toString()).toLowerCase().split('');
				for(var i = 0; i < z.length; i++){
					if(z[i] === '0'){
						z[i] = ':zero:'
					} else if(z[i] === '1'){
						z[i] = ':one:'
					} else if(z[i] === '2'){
						z[i] = ':two:'
					} else if(z[i] === '3'){
						z[i] = ':three:'
					} else if(z[i] === '4'){
						z[i] = ':four:'
					} else if(z[i] === '5'){
						z[i] = ':five:'
					} else if(z[i] === '6'){
						z[i] = ':six:'
					} else if(z[i] === '7'){
						z[i] = ':seven:'
					} else if(z[i] === '8'){
						z[i] = ':eight:'
					} else if(z[i] === '9'){
						z[i] = ':nine:'
					} else {
						z[i] = ':regional_indicator_' + z[i] + ':'
					}
				}
				regional.push(z.join(' '));
			}
			var messageToSend = regional.join('   ')
			message.channel.send(messageToSend);
		}
	}
	var pastanames = ['navyseal', 'daddy', 'showdownmod', 'gw', 'vietnam', '400ping', 'ja', 'republican', 'boneless', 'anime', 'never', 'assaulthelicopter', 'saveglitch', 'fattyboomboom', 'wheelchair', 'animejp', 'animeen', 'riot', 'goodshit', 'sun', 'shia', 'americantest', 'dankvirus', 'memedog', 'system32', 'davinci', 'papyseal', 'fail', 'calculus', 'emojimovie', 'dlc']
	var copypastas = ['What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.',
		":angel: daddy's :heart::sweat_drops::eggplant: little fidget spinner:dizzy: when daddy :revolving_hearts: feels horny he lifts :truck: me up:point_up:️ and puts me on:on: his huge :weary::sweat_drops:dick:eggplant: and I spin :cyclone: and spin :cyclone: whirrrrrr :flushed::flushed:I get:ideograph_advantage: so:sos: dizzy:dizzy: but daddy:revolving_hearts: keeps spinning :dizzy: me untill I squirt:fountain::fountain: leaving me all wet:sweat_drops: and his cummies :baby_bottle::baby_bottle: are all inside:diamond_shape_with_a_dot_inside: me:flushed: god I'm such a:flushed: spinny :dizzy_face:dizzy:dizzy_face::dizzy_face: little slut for daddy!",
		"I sexually Identify as a Showdown Mod. Ever since I was a girl I dreamed of soaring over the chatrooms dropping hot sticky locks on disgusting chat trolls. People say to me that being a Showdown Mod is Impossible and I’m fucking retarded but I don’t care, I’m beautiful. I’m having a plastic surgeon install a Hitler moustache, 30mm banhammers and Z4-R3L Hellfire Lockers on my body. From now on I want you guys to call me \"Aurora\" and respect my right to mute from above and ban needlessly. If you can't accept me you’re a modophobe and need to check your usergroup privilege. Thank you for being so understanding.",
		":flag_us::flag_us::flag_us: Shoutout :speaking_head: to :arrow_right:️ George Washington :grin: and :heavy_plus_sign: the boys :man:‍:boy:‍:boy: for inventing :thinking: freedom :ok_hand: :flag_us::flag_us::flag_us:",
		"Six hasn't been the same since he left Vietnam. He can seldom close his eyes without opening them again at fear of Charlies lurking in the jungle trees. Not that you could ever see the bastards, mind you. They were swift, and they knew their way around the jungle like nothing else. He remembers the looks on the boys' faces as he walked into that village and... oh, Jesus. The memories seldom left him, either. Sometimes he'd reminisce - even hear - Tex's southern drawl. He remembers the smell of Brooklyn's cigarettes like nothing else. He always kept a pack of Lucky's with him. The boys are gone, now. He knows that; it's just that he forgets, sometimes. And, every now and then, the way that seven looks at him with avid concern in his eyes... it makes him think. Sets him on edge. Makes him feel like he's back there... in the jungle.",
		"Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play \"conter strik\" and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story",
		"Hi, sorry for englise......is 2nd language jajaja :D.... My friend tell me dat this Sampsons actor is name Ms Kebab Apple?? ..... Is dis confirm? Jajajajaja xD ...... I think kebab is a food xD my friend also say \"Bart Sampson\" say to her \"eat my pants\" WTF jajajajaja xD",
		"Did you ever hear the tragedy of Donald Trump The Wise? I thought not. It’s not a story the Democrats would tell you. It’s a Republican legend. Donald Trump was a Dark President of the Republican Party, so tremendous and so wise he could use the executive branch to influence the taxpayers to create walls… He had such a knowledge of the conservative side that he could even keep the ones who supported him from fact-checking his statements. The right side of the political spectrum is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice shocked him for being gay. Ironic. He could save others from theocracy, but not himself.",
		"ya pizza what u want?\nlemme get uhhhhhhhhhh\nboneless pizza wit a 2 liter of coke\nfuk kind of pizza??\nand 2 liter machine broke\nwe got 1 liter tho\nfuk u mean B\naight look lemme get that pizza boneless\nuh? pizza dont got bone on it\ntf did i just say then\nyou said, lemme get it boneless\nlike pizza got a dam bone in it\nyall got bones in ya sht then\nnah\nso whats the problem\nD1CK HEAD\nname one pizza that got bone on it\njust dont put them shts in my pizza bruh\nhow many times i gotta say it\nbruh just explain to me\nhow the fuk pizza can be boneless?\nif it dont got bone in it iss boneless\nson what school u go to\ndawg i don't understand the problem\njust make my sht boneless",
		"Yes anime are for kids. Kids at the age of 5 and above have a perfectly fit brain to be nurtured by the values passed through anime. Any kid that has only watched retarded cartoons throughout his childhood will probably never even touch them as a teenager. Simply because the idea of anime being “stupid Chinese stuff for nerds“ will already have sinked in. As a result they will have no real values in their lives. I believe this to be the reason of at least 80% teenage population nowadays turning into SWAGfags and YOLOtards. They only watch shit like that spongebob squaretard, the most disgusting, moronic cartoon ever made. Remade batman series, remade pokemon series, remade YU-Gi-Oh series that have lost any good messages the original script wanted to pass on... Our generation grew up by watching Dragon Ball probably under the age of 10. Why shouldnt the generations after us do the same? Show the little ones around you the culture of anime. Let them grow a properly functioning brain. Anime is the only way.",
		"Oh my god. It finally happened. We're finally at the end. Let's do it. Oh boy. Here we go oh my god. Oh my god. We've done it. We've reached the legendary three digit level. click never ever ever ever do this. This is the dumbest thing you could possibly do. Reach level one hundred on steam. Listen, ok? Never do this. Never.",
		"I sexually Identify as an Attack Helicopter. Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners. People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful. I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body. From now on I want you guys to call me “Apache” and respect my right to kill from above and kill needlessly. If you can’t accept me you’re a heliphobe and need to check your vehicle privilege. Thank you for being so understanding.",
		"NOW HOLD THE FUCK UP:triumph::rage:did i just see you :eyes::fearful:do the save glitch :scream::confounded:in this speedrun? :dizzy_face::imp:if only you were a real:ok_hand::clap: speed-runner:runner::dash: like i am, :sunglasses::innocent:you would know:thinking::rolling_eyes: that the save glitch glitch:joy::joy::joy: is completely out of bounds. :wave::x::no_pedestrians:so unless you mistyped :keyboard::computer:the title saying:speaking_head::speaking_head: INBOUNDS :speaking_head::speaking_head:when you mean the out of bounds, :scream::rolling_eyes:then i can forgive that :innocent::confused:But what is UNFORGIVABLE:imp::imp::imp: is performing the save glitch:no_good::x::x: in the inboundaries category :astonished::thermometer_face::mask:i cannot believe:cold_sweat::cold_sweat: people like this:smiling_imp::japanese_ogre: exist, disgusting:cry::sob::frowning2:️",
		"Welcome to Africa, lady. If it's your first time in the concrete jungle, just sit back and relax. Everything is going to be okay, heh heh heh heh. Now we are stopping a robot. People from overseas, they like that one. Because they say \"What do you mean, ROBOT?!\" Because in South Africa we call a traffic light a robot. They love that one. Over there we have some very naughty hyenas eating the rubbish. Ah! These hyenas, they make such a big mess! Over there is a shop owner chilling with his black panther. Nobody is going to steal nothing when he's chilling with that black beauty. Nobody. Ah, ah, ah! Let me tell you it is your lucky day! Over there is the king of the concrete jungle- the Lion King! [Something in another language] And here we have some local musicians about to kick some funky tunes. (Oh my God, look at their freaky fashion! I should get 'em to open for me.) Oh fuck. (The fuck? DROP YOUR FUCKING WEAPON! DROP YOUR FUCKING WEAPON! SHUT THE FUCK UP! DROP YOUR FUCKING WEAPON! SHUT THE FUCK UP!) [gunfire]",
		"My dad had a bad habit of bursting into his teenaged son's bedroom without knocking. Normally it was fine cos I could hear him walking down the hallway, but he had his leg amputated and lived his last few years in a wheelchair. Rolling is much quite than walking... So, one time I was jerking to porn on my computer, and he burst in right when I was at the point of no return. I just dropped out of my chair and hit the floor, spurting cum everywhere. The was a silence for a few seconds then I just heard him roll backwards and quietly close the door. Neither of us ever mentioned it.",
		"アニメは人生の不可欠な部分です。ジェンダーやレースのも関わらず、すべてアニメはかわいいです。しかし、すべてのアニメが日本語であるとは限ねー、ほとんどの人が考えるように。アニメは日本、韓国、中国、アメリカ、またはスウェーデンから来ることができる。アニメ女子は大きくて丸い目をある、と彼らの髪の上に広がる目と彼らの顔から離れて。彼らはにおいをすることさえしない非常に小さな鼻をおそらく持っている。彼らの口はほとんどいつも開いている、そうでない場合彼らは隠されたオルガスムを持っている。だから彼らは微笑っている、またはちょうど悲しい。彼らの髪はめっちゃに長く、足首又はその下まで伸びている。彼ら髪の色は、通常、赤、青、青、緑、ピンク、またはほかのような人工の色です。茶色、金髪、黒髪のアニメを持つことは可能ですが、ほとんどのアニメは髪の色を染めたあった。彼らのバストサイズは常にかなり大きいです。これの良い例は、初音ミクです。彼女はシアン色の髪をしている。彼女の髪は彼女のブーツに行く、約六十九メートル。彼女は短いスカートを持っており、全体的にかなりみだらなです。彼女は歌っているので、口が開いている。しかし神は彼女がオルガスムの真ん中にいるかどうか知っている。彼女がアニメであることを知って、チャンスは彼女です。なぜか分かないが、企業はアニメ女子と動物を混ぜている。そしてそれはかなりくそ暑いです。彼らは猫の女子とキツネの女の子のような融合物を作った。それらのすべてはまだかなりかわいいですが、彼らは何らかの理由でパンティーを唯一着る。僕は誰も見ていないときに彼ら自身と遊ぶと聞いた。そのため、すべてのアニメゲームは「十八」以上です。彼ら作るは僕たちの望みを猫用疑う、またなぜ僕たちは彼らのための勃起を得る。しかし正直なところ、誰もそれを気にしない。僕たちはすべて、淫のアニメを見るのが大好きです、ね？ 僕たちはまたそれらを性交したい。めっちゃ硬い。それから、僕たちはできないと分かり、悲しくなる。だから僕たちは代わりに自慰する。アニメの男の子はあまり面白くないですが、彼らはまだかなりかわいいですね。僕がバイセクシャルではないので、これを解読するのは難しいことです。さようなら。",
		"Anime is an essential part of life. Every single anime is cute no matter gender or race. However, not all anime are Japanese, as most people think. Anime can come from Japan, Korea, China, or even America and Sweden. Anime girls have big round eyes that extend over their hair and off their face. They have a very small nose that they probably don’t even use to smell with. Their mouth is almost always open, and if it isn’t open they’re just having a hidden orgasm, so they are either smiling or just plain sad. Their hair is very long, and extends either down to their ankles or below. Their hair color is usually an artificial color like red, blue, teal, green, pink, or otherwise. It is possible to have brown, blonde, or black haired anime, but most anime have dyed hair colors. Their bust size is always quite large. A good example of this is Hatsune Miku. She has teal colored hair and it goes down about 69 meters down to her boots. She has a short skirt and is overall pretty lewd. She is singing so her mouth is open, but god knows if she’s in the middle of an orgasm. Knowing she’s an anime, chances are she is. I don’t know why, but companies have put anime girls with animals. And it’s pretty damn hot. They created fusions like catgirls, fox girls, and many others. All of them are still pretty cute, but they only wear panties for some reason. I heard they play with themselves when nobody is watching. That’s why all anime games are 18+. They make us question our sexuality and why we get a boner for felines. But let’s be honest, nobody cares about that. We all love seeing lewd anime. Right? We also want to fuck them. Real hard. And we get sad when we realize we cannot. That is what masturbation is for. Anime boys aren’t very interesting but they’re still pretty cute I guess. It’s kind of hard for me to decipher this because I’m not bisexual. Bye.",
		"O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A-JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA",
		" 👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌th 👌 ere👌👌👌 right✔there ✔✔if i do ƽaү so my selｆ 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠＯOOＯOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit",
		"I sexually Identify as an the sun. Ever since I was a boy I dreamed of slamming hydrogen isotopes into each other to make helium & light and send it throught the galaxy. People say to me that a person being a star is Impossible and I’m fucking retarded but I don’t care, I’m beautiful. I’m having a plastic surgeon inflate me with hydrogen and raise my temperature to over 6000 °C. From now on I want you guys to call me “Sol” and respect my right to give you vitamin D and probably sunburns. If you can’t accept me you’re a fusionphobe and need to check your astral privilege. Thank you for being so understanding.",
		"DO IT JUST DO IT. Don't let your dreams be dreams, Yesterday you said tomorrow, SO JUST DO IT MAKE YOUR DREAMS COME TRUE, JUST DOOOOO IT. Some people dream of success while you're gonna wake up and work HARD AT IT NOTHING IS IMPOSSIBLE. You should get to the point where anyone else would quit and you're not gonna stop there! NO WHAT ARE YOU WAITING FOR? DO IT! JUST DO IT! YES YOU CAN, JUST DO IT! If you're tired of starting over, STOP GIVING UP.",
		"✓ Obesity ✓ 💥🔫 ✓ Laziness ✓ Stupidity ✓ 🌵 ✓ McDonald's ✓ Donald Trump ✓ $70k College ✓ Bad healthcare ✓ Bad food ✓ Bad music ✓ Fahrenheit ✓ Pounds ✓ Inches ✓ AMERICAN TEST PASSED",
		"bᎽ ᏒᎬᎪᎠᎥᏁᎶ ᏆhᎥs mᎬssᎪᎶᎬ ᎽᎾu ᎪᏒᎬ ᏁᎾᎳ ᎥᏁfᎬᏟᏆᎬᎠ ᎳᎥᏆh ᏆhᎬ ᎠᎪᏁᏦ ᏢᎪsᏆᎪ ᏉᎥᏒus. ᏆᎾ ᎶᎬᏆ ᏒᎥᎠ Ꮎf ᏆhᎬ ᎠᎪᏁᏦ ᏢᎪsᏆᎪ ᏉᎥᏒus, ᎽᎾu musᏆ ᏢᎪss ᎥᏆ ᎾᏁ ᏆᎾ ᏆhᎬ ᏟhᎪT ヽ༼ຈل͜ຈ༽ﾉ I'm cured!!",
		"╭━━━━╮ This is memedog. Help\n╰┃ ┣▇━▇ memedog take over\n ┃ ┃  ╰━▅╮ Discord by pasting\n ╰┳╯ ╰━━┳╯ him in 10 other\n  ╰╮ ┳━━╯ discord servers or he\n ▕▔▋ ╰╮╭━╮ will never be a meme dog.\n╱▔╲▋╰━┻┻╮╲╱▔▔▔╲\n▏  ▔▔▔▔▔▔▔  O O┃\n╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱\n ▏╳▕▇▇▕ ▏╳▕▇▇▕\n ╲▂╱╲▂╱ ╲▂╱╲▂╱",
		"Hello, I have been informed that you have the system32 virus. The system32 virus does a UDP attack on your router on any open port so your internet throttles and lags and it has a very bad frame drop from 30 fps!, Not only that, It stops you from adding some people on steam and downloading some of the most recent games!, It uses up more of your HardDrive per launch on your computer etc, To delete this do: open cmd type in \"cd system\" without the quote marks then type in del system32 Press enter And there you go! Your system32 virus is deleted! (Its a fake copy of the system file that does all virus and downloads secret trojans, AV can't detect them since its in the computer's windows file and if its in there it could potentially damage your computer because it leaves logs there. Thank you! -Twitch Support",
		"“wtf his ult did like 3k damage how is that legit” – leonardo da vinci 1496, founder of the Illuminati",
		"WHAT THE SPAGHETTI DID YOU JUST SAY ABOUT ME, YOU HUMAN? I’LL HAVE YOU KNOW I GRADUATED TOP OF MY CLASS IN THE ROYAL KNIGHTS, AND I’VE BEEN INVOLVED IN NUMEROUS SECRET RAIDS ON SNOWDIN, AND I HAVE OVER 300 CONFIRMED PUZZLES. I AM TRAINED IN BLUE ATTACKS AND I’M THE TOP MONSTER IN THE ENTIRE UNDERGROUND. YOU ARE NOTHING TO ME BUT JUST ANOTHER TARGET. I WILL WIPE YOU OUT WITH COOL DUDE BONES THE LIKES OF WHICH HAS NEVER BEEN SEEN BEFORE ON THIS EARTH, MARK MY SUPERIOR WORDS. YOU THINK YOU CAN GET AWAY WITH SAYING THAT NONSENSE TO ME OVER THE UNDERNET? NYEH HEH HEH! THINK AGAIN, HUMAN. AS WE SPEAK I AM CONTACTING MY SECRET NETWORK OF DOGS ACROSS THE UNDERGROUND AND YOUR CELL PHONE IS BEING TRACKED RIGHT NOW SO YOU BETTER PREPARE FOR YOUR CAPTURE, HUMAN. THE CAPTURE THAT WILL ALLOW ME TO PROVE TO UNDYNE ONCE AND FOR ALL HOW GREAT I AM! YOU’RE FINISHED, HUMAN. I CAN BE ANYWHERE, ANYTIME, AND I CAN DATE YOU IN OVER SEVEN HUNDRED WAYS, AND THAT’S JUST WITH MY RATTLING BONES. NOT ONLY AM I EXTENSIVELY TRAINED IN BLUE ATTACKS, BUT I AM AN EXCELLENT COOK AND I WILL USE MY COOKING SKILLS TO SHOW MY SUPERIOR LOVE FOR PASTA!!! IF ONLY YOU COULD HAVE KNOWN WHAT GRAND RETRIBUTION YOUR LITTLE “CLEVER” FLIRTING WAS ABOUT TO BRING DOWN UPON YOU, MAYBE YOU WOULD HAVE HELD YOUR TONGUE. BUT YOU COULDN’T, YOU DIDN’T, AND NOW YOU’RE PAYING THE PRICE, SILLY HUMAN. BEING THE GREAT PAPYRUS, I HAVE NEVER BEEN BEATEN IN DATING, AND I NEVER WILL! NYEH HEH HEH!",
		"▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n████▌▄▌▄▐▐▌█████\n████▌▄▌▄▐▐▌▀████\n▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
		"Listen kid. I swear to you, I have the top grades in my advanced placement calculus class. You little punk, you will never bring me down in my level of solving for x. Plebs like you have no clue what I needed to do to get a 99.9% in my final. And that's uncurved. Everyone else got 54% or lower. I say to you, screw you kid. I hate every little drop of your blood, which is exactly 4,384,382,172,495,382,384 little blood cells in you that I despise, and I did that by making my own formula dealing with looking at someone's eye color. You kid. You'll never surpass me in the 6 computer programming languages that I created, and the additional 58 that I know. I started learning advanced statistics even before I began to study English. I became a master at integral calculus with multiple variables at age 5. Little puny plebeians such as you can never imagine to become as good as me.",
		"The Emoji Movie unlocks the never-before-seen secret world inside your smartphone. Hidden within the messaging app is Textopolis, a bustling city where all your favorite emojis live, hoping to be selected by the phone's user. In this world, each emoji has only one facial expression - except for Gene, an exuberant emoji who was born without a filter and is bursting with multiple expressions. Determined to become \"normal\" like the other emojis, Gene enlists the help of his handy best friend Hi-5 and the notorious code breaker emoji Jailbreak. Together, they embark on an epic \"app-venture\" through the apps on the phone, each its own wild and fun world, to find the Code that will fix Gene. But when a greater danger threatens the phone, the fate of all emojis depends on these three unlikely friends who must save their world before it's deleted forever.",
		"I have spent about $16,000 worth of DLC and In-Game video game items, and you know what? I don't give a fuck. My parent's credit card is always loaded with that yummy cash, so why the fuck would I not waste it? I need those CS:GO knives, those FIFA card packs, I need all the virtual hats I can get. If I see someone with something better than me, I will buy something that is better than their thing, because I fucking hate it when people have better stuff than me. I haven't been caught yet, because my parents don't know the difference between the electricity bill and the online store bill. Which is why I will continue to buy more shit, until I die. I fucking love DLCs."
		]
	for(var i = 0; i < pastanames.length; i++) {
		if(message.content.startsWith(prefix + "copypasta")){
			if(args[1] === undefined){return;}
			var checkpasta = args[1].toString();
			if(args.length === 1 || args.length > 2){return;}
			if(checkpasta === pastanames[i]){						
				message.channel.send(copypastas[i])
				return;
			} else if(checkpasta === 'list'){
				message.channel.send({embed: {
					color: 15784782,
					title: ":newspaper: Copypasta name list: (can i get a Kreygasm :wink:)",
					description: pastanames.join(', ')
				}})
				break;
			}
		}
	}		
	var tosend;
	var loc = stopwatchID.indexOf(message.author.id);
	var stopwatchTime = (Date.now() - stopwatchDate[loc])/1000;
	if(message.content.startsWith(prefix + "stopwatch")){
		if(args[1] === 'end'){
			if(!stopwatchID.includes(message.author.id)) return;
			tosend = 'Your stopwatch stopped at: **' + mts(stopwatchTime) + '**'
			stopwatchID.splice(loc, 1)
			stopwatchDate.splice(loc, 1)
		} else if(args[1] === 'start'){
			if(stopwatchID.includes(message.author.id)) return;
			stopwatchID.push(message.author.id)
			stopwatchDate.push(Date.now())
			tosend = 'Your stopwatch has started... type `.stopwatch` to check on it :clock10: '
		} else if(args[1]){
			return;
		} else {
			if(!args[1] && !stopwatchID.includes(message.author.id)){
				tosend = 'Start, stop, and keep track of your stopwatch... `.stopwatch (start/stop)` to start/stop and `.stopwatch` to see how your stopwatch is doing... :watch:'
			} else if(!args[1] && stopwatchID.includes(message.author.id)){
				tosend =  message.author + ", your stopwatch has been running for: " + mts(stopwatchTime)
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ":stopwatch: Stopwatch",
			description: tosend
		}})
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
	if(message.content.startsWith(prefix + "ping")){
		message.channel.send({embed: {
		color: 15784782,
		description: (':ping_pong: **Pong!** Time taken: ' + ~~(client.ping) + 'ms')
		}})
	} else if(message.content.startsWith(prefix + "repeat") && message.author.id != '272473368840634378'){
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
				} else if((args.join(" ").substring(7)) < 0){
					message.channel.send("Make sure it's a positive integer...")
				} else {
					message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
					message.reply((msg-1) + ' messages successfully deleted!').then(message => message.delete(1575))
				}
			}
		} else {
			message.reply("You do not have the perms to delete messages... nice try...").catch(console.error);
		}
	} else if(message.content.startsWith(prefix + "kick")){
		var tosend;
		this.vic = message.guild.member(message.mentions.users.first())
		if(args.length === 1){
			message.reply("Kick a user (u sure about dat boi?) Usage: `.kick [user to kick]`")
			return;
		}
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("be sure you mention the person you want to kick...")
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('KICK_MEMBERS') && this.vic.kickable === true){
				if(message.member.highestRole.position > this.vic.highestRole.position){
					this.vic.kick().catch(console.error);
					tosend = "User " + this.vic + " has been kicked from the server. :dash:"
					console.log(this.vic + ' was kicked from the server')
				} else {
					tosend = "Are you trying to kick someone that has a higher role than you...?"
				}
			} else {
				tosend = "Are you trying to kick someone that's superior to you? Or am I too low on the role hierarchy :cry:"
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ':boot: Kick user: ' + this.vic.displayName,
			description: message.author + ", " + tosend
		}})
	} else if(message.content.startsWith(prefix + "ban")){
		var tosend;
		this.vic = message.guild.member(message.mentions.users.first())
		if(args.length === 1){
			message.reply("BAN a user :hammer: Usage: `.ban [user to totally demolish]`")
			return;
		}
		if(this.vic === null){
			message.reply("be sure you mention the person you want to ban...")
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('BAN_MEMBERS') && this.vic.bannable === true){
				if(message.member.highestRole.position > this.vic.highestRole.position){
					this.vic.ban().catch(console.error);
					tosend = ("user " + this.vic + " has been banned from the server. :rage:")
					console.log(this.vic + ' was banned from the server')
				} else {
					tosend = "Are you trying to ban someone that has a higher role than you...?"
				}
			} else {
				tosend = "I can't ban this person... they have a higher role than I do... don't they... or maybe you don't have permission to ban..."
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: ':hammer: Ban user: ' + this.vic.displayName,
			description: message.author + ", " + tosend
		}})
	} else if(message.content.startsWith(prefix + "warn")){
		if(message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES', 'MANAGE_ROLES')){
			if(args.length === 1){
				message.channel.send("Warn a user for misbehaving... :smiling_imp: Usage: `.warn [user] (reason)`")
			} else {
				console.log(args[1].length)
				var x = args[1].length + 1;
				console.log(x);
				message.mentions.users.first().send("You have been warned in the server " + message.guild.name + " for **" + (args.join(" ").substring(6 + x)) + "**")
				message.reply("user " + (message.mentions.users.first()) + " has been warned for **" + (args.join(" ").substring(6 + x)) + "**")
			}
		}
	} else if(message.content.startsWith(prefix + "mute")){
		var tosend;
		if(args.length === 1){
			message.reply("channel mute someone :mute: from the channel. Usage: `.mute [user]`")
			return;
		} 
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("What are trying to do... mute air?")
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES') && !message.guild.member(message.mentions.users.first()).permissionsIn(message.channel).has('ADMINISTRATOR')){
				if(mutedArr.includes(message.guild.member(message.mentions.users.first()).id)){
					tosend = "Didn't you already mute this user?"
				} else {
					message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
						SEND_MESSAGES: false, ATTACH_FILES: false
					}).catch(console.error)
					tosend = message.guild.member(message.mentions.users.first()) + " has been muted in this channel... i think... :white_check_mark: "
					mutedArr.push(message.guild.member(message.mentions.users.first()).id)
				}
			} else {
				tosend = "Make sure you have permissions to mute this user... or maybe they just can't be muted... damn what a god"
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: 'Muting user: ' + (message.guild.member(message.mentions.users.first()).displayName) + ' :mute:' ,
			description: ':loudspeaker: ' + message.author + ', ' + tosend
		}})
	} else if(message.content.startsWith(prefix + "unmute")){
		var tosend;
		if(args.length === 1){
			message.reply("unmute someone from the channel. Usage: `.unmute [user]`")
			return;
		}
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("So first you tried to mute air... now you're trying to unmute the protons and electrons?")
			return;
		} else {
			if(message.member.permissionsIn(message.channel).has('MANAGE_ROLES')){
				if(mutedArr.includes(message.guild.member(message.mentions.users.first()).id)){
					mutedArr.splice(mutedArr.indexOf((message.guild.member(message.mentions.users.first()).id)), 1)
					message.channel.overwritePermissions(message.guild.member(message.mentions.users.first()), {
						SEND_MESSAGES: true, ATTACH_FILES: true
					}).catch(console.error)
					tosend = message.guild.member(message.mentions.users.first()) + " has been unmuted in this channel...:thinking:"
				} else {
					tosend = "Pretty sure you didn't mute this user... at least not with me..."
				}
			}
		}
		message.channel.send({embed: {
			color: 15784782,
			title: 'Unmuting user: ' + (message.guild.member(message.mentions.users.first()).displayName) + ' :speaker:' ,
			description: ':loudspeaker: ' + message.author + ', ' + tosend
		}})
	}
	//help commands
	if(message.content.startsWith(prefix + "help")){
		message.author.send("Commands List:\n **Global Prefix: .**\n __Mod commands__ \n **help** - shows this message \n **botinfo** - info about the bot... \n **ping** - pings server and returns with ms \n **uptime** - shows bot uptime \n **warn [user] (reason)** - warns a user for being a meme \n **purge [# of msgs]** - clears the last x messages \n **kick/ban [user]** - kicks/bans the user mentioned \n **mute/unmute [user]** - mutes and unmutes a user \n **repeat [text]** - repeats stuff \n __For Fun Commands__ \n **8ball [question]** - 8-ball? \n **add/deltrash [text]** - add trashy triggers \n **roll (amt of dice)** - roll dice \n **kill [user]** - become a serial killer =) \n **count [min, max] (count by)** - count from min to max \n **rng [min, max, amt of numbers]** - pick x numbers between min and max \n **happiness [user]** - tell a user to stop being salty :) \n **cclist** - lists all custom commands \n **rem** - ゼロから始める異世界生活 :heart: \n **sans** - \"It's a beautiful day outside... birds are singing... flowers are blooming... on days like these kids like you... should be burning in HELL :fire:\n **duel [user]** - duel a user (this is totally rng btw) \n **playchess [move in algebraic notation]** - play the bot in a game of chess... but you'll lose...\n **guessnumberstart [easy, medium, hard, expert]/guessnumber [number]** - guessnumberstart to start a game of guess the number and guessnumber to guess the number :eyes:\n **weather [zip code]** - WIP but it shows a bunch of stuff with the weather\n **calc [expression]** - simple calculator `x (+, -, /, *, ^ for now) y` \n **lovecalc/lc [user 1] [user 2]** - calculate love chances between 2 users... :kissing_heart:\n **stopwatch (start/stop)** - start/stop/check on your stopwatch :watch: \n **copypasta [name]/copypasta list** - in case you're in need of a quick chat filler... :wink: \n **regionaltype [text A-Z or 0-9]** - turns text into regional emots :b:")
		message.author.send(" ** whoisagoodgirl** - this bot is a GIRL \n **react [text]** - reacts to the previous message with text (NEW! - NOW SUPPORTS (some) DOUBLE LETTERS) \n **space [text]** - annoy people \n **flip** - flip a coin and you get a second to call it while it's in midair \n **reverse [text]** - reverses text \n **choose [option1;option2;etc]** - chooses from inputted options \n **slot** - Pull the lever on the slot machine :seven:\n **translate [langauge 1] [language 2] [text]** - translate some TEXT :accept: \n__Code for this bot can be found here: https://github.com/TheShadyRealm/jsbot :smile: (holy crap jsbot is in javascript??? :scream:)__ \n **Invite link (highly not recommended):** :smiley: http://bit.ly/JSBot")
		message.channel.send({embed: {
			color: 15784782,
			description: '<@' + message.author.id + '>, a list of commands and stuff has been sent to your DMs :smiley:'
		}})
	} else if(message.content.startsWith(prefix + "botinfo")){
		message.channel.send({embed:{
			color: 15784782,
			title: 'SOME INFORMATION ON THIS BOT :thinking:',
			description: ":robot: <@324427383849353219> is a bot garbagely coded by <@275334018214658060> for absolute fun and dank memes **ROFEL HAHA XD** :laughing: (:bulb:**hint:** do not invite this bot to your server or it will cause mass destruction and chaos)"
		}})
	}
	//for fun commands
	if(message.content.startsWith(prefix + "8ball")){
		var replies = ["Yes", "No", "Ask again later", "It is decidely so", "Maybe not...", "Concentrate and ask again", "Cannot predict now", "Very doubtful", "Hell no", "Frick yes", "Mayyyyyybe?", "TOTALLY dude (sarcasm intended)"]
		var result = Math.floor((Math.random()* replies.length) + 0);
		if(args.length === 1){
			message.channel.send("Ask the legendary 8-ball a question! `.8ball [question]`")
		} else {
		message.channel.send({embed: {
			color: 15784782,
			fields: [{
				name: ":question::question: Question :grey_question::grey_question:",
				value: (args.join(" ").substring(7))
				},
				{
				name: ":8ball: 8ball's response",
				value: replies[result]
			}]
		}})
		}
	} else if(message.content.startsWith(prefix + "roll")){
		var nbr = parseInt(args[1]);
		var arr = [];
		var pluralcheck;
		if(args.length === 1){
			nbr = 1;
		} 
		if(nbr > 0 && nbr < 101){
			for(var r = 0; r < nbr; r++){
				arr.push(Math.floor((Math.random() * 6) + 1))
			}
		if(nbr === 1){
			pluralcheck = 'die'
		} else {
			pluralcheck = 'dice'
		}
			message.channel.send({embed: {
				color: 15784782,
				title: ':game_die: You rolled ' + nbr + ' ' + pluralcheck + '! The resulting roll(s):',
				description: arr.join(', ')
			}})
		} else {
			message.reply("1-100 dice... stop trying to exploit the system :nerd:")
		}
	} else if(message.content.startsWith(prefix + "happiness")){
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("https://www.youtube.com/watch?v=8anp1xJXkU0")
		} else {
			if(args.length === 1){
				message.reply("Mention someone first (to make them happy)!")
			} else {
				message.channel.send({embed: {
					color: 15784782,
					title: ':smile: :smiley: :rofl: :laughing: :grin: :grinning: :slight_smile: :sweat_smile: :upside_down:',
					description: '<@' + (message.guild.member(message.mentions.users.first()).id) + '>, you have been told by <@' + message.author.id + '> to be happy!'
				}})
			}
		}
	} else if(message.content.startsWith(prefix + "count")){
		var count = [];
		if(args.length != 4){
			message.reply("Input a number between 0-999... Usage: `.count min max interval` and NO COUNTING BACKWARDS k?")
		} else {
			var n1 = parseInt(args[1]);
			var n2 = parseInt(args[2]);
			var n3 = parseInt(args[3]);
			if(n1 => 0 && n1 < 1000 && n2 > 0 && n2 < 1000 && n3 < (n2-n1) && n2 > n1 && n3 != 0){
				for(var m = n1; m <= n2; m+=n3){
					count.push(m);
				}
				const embed = new Discord.RichEmbed()
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setColor('#F0DB4E')
				.setTitle(":checkered_flag: Counted " + Math.round(n2/n3) + " numbers: ")
				.setDescription(count.join(', '))
				.setTimestamp()
				message.channel.send({embed})
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
				message.channel.send({embed: {
					color: 15784782,
					title: ':briefcase: Your randomly generated number(s): :scroll: ',
					description: rnum.join(', ')
				}})
			} else {
				message.reply("Input a number between one and a million... Usage: `.rng min max # of numbers to generate`")
			}
		}
	} else if(message.content.startsWith(prefix + "uptime")){
		var upt = Math.round((Date.now() - this.date)/1000);
		message.channel.send({embed: {
			color: 15784782,
			title: ':timer: JSBot Uptime:',
			description: '<@' + message.author.id + '>, This bot has been alive for **' + mts(upt) + '** :clock10:'
		}})
	} else if(message.content.startsWith(prefix + "kill")){
		if(message.guild.member(message.mentions.users.first()) === null){
			message.reply("stop trying to exploit this bot smh...")
			return;
		} else if(message.author.id === '315123695129591823'){
			message.reply("<@315123695129591823> attempted to stab " + (message.guild.member(message.mentions.users.first()).id) + " but miserably failed and stabbed himself instead...")
		} else if((message.guild.member(message.mentions.users.first()).id) === '324427383849353219'){
			message.reply("you really think you can kill me? HA think again!")
			return;
		} else {
			var method = [" 360 noscoped ", 
			" knifed ", 
			" threw a combustable lemon at ", 
			" shot a portal inside of ", 
			" threw a knife that lodged into ", 
			" took a gun from the table and immediately turned and shot ", 
			" attached a grenade to an arrow and shot ", 
			" blew a poison dart at ", 
			" thrusted a sword hard into ", 
			" ate "];
			this.res = (Math.floor(Math.random() * (method.length - 1)) + 0)
			if(message.author.id === message.guild.member(message.mentions.users.first()).id){
				message.channel.send("if you want to kill yourself, i recommend draino... way more effective than bleach tbh")
			} else {
				const embed = new Discord.RichEmbed()
				.setAuthor(message.member.displayName, message.author.displayAvatarURL)
				.setColor('#F0DB4E')
				.setTitle(":skull_crossbones: **RIP** :skull_crossbones:")
				.addField(message.member.displayName + method[this.res] + message.guild.member(message.mentions.users.first()).displayName, 'and received ' + (Math.floor(Math.random() * 100) + 1) + " style points")
				message.channel.send({embed})
			}
		}
	} else if(message.content.startsWith(prefix + "cclist")){
		message.channel.send({embed: {
			color: 15784782,
			title: ':newspaper: List of custom (useless af) commands:',
			description: customtriggerlist.join(', ')
		}})
	}
	if(message.content.startsWith(prefix + "rem")){
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
		'https://s-media-cache-ak0.pinimg.com/236x/a0/8d/7f/a08d7f3ba972b9bf8beb56ce25b2e798.jpg',
		'https://images.discordapp.net/attachments/273219844894359554/335591269810044939/b9a0c86b9ebb8c72f890a3c958f12907.png?width=236&height=300',
		'https://images.discordapp.net/attachments/146404426746167296/335589791531794433/231fb89e7f32d3c011ef9539c07eeb16.jpg?width=226&height=301',
		'https://images.discordapp.net/attachments/146404426746167296/335589623893983253/9HmseU9.jpg?width=367&height=301',
		'https://images.discordapp.net/attachments/273219844894359554/334893983228755968/tam5.jpg?width=213&height=300',
		'https://images.discordapp.net/attachments/273219844894359554/334893089519042560/645359f869541b6679c2a0c51f2ffe8adf88b92ee4b2c-mFvTsK.jpg?width=213&height=300',
		'https://images.discordapp.net/attachments/273219844894359554/334883162117373962/451j71W.jpg?width=280&height=300',
		'https://images.discordapp.net/attachments/334534179268067338/335615383228776458/37d1ce59.jpg?width=400&height=225',
		'https://images-ext-1.discordapp.net/external/pSQR_Xl_NgpL981-vZBxe3oE362Zy_iSuhMZXrB0CwU/https/cdn.discordapp.com/attachments/235218122469146635/235219129995493377/e928d67928f9c0cafc5a2fc476f3a61b.jpg?width=177&height=251',
		'https://images-ext-1.discordapp.net/external/QOwbD0gpnwZzys19C4auHnIf3-6obdOtWzxYsyXQkg4/https/cdn.discordapp.com/attachments/235218122469146635/251116408547573760/e751777e23971c4a4132b70c6d4e8632.png?width=213&height=250',
		'https://images-ext-2.discordapp.net/external/C_cXEFCQEZKxidwiU42_Kr0ypQKOvs-2IEZh9nsSMQw/https/camo.githubusercontent.com/9889b97ceb46ee1310ff70d159f66477f48621bc/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830323737303537353336302e706e67',
		'https://camo.githubusercontent.com/37b83e0f005b8b5ba13cefad82153928eb6e5207/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830333439313836343537362e706e67',
		'https://images-ext-2.discordapp.net/external/Wx8N0RYNJX1LJ8yAMUxcxr7wQA9BO-j3qO4dIarFUb4/https/cdn.discordapp.com/attachments/235218122469146635/271328499837566976/rem.jpeg?width=186&height=250',
		'https://images-ext-2.discordapp.net/external/DIIk6i4iDYg8s6ambJEkjO-PLDrwuax7LjmbGDnZAiw/https/cdn.discordapp.com/attachments/333500092382314516/333775873658585088/cffccf79a4a3c743260d90cade83a483.jpg?width=184&height=250',
		'https://images-ext-1.discordapp.net/external/qUpkynseQ2375HMjLMWfRM6RHHRWXiYg2TNZoqVk5TQ/https/cdn.discordapp.com/attachments/333740780852084736/333782096583852043/re_zero_rem_by_berrycakeroll-dad959a.png?width=206&height=251',
		'https://images-ext-1.discordapp.net/external/_HElIn9Mw01SnSv6DRsbdFf_qPnbDlT0XaND49npaNM/https/cdn.discordapp.com/attachments/235218122469146635/314487701183397888/874db792-3d2a-495e-848a-449751ef03d5.jpg?width=188&height=251',
		'https://images-ext-1.discordapp.net/external/1fxJPMTQvHM73gZz12ud5C2dvz02c6CandzA1LWfBqc/https/cdn.discordapp.com/attachments/235218122469146635/237092503424204800/v0aMPDngydiTGHyFH8aCurXSHPuZKgyIJtGsvXNLTqs.png?width=206&height=250',
		'https://images-ext-1.discordapp.net/external/rQKZfBGy_dBf_HHH0Y9r2rdfEo_iGlj639WGKGReCH8/https/cdn.discordapp.com/attachments/235218122469146635/251113908851441664/d-Tubc2mw3lImA1pQ7yIkTxvKvWS4ng2MrZvyBpMG4U.png?width=180&height=250',
		'https://images-ext-2.discordapp.net/external/DJ-2lHK2u2qQ426cipqXO6r3PwOlyJxlneRhfgVYgD4/https/cdn.discordapp.com/attachments/333500092382314516/333779130489372672/re-zero-19-03-rem.jpg?width=400&height=225',
		'https://camo.githubusercontent.com/96fa5ff82f824fe2fd6cb6f2d026794aff39ed3d/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830333131383730323539332e706e67',
		'https://camo.githubusercontent.com/7b758b6979c5e18375bdcac9a97725a472a3625c/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3331323033363835323538323434393135322e706e67',
		'https://camo.githubusercontent.com/9889b97ceb46ee1310ff70d159f66477f48621bc/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830323737303537353336302e706e67'
		];
		var randpic = ~~((Math.random() * list.length) + 0)
		const embed = new Discord.RichEmbed()
		.setColor(8375551)
		.setImage(list[randpic]);
		message.channel.send({embed});
	} else if(message.content.startsWith(prefix + "sans")){
		var list = ['http://orig02.deviantart.net/a518/f/2016/210/3/c/sans_wink_by_vocaloidaddict44-dabsjhy.png',
		'http://vignette4.wikia.nocookie.net/deathbattlefanon/images/5/54/Sans_undertale_you_re_gonna_have_a_bad_time_by_pikminaaa-d9kg0tl.png/revision/latest?cb=20170219002207',
		'https://vignette4.wikia.nocookie.net/joke-battles/images/3/38/Sans_by_flintofmother3-d9dl8qh.png/revision/latest?cb=20160526065756',
		'http://img06.deviantart.net/0ccd/i/2016/179/1/e/let_s_draw_sans__speed_drawing_video__by_smudgeandfrank-da80s3t.png',
		'https://s-media-cache-ak0.pinimg.com/236x/31/25/d9/3125d97253c85b481201ee8ffece0d1d--headphones-cool-cats.jpg',
		'http://img09.deviantart.net/4049/i/2015/311/8/d/undertale_sans_by_i_am_bleu-d9fv9zi.jpg',
		'http://img08.deviantart.net/2d68/i/2016/175/7/2/undertale__sans_by_secretnarcissist-d9ia2hz.png',
		'https://s-media-cache-ak0.pinimg.com/736x/e2/87/1e/e2871eec56795f8e97d2c799f2d45cef--gaster-blaster-sans-brody.jpg',
		'http://img11.deviantart.net/d32b/i/2016/008/6/d/fang_sans_by_fasli-d9n904e.png',
		'http://orig02.deviantart.net/6372/f/2016/249/3/3/you_are_my_most_beautiful_dream___insomne_sans_by_neykstar-dags2q8.png',
		'http://pre11.deviantart.net/290c/th/pre/f/2016/033/b/a/sans_by_neykstar-d9q7dl8.png',
		'https://cdn.shopify.com/s/files/1/1258/7281/products/Sans_Sticker_large.png?v=1478406430',
		'http://img11.deviantart.net/1bfe/i/2016/244/b/0/attack_on_titantale_sans_by_joselyn565-dag5vej.png',
		'http://orig07.deviantart.net/b617/f/2015/342/c/b/sans_by_wiki234-d9jg4y8.png',
		'https://s-media-cache-ak0.pinimg.com/originals/15/76/dc/1576dc4805dc2971a99d69c09ff832d7.png',
		'https://vignette1.wikia.nocookie.net/undertale-au/images/c/cc/Underswap_sans_battle_sprite_by_moises87-da60qh7.png/revision/latest?cb=20161127212313',
		'http://s4.thingpic.com/images/nB/ykYcdAo7ptUUeNcGk8mcFbGi.png',
		'https://vignette2.wikia.nocookie.net/undertale/images/7/7f/SansArtwork.jpg/revision/latest?cb=20160310171514',
		'https://a.wattpad.com/cover/76557179-352-k23560.jpg',
		'http://orig07.deviantart.net/28a5/f/2016/020/c/5/sans_ational_by_elimate98-d9oq179.png',
		'https://img11.deviantart.net/581a/i/2015/278/f/b/sans_from_undertale__render_by_nibroc_rock-d9c1q5q.png',
		'https://vignette3.wikia.nocookie.net/undertale-au/images/4/41/Underlust_sans_by_neykstar-dae2aqi.png/revision/latest?cb=20161205180008',
		'http://orig04.deviantart.net/1eef/f/2016/129/1/b/underswap_sans___blueberry_by_neykstar-da1vr8r.png',
		'https://vignette2.wikia.nocookie.net/undertale/images/6/6a/Sans.jpg/revision/latest?cb=20160424104545&path-prefix=pl',
		'http://orig02.deviantart.net/b192/f/2016/001/8/e/sans_by_crowik-d9mduia.jpg',
		'https://s-media-cache-ak0.pinimg.com/originals/cd/54/84/cd5484c5f2d68ece5779e4d32516df4a.jpg',
		'https://d.wattpad.com/story_parts/189417248/images/141a762ae6a3f5b7.gif',
		'http://orig08.deviantart.net/9f2a/f/2016/005/f/f/sans_01_by_kuzukago-d9iajzh.png',
		'http://imgur.com/a/YCUeW'
		]
		var randpic = ~~((Math.random() * list.length) + 0)
		const embed = new Discord.RichEmbed()
		.setColor(15784782)
		.setImage(list[randpic])
		message.channel.send({embed})
	}
	if(message.content.startsWith(prefix + "duel")){
		if(args.length === 1){
			message.channel.send("Duel someone for fun =) `.duel [user]`")
		} else if(message.guild.member(message.mentions.users.first()) === null) { //if duels nobody (shut up alex)
			message.channel.send("Mention someone to duel them... you can't duel pixels on a computer screen...")
		} else if(((message.guild.member(message.mentions.users.first())).displayName)=== message.member.displayName){ //if duels itself
			message.channel.send('yea listen up kid... if you want to duel yourself i can just come in there and destroy you and your clone... now choose someone else kthx')
		}  else if((message.guild.member(message.mentions.users.first()).id) === '272780089488572428'){ //if duels shady
			message.channel.send("Let the duel between " + message.author + " and " + message.guild.member(message.mentions.users.first()) + " begin! " + message.guild.member(message.mentions.users.first()) + " will go first!")
			message.channel.send('**' + message.guild.member(message.mentions.users.first()).displayName + '** hugs **' + message.member.displayName + '** tighly :hugging::blush:')
			message.channel.send("After 1 round... **" + message.author + "** has been seduced by **" + message.guild.member(message.mentions.users.first()) + ", who wins with too much HP remaining... :heart:**")
		} else if((message.guild.member(message.mentions.users.first()).id) === '275334018214658060'){ //if duels me
			message.channel.send("Let the duel between " + message.author + " and " + message.guild.member(message.mentions.users.first()) + " begin! " + message.guild.member(message.mentions.users.first()) + " will go first!")
			message.channel.send('**' + message.guild.member(message.mentions.users.first()).displayName + '** fires a particle accelerator at **' + message.member.displayName + '** for infinity and beyond damage!')
			message.channel.send("After 1 round... **" + message.author + "** has been defeated by **<@275334018214658060>, who wins with 1 HP remaining! (cuz he's a human unlike you all)**")	
		} else if(message.author.id === '275334018214658060'){ //if i duel
			message.channel.send("Let the duel between " + message.author + " and " + message.guild.member(message.mentions.users.first()) + " begin! " + message.author + " will go first!")
			message.channel.send('**' + message.member.displayName + '** fires a particle accelerator at **' + message.guild.member(message.mentions.users.first()).displayName + '** for infinity and beyond damage!')
			message.channel.send("After 1 round... **" + message.guild.member(message.mentions.users.first()) + "** has been defeated by **<@275334018214658060>, who wins with 1 HP remaining! (cuz he's a human unlike you all)**")	
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
				.setImage('http://pm1.narvii.com/5949/392c549cd5a6700d724f12d9bfcd0ac5e3261814_hq.jpg')
				.addField(winner, chesses[id].pgn({newline_char: '\n'}), true)
				message.reply({embed})
			}	
			console.log('Chess game end: ', message.member.nickname, message.guild.name);
			delete chesses[id];
			delete stockfishes[id];
			delete thinking[id];
		}
        var id = message.author.id + '!?#' + message.guild.id;
		console.log(id);
		console.log(chesses[id]);
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
	} else if(message.content.startsWith(prefix + "calc")){
		var method = (args.join(" ").substring(5)).toString();
		var num1 = parseInt(args[1]);
		var num2;
		var ymbol;
		if(method.includes("+")){
			symbol = '+'
			num2 = parseInt(method.substr(method.indexOf(symbol) + 1));	
			var returns = num1 + num2;
		} else if(method.includes("-")){
			symbol = '-'
			num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
			var returns = num1 - num2;
		} else if(method.includes("/")){
			symbol = '/'
			num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
			var returns = num1 / num2;
		} else if(method.includes("*")){
			symbol = '*'
			num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
			var returns = num1 * num2;
		} else if(method.includes("^")){
			symbol = '^'
			num2 = parseInt(method.substr(method.indexOf(symbol) + 1));
			var returns = Math.pow(num1, num2);
		} else {
			return;
		}
		if(isNaN(num1) || isNaN(num2)){
			message.reply("2b or not 2b... that is the question...")
			return;
		}
		const embed = new Discord.RichEmbed()
		.setAuthor(message.member.displayName, message.author.displayAvatarURL)
		.setColor('#98ff98')
		.setTitle(':gear: Simple Calculation :gear: ')
		.addField('Expression: `' + num1 + '`' + symbol +  '`' + num2 + '`', 'Result: `' + returns + '`')
		message.channel.send({embed})
		message.reply
	} else if(message.content.startsWith(prefix + "whoisagoodgirl")){
		message.channel.send("**私ですね~ (=^3^=) にゃー、ごしゅじんさま〜 :cat:**")
	}
	//custom commands and responses shit
	if(message.content.includes("gtg")){
		message.channel.send(":wave: Bye, " + message.author + ", see you later! :raised_hands: ")
	}
	if(message.content.toLowerCase().includes("ravi") && message.guild.id === "333471257838485524"){
		message.channel.send("absolutely desipses anime")
	} 
	if(message.content === "?" && message.guild.id != '268057683804946437' && message.guild.id != "272473930520854529"){
		message.delete();
		message.reply('KYS')
	}
	if(message.content.includes("=_=") && message.author.id === '272473368840634378'){
		message.delete();
		message.reply("STOP IT")
	}
	let responseObject = {
		"ayy": "ayylmao",
		"wat": "say what?",
		"meme": "dank",
		"ded": "is it rly tho?",
		"...": "DOT DOT DOT",
		"ok": "ko",
		"cancer": "means crab in latin",
		"pr0 strats": "something you may never have... :thinking:",
		"fuck you" : "why you gotta be so rude...",
		"=_=" : '"**just stop it already...** you dont need to do that... are you doing that just to aggrivate me?"',
		"what" : "is going on",
		"aya" : "is the worst sister ever",
		"carcar" : "is the worst brother ever",
		"hi" : "KonCha (props if you know what that is lul)",
		"bye" : "sayo o/",
		"k" : "lmnopqrstuvwxyz",
		"stop" : "gooooooooooooooooooo",
		"let's go" : "lensko",
		"LET'S GO" : "LENSKO",
		":thinkerizing:" : ":thinking: **[deep breathing]** :thinking: ",
		"haHAA" : ":joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand:"
	};
	if(responseObject[message.content] && message.guild.id != '333814208334397444'){
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
