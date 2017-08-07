exports.run = (client, message, args) => {
  var slotarray = [':watermelon:',':bell:',':seven:',':lemon:',':cherries:',':grapes:',':gem:']
  var symbolslot = [];
  var z = [];
  var name = 'You lose... :disappointed_relieved:'
  var value = 'RIP! Better luck next time...'
  for(var i = 0; i < 9; i++){
    var x = ~~((Math.random()* 6) + 0)
    z.push(x)
    symbolslot.push(slotarray[x])
  }
  console.log(z, symbolslot)
  if(z[3] === z[4] && z[4] === z[5] || z[0] === z[1] && z[1] === z[2] || z[6] === z[7] && z[7] === z[8] || z[0] === z[4] && z[4] === z[8] || z[2] === z[4] && z[4] === z[6]){
    name = 'You win!'
    value = 'Congrats! :money_mouth: :dollar: :money_mouth: '
  }
  message.channel.send({embed: {
    color: 15784782,
    author: {
      name: message.member.displayName,
      icon_url: message.author.displayAvatarURL
    },
    title: 'Slot Machine :round_pushpin:',
    description: '*Wins by any diagonals or horizontal lines*\n\n--'  + symbolslot[0] + symbolslot[1] + symbolslot[2] + ' --\n**> **' + symbolslot[3] + symbolslot[4] + symbolslot[5] + '** <**\n--' + symbolslot[6] + symbolslot[7] + symbolslot[8] + ' --',
    fields: [{
      name: name,
      value: value
    }]
  }})
}
