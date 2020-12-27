const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const user = await api.changeBal(message.author.id, 5000)

        await addCD()
        message.channel.send(user.name + " collected 5000 coins!")


    }, {
        name: "daily",
        aliases: ["daily"],
        cooldown: 86400000,
        cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        description: "Get some daily money! Offered by the 8k government!"
    }
)