exports.run = (client, message, args) => {
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
}
