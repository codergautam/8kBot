const Discord = require('discord.js')
module.exports = {
    name: "invite",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("8k Bot Invite links!")
        .setDescription("Use this link to add 8k Bot to your own server!")
        .addField('Link', '[https://discord.com/api/oauth2/authorize?client_id=755146951858847796&permissions=8&scope=bot](https://discord.com/api/oauth2/authorize?client_id=755146951858847796&permissions=8&scope=bot)', true)
        message.channel.send(embed)
    }
}