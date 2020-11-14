const api = require("../api")
const Discord = require('discord.js')
module.exports = {
    name: 'modjson',
    execute(message, args) {
        var userl = message.mentions.users.first()
        args.shift()
        var json = args.join(' ')
        JSON.parse(json)
        console.log(json)
        if(message.author.id == 566662215457964043) {
            if(userl) {
                try {
                    JSON.parse(json)
                } catch(e) {
                    message.channel.send(e.toString())
                    return
                }
                json = JSON.parse(json)
            api.modUser(userl.id, json)
            .then((data) => {
                const embed = new Discord.MessageEmbed()
                .setDescription("Success")
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

