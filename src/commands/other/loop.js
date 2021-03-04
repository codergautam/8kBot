const db = require("quick.db")
const loops = new db.table("loops")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (!message.member.voice.channel) return message.channel.send("You're not in a voice channel?");
        if (!loops.has(message.member.voice.channel.id.toString())) {
            loops.set(message.member.voice.channel.id.toString(), false)
        }
        var loop = loops.get(message.member.voice.channel.id.toString())
        console.log(loop)
        if (loop) {
            loop = false
            message.channel.send("Loop disabled for **" + message.member.voice.channel.name + "**")
        } else {
            loop = true
            message.channel.send("Loop enabled for **" + message.member.voice.channel.name + "**")
        }
        loops.set(message.member.voice.channel.id.toString(), loop)
    }, {
        name: "loop",
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        aliases: ["loop", "repeat"],
        usage: ["{prefix}{cmd}"],
        description: "Toggles loop for the voice channel you're currently in! Enabling loop allows your songs to play again and again even when it ends!",
    }
)