const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        api.getUser(id.id)
            .then((user) => {
                x = true

                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.name + "'s Balance")
                    .setDescription('This user has `' + api.numberWithCommas(user.bal) + "` coins!")
                message.channel.send(embed)
            })
            .catch((err) => {
                console.log(err)
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            })


    }, {
        name: "balance",
        aliases: ["bal", "balance", "coins", "coin", "amount", "wallet"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "View how much 8k coins you or someone else has!\nShows the balance of [@user], if no user pinged, it will show your balance.",
        usage: "{prefix}{cmd} [@user]"
    }
)