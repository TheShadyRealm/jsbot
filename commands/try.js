exports.run = (client, message, args) => {
  if(args[1] === 'it'){
    message.channel.send(
      '```js\n' + 'try {\n	it();\n} catch (e) {\n	comeBackIfItDoesntWork(e);\n}'.replace(/`/g, '`' + String.fromCharCode(8203)) + '\n```'
    )
  } else {
    return;
  }
};
