function mts(s){
	return(s-(s%=60))/60+(9<s?':':':0')+s
}
exports.run = (client, message, args, stopwatchID, stopwatchDate, stopwatchTime, loc) => {
  var tosend;
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
      tosend = 'Start, stop, and keep track of your stopwatch... `.stopwatch (start/stop)` to start/end and `.stopwatch` to see how your stopwatch is doing... :watch:'
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
