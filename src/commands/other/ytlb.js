const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

function leaderboard(obj1, page) {
    obj = []
    obj1.forEach(user => {
        if (user.data.hasOwnProperty("youtube")) obj[obj.length] = user.data
    })
    const sorted = Object.values(obj).sort((a, b) => (!a.youtube ? 0 : a.youtube.subs) - (!b.youtube ? 0 : b.youtube.subs)).reverse().slice((page * 10) - 10, page * 10)
    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = api.numberWithCommas((!entry.youtube.subs ? 0 : entry.youtube.subs))
        if (i + (page - 1) * 10 + 1 == 1) {
            leaderboard = leaderboard + `🥇 **${entry.name}**- \`${dk}\` subs\n`
        } else if (i + (page - 1) * 10 + 1 == 2) {
            leaderboard = leaderboard + `🥈 ${entry.name}- \`${dk}\` subs\n`
        } else if (i + (page - 1) * 10 + 1 == 3) {
            leaderboard = leaderboard + `🥉 ${entry.name}- \`${dk}\` subs\n`
        } else {
            leaderboard = leaderboard + `#${i+(page-1)*10+1}: ${entry.name}- \`${dk}\` subs\n`
        }

    })
    return (leaderboard)
}
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var all = await api.getAll()
        obj1 = all
        obj = []
        obj1.forEach(user => {
            obj[obj.length] = user.data
        })
        const youtuberscount = Object.keys(Object.values(obj).sort((a, b) => (!a.youtube ? 0 : a.youtube.subs) - (!b.youtube ? 0 : b.youtube.subs)).filter((user) => user.hasOwnProperty("youtube"))).length
        var pages = Math.ceil(youtuberscount / 10)
        try {
            Number(args[0])
        } catch {
            var page = 1
        }
        if (Number.isInteger(Number(args[0]))) {
            if (Number(args[0]) > pages) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Global Youtuber Leaderboard")
                    .setDescription("Invalid page number..\nThere are only " + pages + " pages!")
                    .setFooter(youtuberscount + " youtubers!")
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
            .setTitle("Global Youtuber Leaderboard")
            .setDescription(leaderboard(all, page))
            .setFooter(`Showing page ${page} of ${pages} pages\n${+youtuberscount} youtubers!`)
        message.channel.send(embed);
        await addCD()


    }, {
        name: "ytlb",
        aliases: ["youtubetop", "ytlb"],
        cooldown: 5000,
        cooldownMessage: "You just checked the youtube leaderboards!\nYou can check it again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "View the top youtubers in 8k!\n\nYou can become a youtuber by typing `8k!apply youtuber`\nYou can upload videos by typing `8k!work` !",
        usage: "{prefix}{cmd} [pagenum]"
    })