const Discord = require('discord.js')
const api = require('../api')

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: "fight",
    execute(message, args) {
        var user1 = message.author
        var user2 = message.mentions.members.first()

        if (user2) {
            if (user2.id == user1.id) {
                message.channel.send("You cant fight yourself")
            } else {
                api.getUser(user1.id)
                    .then((user1d) => {
                        api.getUser(user2.id)
                            .then((user2d) => {


                                const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Fight")
                                    .setDescription("How much money do you bet to win?\nType `0` for a friendly match!")
                                    .setFooter("Respond with a number from 0 - " + (user1d.bal < user2d.bal ? user1d.bal : user2d.bal) + "\nPlease respond within 20 seconds")
                                message.channel.send(embed)
                                const collector67 = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 1, time: 20000 })
                                collector67.on("collect", (message23) => {
                                    if (isNaN(Number(message23.content)) || Number(message23.content) < 0 || !Number.isInteger(Number(message23.content))) {
                                        message23.channel.send("Pls enter a valid number... \n Run the command again")
                                    } else {
                                        if (Number(message23.content) > user1d.bal) {
                                            const embed = new Discord.MessageEmbed()
                                                .setColor('#0099ff')
                                                .setTitle("You dont have `" + Number(message23.content) + "` coins! \nYou only have `" + user1d.bal + "` coins!")
                                                .setFooter("Please run the command again")
                                            message.channel.send(embed)
                                        } else if (Number(message23.content) > user2d.bal) {
                                            const embed = new Discord.MessageEmbed()
                                                .setColor('#0099ff')
                                                .setTitle(user2d.name + " doesnt have `" + Number(message23.content) + "` coins! \nThey only have `" + user2d.bal + "` coins!")
                                                .setFooter("Please run the command again")
                                            message.channel.send(embed)
                                        } else {
                                            var betmoney = Number(message23.content)
                                            var user1f = { health: 100 }
                                            var user2f = { health: 100 }
                                            //challenge
                                            const embed = new Discord.MessageEmbed()
                                                .setColor('#0099ff')
                                                .setTitle(`${user2d.name} was challenged to a fight!`)
                                                .setDescription(`${user1d.name} challenged ${user2d.name} to a fight!\n<@${user2.id}> Do you accept?\nYou will lose \`${betmoney}\` coins if you lose. You will win \`${betmoney}\` coins if you win the fight!`)
                                                .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
                                            message.channel.send(embed)
                                            var x = false
                                            const collector67 = message.channel.createMessageCollector(m => m.author.id == user2.id, { max: 1, time: 20000 })
                                            collector67.on("collect", (coolmesgae) => {
                                                if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
                                                    const embed = new Discord.MessageEmbed()
                                                        .setTitle(`Challenge Accepted`)
                                                    message.channel.send(embed)
                                                    x = true
                                                

                                                    const embed1 = new Discord.MessageEmbed()
                                                        .setColor('#0099ff')
                                                        .setTitle(`${user1d.name}, Select your weapon!`)
                                                        .setDescription(`\`ak47\` - ︻╦╤─ Fast fire, but less accuracy\n\`axe\` - 🪓Deadly, medium fire, but low accuracy\n\`sniper\` - ▄︻̷̿┻̿═━一 Deadly, good accuracy, but low fire rate\``)
                                                        .setFooter(user1d.name + ", Respond with a weapon name\nPlease respond within 20 seconds")
                                                    message.channel.send(embed1)
                                                    xyuj = false
                                                    const collector671 = message.channel.createMessageCollector(m => m.author.id == user1.id, { max: 1, time: 20000 })
                                                    collector671.on("collect", (coolmesgade) => {
                                                        if (coolmesgade.content.toLowerCase() == "axe" || coolmesgade.content.toLowerCase() == "ak47" || coolmesgade.content.toLowerCase() == "sniper") {
                                                            user1f.weapon = coolmesgade.content.toLowerCase()
                                                            xyuj = true
                                                            const embed11 = new Discord.MessageEmbed()
                                                                .setColor('#0099ff')
                                                                .setTitle(`${user2d.name}, Select your weapon!`)
                                                                .setDescription(`\`ak47\` - ︻╦╤─ Fast fire, but less accuracy\n\`axe\` - 🪓Deadly, medium fire, but low accuracy\n\`sniper\` - ▄︻̷̿┻̿═━一 Deadly, good accuracy, but low fire rate\``)
                                                                .setFooter(user2d.name + ", Respond with a weapon name\nPlease respond within 20 seconds")
                                                            message.channel.send(embed11)
                                                            var xyuj1 = false
                                                            const collector6712 = message.channel.createMessageCollector(m => m.author.id == user2.id, { max: 1, time: 20000 })
                                                            collector6712.on("collect", (coolmesgade) => {
                                                                if (coolmesgade.content.toLowerCase() == "axe" || coolmesgade.content.toLowerCase() == "ak47" || coolmesgade.content.toLowerCase() == "sniper") {
                                                                    user2f.weapon = coolmesgade.content.toLowerCase()
                                                                    xyuj1 = true
                                                                    fight(message, user1, user2, user1d, user2d, user1f, user2f, 2, 0, betmoney)
                                                                } else {
                                                                    const embed = new Discord.MessageEmbed()
                                                                        .setTitle(`Invalid Item`)
                                                                        .setFooter("Please run command again")
                                                                    message.channel.send(embed)
                                                                    xyuj1 = true
                                                                }
                                                            })
                                                            collector6712.on("end", () => {

                                                                if (!xyuj1) {
                                                                    const embed = new Discord.MessageEmbed()
                                                                        .setTitle(`Challenge Expired`)
                                                                    message.channel.send(embed)
                                                                }
                                                            })
                                                        } else {
                                                            const embed = new Discord.MessageEmbed()
                                                                .setTitle(`Invalid Item`)
                                                                .setFooter("Please run command again")
                                                            message.channel.send(embed)
                                                            xyuj = true
                                                        }
                                                    })
                                                    collector671.on("end", () => {
                                                        if (!xyuj) {
                                                            const embed = new Discord.MessageEmbed()
                                                                .setTitle(`Challenge Expired`)
                                                            message.channel.send(embed)

                                                        }
                                                    })
                                                } else {
                                                    const embed = new Discord.MessageEmbed()
                                                        .setTitle(`Challenge Rejected`)
                                                    message.channel.send(embed)
                                                    x = true
                                                }
                                            })
                                            collector67.on("end", () => {
                                                if (!x) {
                                                    const embed = new Discord.MessageEmbed()
                                                        .setTitle(`Challenge Expired`)
                                                    message.channel.send(embed)
                                                }
                                            })
                                        }

                                    }
                                })
                            })
                            .catch((err) => {
                                if (err.type == 0) {
                                    const embed = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle(user2.user.tag + " doesnt have an 8k account!")
                                    message.channel.send(embed)
                                } else {
                                    message.channel.send("something went wrong")
                                }
                            })
                    })
                    .catch((err) => {
                        if (err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("You dont have an account! Create one by running `8k!start`")
                            message.channel.send(embed)
                        } else {
                            message.channel.send("something went wrong")
                        }
                    })

            }

        } else {
            message.channel.send("Please tag a valid user to fight\nFor example: `8k!fight @" + user1.tag.substring(0, user1.tag.length - 5) + "`")
        }
    }
}

