const api = require("../api")
const Discord = require("discord.js")
function leaderboard(obj) {
    const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice(0,10)
    
    var leaderboard = ""
    sorted.forEach((entry, i) => {
     leaderboard = leaderboard+`#${i+1}: ${entry.name}- ${entry.bal} coins\n`
    })
    return(leaderboard)
    }

module.exports = {
	name: 'leaderboard',
	async execute(message, args) {
        api.getAll()
        .then((all) => {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Global Leaderboard")
            .setDescription(leaderboard(all))
            message.channel.send(embed)
        })
    }
}