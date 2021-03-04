const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        message.delete()
        message.channel.send(args.join(' '))
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