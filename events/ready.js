module.exports = (client, user) => {
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.user.setStatus("idle");
  client.user.setGame("AP Calc BC");
  client.user.setUsername('✿Rem✿');
  console.log(client.user.localPresence.game.name)
  console.log(client.guilds.map(m=>m.name).join(', '))
};
