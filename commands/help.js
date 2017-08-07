exports.run = (client, message, args) => {
  message.author.send("Commands List:\n **Global Prefix: .**\n __Mod commands__ \n **help** - shows this message \n **botinfo** - info about the bot... \n **ping** - pings server and returns with ms \n **uptime** - shows bot uptime \n **warn [user] (reason)** - warns a user for being a meme \n **purge [# of msgs]** - clears the last x messages \n **kick/ban [user]** - kicks/bans the user mentioned \n **mute/unmute [user]** - mutes and unmutes a user \n **repeat [text]** - repeats stuff \n __For Fun Commands__ \n **8ball [question]** - 8-ball? \n **add/deltrash [text]** - add trashy triggers \n **roll (amt of dice)** - roll dice \n **kill [user]** - become a serial killer =) \n **count [min, max] (count by)** - count from min to max \n **rng [min, max, amt of numbers]** - pick x numbers between min and max \n **happiness [user]** - tell a user to stop being salty :) \n **cclist** - lists all custom commands \n **rem/emilia** - ゼロから始める異世界生活 :heart: \n **sans** - \"It's a beautiful day outside... birds are singing... flowers are blooming... on days like these kids like you... should be burning in HELL :fire:\n **duel [user]** - duel a user (this is totally rng btw) \n **playchess [move in algebraic notation]** - play the bot in a game of chess... but you'll lose...\n **guessnumberstart [easy, medium, hard, expert]/guessnumber [number]** - guessnumberstart to start a game of guess the number and guessnumber to guess the number :eyes:\n **weather [zip code]** - WIP but it shows a bunch of stuff with the weather\n **calc [expression]** - simple calculator `x (+, -, /, *, ^ for now) y` \n **lovecalc/lc [user 1] [user 2]** - calculate love chances between 2 users... :kissing_heart:\n **stopwatch (start/stop)** - start/stop/check on your stopwatch :watch: \n **copypasta [name]/copypasta list** - in case you're in need of a quick chat filler... :wink: \n **regionaltype [text A-Z or 0-9]** - turns text into regional emots :b:")
  message.author.send(" ** whoisagoodgirl** - this bot is a GIRL \n **react [text]** - reacts to the previous message with text (NEW! - NOW SUPPORTS (some) DOUBLE LETTERS) \n **space [text]** - annoy people \n **coinflip** - flip a coin and you get a second to call it while it's in midair \n **reverse [text]** - reverses text \n **choose [option1;option2;etc]** - chooses from inputted options \n **slot** - Pull the lever on the slot machine :seven:\n **translate [langauge 1] [language 2] [text]** - translate some TEXT :accept: \n **flipuser [user]** - flip a user (and their name if permissions) upside-down :upside_down:\n **ud [term]** searches urban dictionary for the term \n **serverinfo/userinfo [user]** - shows info about the user/server \n **define [word]** - WIP definitions \n **osub [beatmap link]** - looks up basic info about the beatmap \n **joke** - don't expect all of them to be funny :laughing:\n **hex [hex code]** - shows info about the hex color (the embed color will be the hex color) \n__Code for this bot can be found here: https://github.com/TheShadyRealm/jsbot :smile: (holy crap jsbot is in javascript??? :scream:)__ \n **Invite link (highly not recommended):** :smiley: http://bit.ly/JSBot")
  message.channel.send({embed: {
    color: 15784782,
    description: '<@' + message.author.id + '>, a list of commands and stuff has been sent to your DMs :smiley:'
  }})
}
