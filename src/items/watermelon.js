const Discord = require('discord.js')
const api = require('../core/api')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {

    name: 'watermelon',
    use(message, userItem, user) {
        api.checkCool(message.author.id, "watermelon")
            .then((cooldown) => {
                if (cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Cooldown")
                        .setDescription("You just ate a watermelon!\nYou can eat another one in `" + api.convertMS(cooldown.msleft) + "`")
                    message.channel.send(embed)
                } else {
                    if (getRandomInt(1, 50) == 7) {
                        var moneyEarn = 500000
                        var type = "LEGENDARY GOLDEN WATERMELON. YUM!"
                    } else {
                        var dfgd = Math.floor(Math.random() * 8 + 1)
                        if (dfgd == 1) {
                            var moneyEarn = 0
                            var type = "Rotten watermelon *bleh*"
                        } else if (dfgd == 2) {
                            var moneyEarn = 5000
                            var type = "Old watermelon.. "
                        } else if (dfgd == 3 || dfgd == 4 || dfgd == 5 || dfgd == 6) {
                            var moneyEarn = 11000
                            var type = "Juicy watermelon. *nice* "
                        } else if (dfgd == 7 || dfgd == 8) {
                            var moneyEarn = 20000
                            var type = "Red sweet watermelon. *yum* "
                        }
                    }
                    user.inv.watermelon.amount = userItem.amount - 1
                    user.bal = user.bal + moneyEarn
                    if (user.inv.watermelon.amount == 0) {
                        delete user.inv.watermelon
                    }
                    api.modUser(message.author.id, user)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Ate watermelon")
                                .setDescription("That was a " + type + "\nYou got `" + moneyEarn + "` coins!")

                            message.channel.send(embed)
                            api.addCool(message.author.id, "watermelon", 5000)
                                .catch(() => {

                                })
                        })

                    .catch(() => {
                        message.channel.send("Something went wrongg")
                    })
                }
            })
    }
}