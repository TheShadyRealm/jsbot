exports.run = (client, message, args) => {
		var rnum = [];
		var r1 = parseInt(args[1]);
		var r2 = parseInt(args[2]);
		var r3 = parseInt(args[3]);
		if(args.length <= 3){
			message.channel.send({embed: {
				color: 15784782,
				title: 'RNG :hotsprings:',
				description: "Input a number between one and a million... Usage: `.rng min max # of numbers to generate`"
			}})
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
				message.channel.send({embed: {
					color: 15784782,
					title: 'RNG :hotsprings: ',
					description: "Input a number between one and a million... Usage: `.rng min max # of numbers to generate`"
				}})
			}
		}
	}
