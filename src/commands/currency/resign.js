const api = require("../../core/api")
const Discord = require('discord.js')

const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)



        if (!user.hasOwnProperty("job")) {
            user.job = { exists: false }
        }

        if (user.job.exists) {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Resign confirmation`)
                .setDescription(`Are sure you want to resign from your job \`${user.job.name}\``)
                .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
            message.channel.send(embed)
            const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
            collector67.on("collect", async(coolmesgae) => {
                if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
                    var fhghfgh = user.job.name
                    user.job = { exists: false }
                    await api.modUser(message.author.id, user)
                    const embe45d = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`Resigned from ${fhghfgh}`)

                    coolmesgae.channel.send(embe45d)

                    await addCD()

                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Operation cancelled`)
                    message.channel.send(embed)
                }
            })
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("You dont have a job!")
            message.channel.send(embed)
        }


    }, {
        name: "resign",
        aliases: ["resign"],
        cooldown: 43200000,
        cooldownMessage: "You just resigned your old job, you can resign again in `{timeleft}`",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd}",
        description: "Resign from your job"
    }
)