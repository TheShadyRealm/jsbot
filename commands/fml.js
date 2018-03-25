const fml = require("fmylife");
exports.run = (client, message, args) => {
  if(args.length != 1) return;
  fml.random().then(function(fml){
    message.channel.send({embed: {
      color: 15784782,
      title: ':neutral_face::gun: FML',
      description: fml + ":facepalm:"
    }})
  });
}
