exports.run = (client, message, args) => {
  var rand = ~~(Math.floor(Math.random() * 3) + 1)
  var emojiBot;
  var emojiUser;
  if(rand === 1){
    rand = 'rock'
  } else if(rand === 2){
    rand = 'paper'
  } else if(rand === 3){
    rand = 'scissors'
  }
  console.log('user: ' + args[1], 'bot: ' + rand)
  if(args.length === 1 || args.length >= 3){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Rock, Paper, Scissors! :video_game:',
      description: '`.rps [rock, paper, or scissors]`' + "make sure you're choosing one option only..."
    }})
    return;
  }
    if(!args[1].includes("rock") && !args[1].includes("paper") && !args[1].includes("scissors")){
      message.channel.send({embed: {
        color: 15784782,
        title: 'Rock, Paper, Scissors! :video_game:',
        description: '`.rps [rock, paper, or scissors]` welcome to the game that relies on 100% rng and no skill at all!`'
      }})
      return;
    } else {
      var tosend;
      //this is probably the most inefficient way to do rock paper scissors but whatever LMAO
      if(args[1] === 'rock' && rand === 'rock' || args[1] === 'paper' && rand === 'paper' || args[1] === 'scissors' && rand === 'scissors'){
          tosend = "It's a tie! :open_mouth:"
      } else if(args[1] === 'rock'){
        if(rand === 'paper'){
          tosend = 'You lose... :disappointed_relieved:'
        } else if(rand === 'scissors'){
          tosend = 'You win! :grinning:'
        }
      } else if(args[1] === 'paper'){
        if(rand === 'scissors'){
          tosend = 'You lose... :disappointed_relieved:'
        } else if(rand === 'rock'){
          tosend = 'You win! :grinning:'
        }
      } else if(args[1] === 'scissors'){
        if(rand === 'rock'){
          tosend = 'You lose... :disappointed_relieved:'
        } else if(rand === 'paper'){
          tosend = 'You win! :grinning:'
        }
      }
    }
    if(args[1] === 'rock'){
      emojiUser = ':diamond_shape_with_a_dot_inside:'
    } else if(args[1] === 'paper'){
      emojiUser = ':scroll:'
    } else if(args[1] === 'scissors'){
      emojiUser = ':scissors:'
    }
    if(rand === 'rock'){
      emojiBot = ':diamond_shape_with_a_dot_inside:'
    } else if(rand === 'paper'){
      emojiBot = ':scroll:'
    } else if(rand === 'scissors'){
      emojiBot = ':scissors:'
    }
    message.channel.send({embed: {
      color: 15784782,
      title: 'Rock, Paper, Scissors! :video_game:',
      description: ' Your choice: ' + args[1] + ' ' + emojiUser + "\nBot's choice: " + rand + ' ' + emojiBot + '\n**' + tosend + '**'
    }})
}
