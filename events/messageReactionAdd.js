module.exports = (client, messageReaction, user) => {
	if(messageReaction.emoji.toString() === '📌' && messageReaction.count === 3){
		messageReaction.message.pin()
	}
};
