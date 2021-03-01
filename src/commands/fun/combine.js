const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")
const combine = require("../../extras/combine")


module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        if (args.length > 1) {
            message.channel.send(combine(args[0] + args[1]))
        } else {
            message.channel.send("You didnt enter 2 words to combine")
        }


    }, {
        name: "combine",
        aliases: ["combine", "merge"],
        cooldown: 0,
        cooldownMessage: "",
        usage: "{prefix}{cmd} <word1> <word2>",
        description: "This command combines 2 words!"
    }
)