const { getRandomInt } = require('../../core/api');
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        message.channel.send("I have chosen **" + getRandomInt(1, 10) + "**")
    }, {
        name: "one2ten",
        aliases: ["one2ten", "onetoten", "onetwoten"],
        cooldown: 0,
        cooldownMessage: "",
        description: "This command picks a random number from one to ten!"
    }
)