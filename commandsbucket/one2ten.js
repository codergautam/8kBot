
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
module.exports = {
    name: 'one2ten',
    aliases: ["one2ten", "onetoten", "onetwoten"],
    secret: false,
    category: "fun",
    format: "",
    usage: [""],
    description: "This command picks a random number from one to ten!", 
	async execute(message, args) {
      message.channel.send("I have chosen **"+getRandomInt(1,10)+"**")
    }
}