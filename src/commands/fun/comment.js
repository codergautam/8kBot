const canvacord = require("canvacord")
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")



module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        yee = false
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.youtube({
            username: message.author.username,
            content: args.join(' '),
            avatar: avatar
        }).catch((err) => {
            yee = true
            return message.channel.send(err.toString())

        });
        if (!yee) {
            let attachment = new Discord.MessageAttachment(image, "comment.png");
            await addCD()
            message.channel.send(attachment);
        }


    }, {
        name: "comment",
        aliases: ["ytcomment", "youtube", "comment"],
        cooldown: 5000,
        cooldownMessage: "You just commented! You can comment again in **{timeleft}**",
        usage: "{prefix}{cmd} <content>",
        description: "This command shows a youtube comment image with some text in it!"
    }
)