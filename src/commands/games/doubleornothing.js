const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require('discord.js')

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)
        var message23 = {
            content: args[0]
        }
        if (isNaN(message23.content) || !Number.isInteger(Number(message23.content)) || Number(message23.content) < 1 || Number(message23.content) > user.bal) {
            ask(user, message)
        } else {
            var money = Number(message23.content)
            user.bal = user.bal - money

            api.modUser(message.author.id, user)
                .then(async() => {
                    await addCD()
                    doubleornothing(money, 0, message)
                })



            .catch(() => {
                message.channel.send("An error occured")
            })
        }


    }, {
        name: "doubleornothing",
        aliases: ["don"],
        cooldown: 60000,
        cooldownMessage: "You just played Double Or Nothing!\nYou can play again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} [moneyToDouble]",
        description: "A fun little game where you can enter some money and you can randomly double it or lose it all! For example, if you put 100 coins you have a %50 chance of getting 0 or getting 200"
    }
)

function randomBoolean() {
    return Math.random() <= 0.5;
}

function doubleornothing(money, streak, message) {
    api.getUser(message.author.id)
        .then((user) => {


            var double = randomBoolean()
            const embed = new Discord.MessageEmbed()
                .setTitle("Did it double??")
            message.channel.send(embed)
                .then((msggg) => {
                    setTimeout(() => {
                        const embed11 = new Discord.MessageEmbed()
                            .setTitle("Did it go away!??")
                        msggg.edit(embed11)
                            .then((lol) => {
                                setTimeout(() => {
                                    lol.delete()
                                    if (double) {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(user.name, message.author.avatarURL())
                                            .setTitle("It doubled!!!!")
                                            .setDescription(`Your original ${money} has now doubled to ${money*2}!!!\nWould you like to take this money, or try again for a %50 chance to double it AGAIN!!!\n\n\n\`take\` - Take this money and keep it\n\`double\` - Try to double your money AGAIN!!! (%50 chance)`)
                                            .setFooter("Respond with an above option\nYou have 1 minute to respond.")
                                        message.channel.send(embed)
                                        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { time: 60000 })
                                        var collected = false
                                        collector.on("collect", (message23) => {
                                            var text = message23.content.toLowerCase().trim()
                                            if (text == "keep" || text == "take") {
                                                collected = true
                                                collector.stop()
                                                api.changeBal(message.author.id, money * 2)
                                                    .then(() => {
                                                        const embed1111 = new Discord.MessageEmbed()
                                                            .setAuthor(user.name, message.author.avatarURL())
                                                            .setTitle("Money withdrawn!")
                                                            .setDescription(`You gained ${money*2} coins!!\nYour money was doubled ${streak+1} times`)
                                                            .setFooter(`"i got some ez cashhhh" - ${user.name}`)
                                                        message.channel.send(embed1111)

                                                    })
                                                    .catch(() => {
                                                        message.channel.send("err0r")
                                                    })
                                            } else if (text == "double" || text == "duble" || text == "again") {
                                                collected = true
                                                collector.stop()

                                                doubleornothing(money * 2, streak + 1, message)
                                            } else {
                                                message.channel.send("**Invalid option**\nMake sure to type `take` or `double`\nYou can type it again")
                                            }
                                        })

                                        collector.on("end", () => {
                                            if (!collected) {

                                                api.changeBal(message.author.id, money * 2)
                                                    .then(() => {
                                                        message.channel.send("**1 minute has passed**\nYour money has been withdrawn automatically due to inactivity..")
                                                    })
                                                    .catch(() => {
                                                        message.channel.send("err")
                                                    })

                                            }
                                        })
                                    } else {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(user.name, message.author.avatarURL())
                                            .setTitle("You lost it!!!")
                                            .setDescription(`Sad news. Your money didnt double...\nYou lost ${money} coins with a streak of ${streak}...`)
                                            .setFooter("Better luck next time..")
                                        message.channel.send(embed)
                                    }
                                }, 1000)
                            })
                    }, 1000)
                })
        })
        .catch(() => {
            message.channel.send("some glitch with db ig")
        })
}

function ask(user, message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor(user.name, message.author.avatarURL())
        .setColor('#0099ff')
        .setTitle("Double or Nothing")
        .setDescription("How much money do you enter?\nThis money may double.. or you could lose it all...")
        .setFooter("Respond with a number from 0 - " + user.bal + "\nPlease respond within 20 seconds")
    message.channel.send(embed)
    const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
    collector67.on("collect", (message23) => {
        if (isNaN(message23.content)) return message23.channel.send("That is an invalid number, try running the command again")
        if (!Number.isInteger(Number(message23.content))) return message23.channel.send("That is not an integer, try running the command again")
        if (Number(message23.content) < 1) return message23.channel.send("The number has to be atleast 1, try running the command again")
        if (Number(message23.content) > user.bal) return message23.channel.send(`You don't have \`${message23.content}\` coins!\nYou only have \`${user.bal}\` coins!`)

        var money = Number(message23.content)
        user.bal = user.bal - money

        api.modUser(message.author.id, user)
            .then(() => {

                api.addCool(message.author.id, "doubleornothing", 60000)
                    .then(() => {
                        doubleornothing(money, 0, message)
                    })

            })
            .catch(() => {
                message.channel.send("An error occured")
            })

    })
}
