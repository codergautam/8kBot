const api = require("../api")
const Discord = require("discord.js")
const items = require('../json/items.json')
module.exports = {
    name: "inv",
    execute(message, args) {
        if(message.mentions.users.first()) {
            var id = message.mentions.users.first()
            
        } else {
            var id = message.author
        }
    
        api.getUser(id.id)
        .then((user) => {
            x=true
            if(user.hasOwnProperty("inv")) {
                if(user.inv != {}) {
                    var inv = user.inv;
                    var dadata = ""
                    Object.keys(inv).forEach(key => {
                        if(items.hasOwnProperty(key)) {
                            dadata += `**${items[key][0]}** - \`${inv[key].amount}\`\n*${items[key][1]}*\n\n`
                        } else {
                            dadata += `**${key}** - \`${inv[key].amount}\`\n*Unknown Description...*\n\n`
                        }
                       
                    });
                    
                    if(!dadata.replace(/\s/g, '').length) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(user.name+"'s Inventory")
                        .setDescription("No items.")
                        .setFooter('You can buy an item from the shop `8k!shop`')
                        message.channel.send(embed)
                    } else {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(user.name+"'s Inventory")
                        .setDescription(dadata)
                        message.channel.send(embed)
                    }

                } else {
                    console.log("f")
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.name+"'s Inventory")
                    .setDescription("No items.")
                    message.channel.send(embed)
                }

            } else {
                console.log("ff")
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(user.name+"'s Inventory")
                .setDescription("No items.")
                message.channel.send(embed)
            }

        })
        .catch(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("This user doesnt have an account! Create one by running `8k!start`")
            message.channel.send(embed)
        })
    }
}