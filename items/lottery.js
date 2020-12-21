const Discord = require('discord.js')
const { type } = require('jquery')
const api = require('../api')
module.exports = {
    
	name: 'lottery',
	use(message, userItem, user) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Enter the Lottery")
        .setDescription("How many tickets do you want to enter in this lottery?")
        .setFooter("Respond with a number from 1 - "+userItem.amount+"\nPlease respond within 20 seconds")
        message.channel.send(embed)
        const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
        collector67.on("collect", (message23) => {
            if(isNaN(parseInt(message23.content)) || parseInt(message23.content) < 1) {
                message23.channel.send("Pls enter a valid number... \n Run the command again")
            } else {
            amount = parseInt(message23.content)
            if(userItem.amount >= amount) {
var randm = Math.floor(Math.random()*100)+1
if(randm == 1) {
    var moneyEarned = 100000 * amount
    var typ1e = "MEGA MEGA JACKPOT!!!!!🤑🤑🤑🤑"
} else if(randm >=2 && randm <= 9) {
   var moneyEarned = 10000 * amount
    var typ1e = "JACKPOT!!!!!💰💰💰"
} else if(randm >= 60 && randm <=100) {
   var moneyEarned = 1000 * amount
   var typ1e = "Quik Cash💵💵"
} else {
 var   moneyEarned = 0
  var typ1e = "Nothing :("
}
message.channel.send("WAITING FOR LOTTERY RESULTS!!!")
.then((msg) => {
    user.bal = user.bal + moneyEarned
    user.inv.lottery.amount = userItem.amount -amount;
    if(user.inv.lottery.amount == 0 ) {
        delete user.inv.lottery
    }
    api.modUser(message.author.id, user)
    .then(() => {
        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Lottery Results")
            .setDescription("You won "+typ1e+"\nYou got `"+moneyEarned+"` coins!")
            msg.delete()
            msg.channel.send(embed)
        }, 1000)
    })
    .catch(() => {
        message23.channel.send("Something went wrong. Pls try again")
    })


})


            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You dont have `"+amount+"` lottery tickets!")
                message.channel.send(embed)
                
            }
        }
        })
		}
    }
