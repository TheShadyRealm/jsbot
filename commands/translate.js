const Discord = require('discord.js');
const translate = require('node-google-translate-skidz');
exports.run = (client, message, args) => {
  if(args.length < 4){
    message.channel.send({embed: {
      color: 15784782,
      author: {
        name: message.member.displayName,
        icon_url: message.author.displayAvatarURL
      },
      title: 'Translate 🈳',
      description: "Translate some text from one language into another! (To see supported langauges check out this link: 'https://www.sitepoint.com/iso-2-letter-language-codes/') `.translate [input language] [output langauge] [text]`"
    }})
  } else {
    var fromL; var fromLN;
    var toL; var toLN;
    var languages = ['ab', 'aa', 'af', 'sq', 'am', 'ar', 'hy', 'as', 'ay', 'az', 'ba', 'eu', 'bn', 'dz', 'bh', 'bi', 'br', 'bg', 'my', 'be', 'km', 'ca', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fo', 'fj', 'fi', 'fr', 'fy', 'gd', 'gl', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ha', 'iw', 'hi', 'hu', 'is', 'in', 'ia', 'ie', 'ik', 'ga', 'it', 'ja', 'jw', 'kn', 'ks', 'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'ln', 'lt', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om', 'ps', 'fa', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 'ru', 'sm', 'sg', 'sa', 'sr', 'sh', 'st', 'tn', 'sn', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'uk', 'ur', 'uz', 'vi', 'vo', 'cy','wo', 'xh', 'ji', 'yo', 'zu']
    var languageNames = ['Abkhazian','Afar','Afrikaans','Albanian','Amharic','Arabic','Armenian','Assamese','Aymara','Azerbaijani','Bashkir','Basque','Bengali, Bangla','Bhutani','Bihari','Bislama','Breton','Bulgarian','Burmese','Byelorussian','Cambodian','Catalan','Chinese','Corsican','Croatian','Czech','Danish','Dutch','English','Esperanto','Estonian','Faeroese','Fiji','Finnish','French','Frisian','Gaelic (Scots Gaelic)','Galician','Georgian','German','Greek','Greenladic','Guarani','Gujarati','Hausa','Hebrew','Hindi','Hungarian','Icelandic','Indonesian','Interlingua','Interlingue','Inupik','Irish','Italian','Japanese','Javanese','Kannada','Kashmiri','Kazakh','Kinyarwanda','Kirghiz','Kirundi','Korean','Kurdish','Laothian','Latin','Latvian, Lettish','Lingala','Lithuanian','Macedonian','Malagas','Malay','Malayalam','Maltese','Maori','Marathi','Moldavian','Mongolian','Nauru','Nepali','Norwegian','Occitan','Oriya','Oromo, Afan','Pashto, Pushto','Persian','Polish','Portuguese','Punjabi','Quechua','Rhaeto-Romance','Romanian','Russian','Samoan','Sangro','Sanskrit','Serbian','Serbo-Croatian','Sesotho','Setswana','Shona','Sindhi','Singhalese','Siswati','Slovak','Slovenian','Somali','Spanish','Sudanese','Swahili','Swedish','Tagalog','Tajik','Tamil','Tatar','Tegulu','Thai','Tibetan','Tigrinya','Tonga','Tsonga','Turkish','Turkmen','Twi','Ukrainian','Urdu','Uzbek','Vietnamese','Volapuk','Welsh','Wolof','Xhosa','Yiddish','Yoruba','Zulu']
    for(var i = 0; i < languages.length; i++){
      if(args[1].toLowerCase().toString() === languages[i]){
        fromL = languages[i]
        fromLN = languageNames[i]
      }
      if(args[2].toString() === languages[i]){
        toL = languages[i]
        toLN = languageNames[i]
      }
      var textNumber = 13 + args[2].length + args[1].length
      var text = args.join(' ').substring(textNumber)
    }
    if(fromL === undefined || toL === undefined || text === undefined) return;
    console.log(fromL, toL, text)
    translate({
      text: text,
      source: fromL,
      target: toL
    }, function(result) {
      var display = JSON.stringify(result)
      var trans = display.substr(display.indexOf('"translation":') + 15)
      var limit = trans.indexOf('"}')
      var output = trans.substr(0, limit)
      const embed = new Discord.RichEmbed()
      .setColor(15784782)
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
      .setTitle("Translate 🈳")
      .setDescription('**Original (' + fromLN + ')**\n' + text + '\n**Translated (' + toLN + ')**\n' + output)
      .setTimestamp()
      .setFooter("Powered by GOOGLE translate", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png")
      message.channel.send({embed})
    });
  }
}
