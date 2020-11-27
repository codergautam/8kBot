
const fetch = require("node-superfetch")
const Discord = require("discord.js")
const html = new (require("html-entities").XmlEntities)
const api = require("../api")
module.exports = {
    name: "trivia",
    async execute(message, args) {
        api.getUser(message.author.id)
        .then((user) => {
            api.checkCool(message.author.id, "trivia")
            .then((cooldown) => {
                    if(cooldown.cooldown) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Cooldown")
                        .setDescription(`You just played trivia! You can play it again in \`${api.convertMS(cooldown.msleft)}\``)
                        message.channel.send(embed)
                    } else {
                 

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

        fetch.get("https://opentdb.com/api.php?amount=1&type=boolean")
        .then((data) => {
        
            var body = data.body.results[0]

        
        body.question = html.decode(body.question)
        var correct = body.correct_answer.toLowerCase() == "true"

        const embed = new Discord.MessageEmbed()
        .setTitle("Trivia!")
        .setDescription(`**${body.question}**\n\nRespond with \`true\` or \`false\`\nYou have 30 seconds to answer!`)
        .setFooter(`Category: ${body.category}\nDifficulty: ${body.difficulty}`)
        message.channel.send(embed)
        //create collector
        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{time: 30000})
        var collected = false
        collector.on("collect", (msg) => {
            if(msg.content.toLowerCase() == "true" || msg.content.toLowerCase() == "false") {
                var answered = msg.content.toLowerCase() == "true"
                if(answered ? correct : !correct) {
                    //right
                    collected = true
                    correctmsg(message, body, user)
                    collector.stop()
                } else {
                    //wrong
                    collected = true
                    wrongmsg(message, body, user)
                    collector.stop()
                }
            } else {
                message.channel.send(`${message.member}, You can only respond with **true** or **false**!`)
            }
        })
        collector.on("end", () => {
            if(!collected) {
                message.channel.send(`${message.member}, Time is up!\nThe correct answer was: \`${body.correct_answer.toLowerCase()}\``)
                api.addCool(message.author.id, "trivia", 20000)
            }
        })
        
    })

}
                    
})
    
    })
    .catch(() => {
        message.channel.send("Something went wrong try again")
    })
    }
}

const wrongmsg = (message, body, user) => {
    user.trivia.streak = 0
    user.trivia.wrong[body.difficulty.toLowerCase()] += 1
    api.modUser(message.author.id, user)
    .then(() =>{
const embed = new Discord.MessageEmbed()
.setTitle("Wrong!")
.setColor("RED")
.setDescription(`The correct answer was \`${body.correct_answer.toLowerCase()}\`\n\nYou gained 0 coins lol and your streak is 0`)
.setFooter(`Type 8k!triviastats to see your trivia stats!`)
message.channel.send(embed)
api.addCool(message.author.id, "trivia", 20000)
    })
}
const correctmsg = (message, body, user) => {
    var moneygain = (body.difficulty.toLowerCase() == "easy" ? 500 : (body.difficulty.toLowerCase() == "medium" ? 1000 : 2000)) + (user.trivia.streak *100)
    user.bal += moneygain
    user.trivia.streak += 1
    if(user.trivia.streak > user.trivia.highstreak) user.trivia.highstreak = user.trivia.streak;
    
    user.trivia.correct[body.difficulty.toLowerCase()] += 1
    api.modUser(message.author.id, user)
    .then(() =>{
        const embed = new Discord.MessageEmbed()
        .setTitle("Correct!")
        .setColor("GREEN")
        .setDescription(`You got the answer right! Nice job!!\n\nYou gained \`${moneygain}\` coins and your new streak is ${user.trivia.streak}!`)
        .setFooter(`Type 8k!triviastats to see your trivia stats!`)
        message.channel.send(embed)
        api.addCool(message.author.id, "trivia", 20000)
    })

    }

  