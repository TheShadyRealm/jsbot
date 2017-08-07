exports.run = (client, message, args) => {
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
     message.channel.send({embed: {
       color: 15784782,
       title: 'Roll some dice... :game_die:',
       description: "1-100 dice... stop trying to exploit the system :nerd:"
     }})
   }
 }
