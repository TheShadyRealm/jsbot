const Discord = require('discord.js');
exports.run = (client, message, args) => {
		var list = ['http://orig02.deviantart.net/a518/f/2016/210/3/c/sans_wink_by_vocaloidaddict44-dabsjhy.png',
		'http://vignette4.wikia.nocookie.net/deathbattlefanon/images/5/54/Sans_undertale_you_re_gonna_have_a_bad_time_by_pikminaaa-d9kg0tl.png/revision/latest?cb=20170219002207',
		'https://vignette4.wikia.nocookie.net/joke-battles/images/3/38/Sans_by_flintofmother3-d9dl8qh.png/revision/latest?cb=20160526065756',
		'http://img06.deviantart.net/0ccd/i/2016/179/1/e/let_s_draw_sans__speed_drawing_video__by_smudgeandfrank-da80s3t.png',
		'https://s-media-cache-ak0.pinimg.com/236x/31/25/d9/3125d97253c85b481201ee8ffece0d1d--headphones-cool-cats.jpg',
		'http://img09.deviantart.net/4049/i/2015/311/8/d/undertale_sans_by_i_am_bleu-d9fv9zi.jpg',
		'http://img08.deviantart.net/2d68/i/2016/175/7/2/undertale__sans_by_secretnarcissist-d9ia2hz.png',
		'https://s-media-cache-ak0.pinimg.com/736x/e2/87/1e/e2871eec56795f8e97d2c799f2d45cef--gaster-blaster-sans-brody.jpg',
		'http://img11.deviantart.net/d32b/i/2016/008/6/d/fang_sans_by_fasli-d9n904e.png',
		'http://orig02.deviantart.net/6372/f/2016/249/3/3/you_are_my_most_beautiful_dream___insomne_sans_by_neykstar-dags2q8.png',
		'http://pre11.deviantart.net/290c/th/pre/f/2016/033/b/a/sans_by_neykstar-d9q7dl8.png',
		'https://cdn.shopify.com/s/files/1/1258/7281/products/Sans_Sticker_large.png?v=1478406430',
		'http://img11.deviantart.net/1bfe/i/2016/244/b/0/attack_on_titantale_sans_by_joselyn565-dag5vej.png',
		'http://orig07.deviantart.net/b617/f/2015/342/c/b/sans_by_wiki234-d9jg4y8.png',
		'https://s-media-cache-ak0.pinimg.com/originals/15/76/dc/1576dc4805dc2971a99d69c09ff832d7.png',
		'https://vignette1.wikia.nocookie.net/undertale-au/images/c/cc/Underswap_sans_battle_sprite_by_moises87-da60qh7.png/revision/latest?cb=20161127212313',
		'http://s4.thingpic.com/images/nB/ykYcdAo7ptUUeNcGk8mcFbGi.png',
		'https://vignette2.wikia.nocookie.net/undertale/images/7/7f/SansArtwork.jpg/revision/latest?cb=20160310171514',
		'https://a.wattpad.com/cover/76557179-352-k23560.jpg',
		'http://orig07.deviantart.net/28a5/f/2016/020/c/5/sans_ational_by_elimate98-d9oq179.png',
		'https://img11.deviantart.net/581a/i/2015/278/f/b/sans_from_undertale__render_by_nibroc_rock-d9c1q5q.png',
		'https://vignette3.wikia.nocookie.net/undertale-au/images/4/41/Underlust_sans_by_neykstar-dae2aqi.png/revision/latest?cb=20161205180008',
		'http://orig04.deviantart.net/1eef/f/2016/129/1/b/underswap_sans___blueberry_by_neykstar-da1vr8r.png',
		'https://vignette2.wikia.nocookie.net/undertale/images/6/6a/Sans.jpg/revision/latest?cb=20160424104545&path-prefix=pl',
		'http://orig02.deviantart.net/b192/f/2016/001/8/e/sans_by_crowik-d9mduia.jpg',
		'https://s-media-cache-ak0.pinimg.com/originals/cd/54/84/cd5484c5f2d68ece5779e4d32516df4a.jpg',
		'https://d.wattpad.com/story_parts/189417248/images/141a762ae6a3f5b7.gif',
		'http://orig08.deviantart.net/9f2a/f/2016/005/f/f/sans_01_by_kuzukago-d9iajzh.png',
		'http://imgur.com/a/YCUeW'
		]
		var randpic = ~~((Math.random() * list.length) + 0)
		const embed = new Discord.RichEmbed()
		.setColor(15784782)
		.setImage(list[randpic])
		message.channel.send({embed})
	}