function fight(message, user1, user2, user1d, user2d, user1f, user2f, turn, xf, betmoney) {

    var orig1 = user1
    var orig2 = user2
    var orig1d = user1d
    var orig2d = user2d
    var orig1f = user1f
    var orig2f = user2f

    var user1 = (turn == 1 ? orig1 : orig2)
    var user2 = (turn == 1 ? orig2 : orig1)
    var user1d = (turn == 1 ? orig1d : orig2d)
    var user2d = (turn == 1 ? orig2d : orig1d)
    var user1f = (turn == 1 ? orig1f : orig2f)
    var user2f = (turn == 1 ? orig2f : orig1f)

    if(xf == 0) {
        const embed11 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user1d.name}, your move!`)
            .setDescription(`__**HEALTH: **__\`${user1f.health}\`\n\n**Available options:**\n\`attack\`, ${(user1f.health == 100 ? "" : "\`heal\`, ")} \`quit\``)
            .setFooter(user1d.name + ", Respond with an option\nPlease respond within 35 seconds")
        message.channel.send(embed11)
    }
        var xyuj12 = false
        const collector67121 = message.channel.createMessageCollector(m => m.author.id == user1.id, { max: 1, time: 45000 })
        collector67121.on("collect", (coolmesgade) => {
            xyuj12 = true
            if (coolmesgade.content.toLowerCase() == "quit" || coolmesgade.content.toLowerCase() == "end") {
                api.changeBal(user1.id, -1 * betmoney)
                    .then(() => {
                        api.changeBal(user2.id, betmoney)
                            .then(() => {
                                const embed11 = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle(`${user2d.name} wins!`)
                                    .setDescription(`${user1d.name} gave up lol.\n\n${user1d.name} lost \`${betmoney}\` coins!\n${user2d.name} gained \`${betmoney}\` coins!`)
                                    .setFooter("\"Im too scared to die\" - " + user1d.name)
                                message.channel.send(embed11)
                              
                            })
                            .catch(() => {
                                message.channel.send("Something went wrongg")
                            })

                    })
                    .catch(() => {
                        message.channel.send("Something went wrong")
                    })
       
            } else if (coolmesgade.content.toLowerCase() == "heal") {
                if (user1f.health == 100) {

                    var fjkgjk =3-xf
                    if (xf <= 2) {
                        message.channel.send("Thats not a valid option, pls try again\nYou have "+fjkgjk.toString()+" more chances")
                        fight(message, orig1, orig2, orig1d, orig2d, orig1f, orig2f, turn, xf += 1, betmoney)
                    } else {
                        message.channel.send("Game ended cuz you put too many invalid input")
                    }
                } else {
                    var heal = randomInteger(5,30)
                    user1f.health += heal;
                    if(user1f.health > 100) {
                        user1f.health = 100
                    }
                    const embed11 = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${user1d.name} heals!`)
                        .setDescription(`__**GAINED**__ \`${heal}\` __**HEALTH!**__\n\nYou now have \`${user1f.health}\` health!`)
                        .setFooter("\"Try to kill me now\" - " + user1d.name)
                    message.channel.send(embed11)
                    fight(message, user1, user2, user1d, user2d, user1f, user2f, 2, 0, betmoney)
                }
      
            } else if (coolmesgade.content.toLowerCase() == "attack" || coolmesgade.content.toLowerCase() == "fight") {
                if(user1f.weapon == "axe") {
                    var hit = randomInteger(0,3)
                    var damage = hit*randomInteger(5,20)
                    if(damage != 0) {
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Axe Results!")
                        .setDescription("**"+user1d.name+" Hits "+user2d.name+" With AXE**\n\n"+" __**DAMAGE DEALT:  **__`" +damage+"`\n __** "+user2d.name+"**__ now has `"+(user2f.health - damage < 0 ? "0" : user2f.health - damage)+"` health!\n")
                        .setFooter("\"axe power :D\" - "+user1d.name)
                        message.channel.send(embed56)
                    } else {
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Axe Results!")
                        .setDescription("**"+user1d.name+" fails to hit "+user2d.name+" With AXE**\n\n"+" __**DAMAGE DEALT:  **__`0`\n")
                        .setFooter("\"axes are so heavy ugh\" - "+user1d.name)
                        message.channel.send(embed56)
                    }

                } else if(user1f.weapon == "sniper") {
                    if(randomInteger(1,3) == 2) {
                        var damage = randomInteger(40,90)
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Sniper Shot!")
                        .setDescription("**"+user1d.name+" Hits "+user2d.name+" With SNIPER**\n\n"+" __**DAMAGE DEALT:  **__`" +damage+"`\n __** "+user2d.name+"**__ now has `"+(user2f.health - damage < 0 ? "0" : user2f.health - damage)+"` health!\n")
                        .setFooter("\"ha i sniped him\" - "+user1d.name)
                        message.channel.send(embed56)
                    } else {
                        var damage = 0
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Sniper Shot!")
                        .setDescription("**"+user1d.name+" fails to hit "+user2d.name+" With SNIPER**\n\n"+" __**DAMAGE DEALT:  **__`0`\n")
                        message.channel.send(embed56)
                    }
                } else if(user1f.weapon == "ak47") {
                    var hit = randomInteger(0,30)
                    var damage = hit*randomInteger(1,3)
                    if(damage != 0) {
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Ak47 Results!")
                        .setDescription("**"+user1d.name+" Hits "+user2d.name+" With AK47**\n\n"+" __**DAMAGE DEALT:  **__`" +damage+"`\n __** "+user2d.name+"**__ now has `"+(user2f.health - damage < 0 ? "0" : user2f.health - damage)+"` health!\n")
                        .setFooter("\"im sorry for shooting you\" - "+user1d.name)
                        message.channel.send(embed56)
                    } else {
                        const embed56 = new Discord.MessageEmbed()
                        .setTitle("Ak47 Results!")
                        .setDescription("**"+user1d.name+" fails to hit "+user2d.name+" With Ak47**\n\n"+" __**DAMAGE DEALT:  **__`0`\n")
                        .setFooter("\"this gun has so much recoil smh\" - "+user1d.name)
                        message.channel.send(embed56)
                    }
                }

        user2f.health = user2f.health- damage
        if(user2f.health <= 0) {
            user2f.health = 0
            //1 won
            api.changeBal(user1d.id, betmoney)
            .then(() => {
                api.changeBal(user2d.id, -1*betmoney)
                .then(() => {
                    const embed564 = new Discord.MessageEmbed()
                    .setTitle(`${user1d.name} wins!`)
                    .setDescription(`${user1d.name} beat ${user2d.name} by ${user1f.health} health XD.\n\n${user1d.name} won \`${betmoney}\` coins!\n${user2d.name} lost \`${betmoney}\` coins!`)
                    .setFooter("GG")
                    message.channel.send(embed564)
                })
                .catch((err) =>{
                    console.log(err)
                    message.channel.send("error")
                })

            })
            .catch((err) => {
                console.log(err)
                message.channel.send("error")
            })

        } else {
            fight(message, user1, user2, user1d, user2d, user1f, user2f, 2, 0, betmoney)
        }
                


            } else {

                    var fjkgjk =3-xf
                    if (xf <= 2) {
                        message.channel.send("Thats not a valid option, pls try again\nYou have "+fjkgjk.toString()+" more chances")
                        fight(message, orig1, orig2, orig1d, orig2d, orig1f, orig2f, turn, xf += 1, betmoney)

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Challenge Ended`)
                    .setDescription("Due to too many invalid responses")
                message.channel.send(embed)
                }

            }

        })
        collector67121.on("end", () => {
            if(!xyuj12) {
                const embed = new Discord.MessageEmbed()
                .setTitle(`Challenge Expired`)
            message.channel.send(embed)
            }
        })

    
      

}