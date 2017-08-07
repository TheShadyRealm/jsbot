exports.run = (client, message, args) => {
  var countDownDate = new Date("Aug 14, 2017 08:10:00").getTime();
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const current = ('Time until school starts again... :cry:: **' + days + "d " + hours + "h " + minutes + "m " + seconds + "s**").toString();
  message.channel.send({embed: {
    color: 15784782,
    title: 'School... :school:',
    description: current
  }})
  if (distance < 0) {
    clearInterval(x);
    message.channel.send("wb to school :)")
  }
}
