
const Discord = require("discord.js")
module.exports = {
    name: "ping",
    execute(message, args, client) {

        message.channel.send("Ping...").then(m =>{

            var ping = m.createdTimestamp - message.createdTimestamp;
    
    
            var embed = new Discord.MessageEmbed()
            .setTitle(`Pong🏓\n${ping} MS`)
            
            m.edit(embed)
        });
}
}

