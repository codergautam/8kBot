const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if(message.author.id==875067761557127178) {
 await api.deleteUser(message.mentions.members.first().id)


        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Deleted user!")
            .setFooter("oof")
        message.channel.send(embed)
        } else{ message.channel.send("dont even try-")}
    }, {
        name: "setbal",
        aliases: ["setbal"],
        hidden: true,
        ownerOnly: true,
        perms: ["SEND_MESSAGES"],
        description: "[CONFIDENTIAL]"

    }
)
