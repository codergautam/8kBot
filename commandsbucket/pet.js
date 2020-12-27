const api = require("../api")
const Discord = require("discord.js")
const pets = require('../json/pets.json')
module.exports = {
    name: "pet",
    aliases: ["pet", "pets"],
    secret: false,
    category: "currency",
    format: "<@user | petname>",
    usage: ["@Coder Gautam", "Coder"],
    description: "This command shows the list of pets a mentioned user has! If no user mentioned, it shows your pets\nYou can also view a specific pets data by typing `8k!pets <petname>`\nType `8k!help pet petname` for more details!", 
    subcommands: [{
        name: ["petname", "petdata"],
        thisfile: true,
        format: "8k!pe petname>",
        usage: ["@Coder Gautam", "Coder"],
        description: "This command shows the list of pets a mentioned user has! If no user mentioned, it shows your pets\nYou can also view a specific pets data by typing `8k!pets <petname>`\nType `8k!help pet petname` for more details!"
    }],
    execute(message, args) {
        var pet = args.join(" ").toLowerCase()
        if(pet == "" || message.mentions.users.first()) {
            if(message.mentions.users.first()) {
                var id = message.mentions.users.first()
                
            } else {
                var id = message.author
            }
            api.getUser(id.id)
            .then((user) => {
                var ff = ""
                if(!user.hasOwnProperty("pets")) {
                    user.pets = {}
                }
                for (pet in user.pets) {
                    var pet = user.pets[pet]
                    ff += `\`${pet.name}\`- ${pet.type}(${pet.exp} xp)\n*${pets[pet.type][1]}*\n\n`
                }
                if(ff == "") {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(user.name+"'s Pets!")
                    .setDescription("No pets.")
                    .setFooter("You can view a list of pets buy typing 8k!petshop")
                    message.channel.send(embed)
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(user.name+"'s Pets!")
                    .setDescription(ff)
                    .setFooter("To view a pets data, type 8k!pet <petname>")
                    message.channel.send(embed)
                }
            })
            .catch(() => {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            })

        } else {
        api.getUser(message.author.id)
        .then((user) => {
            if(!user.hasOwnProperty("pets")) {
                user.pets = {}
            }
            
            if(user.pets.hasOwnProperty(pet)) {

                var petjson = user.pets[pet]
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(petjson.name)
                .setAuthor(user.name, message.author.avatarURL())
                .setFooter("Gain more XP by being more active")
                .setDescription("**Date adopted: "+petjson.adopted+"**\nType: "+petjson.type+"\n\nXP: "+petjson.exp+"\nLevel: "+petjson.level+"\n\n"+`**${petjson.name} needs ${250 - (petjson.exp % 250)} more XP to get level ${petjson.level +1}**`)
                message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You dont have a pet named `"+pet+"`")
                .setAuthor(user.name, message.author.avatarURL())
                message.channel.send(embed)
            }
        
        })
        .catch((err) => {
            if(err.type == 1) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Error!!! Pls contact coder gautam with below info for help")
                .setDescription("```"+err.toString()+"```")
                message.channel.send(embed)
            }

        })
    }
    }
}