const api = require("../api")
const Discord = require("discord.js")

function leaderboard(obj, page) {
    const sorted = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp) ).reverse().slice((page*10)-10,page*10)
    
    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = api.numberWithCommas((!entry.levels ? 0 : entry.levels.xp))
        if(i+(page-1)*10+1==1) {
            leaderboard = leaderboard+`🥇 **${entry.name}**- \`${dk}\` xp\n`
        } else if(i+(page-1)*10+1 ==2) {
            leaderboard = leaderboard+`🥈 ${entry.name}- \`${dk}\` xp\n`
        } else if(i+(page-1)*10+1 ==3) {
            leaderboard = leaderboard+`🥉 ${entry.name}- \`${dk}\` xp\n`
        } else {
            leaderboard = leaderboard+`#${i+(page-1)*10+1}: ${entry.name}- \`${dk}\` xp\n`
        }
 
    })
    return(leaderboard)
    }

module.exports = {
    name: 'active',
    aliases: ["active", "xplb"],
    category: "currency",
    format: "8k!active [pagenum]",
    secret: false,
    usage: ["8k!active", "8k!active 2"],
    description: "View the most active users on all the servers 8k bot is in!", 
	async execute(message, args) {
        api.getAll()
        .then((all) => {
            var pages = Math.ceil(Object.keys(all).length/10)
            try {
                Number(args[0])
            } catch {
                var page = 1
            }
            if(Number.isInteger(Number(args[0]))) {
                if(Number(args[0]) > pages) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Global Leaderboard")
                    .setDescription("Invalid page number..\nThere are only "+pages+" pages!")
                    .setFooter(Object.keys(all).length+" users registered!")
                    message.channel.send(embed)
                    return
                } else {
                    var page = Number(args[0])
                }

            } else {
                var page = 1
            }

            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Global XP Leaderboard")
            .setDescription(leaderboard(all, page))
            .setFooter(`Showing page ${page} of ${pages} pages\n${+Object.keys(all).length} users registered!`)
            message.channel.send(embed)
            

        })
        .catch((e) => {
            console.log(e)
            message.channel.send("Leaderboard couldnt be generated")
        })
    }
}