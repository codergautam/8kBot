var yahooStockPrices = require("yahoo-stock-prices")

const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
  async (message, args, client, addCD) => {

    const data = await yahooStockPrices.getCurrentData('VTI');
    var user = await api.getUser(message.author.id)
    var stockbal = user.hasOwnProperty("stocks") ? user.stocks : 0

    if(!user.hasOwnProperty("stocks")) user.stocks = 0

    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle("Selling stocks")
      .setDescription("How many stocks do you want to sell? \n Please respond within 20 seconds\n\nCURRENT STOCK PRICE: `"+data.price+"`")
      .setFooter("You have " +api.numberWithCommas(stockbal) + " stocks")
    message.channel.send(embed)
    const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
    collector.on("collect", (message23) => {
      if (isNaN(Number(message23.content)) || Number(message23.content) < 1 || !Number.isInteger(Number(message23.content))) {
        message23.channel.send("Pls enter a valid number... \n Run the command again")
      } else {
        amount = Number(message23.content)
        if (stockbal >= amount) {
          var amount = Number(message23.content)
          const priceEarn = Math.ceil(amount*data.price)
          
          user.stocks -= amount
          user.bal += priceEarn


              api.modUser(message.author.id, user)
                .then(() => {
                  const embe45d = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Sold`)
                    .setDescription(`You sold \`${api.numberWithCommas(amount)}\` stocks for \`${api.numberWithCommas(priceEarn)}\` coins!\nYour total balance is \`${api.numberWithCommas(user.bal)}\`\nYou have \`${api.numberWithCommas((user.stocks))}\` stocks left!`)
                  message.channel.send(embe45d)

                  
                })
                .catch((err) => {
                  console.log(err)
                })

          

        } else {
          const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("You dont have `" + amount + "stocks`")
          message.channel.send(embed)
        }

      }
    })


  }, {
    name: "sellstock",
    aliases: ["sellstock", "sellstocks", "ss"],
    cooldown: 0,
    cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
    perms: ["SEND_MESSAGES"],
    description: "Sell some stocks!"
  }
)