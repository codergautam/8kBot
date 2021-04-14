const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        message.channel.send(message.author.username + " ate sum cheese")
    }, {
        name: "eatcheese",
        aliases: ["eatcheese", "eetcheese", "eatchez"],
        cooldown: 0,
        cooldownMessage: "",
        usage: "{prefix}{cmd}",
        description: "Cheese? Dedicated to pokesci"
    }
)