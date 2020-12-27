


const Discord = require('discord.js')
const request = require("request")

module.exports = {
    name: 'quote',
    execute(message, args) {
            request("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?", (er, res, body) => {
              try {
                let data = JSON.parse(body);
                let { quoteText, quoteAuthor } = data;
                const embed = new Discord.MessageEmbed()
                .setAuthor(quoteAuthor)
                .setTitle(quoteText)
                message.channel.send(embed)
              } catch (e) {
                const embed = new Discord.MessageEmbed()
                .setAuthor(quoteAuthor)
                .setTitle("Error")
                .setDescription("```"+e.toString()+"```")
                message.channel.send(embed)
              }
            });
    }
}