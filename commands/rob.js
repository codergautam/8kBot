const api = require("../api")
const Discord = require("discord.js")
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: "rob",
    execute(message, args) {
        var user = message.mentions.users.first()
        
        if(user) {
            if(user.id == message.author.id) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You cant steal from yourself lol")
                
                message.channel.send(embed)
            } else {
            api.getUser(message.author.id) 
                .then((mainuser) => {
                    if(mainuser.bal < 1000) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Not enough money")
                        .setDescription( "You need at least `1000` coins to rob from someone\nYou currently have `"+mainuser.bal+"`")
                        message.channel.send(embed)
                    } else {

                    
                    api.getUser(user.id)
                    .then((taguser) => {
                        if(taguser.bal < 1000) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Not enough money")
                        .setDescription(taguser.name+" doesnt have even `1000` coins!\nNot worth it man")
                        message.channel.send(embed)
                        } else {
                            api.checkCool(message.author.id, "l"+message.author.id+user.id)
                            .then((cooldown) => {
                                if(cooldown.cooldown) {
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Cooldown")
                                    .setDescription("You just robbed "+taguser.name+"\nYou can rob them again in `"+api.convertMS(cooldown.msleft)+"`")
                                    message.channel.send(embed)
                                } else {
                      
                        if(Math.random() <= 0.65) {
                            var toSteal = Math.floor(getRandomInt(taguser.bal*0.002,  taguser.bal*0.1))
                            api.changeBal(message.author.id, toSteal)
                            .then(() => {
                                api.changeBal(user.id, -toSteal) 
                                .then(() => {
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Steal Results for "+mainuser.name)
                                    .setDescription("You stole `"+toSteal+"` coins!")
                                    message.channel.send(embed)
                                    api.addCool(message.author.id, "l"+message.author.id+user.id, 3600000)
                                })
                            })
                            
                        } else {
                          

                            var moneyTaken = Math.floor(((Math.floor(Math.random()*5)+1)/100)*Math.floor(1000000 <= mainuser ? 1000000:mainuser.bal))
                            
                            api.changeBal(message.author.id, -moneyTaken)
                            .then(() => {
                                api.changeBal(user.id, moneyTaken) 
                                .then(() => {
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Steal Results for "+mainuser.name)
                                    .setDescription("YOU WERE CAUGHT **HAHAHAHA***\nYou had to give `"+moneyTaken+"` to "+taguser.name)
                                    message.channel.send(embed)
                                    api.addCool(message.author.id, "l"+message.author.id+user.id, 3600000)
                                })
                            })
                        }
                    }
                    })
                        }
                    })
                    .catch((err) => {
                        if(err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("The user you tagged doesnt have an account! They can one by running `8k!start`")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("Something went wrong. Pls try again")
                        } 
                    })
                }
                })
                .catch((err) => {
                    if(err.type == 0) {
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
    }
}