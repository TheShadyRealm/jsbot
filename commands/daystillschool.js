exports.run = (client, message, args) => {
  var countDownDate = new Date("June 1, 2018 11:45:00").getTime();
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const current = ('Time until school ends... :smiley:: **' + days + "d " + hours + "h " + minutes + "m " + seconds + "s**").toString();
  message.channel.send({embed: {
    color: 15784782,
    title: 'School... :school:',
    description: current
  }})
}
