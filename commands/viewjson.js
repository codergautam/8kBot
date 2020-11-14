const api = require("../api")
const Discord = require('discord.js')
module.exports = {
    name: 'viewjson',
    execute(message, args) {
        var userl = message.mentions.users.first()
        
        if(message.author.id == 566662215457964043) {
            if(userl) {
            api.getUser(userl.id)
            .then((user) => {
                const embed = new Discord.MessageEmbed()
                .setAuthor(user.name, userl.avatarURL())
                .setDescription("```json\n"+JSON.stringify(user)+"```")
                message.channel.send(embed)

            })
        
            .catch((err) => {
                message.channel.send("Error: \n"+err.toString())
                .then((message) => {
                    try {
                        message.edit("Error: \n```"+JSON.parse(err)+"```")
                    } catch {
                    }
                })

       
            })
        }
        } else {
            message.channel.send("sorry this is owner only command")
        
        }
    }
}

