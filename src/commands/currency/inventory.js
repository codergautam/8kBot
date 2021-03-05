const api = require("../../core/api")
const Discord = require("discord.js")
const items = require('../../json/items.json')
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        var user = await api.getUser(id.id)
        x = true
        if (user.hasOwnProperty("inv")) {
            if (user.inv != {}) {
                var item = args.join(' ').toLowerCase()

                if (user.inv.hasOwnProperty(item)) {
                    if (items.hasOwnProperty(item)) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(user.name + "'s " + items[item][0] + " count")
                            .setDescription(`**${items[item][0]}** - \`${user.inv[item].amount}\`\n*${items[item][1]}*\n\n`)
                            .setFooter("Sub to coder gautam YT lol")
                        message.channel.send(embed)
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(user.name + "'s " + item + " count")
                            .setDescription(`**${item}** - \`${user.inv[key].amount}\`\n*Unknown Description...*\n\n`)
                            .setFooter("Sub to coder gautam YT lol")
                        message.channel.send(embed)
                    }



                } else {


                    var inv = user.inv;
                    var dadata = ""
                    Object.keys(inv).forEach(key => {
                        if (items.hasOwnProperty(key)) {
                            dadata += `**${items[key][0]}** - \`${inv[key].amount}\`\n*${items[key][1]}*\n\n`
                        } else {
                            dadata += `**${key}** - \`${inv[key].amount}\`\n*Unknown Description...*\n\n`
                        }

                    });

                    if (!dadata.replace(/\s/g, '').length) {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(user.name + "'s Inventory")
                            .setDescription("No items.")
                            .setFooter('You can buy an item from the shop `8k!shop`')
                        message.channel.send(embed)
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(user.name + "'s Inventory")
                            .setDescription(dadata)
                        message.channel.send(embed)
                    }
                }
            } else {

                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(user.name + "'s Inventory")
                    .setDescription("No items.")
                message.channel.send(embed)
            }

        } else {

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(user.name + "'s Inventory")
                .setDescription("No items.")
            message.channel.send(embed)
        }



    }, {
        name: "inventory",
        aliases: ["inv", "inventory", "bag", "backpack"],
        cooldown: 86400000,
        cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
        perms: ["SEND_MESSAGES", "ATTACH_FILES"],
        description: "View the inventory of you or a mentioned user!\nYour inventory contains items that you bought in the shop!"
    })