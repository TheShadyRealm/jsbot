function combined(array){
  var a = array.concat();
	var x = [];
    for(var i = 0; i < a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j]){
							x.push(a[j])
              a.splice(j--, 1)
						}
        }
    }
for(var f = 0; f < x.length; f++){
		a.splice(a.indexOf(x[f]), 1)
	}
    return a;
}
module.exports = (client, oldMember, newMember) => {
	var oldroles = oldMember.roles.map(c=>c.id);
	var newroles = newMember.roles.map(c=>c.id);
	var rolechange = (combined(oldroles.concat(newroles)));
	var message = oldMember;
	var server = message.guild.id;
	var tosend;
	if(oldroles.length > newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> removed from ' + message
	} else if(oldroles.length < newroles.length){
		tosend = '**Role:** <@&' + rolechange + '> added to ' + message
	} else if(oldMember.displayName != newMember.displayName){
		tosend = message + "**'s nickname changed from** `" + oldMember.displayName + '`** to** `' + newMember.displayName + '`'
	} else {
		return;
	}
var channeltosend = '417437351766392834';
oldMember.guild.channels.get(channeltosend).send({embed: {
		color: 15784782,
		title: 'User Change :arrows_clockwise:',
		description: tosend,
		timestamp: new Date()
	}});
};
