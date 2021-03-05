const items = require('../../json/items.json')
data = "*To buy an Item, please type* `8k!buy <itemname>`\n\n**Shop Items: **\n"
for (item in items) {
    if (items[item][4].shop) {
        data = data + items[item][0] + " - " + items[item][1] + "-`" + items[item][2] + "` coins\n";
    }
}


const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Shop")
            .setDescription(data)
        message.channel.send(embed)
    }, {
        name: "shop",
        aliases: ["shop", "market", "store"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd}",
        description: ""
    }
)