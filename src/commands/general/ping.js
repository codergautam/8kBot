const api = require("../../core/api")
const Discord = require("discord.js");


const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        message.channel.send("Ping...").then(async m => {
            var one = Date.now()
            await api.getAll()
            var mongoping = Date.now() - one
            var ping = m.createdTimestamp - message.createdTimestamp;


            var embed = new Discord.MessageEmbed()
                .setTitle(`Pong🏓\n\nDiscord Api: ${ping} ms\nWebsocket Delay: ${client.ws.ping} ms\nMongoDB Atlas: ${mongoping} ms`)

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