const api = require("../../core/api")
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        var user = await api.getUser(id.id)
        if (!user.hasOwnProperty("levels")) {
            user.levels = {
                xp: 0,
                level: 0
            }

        }
        var obj1 = await api.getAll()
        obj = []
        obj1.forEach(user => {
            obj[obj.length] = user.data
        })
        const sortedxp = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp)).reverse()
        var ranknumxp = sortedxp.findIndex(user => user.id == id.id) + 1

        const sortedrich = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse()
        var ranknumrich = sortedrich.findIndex(user => user.id == id.id) + 1

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.name}'s Rank!`)
            .setFooter(`Gain more XP by talking more\nGain more coins by using 8k bot!`)
            .setDescription(`**Money**\nCoins: \`${api.numberWithCommas(user.bal)}\`\nRank: #${api.numberWithCommas(ranknumrich)}\n\n**Active**\nXP: \`${api.numberWithCommas(user.levels.xp)}\`\nLevel: \`${api.numberWithCommas(user.levels.level)}\`\nRank: #${api.numberWithCommas(ranknumxp)}`)
        message.channel.send(embed)



    }, {
        name: "rank",
        aliases: ["rank"],
        cooldown: 0,
        cooldownMessage: "",
        perms: [],
        description: "View your or another users rank in 8k!",
        usage: "{prefix}{command} [@user]"
    }
)