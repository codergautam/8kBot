const api = require("../api")
const Discord = require("discord.js")
const pets = require('../json/pets.json')
module.exports = {
    name: "rank",
    execute(message, args) {

            if(message.mentions.users.first()) {
                var id = message.mentions.users.first()
                
            } else {
                var id = message.author
            }
            api.getUser(id.id)
            .then((user) => {
                if(!user.hasOwnProperty("levels")) {
                    user.levels = {
                        xp: 0,
                        level: 0
                    }

                }
                api.getAll()
                .then((obj) => {
                
                const sortedxp = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp) ).reverse()
               var ranknumxp = sortedxp.findIndex(user => user.id == id.id)+1

               const sortedrich = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse()
               var ranknumrich = sortedrich.findIndex(user => user.id == id.id)+1

               const embed = new Discord.MessageEmbed()
               .setTitle(`${user.name}'s Rank!`)
               .setFooter(`Gain more XP by talking more\nGain more coins by using 8k bot!`)
               .setDescription(`**Money**\nCoins: \`${user.bal}\`\nRank: #${ranknumrich}\n\n**Active**\nXP: \`${user.levels.xp}\`\nLevel: \`${user.levels.level}\`\nRank: #${ranknumxp}`)
               message.channel.send(embed)
            })
        })
        .catch((err) => {
            if(err.type == 0) {
                message.channel.send("You or mentioned user dont have an 8k account! Try typing `8k!start`")
            } else {
                message.channel.send("Unexpected Error\n```"+err.toString()+"```")
            }
            
        })
    
    }
}