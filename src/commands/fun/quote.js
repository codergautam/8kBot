const Discord = require("discord.js");
const simpleCommand = require("../../core/simpleCommand")
const request = require("request")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        request("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?", (er, res, body) => {
            let data = JSON.parse(body);
            let { quoteText, quoteAuthor } = data;
            const embed = new Discord.MessageEmbed()
                .setAuthor(quoteAuthor)
                .setTitle(quoteText)
            message.channel.send(embed)
        });
    }, {
        name: "quote",
        aliases: ["quote"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "Shows a random quote."
    }
)