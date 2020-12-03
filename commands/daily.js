const Discord = require('discord.js')
const api = require('../api')


module.exports = {
    name: 'daily',
    aliases: ["daily"],
    secret: false,
    category: "currency",
    format: "8k!daily",
    usage: ["8k!daily"],
    description: "Get some daily money, offered by the 8k government!", 
	execute(message, args) {


            var id = message.author.id
            api.checkCool(id, "daily")
            .then((cooldown) => {
                if(cooldown.cooldown) {
            
                    
                    message.channel.send("You already collected your daily money!\nTry again in `"+api.convertMS(cooldown.msleft)+"`")
                } else {
              
                        x=true
                        if(Math.floor(Math.random()*10)+1 == 10) {
                            var moneyEarned = 1000
                        } else {
                            var moneyEarned = Math.floor(Math.random()*100)+1
                        }
                   // api.addCool(id, "beg", 10000)

                    api.changeBal(id, 5000)
                    .then((user) => {
                            message.channel.send(user.name+" collected 5000 coins!")
                            api.addCool(id, "daily", 86400000 )
                        

                    })
                    .catch((err) => {
                        if(err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("You don't have an account! Run this command again!")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("Something went wrong\n"+err.toString())
                        }

                       
        
                    })
                    
    
                }
            })
            .catch((e) => {
                console.log(e)
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("You don't have an account! Create one by running `8k!start`")
                        message.channel.send(embed)
            })
    
    

    }
}