const api = require("../api")
const Discord = require('discord.js')
module.exports = {
	name: 'resign',
	async execute(message, args) {
        api.getUser(message.author.id)
        .then((user)=> {
            api.checkCool(message.author.id, "resign")
            .then((cooldown) => {
                if(cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Cooldown")
                    .setDescription("You just resigned your old job, you can resign again in `"+api.convertMS(cooldown.msleft)+"`")
                    message.channel.send(embed)
                } else {
                    
         
   
            if(!user.hasOwnProperty("job")) {
                user.job = {exists:false}
            }
            
            if(user.job.exists) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Resign confirmation`)
                .setDescription(`Are sure you want to resign from your job \`${user.job.name}\``)
                .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
                message.channel.send(embed)
                const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
                collector67.on("collect", (coolmesgae) => {
                    if(coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
                        var fhghfgh = user.job.name
                        user.job = {exists:false}
                        api.modUser(message.author.id, user)
                        .then(() => {
                            const embe45d = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle(`Resigned from ${fhghfgh}`)
            
                            coolmesgae.channel.send(embe45d)

                           api.addCool(message.author.id, "resign", 43200000)
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
                .setColor('RED')
                .setTitle("You dont have a job!")
                message.channel.send(embed)
            }
            
        }
    })
    .catch(() => {
        message.channel.send("Error. pls try again")
    })
        })
        .catch((err) => {
            console.log(err)
            if(err.type == 0) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You dont have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            } else {

                    message.channel.send("Error. pls try again")
            }
        })
    }
}