function toLetters(x){
	return x.replace(/[^A-Za-z0-9]/g, '');
}
exports.run = (client, message, args) => {
  var regional = [];
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
