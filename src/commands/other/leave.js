const db = require("quick.db")
const loops = new db.table("loops")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (message.member.voice.channel) {
            message.member.voice.channel.leave();
            message.channel.send("Left **" + message.member.voice.channel.name + "**")
        } else {
            message.channel.send("You're not in a voice channel?")
        }

    }, {
        aliases: ["leave", "stop"],
        usage: "{prefix}{cmd}",
        description: "Leaves the voice channel and stops music.",
        name: 'loop',
        cooldown: 0
    }
)