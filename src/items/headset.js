const Discord = require('discord.js')
const api = require('../core/api')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {

    name: 'headset',
    use(message, userItem, user) {
        api.checkCool(message.author.id, "headset")
            .then((cooldown) => {
                if (cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Cooldown")
                        .setDescription("You just listened to songs on your headset!\nYou can listen again in `" + api.convertMS(cooldown.msleft) + "`")
                    message.channel.send(embed)
                } else {
                    if (Math.floor(Math.random() * 50 + 1 == 30)) {
                        var moneyEarn = 50000
                        var type = "AMAZING SONG!"
                    } else {
                        var dfgd = Math.floor(Math.random() * 8 + 1)
                        if (dfgd == 1) {
                            var moneyEarn = 0
                            var type = "Bad song"
                        } else if (dfgd == 2) {
                            var moneyEarn = 1000
                            var type = "Ok song"
                        } else if (dfgd == 3 || dfgd == 4 || dfgd == 5 || dfgd == 6) {
                            var moneyEarn = 1500
                            var type = "Nice song"
                        } else if (dfgd == 7 || dfgd == 8) {
                            var moneyEarn = 2000
                            var type = "Good song!"
                        }
                    } //ok
                    var destroy = false
                    if (getRandomInt(1, 10) == 5) {
                        user.inv.headset.amount -= 1
                        if (user.inv.headset.amount == 0) {
                            delete user.inv.headset
                            destroy = true
                        }
                    }

                    user.bal += moneyEarn

                    api.modUser(message.author.id, user)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Listened to music")
                                .setDescription("That was a " + type + "\nYou got `" + moneyEarn + "` coins!" + (destroy ? "**Your headset broke get rekt ;(**" : ""))

                            message.channel.send(embed)
                            api.addCool(message.author.id, "headset", 50000)
                                .catch(() => {
                                    message.channel.send("Something went wrongg with cooldown")
                                })
                        })

                    .catch(() => {
                        message.channel.send("Something went wrongg")
                    })
                }
            })
    }
}