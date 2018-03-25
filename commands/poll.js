var testIf = false;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
exports.run = (client, message, args) => {
  var k;
  var reason = args.join(' ').match(/"(.*?)"/g)
  if(reason === null){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Poll error! :x:',
      description: 'Specify a valid reason!'
    }})
    return;
  }
  if(testIf === true){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Poll error! :x:',
      description: 'Only one poll can be running at a time!'
    }})
    return;
  }
  testIf = true;
  if(args.length === 1){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Make polls! :pencil2:',
      description: 'Create a poll that members of the servers can react to :smile: `.poll [option1;option2;etc] (time ~if not specified defaults to 1 minute)`'
    }})
  }
  var reactions = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣'];
  var pollreactions = [];
  var pollentries = [];
  var u = (args.join(' ').substring(6)).replace(/"(.*?)"/g, '').substr(1, ((args.join(' ').substring(6)).replace(/"(.*?)"/g, '').length) - ((args[args.length-1].length)+1))
  console.log(u)
  var poll = u.split(/[;\t]+/);
  console.log(poll)
  if(!args[args.length-1]){
    time = 6000;
  } else {
    time = parseInt(args[args.length-1])
  }
  if(time > 300){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Poll error! :x:',
      description: 'Keep the poll time under 5 minutes...'
    }})
    testIf = false;
    return;
  } else if(time < 5){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Poll error! :x:',
      description: 'Keep the poll time above 5 seconds...'
    }})
    testIf = false;
    return;
  }
  if(poll.length > 9){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Poll error! :x:',
      description: 'Too many poll items... keep it under 9 items...'
    }})
    testIf = false;
    return;
  }
  for(var i = 0; i < poll.length; i++){
    pollreactions.push(reactions[i])
    pollentries.push((i+1).toString() + '. ' + poll[i])
  }
  (async (function() {
  message.channel.send({embed: {
    color: 15784782,
    title: 'Poll started! :ballot_box: \n' + reason,
    description: pollentries.join('\n') + '\nPick your option by clicking on the matching reaction number below! :smiley:\n' + '*Poll will end in ' + time + ' seconds*'
  }});
  console.log(time*1000)
  var messagetosend = message.channel.fetchMessages({limit: 1}).then(function(messages){
    return k = messages.map(m=>m.id)
  })
  await(sleep(500))
  console.log(k)
  await(sleep(time*1000))
  message.channel.fetchMessage(k).then(function(messages){
    return p = messages.reactions
  })
  await(sleep(500))
  var pollresults = p.map(m=>m.count);
  var messagepollreactions = [];
  for(var j = 0; j < pollreactions.length; j++){
    messagepollreactions.push((j+1) + ' - ' + poll[j] + ' **(' + pollresults[j]-1 + ' votes)**')
  }
  message.channel.send({embed: {
    color: 15784782,
    title: 'Poll ended! :ballot_box_with_check:',
    description: messagepollreactions.join('\n')
  }});
  testIf = false;
  }))();
  (async (function thissucks() {
    var kms = message.channel.fetchMessages({limit: 1})
    for(var kys = 0; kys < pollreactions.length; kys++){
      kms.then(gey =>
      gey.last().react(pollreactions[kys]))
      await(sleep(850));
    }
  }))();
}
