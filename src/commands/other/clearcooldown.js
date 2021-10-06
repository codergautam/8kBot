const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.mentions.members.first().id)
        if(user.hasOwnProperty("cooldown")) delete user.cooldown
        await api.modUser(user.id, user)

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("done")
            .setFooter(":D")
        message.channel.send(embed)

    }, {
        name: "clearcooldown",
        aliases: ["clearcooldown"],
        hidden: true,
        ownerOnly: true,
        perms: ["SEND_MESSAGES"],
        description: "[CONFIDENTIAL]"

    }
)