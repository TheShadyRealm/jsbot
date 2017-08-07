const Discord = require('discord.js');
exports.run = (client, message, args) => {
		var list = ['https://vignette1.wikia.nocookie.net/rezero/images/c/c0/Emilia_Anime_2.png/revision/latest?cb=20160408203829',
		'http://static.zerochan.net/Emilia.%28Re%3AZero%29.full.2040725.jpg',
		'http://static.zerochan.net/Emilia.%28Re%3AZero%29.full.2016181.jpg',
		'http://vignette3.wikia.nocookie.net/r2da/images/1/16/Emilia-Puck-Re-Zero-Kara-Hajimeru-Isekai-Seikatsu.png/revision/latest?cb=20160913145140',
		'http://s3.zerochan.net/Emilia.%28Re%3AZero%29.240.2099795.jpg',
		'https://cafekuyer.files.wordpress.com/2016/04/screen-shot-2016-04-25-at-9-31-13-am.png?w=980&h=720&crop=1',
		'https://images7.alphacoders.com/695/thumb-1920-695212.png',
		'https://vignette2.wikia.nocookie.net/rezero/images/5/52/Emilia_-_Re_Zero_Anime_BD_-_12.png/revision/latest?cb=20160915153630',
		'https://s-media-cache-ak0.pinimg.com/originals/6a/13/b0/6a13b076f46cef2941840e707e080866.jpg',
		'http://i.giphy.com/3o6ozi4YPwqFPE1GsU.gif',
		'http://s3.zerochan.net/Emilia.%28Re%3AZero%29.240.2108865.jpg',
		'https://avatarfiles.alphacoders.com/845/84582.png',
		'https://images8.alphacoders.com/711/thumb-1920-711901.png',
		'http://static.zerochan.net/Emilia.%28Re%3AZero%29.full.2014890.jpg',
		'http://vignette2.wikia.nocookie.net/rezero/images/c/cc/Emilia_-_Re_Zero_Anime_BD_-_13.png/revision/latest?cb=20160915153714',
		'http://img00.deviantart.net/4e40/i/2016/224/9/6/emilia_re_zero_by_analibi-dadms3c.jpg',
		'https://i0.wp.com/howdrawmanga.com/wp-content/uploads/2016/06/rezero-Emilia-re-zero-thumb-1.jpg',
		'https://i.ytimg.com/vi/6mNd4ELobBs/maxresdefault.jpg',
		'http://static.zerochan.net/Emilia.%28Re%3AZero%29.full.2010881.jpg',
		'http://img1.reactor.cc/pics/post/full/Anime-pack-(re-zero)-Emilia-(re-3053543.jpeg',
		'http://img04.deviantart.net/3dfb/i/2016/126/0/3/fanart_emilia___re_zero_by_makki09-da1jclp.jpg',
		'http://i.imgur.com/GiJurP6.jpg',
		'https://wallpapersite.com/images/wallpapers/emilia-2560x1440-rezero-female-protagonist-half-elf-hd-2299.jpg',
		'https://www.rightstufanime.com/images/productImages/4934054784219_figure-emilia-re-zero-altB.jpg',
		'http://orig06.deviantart.net/38fb/f/2016/247/b/b/vektor_wallpaper__emilia_re_zero_by_iwdraw-dagf0w8.jpg',
		'http://image.diyidan.net/post/2017/3/15/wzTWYH3B78vGksy7.jpg',
		'https://cloudedanime.files.wordpress.com/2016/05/re-zero-07-emilia-01.jpg',
		'https://images5.alphacoders.com/729/thumb-1920-729306.png',
		'http://orig12.deviantart.net/27a1/f/2016/187/d/8/emilia___re_zero_wallpaper__hd__by_say0chi-da8xw93.png'
		]
		var randpic = ~~((Math.random() * list.length) + 0)
		const embed = new Discord.RichEmbed()
		.setColor(15784782)
		.setImage(list[randpic])
		message.channel.send({embed})
	}
