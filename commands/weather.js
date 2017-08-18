var yw = require('weather-yahoo');
var Forecast = require('forecast');
const config = require("./../config.json");
const Discord = require('discord.js');
var forecast = new Forecast({
  service: 'darksky',
  key: config.apikey,
  units: 'fahrenheit',
  cache: true,
  ttl: {
    minutes: 27,
    seconds: 45
  }
});
function convert(t){
  var orig = new Date(t * 1000);
  var hour = orig.getHours();
  var min = orig.getMinutes();
  var sec = orig.getSeconds();
  return hour + (9<min?':':':0') + min + (9<sec?':':':0') + sec;
}
exports.run = (client, message, args) => {
  var zip = (args.join(" ").substring(8));
  yw.getSimpleWeather(zip).then(function(res){
  ans=res;
  var emoji;
  forecast.get([res.location.lat + ',' + res.location.long], true, function(err, weather) {
    if(err) return console.dir(err);
    var o = JSON.stringify(weather);
    var sunriseSun = o.substr(o.indexOf('sunriseTime')+13);
    var sunriseCount = sunriseSun.indexOf(",");
    var sunrise = convert(sunriseSun.substr(0, sunriseCount));
    var sunsetSun = o.substr(o.indexOf('sunsetTime')+12);
    var sunsetCount = sunsetSun.indexOf(",");
    var sunset = convert(sunsetSun.substr(0, sunsetCount));
    if(res.weather.condition === 'Sunny'){
      emoji = ":sunny:"
    } else if(res.weather.condition === 'Cloudy'){
      emoji = ":cloud:"
    } else if(res.weather.condition === 'Mostly Sunny'){
      emoji = ":white_sun_cloud:"
    } else if(res.weather.condition === 'Partly Cloudy'){
      emoji = ":partly_sunny:"
    } else if(res.weather.condition === 'Mostly Clear'){
      emoji = ":large_blue_circle:"
    } else if(res.weather.condition === 'Mostly Cloudy'){
      emoji = ":cloud::cloud:"
    } else if(res.weather.condition === 'Scattered Showers'){
      emoji = ":cloud_rain:"
    } else if(res.weather.condition === 'Thunderstorms'){
      emoji = ":thunder_cloud_rain:"
    } else if(res.weather.condition === 'Clear'){
      emoji = ':white_circle:'
    }
    const embed = new Discord.RichEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setColor('#F0DB4E')
    .setTitle('Weather and other info for `' + zip + '`')
    .addField(emoji + ' ' + res.weather.condition + ' ' + weather.currently.temperature + '°F', ':arrow_up: High: ' + res.forecast[0].high + '°F \n:arrow_down: Low: ' + res.forecast[0].low + '°F\n:dash: Feels Like: ' + weather.currently.apparentTemperature + '°F\n:thermometer: Humidity: ' + weather.currently.humidity.toString().replace(/[\d]+[.]/g, '') + '%\n:droplet: Chance of Precipitation: ' + weather.currently.precipProbability + '%\n:sunrise_over_mountains: Sunrise: ' + sunrise + ' PST\n:city_sunset: Sunset: ' + sunset + ' PST\n:straight_ruler: Coordinates: [' + res.location.lat + ', ' + res.location.long + ']')
    .setFooter('Provided by darksky and YAHOO WEATHER', 'https://canoe-camping.com/wp-content/uploads/2016/06/weather-ying-and-yang.jpg')
    .setTimestamp()
    message.channel.send({embed})
    });
  });
return;
}
