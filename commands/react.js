var async = require('asyncawait/async');
var await = require('asyncawait/await');
function toReact(x){
	return x.replace(/[^A-Za-z0-9\t]/g, '');
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
exports.run = (client, message, args) => {
  var a = 0; var b = 0; var c = 0; var d = 0; var e = 0; var f = 0; var g = 0; var h = 0; var letteri = 0; var j = 0; var k = 0; var l = 0; var m = 0; var n = 0; var o = 0; var p = 0; var q = 0; var r = 0; var s = 0; var t = 0; var u = 0; var v = 0; var w = 0; var x = 0; var y = 0; var z = 0;
  var reactarray = [];
  if(args.length === 1){
    return;
  } else {
    var msgReact = (toReact(args.join(' ').substring(7))).toLowerCase().split('')
    console.log(msgReact)
    for(var i = 0; i < msgReact.length; i++){
      if(msgReact[i] === 'a' && msgReact[i+1] === 'b' && msgReact[i+2] === 'c'){
        if(reactarray.includes('🔤')) continue;
        msgReact.splice(i, 2)
        reactarray.push('🔤')
      } else if(msgReact[i] === 'i' && msgReact[i+1] === 'i'){
        if(reactarray.includes('⏸')) continue;
        msgReact.splice(i, 1)
        reactarray.push('⏸')
      } else if(msgReact[i] === 'o' && msgReact[i+1] === 'o'){
        msgReact.splice(i, 1)
        reactarray.push('🈁')
      } else if(msgReact[i] === 's' && msgReact[i+1] === 'o' && msgReact[i+2] === 's'){
        msgReact.splice(i, 2)
        reactarray.push('🆘')
      } else if(msgReact[i] === 'i' && msgReact[i+1] === 'd'){
        msgReact.splice(i, 1)
        reactarray.push('🆔')
      } else if(msgReact[i] === '1' && msgReact[i+1] === '0' && msgReact[i+1] === '0'){
        msgReact.splice(i, 2)
        reactarray.push('💯')
      } else if(msgReact[i] === 'n' && msgReact[i+1] === 'g'){
        msgReact.splice(i, 1)
        reactarray.push('🆖')
      } else if(msgReact[i] === 'o' && msgReact[i+1] === 'k'){
        msgReact.splice(i, 1)
        reactarray.push('🆗')
      } else if(msgReact[i] === 'z' && msgReact[i+1] === 'z' && msgReact[i+2] === 'z'){
        msgReact.splice(i, 2)
        reactarray.push('💤')
      } else if(msgReact[i] === 'o' && msgReact[i+1] === 'n'){
        msgReact.splice(i, 1)
        reactarray.push('🔛')
      } else if(msgReact[i] === 'c' && msgReact[i+1] === 'o' && msgReact[i+2] === 'o' && msgReact[i+3] === 'l'){
        msgReact.splice(i, 3)
        reactarray.push('🆒')
      } else if(msgReact[i] === 'a'){
        var aa = ['🇦', '🅰', '🍙', '🔼']
        reactarray.push(aa[a])
        a++
      } else if(msgReact[i] === 'b'){
        var aa = ['🇧', '🅱']
        reactarray.push(aa[b])
        b++
      } else if(msgReact[i] === 'c'){
        var aa = ['🇨', '©', '🗜', '☪', '🇹🇷']
        reactarray.push(aa[c])
        c++
      } else if(msgReact[i] === 'd'){
        var aa = ['🇩', '↩']
        reactarray.push(aa[d])
        d++
      } else if(msgReact[i] === 'e'){
        var aa = ['🇪', '📧', '💶']
        reactarray.push(aa[e])
        e++
      } else if(msgReact[i] === 'f'){
        var aa = ['🇫', '🎏']
        reactarray.push(aa[f])
        f++
      } else if(msgReact[i] === 'g'){
        var aa = ['🇬', '⛽']
        reactarray.push(aa[g])
        g++
      } else if(msgReact[i] === 'h'){
        var aa = ['🇭', '♓']
        reactarray.push(aa[h])
        h++
      } else if(msgReact[i] === 'i'){
        var aa = ['🇮', 'ℹ', '🚹']
        reactarray.push(aa[letteri])
        letteri++
      } else if(msgReact[i] === 'j'){
        var aa = ['🇯', '🗾']
        reactarray.push(aa[j])
        j++
      } else if(msgReact[i] === 'k'){
        var aa = ['🇰', '🎋']
        reactarray.push(aa[k])
        k++
      } else if(msgReact[i] === 'l'){
        var aa = ['🇱', '👢', '💷']
        reactarray.push(aa[l])
        l++
      } else if(msgReact[i] === 'm'){
        var aa = ['🇲', 'Ⓜ', '📉']
        reactarray.push(aa[m])
        m++
      } else if(msgReact[i] === 'n'){
        var aa = ['🇳', '♑', '🎵']
        reactarray.push(aa[n])
        n++
      } else if(msgReact[i] === 'o'){
        var aa = ['🇴', '🅾', '⭕', '🔘', '⏺', '⚪', '⚫', '🔵', '🔴', '💫']
        reactarray.push(aa[o])
        o++
      } else if(msgReact[i] === 'p'){
        var aa = ['🇵', '🅿']
        reactarray.push(aa[p])
        p++
      } else if(msgReact[i] === 'q'){
        var aa = ['🇶', '♌']
        reactarray.push(aa[q])
        q++
      } else if(msgReact[i] === 'r'){
        var aa = ['🇷', '®']
        reactarray.push(aa[r])
        r++
      } else if(msgReact[i] === 's'){
        var aa = ['🇸', '💲', '⚡', '💰']
        reactarray.push(aa[s])
        s++
      } else if(msgReact[i] === 't'){
        var aa = ['🇹', '✝', '➕', '🎚', '🌴']
        reactarray.push(aa[t])
        t++
      } else if(msgReact[i] === 'u'){
        var aa = ['🇺', '⛎', '🐉']
        reactarray.push(aa[u])
        u++
      } else if(msgReact[i] === 'v'){
        var aa = ['🇻', '♈', '☑']
        reactarray.push(aa[v])
        v++
      } else if(msgReact[i] === 'w'){
        var aa = ['🇼', '〰', '📈']
        reactarray.push(aa[w])
        w++
      } else if(msgReact[i] === 'x'){
        var aa = ['🇽', '❎', '✖', '❌', '⚒']
        reactarray.push(aa[x])
        x++
      } else if(msgReact[i] === 'y'){
        var aa = ['🇾', '💴', '✌']
        reactarray.push(aa[y])
        y++
      } else if(msgReact[i] === 'z'){
        var aa = ['🇿']
        reactarray.push(aa[z])
      }
      if(msgReact[i] === '1'){
        reactarray.push('1⃣')
      } else if(msgReact[i] === '2'){
        reactarray.push('2⃣')
      } else if(msgReact[i] === '3'){
        reactarray.push('3⃣')
      } else if(msgReact[i] === '4'){
        reactarray.push('4⃣')
      } else if(msgReact[i] === '5'){
        reactarray.push('5⃣')
      } else if(msgReact[i] === '6'){
        reactarray.push('6⃣')
      } else if(msgReact[i] === '7'){
        reactarray.push('7⃣')
      } else if(msgReact[i] === '8'){
        reactarray.push('8⃣')
      } else if(msgReact[i] === '9'){
        reactarray.push('9⃣')
      } else if(msgReact[i] === '0'){
        reactarray.push('0⃣')
      }
    }
    (async (function demo() {
      var kms = message.channel.fetchMessages({limit: 2})
      for(var fuk = 0; fuk < reactarray.length; fuk++){
        kms.then(m =>
        m.last().react(reactarray[fuk]))
        await(sleep(615));
      }
    }))();
  }
}
