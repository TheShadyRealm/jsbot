exports.run = (client, message, args) => {
  var roleList = ["Cuddling", "Natural Selection"];
  if(message.author.id != '272780089488572428') return;
  if(args.length === 1){
    var string = "";
    for(var i = 0; i < roleList.length; ++i){
      string += roleList[i] + "\n";
    }
    message.channel.send({embed: {
      color: 15784782,
      title: "Current available self-add roles are: ",
      description: string
    }})
    return;
  } else {
    if(roleList.toString().includes(args[1])){
      message.member.addRole(message.guild.roles.find('name', args[1]));
      message.channel.send({embed: {
        color: 7798531,
        author: {
          name: "Success!",
          icon_url: "https://images-ext-1.discordapp.net/external/cU8b5WEWePPXxYQOJh5WW15MeZC58yr8yx8JfwB9Ais/https/i.imgur.com/R8g3toc.png"
        },
        title: "You have been given the role: **" + args[1] + "**"
      }})
    } else {
      message.channel.send({embed: {
        color: 13959168,
        author: {
          name: "Error!",
          icon_url: "https://images-ext-2.discordapp.net/external/j54mKISgUCq97dPStacT36ceRFA0qjHbnT1xffzO1yU/https/i.imgur.com/SPeiFGu.png"
        },
        title: "The role you have entered is not found in the list of roles!"
      }})
      return;
    }
  }
}
