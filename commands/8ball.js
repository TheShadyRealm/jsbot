exports.run = (client, message, args) => {
  var replies = ["Yes", "No", "Ask again later", "It is decidely so", "Maybe not...", "Concentrate and ask again", "Cannot predict now", "Very doubtful", "Hell no", "Frick yes", "Mayyyyyybe?", "TOTALLY dude (sarcasm intended)"]
  var result = Math.floor((Math.random()* replies.length) + 0);
  if(args.length === 1){
    message.channel.send("Ask the legendary 8-ball a question! `.8ball [question]`")
  } else {
  message.channel.send({embed: {
    color: 15784782,
    fields: [{
      name: ":question::question: Question :grey_question::grey_question:",
      value: (args.join(" ").substring(7))
      },
      {
      name: ":8ball: 8ball's response",
      value: replies[result]
    }]
  }})
  }
}
