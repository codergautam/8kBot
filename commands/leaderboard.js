const api = require("../api")
const Discord = require("discord.js")
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function leaderboard(obj) {
    const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice(0,10)
    
    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = numberWithCommas(entry.bal)
        if(i+1==1) {
            leaderboard = leaderboard+`🥇 **${entry.name}**- \`${dk}\` coins\n`
        } else if(i+1 ==2) {
            leaderboard = leaderboard+`🥈 ${entry.name}- \`${dk}\` coins\n`
        } else if(i+1 ==3) {
            leaderboard = leaderboard+`🥉 ${entry.name}- \`${dk}\` coins\n`
        } else {
            leaderboard = leaderboard+`#${i+1}: ${entry.name}- \`${dk}\` coins\n`
        }
 
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
        .catch(() => {
            message.channel.send("Leaderboard couldnt be generated")
        })
    }
}