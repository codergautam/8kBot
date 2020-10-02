const Discord = require('discord.js')
const api = require('../api')

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if(minutes != 0) {
        return "`"+minutes + " mins and " + seconds+ " seconds!`";
    } else {
        return "`"+ seconds+ " seconds!`";
    }
    
  }

module.exports = {
	name: 'beg',
	execute(message, args) {


            var id = message.author.id
            api.checkCool(id, "beg")
            .then((cooldown) => {
                if(cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Cooldown")
                    .setDescription("Dont beg too much\nYou can beg again in "+millisToMinutesAndSeconds(cooldown.msleft))
                    message.channel.send(embed)
                } else {
                    api.getUser(id)
                    .then((user) => {
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
                            .catch(() => {
                                message.channel.send("Something glitchd")
                            })
                        })
                       
     
                        

                    })
                    .catch((err) => {
      
                        message.channel.send("Something went wrong")
        
                    })
                    })
                    .catch(() => {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("You don't have an account! Create one by running `8k!start`")
                        message.channel.send(embed)
                    })
                }
            })
            .catch((e) => {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("You don't have an account! Create one by running `8k!start`")
                        message.channel.send(embed)
            })
    
    

    }
}