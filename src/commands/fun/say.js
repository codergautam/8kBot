const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (args.length > 0) {
            message.delete()
            message.channel.send(args.join(' '))
        } else {
            message.channel.send("You didn't type anything to say!\nFor more info, type `8k!help say`")
        }
    }, {
        name: "say",
        aliases: ["say", "talk"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
        usage: "{prefix}{cmd} <text>",
        description: "Make 8k say something, good for roleplays :D"
    }
)