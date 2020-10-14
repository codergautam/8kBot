const Discord = require('discord.js')
const api = require("../api")
module.exports = {
    name: "sync",
    execute(message, args) {
        api.getUser(message.author.id)
        .then((user) => {
            if(user.name  == message.author.username) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Your data is already synced! 🧐")
                message.channel.send(embed) 
            } else {
                user.name =  message.author.username


                api.modUser(message.author.id, user)
                .then(() => {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Success! Your data is now synced with 8k! 🧙")
                    message.channel.send(embed) 

                })
                .catch(() => {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Something went wrong. Please try again")
                    message.channel.send(embed)  
                })
            }
        })
        .catch((err) => {
            if(err.type == 0) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            } else { 
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Something went wrong. Please try again")
                message.channel.send(embed)
            }
        })
    }
}