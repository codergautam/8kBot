const Discord = require('discord.js');
const api = require('../core/api');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: 'teacher',
    interview(message, callback) {
        const embed = new Discord.MessageEmbed()
            .setTitle("JOB INTERVIEW FOR TEACHER\n*Question 1:*")
            .setDescription("Do you like teaching?")
            .setFooter("Answer with 'Y' or 'N'\nPlease respond within 20 seconds")
        message.channel.send(embed)
        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
        collector.on('collect', (msg) => {
            if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "n" || msg.content.toLowerCase() == "no") {

                if (msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "yes") {
                    pass = true
                } else {
                    pass = false
                }

                callback(pass)

            } else {
                message.channel.send("You didn't enter Y or N... Try again later")
            }

        })
    },
    work(message, callback) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Teaching Results")
        var num = Math.floor(Math.random() * 10) + 1;
        if (num == 1) {
            var moneyEarned = getRandomInt(1500, 3000)
            embed.setDescription("Your students started sleeping in class\nYou got `" + moneyEarned + "` coins!")
        } else if (num == 2) {
            var moneyEarned = 2000 + getRandomInt(12000, 30000)
            var dd = moneyEarned - 2000
            embed.setDescription("YOUR STUDENTS LOVED YOUR LESSON!!! \n You got `2000` coins and an extra `" + dd + "` coins from a student!")
        } else if (num == 3) {
            var moneyEarned = 0
            embed.setDescription("You took your students on a field trip and they hated it.\nYou get 0 coins lol")
        } else if (num == 4) {
            var moneyEarned = 1500 + getRandomInt(400, 500)
            var dd = moneyEarned - 1500
            embed.setDescription("You taught your kids well! \nYou got 1500 coins and an extra `" + dd + "` coins from the princapal")
        } else if (num == 5) {
            var moneyEarned = getRandomInt(1000, 3000)
            embed.setDescription("Your students didnt pay attention to you teaching that much\nYou get `" + moneyEarned + "` coins")
        } else if (num == 6) {
            var moneyEarned = getRandomInt(1700, 3000)
            embed.setDescription("You were tired but still a good teacher.\n You got `" + moneyEarned + "` coins")
        } else if (num == 7) {
            var moneyEarned = getRandomInt(1500, 3000)
            embed.setDescription("You got mad at that one kid who was playing video games during class\n `" + moneyEarned + "` coins")
        } else {
            var moneyEarned = getRandomInt(1700, 3000)
            embed.setDescription("Today was an uneventful day\nYou got `" + moneyEarned + "` coins")
        }

        message.channel.send(embed)
        callback(moneyEarned)
    }
}
