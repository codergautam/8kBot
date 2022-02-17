var yahooStockPrices = require("yahoo-stock-prices")

const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
  async (message, args, client, addCD) => {

    const data = await yahooStockPrices.getCurrentData('VTI');
    var user = await api.getUser(message.author.id)

    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle("Buying Stocks")
      .setDescription("How many stocks do you want? \n Please respond within 20 seconds\n\nCURRENT STOCK PRICE: `"+data.price+"`")
      .setFooter("You can buy up to " + api.numberWithCommas(Math.floor(user.bal / data.price)) + " stocks")
    message.channel.send(embed)
    const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
    collector.on("collect", (message23) => {
      if (isNaN(Number(message23.content)) || Number(message23.content) < 1 || !Number.isInteger(Number(message23.content))) {
        message23.channel.send("Pls enter a valid number... \n Run the command again")
      } else {
        var amount = Number(message23.content)
        var price = Math.floor(data.price* amount)
        //add inventory if does not exist
        if (!user.hasOwnProperty("stocks")) {
          user.stocks = 0
        }

        //check if user has enough money to buy item
        if (user.bal - price < 0) {
          const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Not Enough Coins")
            .setDescription("You need `" + (user.bal - price) * -1 + "` more coins to buy " + amount + " stocks")
          message.channel.send(embed)
        } else {
          //BUY THE ITEM
          user.stocks +=  amount 
          user.bal = user.bal - price
          //Save their new data
          api.modUser(message.author.id, user)
            .then(() => {
              const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle("Purchase Successful!")
                .setDescription("Congrats! You bought `" + api.numberWithCommas(amount) + "` stocks for `" + api.numberWithCommas(price) + "` coins!\nYour remaining balance is `" + api.numberWithCommas(user.bal) + "`")
                .setFooter("Sell stocks with 8k!sellstocks")
              message.channel.send(embed)
            })
           
        }

      }

    })

  }, {
    name: "buystocks",
    aliases: ["buystock", "buystocks", "bs"],
    cooldown: 0,
    cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
    perms: ["SEND_MESSAGES"],
    description: "Buy some stocks!"
  }
)