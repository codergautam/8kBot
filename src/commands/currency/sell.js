const fs = require('fs')
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const items = require('../../json/items.json');
//Name, Description, price
const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync('./src/items/').filter(file => file.endsWith('.js'));
for (const file of itemarray) {
    const itemdata = require(`../../items/${file}`);
    itemfiles.set(itemdata.name, itemdata);
    console.log("Initialized " + `./items/${file}`)
}




module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var item = args.join(' ').toLowerCase()
        if (item != 0) {


            if (items.hasOwnProperty(item)) {
                api.getUser(message.author.id)
                    .then((user) => {

                        if (!user.hasOwnProperty("inv")) {
                            user.inv = {}
                        }

                        if (user.inv.hasOwnProperty(item)) {
                            api.checkCool(message.author.id, "sell")
                                .then((cooldown) => {
                                    if (cooldown.cooldown) {
                                        const embed = new Discord.MessageEmbed()
                                            .setColor('#0099ff')
                                            .setTitle("Cooldown")
                                            .setDescription("You just sold an item!\nYou can sell an item again in `" + api.convertMS(cooldown.msleft) + "`")
                                        message.channel.send(embed)
                                    } else {
                                        if (items[item][3].custom) {
                                            var userItem = user.inv[item]
                                            itemfiles.get(item).sell(message, userItem, user)
                                        } else {
                                            const embed = new Discord.MessageEmbed()
                                                .setColor('GREEN')
                                                .setTitle("Selling " + item)
                                                .setDescription("How many " + item + "s do you want to sell? \n Please respond within 20 seconds")
                                                .setFooter("You have " + user.inv[item].amount + " " + item + "s")
                                            message.channel.send(embed)
                                            const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                                            collector.on("collect", (message23) => {
                                                if (isNaN(Number(message23.content)) || Number(message23.content) < 1 || !Number.isInteger(Number(message23.content))) {
                                                    message23.channel.send("Pls enter a valid number... \n Run the command again")
                                                } else {
                                                    amount = Number(message23.content)
                                                    if (user.inv[item].amount >= amount) {
                                                        var amount = Number(message23.content)
                                                        var userItem = user.inv[item]

                                                        var sellthing = items[item][3]
                                                        const priceEarn = sellthing.price * amount
                                                        user.inv[item].amount = userItem.amount - amount

                                                        user.bal += priceEarn
                                                        const embed = new Discord.MessageEmbed()
                                                            .setColor('#0099ff')
                                                            .setTitle(`Sell confirmation`)
                                                            .setDescription(`Do you want to sell \`${amount}\` ${item}s for \`${priceEarn}\` coins?\nYour new balance will be \`${user.bal}\`\nYou will have \`${user.inv[item].amount}\` ${item}s left!`)
                                                            .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
                                                        message.channel.send(embed)
                                                        const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                                                        collector67.on("collect", (coolmesgae) => {
                                                            if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
                                                                if (user.inv[item].amount == 0) {
                                                                    delete user.inv[item]
                                                                }
                                                                api.modUser(message.author.id, user)
                                                                    .then(() => {
                                                                        const embe45d = new Discord.MessageEmbed()
                                                                            .setColor('#0099ff')
                                                                            .setTitle(`Sold ${amount} ${item}s`)
                                                                            .setDescription(`You sold \`${amount}\` ${item}s for \`${priceEarn}\` coins!\nYour total balance is \`${user.bal}\`\nYou have \`${(user.inv.hasOwnProperty(item) ? user.inv[item].amount : 0)}\` ${item}s left!`)
                                                                        coolmesgae.channel.send(embe45d)

                                                                        api.addCool(message.author.id, "sell", 15000)
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err)
                                                                    })
                                                            } else {
                                                                const embed = new Discord.MessageEmbed()
                                                                    .setTitle(`Operation cancelled`)
                                                                message.channel.send(embed)
                                                            }
                                                        })

                                                    } else {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setColor('#0099ff')
                                                            .setTitle("You dont have `" + amount + " " + item + "s`")
                                                        message.channel.send(embed)
                                                    }

                                                }
                                            })
                                        }



                                    }
                                })


                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("You dont have the item `" + item + "`.")
                            message.channel.send(embed)
                        }

                    })
                    .catch((err) => {
                        if (err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("Something went wrong.")
                        }
                    })
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("Not found")
                    .setDescription("The item `" + item + "` was not found\nType `8k!shop` for a list of items")
                message.channel.send(embed)
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("No item entered")
                .setDescription("Please use the command like `8k!sell <itemname>`\nType `8k!inv` for a list of your items")

            message.channel.send(embed)
        }
    }, {
        name: "sell",
        aliases: ["sell"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} <itemname>",
        description: "Sell an item!"
    }
)