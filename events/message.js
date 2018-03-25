const Discord = require('discord.js');
const config = require("./../config.json");
const prefix = ".";
const CaptainHook = new Discord.WebhookClient("412380738672132098", "HmVO63RFwzyz6AZ4ozHGy1kPqyB7TtFh-TSXg7pThvSIGbw9AIck9yY6Hkcrj6s7Pvqn");
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
var ans = {};
var mutedArr = [];
var stopwatchID = [];
var stopwatchDate = [];
var colorrole = [];
var async = require('asyncawait/async');
var await = require('asyncawait/await');
function strip(s) {
    return s.replace(/^\s+|\s+$/g, '');
}
function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
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
let HookPrefix = "~";
module.exports = (client, message) => {
	var commands = ['8ball', 'addrole', 'avatar', 'ban', 'botinfo', 'calc', 'cclist', 'choose', 'coinflip', 'colorrole', 'cookie', 'copypasta', 'count', 'daystillschool', 'define', 'duel', 'emilia', 'emoji', 'fitmn', 'flipuser', 'fml', 'gdl', 'google', 'guessnumber', 'guessnumberstart', 'happiness', 'help', 'hex', 'invite', 'joke', 'kick', 'kill', 'lc', 'mute', 'osub', 'osup', 'pin', 'ping', 'poll', 'purge', 'quote', 'rabg', 'react', 'regionaltype', 'rem', 'reverse', 'rng', 'roleinfo', 'roll', 'roti', 'rps', 'sagiri', 'sans', 'serverinfo', 'slot', 'space', 'stopwatch', 'test', 'translate', 'try', 'ud', 'unmute', 'uptime', 'userinfo', 'warn', 'weather'];

  if(message.author.bot) return;
	var loc = stopwatchID.indexOf(message.author.id);
	var stopwatchTime = (Date.now() - stopwatchDate[loc])/1000;
	var args = message.content.split(/[ ]+/);
	var itscommand = args[0].substr(1)
	var msg1 = strip(message.content);
	var randomN;
	var maxN;
	if(message.content.startsWith(prefix) && commands.includes(args[0].substr(1))){
	if(message.content.startsWith(prefix + 'guessnumberstart') | message.content.startsWith(prefix + 'guessnumber')){
		try {
			let commandFile = require(`./../commands/${itscommand}.js`);
			commandFile.run(client, message, args, userID, numID, guessNumID);
		} catch (err) {
			console.error(err);
		}
	} else if(message.content.startsWith(prefix + 'stopwatch')){
			 try {
 				 let commandFile = require(`./../commands/stopwatch.js`);
 				 commandFile.run(client, message, args, stopwatchID, stopwatchDate, stopwatchTime, loc);
 			 } catch (err) {
 				 console.error(err);
 			 }
	} else if(message.content.startsWith(prefix + 'mute') | message.content.startsWith(prefix + 'unmute')){
			 try {
 				 let commandFile = require(`./../commands/${itscommand}.js`);
 				 commandFile.run(client, message, args, mutedArr);
 			 } catch (err) {
 				 console.error(err);
 			 }
	} else if(message.content.startsWith(prefix + 'colorrole')){
			 try {
 				 let commandFile = require(`./../commands/${itscommand}.js`);
 				 commandFile.run(client, message, args, colorrole);
 			 } catch (err) {
 				 console.error(err);
 			 }
	} else {
			 try {
				 let commandFile = require(`./../commands/${itscommand}.js`);
				 commandFile.run(client, message, args);
			 } catch (err) {
				 console.error(err);
			 }
	 }
 }
if(msg1.indexOf(CHESS) === 0) {
	/*
	* original code: https://github.com/daniel-lawrence-lu/discord-woofbot
	* that original code was very broken and required some fixing... so i fixed it all and added a better GUI :3
	*/
	//so im too lazy to figure out how to put this in a command form and require it so i just left it in the original message loop lmao
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
    } else if(message.content.startsWith(prefix + "whoisagoodgirl")){
		message.channel.send("**私ですね~ (=^3^=) にゃー、ごしゅじんさま〜 :cat:**")
	}
	//custom commands and responses shit
  if(message.content === '^'){
    const embed = new Discord.RichEmbed()
    .setColor(15784782)
    .setImage('https://d30y9cdsu7xlg0.cloudfront.net/png/196766-200.png')
    message.channel.send({embed})
  }
  if(message.content.includes("discord.gg/")){
	  message.delete();
	  message.reply("shameless advertising smh just stop pls")
  }
  if((message.content.toString().replace(/[!?@#$%^&*()<>]/g, '')).length === 0 && message.author.id === "228732195114582016"){
	  message.delete();
  }
  if(message.content.toLowerCase().includes("value")){
	  message.channel.send("V A L U E");
  }
	if(message.content.includes("gtg")){
		message.channel.send(":wave: Bye, " + message.author + ", see you later! :raised_hands: ")
	}
	/*if(message.content.startsWith("?")){
    if(message.channel === "399051478314254347") return;
    (async (function(){
		  message.delete();
      message.channel.send({embed: {
        color: 13959168,
        author: {
          name: "!?",
          icon_url: "https://images-ext-2.discordapp.net/external/j54mKISgUCq97dPStacT36ceRFA0qjHbnT1xffzO1yU/https/i.imgur.com/SPeiFGu.png"
        },
        title: message.member.displayName + ", you have been timed out for an hour for the use of a question mark!",
        description: "Refrain from using them please, thanks =)"
      }})
      message.member.addRole(message.guild.roles.find('name', 'Bad Child'))
      await(sleep(60000))
      message.member.removeRole(message.guild.roles.find('name', 'Bad Child'))
    }))();
	}
  */
	/*if(message.content.includes("=_=") && message.author.id === '294489458554961930' || message.author.id === "294340347432009729" || message.author.id === "311574958511882240" || message.author.id === "351239539903430656" || message.author.id === '324085520940662784' || message.author.id === '382433952872267776' || message.author.id === '308486307665936387'){
		message.member.kick();
		message.channel.send(message.author.username + ", fuck off");
	}
	*/
  if(message.content.includes("🤔")){
    message.react("🤔")
  }
  if(message.content.startsWith(">>") && message.author.id === '275334018214658060'){
	  message.guild.channels.get('310224842735616020').send(args.join(' ').substring(2));
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
		"haHAA" : ":joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand: :joy: :ok_hand:",
    "wait" : "waiting... :hourglass:",
	};
	if(responseObject[message.content] && message.guild.id != '333814208334397444'){
		message.channel.send(responseObject[message.content]);
	}
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
		'shutup',
		'trash',
    'give',
    'retart',
    'afraid',
    'detect'
		];
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
	'https://cdn.discordapp.com/attachments/310290782097637398/342327793855758337/Screenshot_2017-08-02_at_11.27.07_AM.png',
	'https://cdn.discordapp.com/attachments/275334819737501696/320017022308057090/realtrash.png',
  'https://cdn.discordapp.com/attachments/146404426746167296/323686669754564609/give_account.png',
  'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/5/5/0/PA0611_Fruit-Tart_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539261816.jpeg',
  'https://vignette3.wikia.nocookie.net/chuckecheese/images/9/9b/Resized_creepy-willy-wonka-meme-generator-oh-my-i-m-so-afraid-20912a.jpg/revision/latest?cb=20150118004327',
  'https://cdn.discordapp.com/attachments/299763571955335178/350463983372730368/detectroom502.png'
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
	'ladies ladies ur both pretty now shut up pls kthxbye',
	'what is this TRASH :/',
  'some next level carrying',
  "Son look, it's a retart!",
  'look at all these threats...',
  'I traipsed into the classroom... ROFL'
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
};
