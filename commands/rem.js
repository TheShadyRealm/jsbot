const Discord = require('discord.js');
exports.run = (client, message, args) => {
  var list = ['https://vignette1.wikia.nocookie.net/rezero/images/0/02/Rem_Anime.png/revision/latest?cb=20160730213532',
  'https://images6.alphacoders.com/710/710132.png',
  'http://i.imgur.com/sGwXxVx.jpg',
  'http://www.wallpapermaiden.com/wallpaper/1453/download/1920x1080/rem-sad-face-re-zero-kara-hajimeru-isekai-seikatsu.png',
  'https://images6.alphacoders.com/713/713819.jpg',
  'http://i.imgur.com/451j71W.jpg',
  'https://images5.alphacoders.com/700/thumb-1920-700733.png',
  'https://images3.alphacoders.com/734/thumb-1920-734139.png',
  'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2029741.jpg',
  'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2010867.jpg',
  'http://orig02.deviantart.net/0b36/f/2016/149/c/b/tumblr_o6fxqn1obs1u0xk60o1_1280_by_sakamileo-da47099.png',
  'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2035148.jpg',
  'http://blog.honeyfeed.fm/wp-content/uploads/2016/12/Rem-Re-Zero-kara-Hajimeru-Isekai-Seikatsu-wallpaper.jpg',
  'https://i0.wp.com/thehypedgeek.com/wp-content/uploads/2017/04/rem-re-zero.jpg?fit=1200%2C675',
  'https://images7.alphacoders.com/697/thumb-1920-697788.png',
  'https://s-media-cache-ak0.pinimg.com/originals/c2/bc/47/c2bc477254140f6997189faf600fbfb6.jpg',
  'https://images8.alphacoders.com/717/thumb-1920-717378.png',
  'http://img1.ak.crunchyroll.com/i/spire1/8867d2bb754124748129715a8456c7c41474246363_full.jpg',
  'http://static.zerochan.net/Rem.%28Re%3AZero%29.full.2004344.jpg',
  'http://i.imgur.com/OBic1GH.png',
  'https://t1.rbxcdn.com/b6d34ba1996e0d28077732a83bb8472c',
  'https://images-ext-1.discordapp.net/external/62irxlzwn07MzOKdKoUFSwRB5RbTzNOK3oS0pDkdQKc/https/cdn.discordapp.com/attachments/333500092382314516/333777091352854530/701236_1.jpg?width=250&height=250',
  'https://images3.alphacoders.com/718/thumb-1920-718522.png',
  'http://www.005.tv/uploads/allimg/161102/13-1611021Q924b8.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/3a/8a/12/3a8a1220b7240d766b84d07a1fc67b78.jpg',
  'https://images2.alphacoders.com/711/thumb-350-711907.png',
  'https://images2.alphacoders.com/728/thumb-350-728112.png',
  'https://images7.alphacoders.com/700/thumb-350-700047.jpg',
  'http://wallpapercave.com/wp/wp1860747.png',
  'https://images3.alphacoders.com/728/thumb-350-728202.jpg',
  'http://wallpapercave.com/wp/wp1860738.png',
  'https://qph.ec.quoracdn.net/main-qimg-f57f05966fe66349636f615996195494.webp',
  'http://livedoor.blogimg.jp/shachiani/imgs/8/f/8fa01ea6-s.jpg',
  'https://wallpaperscraft.com/image/rem_re_zero_girl_anime_112238_2560x1024.jpg',
  'http://i0.kym-cdn.com/photos/images/original/001/153/038/325.png',
  'https://wallpaperscraft.com/image/re_zero_rem_anime_girl_art_112246_3840x2160.jpg',
  'http://img15.deviantart.net/a6c5/i/2016/183/f/1/re_zero_rem_and_ram_by_edge_mokku-da8glfe.png',
  'https://images4.alphacoders.com/724/thumb-1920-724619.png',
  'https://s-media-cache-ak0.pinimg.com/236x/a0/8d/7f/a08d7f3ba972b9bf8beb56ce25b2e798.jpg',
  'https://images.discordapp.net/attachments/273219844894359554/335591269810044939/b9a0c86b9ebb8c72f890a3c958f12907.png?width=236&height=300',
  'https://images.discordapp.net/attachments/146404426746167296/335589791531794433/231fb89e7f32d3c011ef9539c07eeb16.jpg?width=226&height=301',
  'https://images.discordapp.net/attachments/146404426746167296/335589623893983253/9HmseU9.jpg?width=367&height=301',
  'https://images.discordapp.net/attachments/273219844894359554/334893983228755968/tam5.jpg?width=213&height=300',
  'https://images.discordapp.net/attachments/273219844894359554/334893089519042560/645359f869541b6679c2a0c51f2ffe8adf88b92ee4b2c-mFvTsK.jpg?width=213&height=300',
  'https://images.discordapp.net/attachments/273219844894359554/334883162117373962/451j71W.jpg?width=280&height=300',
  'https://images.discordapp.net/attachments/334534179268067338/335615383228776458/37d1ce59.jpg?width=400&height=225',
  'https://images-ext-1.discordapp.net/external/pSQR_Xl_NgpL981-vZBxe3oE362Zy_iSuhMZXrB0CwU/https/cdn.discordapp.com/attachments/235218122469146635/235219129995493377/e928d67928f9c0cafc5a2fc476f3a61b.jpg?width=177&height=251',
  'https://images-ext-1.discordapp.net/external/QOwbD0gpnwZzys19C4auHnIf3-6obdOtWzxYsyXQkg4/https/cdn.discordapp.com/attachments/235218122469146635/251116408547573760/e751777e23971c4a4132b70c6d4e8632.png?width=213&height=250',
  'https://images-ext-2.discordapp.net/external/C_cXEFCQEZKxidwiU42_Kr0ypQKOvs-2IEZh9nsSMQw/https/camo.githubusercontent.com/9889b97ceb46ee1310ff70d159f66477f48621bc/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830323737303537353336302e706e67',
  'https://camo.githubusercontent.com/37b83e0f005b8b5ba13cefad82153928eb6e5207/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830333439313836343537362e706e67',
  'https://images-ext-2.discordapp.net/external/Wx8N0RYNJX1LJ8yAMUxcxr7wQA9BO-j3qO4dIarFUb4/https/cdn.discordapp.com/attachments/235218122469146635/271328499837566976/rem.jpeg?width=186&height=250',
  'https://images-ext-2.discordapp.net/external/DIIk6i4iDYg8s6ambJEkjO-PLDrwuax7LjmbGDnZAiw/https/cdn.discordapp.com/attachments/333500092382314516/333775873658585088/cffccf79a4a3c743260d90cade83a483.jpg?width=184&height=250',
  'https://images-ext-1.discordapp.net/external/qUpkynseQ2375HMjLMWfRM6RHHRWXiYg2TNZoqVk5TQ/https/cdn.discordapp.com/attachments/333740780852084736/333782096583852043/re_zero_rem_by_berrycakeroll-dad959a.png?width=206&height=251',
  'https://images-ext-1.discordapp.net/external/_HElIn9Mw01SnSv6DRsbdFf_qPnbDlT0XaND49npaNM/https/cdn.discordapp.com/attachments/235218122469146635/314487701183397888/874db792-3d2a-495e-848a-449751ef03d5.jpg?width=188&height=251',
  'https://images-ext-1.discordapp.net/external/1fxJPMTQvHM73gZz12ud5C2dvz02c6CandzA1LWfBqc/https/cdn.discordapp.com/attachments/235218122469146635/237092503424204800/v0aMPDngydiTGHyFH8aCurXSHPuZKgyIJtGsvXNLTqs.png?width=206&height=250',
  'https://images-ext-1.discordapp.net/external/rQKZfBGy_dBf_HHH0Y9r2rdfEo_iGlj639WGKGReCH8/https/cdn.discordapp.com/attachments/235218122469146635/251113908851441664/d-Tubc2mw3lImA1pQ7yIkTxvKvWS4ng2MrZvyBpMG4U.png?width=180&height=250',
  'https://images-ext-2.discordapp.net/external/DJ-2lHK2u2qQ426cipqXO6r3PwOlyJxlneRhfgVYgD4/https/cdn.discordapp.com/attachments/333500092382314516/333779130489372672/re-zero-19-03-rem.jpg?width=400&height=225',
  'https://camo.githubusercontent.com/96fa5ff82f824fe2fd6cb6f2d026794aff39ed3d/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830333131383730323539332e706e67',
  'https://camo.githubusercontent.com/7b758b6979c5e18375bdcac9a97725a472a3625c/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3331323033363835323538323434393135322e706e67',
  'https://camo.githubusercontent.com/9889b97ceb46ee1310ff70d159f66477f48621bc/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f656d6f6a69732f3233303631303830323737303537353336302e706e67'
  ];
  var randpic = ~~((Math.random() * list.length) + 0)
  const embed = new Discord.RichEmbed()
  .setColor(8375551)
  .setImage(list[randpic]);
  message.channel.send({embed});
}
