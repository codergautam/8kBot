const Discord = require('discord.js');
const api = require('../api');
const { use } = require('../items/lottery');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
	name: 'coder',
	interview(message, callback, user) {
        if(!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if(!user.inv.hasOwnProperty("laptop")) {
            message.channel.send("You need a laptop to be a coder!\nYou can buy one buy typing `8k!buy laptop`")
        } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("JOB INTERVIEW FOR CODER\n*Question 1:*")
        .setDescription("Do you like coding?")
        .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
        message.channel.send(embed)
        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
        collector.on('collect', (msg) => {
            if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {

                 if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                    pass1 = true
                 } else {
                    pass1 = false
                 }
                 const embed = new Discord.MessageEmbed()
                 .setTitle("JOB INTERVIEW FOR CODER\n*Question 2:*")
                 .setDescription("Is this valid JS code?\n```js\nalert(\"Hello world')\n```")
                 .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
                 message.channel.send(embed)
                 const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
                 collector.on('collect', (msg) => {
                    if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {
                        if(msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                            pass2 = false
                         } else {
                            pass2 = true
                         }

                         if(pass1&&pass2) {
                             callback(true)
                         } else {
                            callback(false)
                         }
                    } else {
                        message.channel.send("You didn't enter Y or N... Try again later")
                    }
                 })
                 

            } else {
                message.channel.send("You didn't enter Y or N... Try again later")
            }
        
        })
    }
    },
    work(message, callback, user) {
        if(!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if(!user.inv.hasOwnProperty("laptop")) {
            message.channel.send("You need a laptop to code!\nYou can buy one buy typing `8k!buy laptop`")
        } else {
            var coded = ["A social media app", "A video game", "An operating system", "A chatting app"][Math.floor(Math.random() * 4)];
            var users = getRandomInt(50000, 150000)
            var moneyEarn = Math.round(users / 10)

            api.changeBal(user.id, moneyEarn)
                .then(() => {
                    if(getRandomInt(1,5) ==3) {
                        user.inv.laptop.amount -= 1
                        if(user.inv.laptop.amount == 0) {
                            delete user.inv.laptop
                        }
                        api.modUser(user.id, user)
                        .then(() => {
                            message.channel.send(`You made **${coded}** and gained **${users}** users!\nYou gained \`${moneyEarn}\` coins! \n**But one sad thing, You're laptop broke... ;(**`)
                        })
                    } else {
                        message.channel.send(`You made **${coded}** and gained **${users}** users!\nYou gained \`${moneyEarn}\` coins! Niceee application bro!`)
                        
                    }
                    callback(moneyEarn)

                })
                .catch(() => {
                    message.channel.send("Error")
                })
    }
}
}

