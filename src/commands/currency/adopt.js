const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)
        if (!user.hasOwnProperty("pets")) {
            user.pets = {}
        }
        if (Object.keys(user.pets).length > 9) {
            message23.channel.send("**Your house is a ZOO!! **\nBruh, you have 10 pets, is that not enough for you?!")
            return
        }
        var pet = args.join(' ').toLowerCase()
        if (pet != 0) {
            if (pets.hasOwnProperty(pet)) {

                if (Math.round(user.bal / pets[pet][2]) == 0) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle("Not Enough Coins")
                        .setDescription("You need `" + (user.bal - pets[pet][2]) * -1 + "` more coins to adopt 1 " + pet)
                    message.channel.send(embed)
                } else {
                    var price = pets[pet][2]
                    if (user.bal - price < 0) {

                        console.log(price)
                        const embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle("Not Enough Coins")
                            .setDescription("You need `" + (user.bal - price) * -1 + "` more coins to buy 1 " + pet)
                        message.channel.send(embed)
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle("Name your " + pet)
                            .setDescription("Enter a name for your new " + pet + "!\nIt cannot be more than 30 characters long!")
                            .setFooter("Please respond within 20 seconds")
                        message.channel.send(embed)
                        const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                        collector.on("collect", async(message23) => {
                            if (message23.content.length > 30) {
                                message23.channel.send("**Listen, you little- **\nYour pets name is " + message23.content.length + " characters long.\nI told you it cant be greater than 30 characters **SMH**")
                            } else {

                                if (user.pets.hasOwnProperty(message23.content.toLowerCase())) {
                                    message23.channel.send("*visible confusion*\nYou already have a pet " + user.pets[message23.content.toLowerCase()].type + " named " + message23.content.toLowerCase())
                                } else {
                                    var name = message23.content.replace(/ +(?= )/g, '').trim();

                                    //BUY THE pet
                                    user.pets[name.toLowerCase()] = {
                                        type: pet,
                                        name: name,
                                        exp: 0,
                                        level: 0,
                                        adopted: new Date().toLocaleDateString()

                                    }
                                    user.bal = user.bal - price
                                        //Save their new data
                                    await api.modUser(message.author.id, user)
                                    const embed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setTitle("Adoption Successful!")
                                        .setDescription("Congrats! You adopted a new pet " + pet + " named " + name + " for `" + price + "` coins!\nYour remaining balance is `" + user.bal + "`")
                                        .setFooter("You can view all your pets by typing 8k!pets")
                                    message.channel.send(embed)
                                    await addCD()


                                }
                            }
                        })




                    }
                }
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("Not found")
                    .setDescription("The pet `" + pet + "` was not found\nType `8k!petshop` for a list of pets")
                message.channel.send(embed)
            }

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("No pet entered")
                .setDescription("Please use the command like `8k!adopt <petname>`\nType `8k!petshop` for a list of pets")
            message.channel.send(embed)
        }


    }, {
        name: "adopt",
        aliases: ["adopt"],
        cooldown: 20000,
        cooldownMessage: "You just adopted a pet!\nYou can adopt another one in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "Adopt a pet from the petshop! View the list of pets by 8k!petshop",
        usage: "{prefix}{cmd} <petname>"
    }
)