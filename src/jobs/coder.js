const Discord = require('discord.js');
const api = require('../core/api');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: 'coder',
    interview(message, callback, user) {
        if (!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if (!user.inv.hasOwnProperty("laptop")) {
            message.channel.send("You need a laptop to be a coder!\nYou can buy one buy typing `8k!buy laptop`")
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle("JOB INTERVIEW FOR CODER\n*Question 1:*")
                .setDescription("Do you like coding?")
                .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
            message.channel.send(embed)
            const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
            collector.on('collect', (msg) => {
                if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {

                    if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                        pass1 = true
                    } else {
                        pass1 = false
                    }
                    const embed = new Discord.MessageEmbed()
                        .setTitle("JOB INTERVIEW FOR CODER\n*Question 2:*")
                        .setDescription("Is this valid JS code?\n```js\nalert(\"Hello world')\n```")
                        .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
                    message.channel.send(embed)
                    const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                    collector.on('collect', (msg) => {
                        if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {
                            if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                                pass2 = false
                            } else {
                                pass2 = true
                            }

                            if (pass1 && pass2) {
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
        if (!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if (!user.inv.hasOwnProperty("laptop")) {
            message.channel.send("You need a laptop to code!\nYou can buy one buy typing `8k!buy laptop`")
        } else {
            if(!user.hasOwnProperty("appusers")) {
                user.appusers = 0
            }
            var coded = ["A social media app", "A video game", "An operating system", "A chatting app", "A health app", "A fitness tracker app"][Math.floor(Math.random() * 6)];
            var users = getRandomInt(50000, 150000)
           
            var moneyEarn = Math.round(users / 10)
            var extraEarn = getRandomInt(0, user.appusers)
            var extraText = ""
            if(extraEarn != 0) {
                var extratext = `You also gained \`${api.numberWithCommas(extraEarn)}\` coins from your previous creations!\n`
            }
             user.appusers += Math.round(users / 3)
            user.bal += moneyEarn+extraEarn

                    if (getRandomInt(1, 8) == 3) {
                        user.inv.laptop.amount -= 1
                        if (user.inv.laptop.amount == 0) {
                            delete user.inv.laptop
                        }

                                message.channel.send(`You made **${coded}** and gained **${api.numberWithCommas(users)}** users!\nYou gained \`${api.numberWithCommas(moneyEarn)}\` coins! \n${extraText}**But one sad thing, You're laptop broke... ;(**`)
                            
                    } else {
                        message.channel.send(`You made **${coded}** and gained **${api.numberWithCommas(users)}** users!\nYou gained \`${api.numberWithCommas(moneyEarn)}\` coins!\n${extraText}Niceee application bro!`)
                      
                    }
                    callback(user)

                
                .catch(() => {
                    message.channel.send("Error")
                })
        }
    }
}
