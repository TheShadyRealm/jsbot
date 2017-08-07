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
  var t = JSON.stringify(res)
  var high = t.substr(t.indexOf('"day"') + 20, 2);
  var low = t.substr(t.indexOf('"day"') + 31, 2);
  var descDesc = t.substr(t.indexOf('condition') + 12);
  var sub = descDesc.indexOf('"}')
  var desc = descDesc.substr(0, sub);
  var emoji;
  var latString = (t.substr(t.indexOf('lat')+6));
  var findLat = latString.indexOf("long")-3;
  var lat = latString.substr(0, findLat);
  var longString = (t.substr(t.indexOf('long')+7));
  var findLong = longString.indexOf("}")-1;
  var lonG = longString.substr(0, findLong);
  forecast.get([lat + ',' + lonG], true, function(err, weather) {
    if(err) return console.dir(err);
    var o = JSON.stringify(weather);
    var temp = parseInt(o.substr(o.indexOf('temperature')+13, 5));
    var feelslike = Math.round(o.substr(o.indexOf('apparentTemperature')+21, 5));
    var humidityH = o.substr(o.indexOf('humidity')+12);
    var humidityCount = humidityH.indexOf(',');
    var humidity = humidityH.substr(0, humidityCount)
    var precipProb = o.substr(o.indexOf('precipProbability')+19);
    var precipCount = (precipProb.indexOf(',"'));
    var precip = precipProb.substr(0, precipCount);
    var sunriseSun = o.substr(o.indexOf('sunriseTime')+13);
    var sunriseCount = sunriseSun.indexOf(",");
    var sunrise = convert(sunriseSun.substr(0, sunriseCount));
    var sunsetSun = o.substr(o.indexOf('sunsetTime')+12);
    var sunsetCount = sunsetSun.indexOf(",");
    var sunset = convert(sunsetSun.substr(0, sunsetCount));
    if(desc === 'Sunny'){
      emoji = ":sunny:"
    } else if(desc === 'Cloudy'){
      emoji = ":cloud:"
    } else if(desc === 'Mostly Sunny'){
      emoji = ":white_sun_cloud:"
    } else if(desc === 'Partly Cloudy'){
      emoji = ":partly_sunny:"
    } else if(desc === 'Mostly Clear'){
      emoji = ":large_blue_circle:"
    } else if(desc === 'Mostly Cloudy'){
      emoji = ":cloud::cloud:"
    } else if(desc === 'Scattered Showers'){
      emoji = ":cloud_rain:"
    } else if(desc === 'Thunderstorms'){
      emoji = ":thunder_cloud_rain:"
    } else if(desc === 'Clear'){
      emoji = ':white_circle:'
    }
    const embed = new Discord.RichEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    .setColor('#F0DB4E')
    .setTitle('Weather and other info for `' + zip + '`')
    .addField(emoji + ' ' + desc + ' ' + temp + '°F', ':arrow_up: High: ' + high + '°F \n:arrow_down: Low: ' + low + '°F\n:dash: Feels Like: ' + feelslike + '°F\n:thermometer: Humidity: ' + humidity + '%\n:droplet: Chance of Precipitation: ' + precip + '%\n:sunrise_over_mountains: Sunrise: ' + sunrise + ' PST\n:city_sunset: Sunset: ' + sunset + ' PST\n:straight_ruler: Coordinates: [' + lat + ', ' + lonG + ']')
    .setFooter('Provided by darksky and YAHOO WEATHER', 'https://canoe-camping.com/wp-content/uploads/2016/06/weather-ying-and-yang.jpg')
    .setTimestamp()
    message.channel.send({embed})
    });
  });
return;
}
