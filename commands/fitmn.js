exports.run = (client, message, args) => {
  if(args.length != 2) return;
  var o=[0,3,3,5,4,4,3,5,5,4],f=s=>(s[1]==1?[3,6,6,8,8,7,7,9,8,8][s[0]]:o[s[0]]+(s.length>1?[0,3,6,6,5,5,5,7,6,6][s[1]]:0))+(s.length==3?(7+o[s[2]]-(o[s[2]]==0?7:0)):0),l=n=>
  {var s=(""+n).split("").reverse();return f(s.slice(0,3))+(s.length>3?(f(s.slice(3,6))+8):0)};
  (n=>{var s="";while(n!=4){
      s+=n+" is ";n=n>=0?l(n):(l(-n)+8);s+=n+" and ";
    }
    message.channel.send({embed: {
      color: 15784782,
      title: 'Four is the Magical Number :tophat: ',
      description: s+"4 is the magic number"
    }});
  })(parseInt(args[1]))
}
