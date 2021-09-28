const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user1 = message.author
        var user2 = message.mentions.users.first()
        console.log(args[0])
        if (args.length < 1) return message.channel.send("You didnt mention anyone to give money to!\nFor more info, type `8k!help give`")
        var data1 = (args[0].startsWith("<") ? args[1] : args[0]).replace(/\D/g, '');
        if (isNaN(Number(data1)) || Number(data1) < 1 || !Number.isInteger(Number(data1))) {
            message.channel.send("Please use command like this `8k!give <amount> <@user>`\n**Remember, 8k!give is for giving COINS, while 8k!gift is for giving ITEMS**")
        } else {

            var moneytogive = Number(data1)
            if (user2) {
                var user2id = user2.id
                if (user2.id == user1.id) {
                    message.channel.send("You cant give money to yourself!")
                } else {
                    api.getUser(user1.id)
                        .then((user) => {
                            console.log(user.bal)
                            if (user.bal - moneytogive < 0) {
                                message.channel.send(user.name + " doesn't have this much money left to give...")
                            } else {
                                api.getUser(user2.id)
                                    .then((user2) => {
                                        user.bal = user.bal - moneytogive;
                                        api.modUser(user1.id, user)
                                            .then(() => {
                                                user2.bal = user2.bal + moneytogive
                                                api.modUser(user2id, user2)
                                                    .then(() => {
                                                        const embed = new Discord.MessageEmbed()
                                                            .setColor('#0099ff')
                                                            .setTitle("Success!")
                                                            .setDescription(user.name + " gave `" + api.numberWithCommas(moneytogive) + "` coins to " + user2.name)
                                                        message.channel.send(embed)
                                                    })
                                                    .catch(() => {
                                                        message.channel.send("Arrrrggghhhh... big ooof something glitched")
                                                    })
                                            })
                                            .catch(() => {
                                                message.channel.send("Something happened...")
                                            })
                                    })

                                .catch(() => {
                                    const embed = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle("This user doesnt have an account!")
                                    message.channel.send(embed)
                                })

                            }
                        })
                        .catch(() => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("You dont have an account! Create one by running `8k!start`")
                            message.channel.send(embed)
                        })
                }
            } else {
                message.channel.send("Please tag a user to transfer to")
            }
        }
    }, {
        name: "give",
        aliases: ["transfer", "donate", "give"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} <@user> <amount>",
        description: "Give @user some money!"
    }
)