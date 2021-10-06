const Discord = require('discord.js');

const api = require('../core/api');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: 'gamer',
    interview(message, callback, user) {
        if (!user.hasOwnProperty("inv")) {
            user.inv = {}
        }
        if (!user.inv.hasOwnProperty("laptop") || !user.inv.hasOwnProperty("headset")) {
            message.channel.send("You need a laptop AND a headset to work as a gamer!\nYou can buy them buy typing `8k!buy laptop` and `8k!buy headset`")
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle("JOB INTERVIEW FOR GAMER\n*Question 1:*")
                .setDescription("Do you play Fortnite??")
                .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
            message.channel.send(embed)
            const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
            collector.on('collect', (msg) => {
                if (msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no" || msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {

                    if (msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {
                        pass = true
                    } else {
                        pass = false
                    }

                    callback(pass)

                } else {
                    message.channel.send("You didn't enter Y or N... Try again")
                }

            })
        }
    },
    work(message, callback, user) {
        if (!user.hasOwnProperty("inv")) {
            user.inv = {}

        }
        if (!user.inv.hasOwnProperty("laptop") || !user.inv.hasOwnProperty("headset")) {
            message.channel.send("You need a laptop AND a headset to work as a Gamer!\nYou can buy them buy typing `8k!buy laptop` and `8k!buy headset`")
        } else {
            
            const embed = new Discord.MessageEmbed();
            embed.setTitle("Gamer Results")
            var num = getRandomInt(1, 10);
            if (!user.hasOwnProperty("gamerxp")) user.gamerxp = 0
            if (num == 1 || num == 2) {

                var moneyEarned = getRandomInt(0, user.gamerxp)
                embed.setDescription(`You played pretty bad\nYou got 0 xp\nYou earned ${moneyEarned} coins`)

            } else if (num == 3 || num == 4 || num == 5) {
                var xpGained = getRandomInt(5,100)
                user.gamerxp += xpGained
                var moneyEarned = xpGained + getRandomInt(user.gamerxp / 3, user.gamerxp)
                embed.setDescription(`You played averagely. \nYou gained \`${xpGained}\` xp!\nYou got \`${api.numberWithCommas(moneyEarned)}\` coins!`)
            } else if (num == 6 || num == 7) {
                var xpGained = getRandomInt(100,1000)
                user.gamerxp += xpGained
                var moneyEarned = xpGained + getRandomInt(user.gamerxp/2, user.gamerxp * 1.1)
                embed.setDescription(`Your played pretty well!\nYou gained \`${api.numberWithCommas(xpGained)}\` xp!\nYou got \`${api.numberWithCommas(moneyEarned)}\` coins!`)
            } else if (num == 8 || num == 9) {
            
                var xpLost = getRandomInt(user.gamerxp/3,user.gamerxp/1.5)
                user.gamerxp -= xpLost
                var moneyEarned = 0
                embed.setDescription(`Your gaming skills WAS TRASH!\nYou LOST \`${api.numberWithCommas(xpLost)}\` xp!\nYou got \`${api.numberWithCommas(moneyEarned)}\` coins!\nTerribleeeee plays lol`)
            
            } else {
                var xpGained = getRandomInt(1000,10000)
                user.gamerxp += xpGained
                var moneyEarned = xpGained + getRandomInt(user.gamerxp * 5, user.gamerxp * 15)
                embed.setDescription(`You played LIKE A GOD!!.\nYou gained \`${api.numberWithCommas(xpGained)}\` xp!\nYou got 0 coins!\nInsaneee plays lol`)
            }
            
            user.gamerxp = Math.ceil(user.gamerxp)
            user.bal += moneyEarned 

            embed.setFooter(`You have ${api.numberWithCommas(user.gamerxp)} xp!`)
            message.channel.send(embed)

            callback(user)
        }
    }
}
