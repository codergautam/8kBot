const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        message.channel.startTyping()
        if (message.mentions.users.first()) {
            let avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.trigger(avatar);
            let attachment = new Discord.MessageAttachment(image, "triggered.gif");
            message.channel.send(attachment)
                .catch((e) => {
                    message.channel.send(e.toString())

                })
            message.channel.stopTyping()
        } else {

            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.trigger(avatar);
            let attachment = new Discord.MessageAttachment(image, "triggered.gif");
            message.channel.send(attachment)
                .catch((e) => {
                    message.channel.send(e.toString())

                })
            message.channel.stopTyping()

        }

    }, {
        name: "trigger",
        cooldown: 0,
        aliases: ["trigger", "triggered"],
        cooldownMessage: "",
        perms: ["SEND_MESSAGES", "ATTACH_FILES"],
        usage: "{prefix}{cmd} [@user]",
        description: "trigger someone"
    }
)