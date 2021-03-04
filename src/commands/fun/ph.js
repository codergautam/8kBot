const { memeAsync } = require('memejs');
module.exports = {
    name: 'ph',
    async execute(message, args) {

    }
}
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var m = await memeAsync("ProgrammerHumor") // Use memeAsync('subredditname') to filter subreddits
            // Do stuff with the JSON
        const embed = new Discord.MessageEmbed()
            .setTitle(m.title)
            .setImage(m.url)
            .setFooter('Programmer joke by: ' + m.author)

        message.channel.send(embed)
        message.channel.stopTyping()
        return

    }, {
        name: "ph",
        aliases: ["pj", "programmerhumor", "programmerhumour", "programmerjoke"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "",
        description: "Shows a funny proh"
    }
)