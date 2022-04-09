var yahooStockPrices = require("yahoo-stock-prices")

const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        const data = await yahooStockPrices.getCurrentData('VTI');
       var user = await api.getUser(message.author.id)
       var stockbal = user.hasOwnProperty("stocks")?user.stocks:0

               const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Stocks")
            .setDescription("1 stock = `"+data.price+"` 8k coins!\nYou own `"+api.numberWithCommas(stockbal)+"` stocks!\nYour stocks are worth `"+api.numberWithCommas(Math.ceil(stockbal*data.price))+"` coins!\n\nBuy stocks with 8k!buystocks")
        message.channel.send(embed)


    }, {
        name: "stock",
        aliases: ["stock", "stocks", "stockprice"],
        cooldown: 0,
        cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        description: "Check the current stock prices!"
    }
)