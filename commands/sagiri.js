const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var list = ['https://cdn.discordapp.com/attachments/273219844894359554/347523354770538508/7f644dcc43ec59d58bdd70de6cac9c39.jpg',
    'https://cdn.discordapp.com/attachments/273219844894359554/347523069109075978/ftJPBfz.png',
    'https://cdn.discordapp.com/attachments/273219844894359554/347522896333242381/images.jpg',
    'https://cdn.discordapp.com/attachments/273219844894359554/347522534591430656/u5H5dH9.png',
    'https://cdn.discordapp.com/attachments/273219844894359554/347522412570738708/ziNQjvw.png',
    'https://cdn.discordapp.com/attachments/273219844894359554/347522341976277002/Izumi.Sagiri.full.2089919.jpg',
    'https://cdn.discordapp.com/attachments/273219844894359554/347521950228152320/Izumi.Sagiri.full.2090411.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/19/c4/f1/19c4f10126f477e2fcdea72cf96b390d.jpg',
    'https://img10.deviantart.net/6961/i/2017/123/a/3/sagiri_izumi_by_nezhiel-db801vs.png',
    'https://t14.deviantart.net/Xz1aF__gSi6eWR7cG5Lc9NcOevA=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre03/1e7e/th/pre/f/2017/103/8/d/sagiri_izumi_v2___eromanga_sensei_minimalist_anime_by_lucifer012-db5nc36.png',
    'https://s-media-cache-ak0.pinimg.com/originals/61/a4/05/61a40514b484e02220861c1b0ff07662.jpg',
    'https://orig03.deviantart.net/b20f/f/2017/135/8/a/_render12_sagiri_in_yukata_by_gecore-db9ares.png',
    'https://orig15.deviantart.net/2e96/f/2017/116/c/f/_render__izumi_sagiri_by_leon_wenger-db76d38.png',
    'https://steamuserimages-a.akamaihd.net/ugc/840330487437578907/AAC7522612508AC12BB8EAC77B16B7F3A9A9C62E/?interpolation=lanczos-none&output-format=jpeg&output-quality=95&fit=inside|637:358&composite-to%3D%2A%2C%2A%7C637%3A358&background-color=black',
    'https://t02.deviantart.net/-F_0DE0-C5CGe84pidGiFJoFBcE=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre14/27a4/th/pre/i/2017/103/f/5/izumi_sagiri_v2_eromanga_sensei_minimalist_by_fikrimochizou-db5pv7b.png',
    'https://s-media-cache-ak0.pinimg.com/originals/d7/ad/de/d7adde3dc4828074e099b75e2ab06b19.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/04/2d/cb/042dcb2cbdc38da78d597daf602d4783.jpg',
    'http://static.zerochan.net/Izumi.Sagiri.full.2088853.jpg',
    'https://t15.deviantart.net/oNVI2KLO0XUSru_uW3_Wpl_TxJ0=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre14/3400/th/pre/f/2017/120/d/6/wip_2_by_fhilippe124-db7q4hs.png',
    'https://pre14.deviantart.net/85ea/th/pre/f/2017/123/f/d/sagiri_izumi_by_yii_shii-db81b3v.jpg',
    'https://img05.deviantart.net/3d2f/i/2017/128/8/d/sagiri_izumi_by_kukuro_kun-db8k4dn.png',
    'https://s-media-cache-ak0.pinimg.com/originals/68/10/27/6810277ce02ffc7fda180c2717bc11f3.jpg',
    'https://img01.deviantart.net/10e8/i/2017/041/f/8/izumi_sagiri_eromanga_sensei_minimalist_by_fikrimochizou-daylcem.png'
  ];
  var randpic = ~~((Math.random() * list.length) + 0)
  const embed = new Discord.RichEmbed()
  .setColor(8375551)
  .setImage(list[randpic]);
  message.channel.send({embed});
}
