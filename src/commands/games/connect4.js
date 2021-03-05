const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
var connectfour = require("../../extras/c4")
const Discord = require("discord.js")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I need the manage messages permission to play this game")
        var user1 = message.author
        var user2 = message.mentions.members.first()
        var wager = args[1]


        if (user2) {
            if (user2.id == user1.id) {
                message.channel.send("You cant play against yourself")
            } else {
                var user1d = await api.getUser(user1.id)
                var user2d = await api.getUser(user2.id)

                if (Number.isInteger(Number(wager)) && Number(wager) <= user1d.bal && Number(wager) <= user1d.bal && Number(wager) >= 1) {
                    ask(Number(wager), user1d, user2d, message)
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Connect 4")
                        .setDescription("How much money do you bet to win?\nType `0` for a friendly match!")
                        .setFooter("Respond with a number from 0 - " + (user1d.bal < user2d.bal ? user1d.bal : user2d.bal) + "\nPlease respond within 20 seconds")
                    message.channel.send(embed)
                    const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                    collector67.on("collect", (message23) => {
                        if (isNaN(Number(message23.content)) || Number(message23.content) < 0 || !Number.isInteger(Number(message23.content))) {
                            message23.channel.send("Pls enter a valid number... \n Run the command again")
                        } else {
                            if (Number(message23.content) > user1d.bal) {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("You dont have `" + Number(message23.content) + "` coins! \nYou only have `" + user1d.bal + "` coins!")
                                    .setFooter("Please run the command again")
                                message.channel.send(embed)
                            } else if (Number(message23.content) > user2d.bal) {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle(user2d.name + " doesnt have `" + Number(message23.content) + "` coins! \nThey only have `" + user2d.bal + "` coins!")
                                    .setFooter("Please run the command again")
                                message.channel.send(embed)
                            } else {
                                ask(Number(message23.content), user1d, user2d, message)
                            }
                        }
                    })
                }


            }
        } else {
            message.channel.send("You didnt tag anyone to play with")
        }


    }, {
        name: "connect4",
        aliases: ["c4", "connect4", "connectfour", "cfour"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
        usage: "{prefix}{cmd} <@user> [wager]",
        description: "Allows you to play Connect four with another user! Wager is the amount they will pay you if you beat them, if you lose, you will have to pay them that much"
    })

function ask(betmoney, user1d, user2d, message) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${user2d.name} was challenged to a Connect Four game!`)
        .setDescription(`${user1d.name} challenged ${user2d.name} to a game of Connect 4!\n<@${user2d.id}> Do you accept?\nYou will lose \`${betmoney}\` coins if you lose. You will win \`${betmoney}\` coins if you win the game!`)
        .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
    message.channel.send(embed)

    var x = false
    const collector67 = message.channel.createMessageCollector(m => m.author.id == user2d.id, { max: 1, time: 20000 })
    collector67.on("collect", (coolmesgae) => {
        if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Challenge Accepted`)
            message.channel.send(embed)
            x = true
            if (Math.random() <= 0.5) {
                var player1 = {
                    name: user1d.name,
                    id: user1d.id
                }
                var player2 = {
                    name: user2d.name,
                    id: user2d.id
                }
            } else {
                var player1 = {
                    name: user2d.name,
                    id: user2d.id
                }
                var player2 = {
                    name: user1d.name,
                    id: user1d.id
                }
            }
            new connectfour(player1, player2, message.channel, win, tie, betmoney)
        }
    })
    collector67.on("end", () => {
        if (!x) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Challenge Expired`)
            message.channel.send(embed)
        }
    })
}

//Win, draw functions
function win(winner, loser, betmoney, channel) {
    api.changeBal(loser.id, -betmoney)
        .then(() => {
            api.changeBal(winner.id, betmoney)
                .then(() => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(winner.name + " wins!")
                        .setDescription(`${winner.name} beat ${loser.name} in Connect four!\n${winner.name} gained \`${betmoney}\` coins and ${loser.name} lost \`${betmoney}\` coins rip.`)
                        .setFooter(`"connect four is rigged bruh, I DEMAND A REMATCH" -${loser.name}`)
                    channel.send(embed)
                })
                .catch(() => {
                    channel.send("Unexpected error lol")
                })
        })
        .catch(() => {
            channel.send("Unexpected error bruh")
        })
}

function tie(timeup, channel, playerlose, playerwin, betmoney) {
    if (timeup) {
        api.changeBal(playerlose.id, -betmoney)
            .then(() => {
                api.changeBal(playerwin.id, betmoney)
                    .then(() => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(playerlose.name + " took to much time!")
                            .setDescription(`${playerlose.name} took to much time!\n${playerwin.name} gained \`${betmoney}\` coins and ${playerlose.name} lost \`${betmoney}\` coins sad.`)
                            .setFooter(`"i wasnt stalling the game." -${playerlose.name}`)
                        channel.send(embed)
                    })
                    .catch((err) => {
                        channel.send("Unexpected error lol ```" + err.toString() + "```")
                    })
            })
            .catch(() => {
                channel.send("Unexpected error bruh")
            })
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle("Match draw")
            .setDescription(`${playerlose.name} tied with ${playerwin.name} in Connect four!\nNobody gained or lost any coins qwq.`)
            .setFooter(`"i. want. money. now." -${playerwin.name}`)
        channel.send(embed)
    }
}