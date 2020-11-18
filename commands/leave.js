
module.exports = {
    name: "leave",
    execute(message, args, client) {
 
        console.log(client.voice.broadcasts)

        if(message.member.voice.channel) {
            message.member.voice.channel.leave();
            message.channel.send("Left **"+message.member.voice.channel.name+"**")
        } else {
            message.channel.send("ur not in voice channel")
        }
        
    }
}

