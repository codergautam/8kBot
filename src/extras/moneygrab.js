const api = require("../core/api")
const { getRandomInt } = api
module.exports = (message) => {
    message.channel.send("Look theres some money on the ground!!! \n**SOMEONE TYPE** `take` **TO TAKE THE MONEY**!!")
        .then((jdjg6) => {
            var x = false
            const collector67 = message.channel.createMessageCollector(m => !(m.author.bot), { time: 20000 })
            collector67.on("collect", (message43) => {
                if (!x) {

                    if (message43.content.toLowerCase() == "catch" || message43.content.toLowerCase() == "take" || message43.content.toLowerCase() == "pick") {

                        //catch
                        var moneyetn = getRandomInt(10000, 20000)

                        api.changeBal(message43.author.id, moneyetn)
                            .then((use22r) => {
                                x = true;
                                message.channel.send(`${use22r.name} picked \`${moneyetn}\` coins from the ground nice job xd!`)
                                jdjg6.edit(`Look theres some money on the ground!!! \n**EDIT**: ${use22r.name} already picked it up!`)
                            })
                            .catch((err) => {
                                if (err.type != 0) {
                                    message43.channel.send("Something went wrong")
                                }
                            })



                    }
                }
            })
            collector67.on("end", () => {
                if (!x) {
                    //money spills

                    jdjg6.edit("Look theres some money on the ground!!! \n**EDIT**: Oh wait the police came and claimed it rip.")

                }
            })


        })
}
const message = require("../message");

const api = require("../api")
const { getRandomInt } = api
module.exports = (message) => {
    message.channel.send("Look theres some money on the ground!!! \n**SOMEONE TYPE** `take` **TO TAKE THE MONEY**!!")
        .then((jdjg6) => {
            var x = false
            const collector67 = message.channel.createMessageCollector(m => !(m.author.bot), { time: 20000 })
            collector67.on("collect", (message43) => {
                if (!x) {

                    if (message43.content.toLowerCase() == "catch" || message43.content.toLowerCase() == "take" || message43.content.toLowerCase() == "pick") {
                        x = true;
                        //catch
                        var moneyetn = getRandomInt(10000, 20000)

                        api.changeBal(message43.author.id, moneyetn)
                            .then((use22r) => {

                                message.channel.send(`${use22r.name} picked \`${moneyetn}\` coins from the ground nice job xd!`)
                                jdjg6.edit(`Look theres some money on the ground!!! \n**EDIT**: ${use22r.name} already picked it up!`)
                            })
                            .catch((err) => {
                                x = false;
                                if (err.type != 0) {
                                    message43.channel.send("Something went wrong")
                                }
                            })



                    }
                }
            })
            collector67.on("end", () => {
                if (!x) {
                    //money spills

                    jdjg6.edit("Look theres some money on the ground!!! \n**EDIT**: Oh wait the police came and claimed it rip.")

                }
            })


        })
}