module.exports = (client, oldUser, newUser) => {
  var tosend;
  var channeltosend = '324667410605015041';
  var guilduser = oldUser.guild.member(oldUser);
  if(oldUser.avatarURL != newUser.avatarURL){
    tosend = oldUser.username + " has changed their avatar from: " + oldUser.avatarURL + " to: " + newUser.avatarURL;
  } else if(oldUser.username != newUser.username){
    tosend = newUser.username + " has changed their username from: " + oldUser.username + " to: " + newUser.username;
  } else if(oldUser.discriminator != newUser.discriminator){
    tosend = newUser.username + " has changed their discriminator from: " + oldUser.discriminator + " to: " + newUser.discriminator;
  } else if(oldUser.presence.equals(newUser.presence)){
    tosend = newUser.username + " went from being: " + oldUser.presence.status + " to: " + newUser.presence.status;
  } if(oldUser.presence.game != newUser.presence.game){
    tosend = newUser.username + " is now playing: " + oldUser.presence.game.name + " to: " + newUser.presence.game.name;
  }
  guilduser.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User Updated:',
		description: tosend,
		timestamp: new Date()
	}});
};
