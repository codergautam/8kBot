const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var int = api.getRandomInt(1, 100)
        var emojis = ["😂", "😭", "🥺", "🤣", "✨", "😍", "🙏", "😊", "🥰"]
        if (int < 50) {
            if (int == 1) var win = 100000
            if (int > 1 && int < 10) var win = 10000
            if (int > 9 && int < 20) var win = 1000
            if (int > 19) var win = api.getRandomInt(10, 1000)
        } else {
            var win = 0

        }



        //slots render thing
        var one = [api.randomFromArray(emojis), api.randomFromArray(emojis), api.randomFromArray(emojis)]
        var two = [api.randomFromArray(emojis), api.randomFromArray(emojis), api.randomFromArray(emojis)]
        var three = [api.randomFromArray(emojis), api.randomFromArray(emojis), api.randomFromArray(emojis)]

        var emoji = api.randomFromArray(emojis)
        var shuffled = emojis.sort(function() { return .5 - Math.random() });


        if (win == 1000000 || win == 10000) {
            var four = [emoji, emoji, emoji]
        } else {
            var four = [emoji, emoji, api.randomFromArray(emojis)]
        }
        if (!win > 0) var four = shuffled.slice(0, 3)
        addCD()
            //send messages
        message.channel.send(`${one.join(" | ")} Spinning`)
            .then((msg) => {
                setTimeout(() => {
                    msg.edit(`${two.join(" | ")} Spinning faster`)
                        .then((msg) => {
                            setTimeout(() => {
                                msg.edit(`${three.join(" | ")} Did you win?!`)
                                    .then((msg) => {
                                        setTimeout(() => {
                                            if (win == 0) {
                                                return msg.edit(`${four.join(" | ")} you won nothing lol`);
                                            }
                                            api.changeBal(message.author.id, win).then(() => {

                                                msg.edit(`${four.join(" | ")} you won ${api.numberWithCommas(win)} nice job lol`)

                                            })

                                        }, 1000)
                                    })
                            }, 500)
                        })
                }, 1000)
            })



    }, {
        name: "slots",
        aliases: ["slots", "slot"],
        cooldown: 2000,
        cooldownMessage: "Dont play slots too much!\nYou can play slots again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "Play slots lol!"
    }
)