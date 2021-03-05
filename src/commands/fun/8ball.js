const { getRandomInt } = require('../../core/api');
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var question = args.join(' ')
        if (question.trim() == "") return message.channel.send("You didnt enter a question xd")
        message.channel.send("Sending your question to the 8K gods..")
            .then((msg) => {
                setTimeout(function() {
                    msg.edit('Waiting for their reply..')
                        .then((msg) => {
                            setTimeout(function() {
                                msg.edit('Decoding their answer')
                                    .then((msg) => {
                                        setTimeout(function() {
                                            var answers = ["yus!", "nope", "no", "yes", "Idk", "Totally.", "Yup.", "Maybe", "Ok boomer", "Yessssss", "brah", "bruh", "I dont know", "How am i supposed to know?", "What? say that again", "lol no", "bruh wdym", "Brah YES!", "NO!!!", "yES", "Yes", "Yes Ofcourse", "Yes duh", "Aw yes", "Lol YEAH", "Yes of course bro", "YES!!!", "don't tell anyone but yes c:", "don't tell anyone but no :(", "sadly no", "yeah!", "YES duh", "no!", "No sorry ;(", "no", "No lol", "brah no", "No xD", "Sadly no ;(", "nope!", "aw no", "aw yesh uwu"]
                                            answer = answers[Math.floor(Math.random() * answers.length)];
                                            msg.edit("**Question: **" + question + "\n**Answer: **" + answer);

                                        }, 500)
                                    })
                            }, 700)
                        })
                }, 1000)
            })
    }, {
        name: "8ball",
        aliases: ["8ball", "question", "ask"],
        cooldown: 0,
        cooldownMessage: "",
        usage: "{prefix}{cmd} <question>",
        description: "This command answers a yes or no question!"
    }
)