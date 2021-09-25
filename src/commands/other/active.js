const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

function leaderboard(obj1, page) {
    obj = []
    obj1.forEach(user => {
        obj[obj.length] = user.data
    })
    const sorted = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp)).reverse().slice((page * 10) - 10, page * 10)

    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = api.numberWithCommas((!entry.levels ? 0 : entry.levels.xp))
        if (i + (page - 1) * 10 + 1 == 1) {
            leaderboard = leaderboard + `🥇 **${entry.name}**- \`${dk}\` xp\n`
        } else if (i + (page - 1) * 10 + 1 == 2) {
            leaderboard = leaderboard + `🥈 ${entry.name}- \`${dk}\` xp\n`
        } else if (i + (page - 1) * 10 + 1 == 3) {
            leaderboard = leaderboard + `🥉 ${entry.name}- \`${dk}\` xp\n`
        } else {
            leaderboard = leaderboard + `#${i+(page-1)*10+1}: ${entry.name}- \`${dk}\` xp\n`
        }

    })
    return (leaderboard)
}
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
                    .setTitle("Global XP Leaderboard")
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
            .setTitle("Global XP Leaderboard")
            .setDescription(leaderboard(all, page))
            .setFooter(`Showing page ${page} of ${pages} pages\n${+Object.keys(all).length} users registered!`)
        message.channel.send(embed)
        await addCD()


    }, {
        name: "active",
        aliases: ["active", "xplb"],
        cooldown: 5000,
        cooldownMessage: "You just checked the active leaderboards!\nYou can check it again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "View the top most active 8k users! You get more XP by typing a lot in servers!",
        usage: "{prefix}{cmd} [pagenum]"
    }
)