const api = require("../../core/api")
const Discord = require("discord.js");


const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        message.channel.send("Ping...").then(async m => {
            var one = Date.now()
            await api.getUser("875067761557127178")
            var mongoping = Date.now() - one
            var ping = m.createdTimestamp - message.createdTimestamp;


            var embed = new Discord.MessageEmbed()
                .setTitle(`Pong🏓\n\nYour Ping: ${ping} ms\nBot's Ping: ${client.ws.ping} ms\nDatabase Server's Ping: ${mongoping} ms`)

            m.edit(embed)
        });


    }, {
        name: "ping",
        aliases: ["ping"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "Shows how fast the bot is!"
    }
)
