const canvacord = require("canvacord")
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")



module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        if (message.mentions.users.first()) {
            let avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.facepalm(avatar);
            let attachment = new Discord.MessageAttachment(image, "facepalm.png");
            await addCD()
            message.channel.send(attachment)
                .catch((e) => {
                    message.channel.send(e.toString())

                })

        } else {

            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.facepalm(avatar);
            let attachment = new Discord.MessageAttachment(image, "facepalm.png");
            await addCD()
            message.channel.send(attachment)
                .catch((e) => {
                    message.channel.send(e.toString())

                })

        }

    }, {
        name: "facepalm",
        aliases: ["facepalm"],
        cooldown: 5000,
        cooldownMessage: "You just facepalmed! You can facepalm again in **{timeleft}**",
        usage: "{prefix}{cmd} [@user]",
        description: "Facepalm."
    }
)