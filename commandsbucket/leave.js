
module.exports = {
    name: "leave",
    aliases: ["leave", "stop"],
    secret: false,
    category: "other",
    format: "",
    usage: [""],
    description: "Leaves the voice channel and stops the currently playing song!", 
    execute(message, args, client) {
 
        console.log(client.voice.broadcasts)

        if(message.member.voice.channel) {
            message.member.voice.channel.leave();
            message.channel.send("Left **"+message.member.voice.channel.name+"**")
        } else {
            message.channel.send("Make sure your in the same voice channel as 8k!")
        }
        
    }
}

