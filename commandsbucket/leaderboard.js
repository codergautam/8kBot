const Discord = require("discord.js")
module.exports = {
    name: "leaderboard",
    aliases: ["lb", "leaderboard", "lblist"],
    secret: false,
    category: "currency",
    format: "",
    usage: [""],
    description: "This command shows the list of available leaderboards!", 
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setDescription("There are now 2 types of leaderboards in 8k bot!\n\n`8k!rich` - View the top richest 8k users!\n`8k!active` - View the most active 8k users!")
        message.channel.send(embed)

    }
}