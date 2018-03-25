exports.run = (client, message, args) => {
  var rule;
  var number;
  var rules = ['Do not talk about /b/.',
  'You do NOT talk about /b/.',
  'We are Anonymous.',
  'Anonymous is legion.',
  'Anonymous does not forgive, Anonymous does not forget.',
  'Anonymous does not forgive, Anonymous does not forget.',
  'Anonymous can be a horrible, senseless, uncaring monster.',
  'Anonymous is still able to deliver.',
  'There are no real rules about posting.',
  'Always register with your local service provider.',
  "If you enjoy any rival sites — DON'T.",
  'All your carefully picked arguments can easily be ignored.',
  'Anything you say can and will be used against you.',
  'Anything you say can be turned into something else.',
  'Do not argue with trolls — it means that they win.',
  'The harder you try, the harder you will fail.',
  'If you fail in epic proportions, it may just become a winning failure.',
  'Every win fails eventually.',
  'Everything that can be labeled, can be hated.',
  'The more you hate it, the stronger it gets.',
  'Nothing is to be taken seriously.',
  'Original content is original only for a few seconds before getting old.',
  "Copy 'n paste is made to ruin every last bit of originality.",
  "Copy 'n paste is made to ruin every last bit of originality.",
  'Every repost is always a repost of a repost.',
  'Relation to the original topic decreases with every single post.',
  'Any topic can be turned into something totally unrelated.',
  '27',
  "Always question a person's gender - just in case it's really a man.",
  'On the internet, all girls are men, and all kids are undercover FBI agents or Justice Decoys.',
  'There are NO girls on the internet.',
  '31',
  'You must have pictures to prove your statements.',
  "Lurk more — it's never enough.",
  'There is porn of it, no exceptions.',
  'If no porn is found of it, it will be made.',
  'There will always be more drama than what you just saw.',
  'You can not divide by zero (just because the calculator says so).',
  'No real limits of any kind apply here — not even the sky.',
  'CAPSLOCK IS CRUISE CONTROL FOR COOL.',
  'EVEN WITH CRUISE CONTROL YOU STILL HAVE TO STEER.',
  'Needs more Desu. No exceptions.',
  'Nothing is Sacred.',
  'The more beautiful and pure a thing is, the more satisfying it is to corrupt it.',
  'Trying to edit the rules of the Internet with Japanese characters is like trying to make “2 girls, 1 cup” acceptable in society. It only works at A-con.',
  'When one sees a lion, one must get into the car.',
  '46',
  'The pool is always closed due to AIDS (and stingrays, which also have AIDS).',
  'A cat is fine too.',
  'One cat leads to another.',
  'Another cat leads to Zippo Cat.',
  "No matter what it is, it is somebody's fetish. No exceptions.",
  'It is delicious cake. You must eat it.',
  'It is delicious trap. You must hit it.',
  '54',
  'If you have time to make up new rules, you have no life.',
  'They will not bring back Snacks.',
  'You will never have sex.',
  '58',
  'No one does it like Gaston. No exceptions.',
  'It needs more pumpkin. No exceptions.',
  'It needs more cowbell. No exceptions.',
  'It has been cracked and pirated. No exceptions.',
  'For every male character there is a female version. No Exceptions.',
  "Don't copy that floppy.",
  'Anonymous is not your personal army.',
  'The cake is a lie.',
  'Anonymous does not "buy", he downloads.',
  'Milhouse will never be a meme. Ever. No matter what your post ends with. No exceptions. Ever. No.',
  'LOL SIXTY NINE AMIRITE?',
  'Do not talk about the 100M GET failure.',
  'The internet is SERIOUS BUSINESS.',
  'Darth Vader is your father. No exceptions.',
  "If there isn't enough just ask for Moar.",
  '74',
  'Rule 75 is a lie.',
  "Twinkies are the answers to life's problems.",
  'The internet makes you stupid.',
  'It will always need more sauce.',
  '79',
  'Interwebz177 did it. No exceptions.',
  'Anonymous is a fool by default.',
  'Nobody tells the truth on the Internet',
  '83',
  'All rules ARE true, including this one.',
  'Stupid rules are forbidden.',
  'The term "sage" does not refer to the spice.',
  "If you get pepperoni ever again, I swear I'll blow this joint sky-high!",
  'Anonymous rules the internet. No exceptions.',
  'Bruce Lee was a hero to us all.',
  "It's never lupus.",
  '91',
  '92',
  '93',
  'This is rule 94. It was definitely not deleted by SOPA.',
  'Anonymous did NOT, under any circumstances, tk him 2da bar?',
  "If you express astonishment at someone's claim, it is most likely just a clever ruse.",
  'The government, The CIA, Everything is a lie.',
  'Only Zippocat is truth.',
  'All numbers are at least 100 but always OVER NINE THOUSAAAAAND.',
  'Gay will not be tolerated.'
];
  if(args.length > 2) return;
  if(!args[1]){
    rule = Math.floor(Math.random() * 100) + 1;
  } else {
    rule = parseInt(args[1]);
  }
  number = rule + '. ';
  if(rule > 100 || rule < 0) return;
  console.log(rule, number)
  if((rule === 27 || rule === 31 || rule === 46 || rule === 91 || rule === 92 || rule === 93 || rule === 58 || rule === 74 || rule === 79 || rule === 54) && args.length === 2){
    message.channel.send({embed: {
      color: 15784782,
      title: 'Rules of the Internet',
      description: 'This rule was either skipped or blank... :thinking:'
    }})
  } else if ((rule === 27 || rule === 31 || rule === 46 || rule === 91 || rule === 92 || rule === 93 || rule === 58 || rule === 74 || rule === 79 || rule === 54) && args.length === 1){
    rule = 34, number = '34. '
    message.channel.send({embed: {
      color: 15784782,
      title: 'Rules of the Internet',
      description: number + rules[rule]
    }})
  } else {
    message.channel.send({embed: {
      color: 15784782,
      title: 'Rules of the Internet',
      description: number + rules[rule]
    }})
  }
}
