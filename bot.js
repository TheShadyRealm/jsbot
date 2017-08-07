//invite: https://discordapp.com/oauth2/authorize?client_id=324427383849353219&scope=bot&permissions=2146958591
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const music = require('discord.js-music-v11');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const PersistentCollection = require("djs-collection-persistent");
music(client, {
	prefix: '.',        // Prefix of '-'.
	global: false,      // Server-specific queues.
	maxQueueSize: 10,   // Maximum queue size of 10.
	clearInvoker: false, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
});
(async (function init() {
	const evtFiles = await(readdir("./events/"));
	 console.log(`Loading a total of ${evtFiles.length} events.`);
	 evtFiles.forEach(file => {
		 const eventName = file.split(".")[0];
		 const event = require(`./events/${file}`);
		 // This line is awesome by the way. Just sayin'.
		 client.on(eventName, event.bind(null, client));
		 delete require.cache[require.resolve(`./events/${file}`)];
	 });
}))();
/*
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
*/
client.login(config.token);﻿
