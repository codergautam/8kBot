function leaderboard(obj, page) {
    const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice((page * 10) - 10, page * 10)

    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = api.numberWithCommas(entry.bal)
        if (i + (page - 1) * 10 + 1 == 1) {
            leaderboard = leaderboard + `🥇 **${entry.name}**- \`${dk}\` coins\n`
        } else if (i + (page - 1) * 10 + 1 == 2) {
            leaderboard = leaderboard + `🥈 ${entry.name}- \`${dk}\` coins\n`
        } else if (i + (page - 1) * 10 + 1 == 3) {
            leaderboard = leaderboard + `🥉 ${entry.name}- \`${dk}\` coins\n`
        } else {
            leaderboard = leaderboard + `#${i+(page-1)*10+1}: ${entry.name}- \`${dk}\` coins\n`
        }

    })
    return (leaderboard)
}

module.exports = {
    name: 'rich',
    async execute(message, args) {

    }
}
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var all = await api.getAll()
        var pages = Math.ceil(Object.keys(all).length / 10)
        try {
            Number(args[0])
        } catch {
            var page = 1
        }
        if (Number.isInteger(Number(args[0]))) {
            if (Number(args[0]) > pages) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Global Leaderboard")
                    .setDescription("Invalid page number..\nThere are only " + pages + " pages!")
                    .setFooter(Object.keys(all).length + " users registered!")
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
            .setTitle("Global Leaderboard")
            .setDescription(leaderboard(all, page))
            .setFooter(`Showing page ${page} of ${pages} pages\n${+Object.keys(all).length} users registered!`)
        message.channel.send(embed)



    }, {
        name: "rich",
        aliases: ["rich", "richlb", "richest", "wealthy"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} [pagenum]",
        description: "See the top richest users on 8k!"
    }
)