const Discord = require('discord.js')
const api = require('../api')


module.exports = {
    name: 'beg',
    aliases: ["beg", "ask"],
    secret: false,
    category: "currency",
    format: "8k!beg",
    usage: ["8k!beg"],
    description: "Beg for money, you can gain up to 1000 coins if you're lucky!", 
	execute(message, args) {


            var id = message.author.id
            api.checkCool(id, "beg")
            .then((cooldown) => {
                if(cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Cooldown")
                    .setDescription("Dont beg too much\nYou can beg again in `"+api.convertMS(cooldown.msleft)+"`")
                    message.channel.send(embed)
                } else {
              
                        x=true
                        if(Math.floor(Math.random()*10)+1 == 10) {
                            var moneyEarned = 1000
                        } else {
                            var moneyEarned = Math.floor(Math.random()*100)+1
                        }
                   // api.addCool(id, "beg", 10000)

                    api.changeBal(id, moneyEarned)
                    .then(() => {
                        api.getUser(id)
                        .then((user) => {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Beg Results for "+user.name)
                            .setDescription("You gained `"+moneyEarned+"` coins!\nNow you have a total of `"+user.bal+"`coins!")
                            message.channel.send(embed)
                            api.addCool(id, "beg", 10000)
               
                        })
                       
     
                        

                    })
                    .catch((err) => {
                        if(err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("You don't have an account! Create one by running `8k!start`")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("Something went wrong")
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