const Discord = require("discord.js")
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")


module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Leaderboard")
            .setDescription("There are 3 types of leaderboards in 8k bot!\n\n`8k!rich` - View the top richest 8k users!\n`8k!active` - View the most active 8k users!\n`8k!ytlb` - View the top youtubers in 8k!")
        message.channel.send(embed)


    }, {
        name: "leaderboard",
        aliases: ["lb", "leaderboard", "top"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "shows the list of available leaderboards!"
    }
)