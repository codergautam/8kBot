
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
module.exports = {
	name: 'one2ten',
	async execute(message, args) {
      message.channel.send("I have chosen **"+getRandomInt(1,10)+"**")
    }
}