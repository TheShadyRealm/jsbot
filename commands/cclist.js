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
	];
exports.run = (client, message, args) => {
		message.channel.send({embed: {
			color: 15784782,
			title: ':newspaper: List of custom (useless af) commands:',
			description: customtriggerlist.join(', ')
		}})
	}
