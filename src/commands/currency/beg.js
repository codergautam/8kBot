const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async (message, args, client, addCD) => {
        await addCD()
        if(Math.floor(Math.random()*10)+1 == 10) {
            var moneyEarned = 1000
        } else {
            var moneyEarned = Math.floor(Math.random()*100)+1
        }
        
        var user = await api.changeBal(message.author.id, moneyEarned)
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Beg Results for "+user.name)
                .setDescription("You gained `"+moneyEarned+"` coins!\nNow you have a total of `"+user.bal+"`coins!")
                message.channel.send(embed)
        
    },
    {
        name: "beg",
        aliases: ["beg", "ask"],
        cooldown: 10000,
        cooldownMessage: "Dont beg too much!\nYou can beg again in **{timeleft}**",
        perms:["SEND_MESSAGES"],
        description: "Beg for some money!"
    }
)