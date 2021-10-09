const api = require("../../core/api")
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = message.mentions.users.first()

        if (user) {
            if (user.id == message.author.id) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("You cant steal from yourself lol")

                message.channel.send(embed)
            } else {
                api.getUser(message.author.id)
                    .then((mainuser) => {
                        if (mainuser.bal < 1000) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("Not enough money")
                                .setDescription("You need at least `1000` coins to rob from someone\nYou currently have `" + mainuser.bal + "`")
                            message.channel.send(embed)
                        } else {
                            api.getUser(user.id)
                                .then((taguser) => {
                                    if (taguser.bal < 1000) {
                                        const embed = new Discord.MessageEmbed()
                                            .setColor('#0099ff')
                                            .setTitle("Not enough money")
                                            .setDescription(taguser.name + " doesnt have even `1000` coins!\nNot worth it man")
                                        message.channel.send(embed)
                                    } else {
                                        api.checkCool(message.author.id, "l" + message.author.id + user.id)
                                            .then((cooldown) => {
                                                if (cooldown.cooldown) {
                                                    const embed = new Discord.MessageEmbed()
                                                        .setColor('#0099ff')
                                                        .setTitle("Cooldown")
                                                        .setDescription("You just robbed " + taguser.name + "\nYou can rob them again in `" + api.convertMS(cooldown.msleft) + "`")
                                                    message.channel.send(embed)
                                                } else {
                                                    var chance = (mainuser.mask ? 95 : 60)
                                                    var security = false 
                                                    api.checkCool(user.id, "security")
                                                    .then((cool)=>{
                                                        console.log(cool)
                                                    if(cool.cooldown) 
                                                    {
                                                    chance = 0
                                                    security = true
                                                    }
                                                    
                                                    if (Math.random() < chance / 100) {
                                                        var maxSteal = 5000000
                                                        var toSteal = Math.floor(Math.floor(Math.random() * 10) + 1 == 10 ? (taguser.bal >= maxSteal ? maxSteal : taguser.bal) * getRandomInt(5, 8) / 100 : (taguser.bal >= maxSteal ? maxSteal : taguser.bal) * (Math.floor(Math.random() * 10) + 1) / 100)
                                                        var multiplier = 1
                                                        var mask = false
                                                        if (mainuser.mask) {
                                                            mask = true
                                                            mainuser.mask = false
                                                            multiplier = getRandomInt(2, 5)
                                                            if (toSteal * multiplier > user.bal) multiplier = 1
                                                        }
                                                        mainuser.bal += toSteal * multiplier
                                                        api.modUser(message.author.id, mainuser)
                                                            .then(() => {
                                                                api.changeBal(user.id, (-1 * (toSteal * multiplier)))
                                                                    .then(() => {
                                                                        const embed = new Discord.MessageEmbed()
                                                                            .setColor('#0099ff')
                                                                            .setTitle("Steal Results for " + mainuser.name)
                                                                            .setDescription("You stole `" + api.numberWithCommas(toSteal) + "` coins!");

                                                                        if (mask) {
                                                                            embed.setFooter("Your coins multiplied by an EXTRA " + multiplier + " because of your Mask!")
                                                                        }
                                                                        message.channel.send(embed)
                                                                        api.addCool(message.author.id, "l" + message.author.id + user.id, 3600000)
                                                                    })
                                                            })

                                                    } else {

                                                        var userbal = mainuser.bal
                                                        var moneyTaken = Math.floor(Math.floor((Math.random() * +(Math.random() * 100 / 100).toFixed(2)) + 1) / 100 * userbal > 100000 ? 100000 : Math.floor((Math.random() * 3) + 1) / 100 * userbal)
                                                        var mask = false
                                                        var divider = 1
                                                        if (mainuser.mask) {
                                                           
                                                            mask = true
                                                            mainuser.mask = false
                                                            divider = getRandomInt(5, 15)
                                                            
                                                        }
                                                    


                                                        mainuser.bal -= Math.ceil(moneyTaken / divider)
                                                        api.modUser(message.author.id, mainuser)
                                                            .then(() => {
                                                                api.changeBal(user.id, Math.ceil(moneyTaken / divider))
                                                                    .then(() => {
                                                                        const embed = new Discord.MessageEmbed()
                                                                            .setColor('#0099ff')
                                                                            .setTitle("Steal Results for " + mainuser.name)
                                                                            .setDescription("YOU WERE CAUGHT **HAHAHAHA***\nYou had to give `" + api.numberWithCommas(moneyTaken) + "` to " + taguser.name);

                                                                        if (mask) {
                                                                            embed.setDescription("YOU WERE CAUGHT **HAHAHAHA***\nYou had to give `" + api.numberWithCommas(moneyTaken) + "` to " + taguser.name+"\nYour money lost was divided by an EXTRA " + divider + " because of your Mask!")
                                                                        }
                                                                        if (security) {
                                                                        embed.setFooter("You were caught by a security camera\nIt lasts for "+api.convertMS(cool.msleft))
                                                                        }
                                                                        message.channel.send(embed)
                                                                        api.addCool(message.author.id, "l" + message.author.id + user.id, 3600000)
                                                                    
                                                                    })
                                                            })
                                                    }
                                                    })
                                                }
                                            })
                                    }
                                })
                                .catch((err) => {
                                    if (err.type == 0) {
                                        const embed = new Discord.MessageEmbed()
                                            .setColor('#0099ff')
                                            .setTitle("The user you tagged isnt in our database! Make them say something and then try again")
                                        message.channel.send(embed)
                                    } else {
                                        message.channel.send("Something went wrong. Pls try again")
                                    }
                                })
                        }
                    })
                    .catch((err) => {
                        if (err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("You doesnt have an account! Create one by running `8k!start`")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("Something went wrong. Pls try again")
                        }
                    })
            }
        } else {
            message.channel.send("Please tag a user to steal from!\nFor example: `8k!rob <@user>`")
        }


    }, {
        name: "rob",
        aliases: ["rob", "steal", "take", "thieve"],
        cooldown: 0,
        cooldownMessage: "",
        perms: [],
        description: "Rob a user for their money! But be careful, you might get caught and have to pay them...",
        usage: "{prefix}{command} <@user>"
    }
)
