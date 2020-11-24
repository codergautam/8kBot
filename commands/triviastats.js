const Discord = require("discord.js")
const api = require("../api")
module.exports = {
    name: "triviastats",
     execute(message, args) {

         var dauser = (message.mentions.members.first()?message.mentions.members.first():message.author)
         var avatar = (dauser.user?dauser.user.avatarURL():dauser.avatarURL())
        api.getUser(dauser.id)
        .then((user) => {
            if(!user.hasOwnProperty("trivia")) {
                user.trivia = {
                    streak: 0,
                    highstreak: 0,
                    correct: {
                        easy: 0,
                        medium: 0,
                        hard: 0
                    },
                    wrong: {
                        easy: 0,
                        medium: 0,
                        hard: 0
                    }
                }
            }
            var trivia = user.trivia
            var total = trivia.correct.easy+trivia.correct.medium+trivia.correct.hard+trivia.wrong.easy+trivia.wrong.medium+trivia.wrong.hard
            var wrong = trivia.wrong.easy+trivia.wrong.medium+trivia.wrong.hard
            var right = trivia.correct.easy+trivia.correct.medium+trivia.correct.hard
            const embed = new Discord.MessageEmbed()
            .setAuthor(user.name, avatar)
            .setTitle("Trivia Stats!")
            .setDescription(`**Total trivia games played: ${total}**\n**Highest streak: ${trivia.highstreak}**\n\nTotal correct answers: ${right}\nTotal wrong answers: ${wrong}\nCurrent streak: ${trivia.streak}`)
            message.channel.send(embed)
    })
    }
    }