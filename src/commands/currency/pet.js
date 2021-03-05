const pets = require('../../json/pets.json')
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var pet = args.join(" ").toLowerCase()
        if (pet == "" || message.mentions.users.first()) {
            if (message.mentions.users.first()) {
                var id = message.mentions.users.first()

            } else {
                var id = message.author
            }
            var user = await api.getUser(id.id)
            var ff = ""
            if (!user.hasOwnProperty("pets")) {
                user.pets = {}
            }
            for (pet in user.pets) {
                var pet = user.pets[pet]
                ff += `\`${pet.name}\`- ${pet.type}(${pet.exp} xp)\n*${pets[pet.type][1]}*\n\n`
            }
            if (ff == "") {
                const embed = new Discord.MessageEmbed()
                    .setTitle(user.name + "'s Pets!")
                    .setDescription("No pets.")
                    .setFooter("You can view a list of pets buy typing 8k!petshop")
                message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(user.name + "'s Pets!")
                    .setDescription(ff)
                    .setFooter("To view a pets data, type 8k!pet <petname>")
                message.channel.send(embed)
            }

        } else {
            var user = await api.getUser(message.author.id)

            if (!user.hasOwnProperty("pets")) {
                user.pets = {}
            }

            if (user.pets.hasOwnProperty(pet)) {

                var petjson = user.pets[pet]
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(petjson.name)
                    .setAuthor(user.name, message.author.avatarURL())
                    .setFooter("Gain more XP by being more active")
                    .setDescription("**Date adopted: " + petjson.adopted + "**\nType: " + petjson.type + "\n\nXP: " + petjson.exp + "\nLevel: " + petjson.level + "\n\n" + `**${petjson.name} needs ${250 - (petjson.exp % 250)} more XP to get level ${petjson.level +1}**`)
                message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("You dont have a pet named `" + pet + "`")
                    .setAuthor(user.name, message.author.avatarURL())
                message.channel.send(embed)
            }
        }
    }, {
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        name: "pet",
        aliases: ["pet", "pets"],
        secret: false,
        usage: "{prefix}{cmd} <@user | petname>",
        description: "This command shows the list of pets a mentioned user has! If no user mentioned, it shows your pets\nYou can also view a specific pets data by typing `8k!pets <petname>`\nType `8k!help pet petname` for more details!",
    }
)