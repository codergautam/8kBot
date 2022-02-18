const Discord = require("discord.js");
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("8k Bot Invite links!")
            .setDescription("Use this link to add 8k Bot to your own server!")
            .addField('Link', '[Click Here!](https://discord.com/oauth2/authorize?client_id=783346270290968606&permissions=321600&scope=bot)', true)
        message.channel.send(embed)

    }, {
        name: "invite",
        aliases: ["invite"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "Shows the link to add the bot to your own server!"
    }
)