const Discord = require('discord.js')
const api = require('../api')
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    
	name: 'moneybag',
	use(message, userItem, user) {
        api.checkCool(message.author.id, "moneybag")
        .then((cooldown) => {
            if(cooldown.cooldown) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Cooldown")
                .setDescription("You just used a moneybag. You can use one again in `"+api.convertMS(cooldown.msleft)+"`")
                message.channel.send(embed)
            } else {
                api.addCool(message.author.id, "moneybag", 1800000)
                const embed111 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Catch the moneybag!")
                .setDescription("You threw the Moneybag high!\nSomeone catch it! Type `catch` to catch it")
                .setFooter("type catch to catch the moneybag")
                message.channel.send(embed111)
                .then((jdjg6) => {
                    x=false
                    const collector67 = message.channel.createMessageCollector(m=>m==m,{time: 10000})
                    collector67.on("collect", (message43) => {
                        if(!x) {

                        if(message43.content.toLowerCase() == "catch") {
                            if(message43.author.id==message.author.id) {
                                const embed111 = new Discord.MessageEmbed()
                                .setColor('ORANGE')
                                .setTitle("You cant catch your own moneybag!")
                
                                message.channel.send(embed111)
                            } else{
                                x=true;
                                //catch
                                var moneyetn = getRandomInt(2000,3500)
                                
                                api.changeBal(message43.author.id, moneyetn)
                                .then((use22r) => {
                                    var ownerearn = getRandomInt(1500,3000)
                                    user.inv.moneybag.amount = userItem.amount -1;
                                    if(user.inv.moneybag.amount == 0) {
                                        delete user.inv.moneybag
                                    }
                                    user.bal += ownerearn
                                    api.modUser(message.author.id, user)
                                    .then(() => {
                                        const embed111 = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle("Nice catch, "+use22r.name)
                                        .setDescription(use22r.name+" caught the moneybag and earned `"+moneyetn+"` coins!\n"+`${user.name} gets \`${ownerearn}\` extra coins for being a nice person!`)
                                        .setFooter("\"I caught a bag of money\"- "+use22r.name)
                                        message.channel.send(embed111)
                                        api.addCool(message.author.id, "moneybag", 1800000)
                                    })

                                })
                                .catch((err) => {
                                    if(err.type != 0) {
                                        message43.channel.send("Something went wrong")
                                    }
                                }) 


                        }
                    }
                }
                    })
                    collector67.on("end", () => {
                    if(!x) {
                        //money spills
                        const embed11h = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Catch the moneybag!")
                        .setDescription("You threw the Moneybag high!\nSomeone catch it! Type `catch` to catch it\n**This event has ended**")
                        .setFooter("the moneybag is spilled you cant catch it anymore")
                        jdjg6.edit(embed11h)
                            const embed111 = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Moneybag Spills!")
                            .setDescription("Nobody catched the moneybag and the money spills on the ground!\nEVERYONE Spam `pick` to pick up some money")
                            .setFooter("SPAM pick")
                            message.channel.send(embed111)
                            .then((jdjg) => {
                                const collector67 = message.channel.createMessageCollector(m=>m==m,{time: 20000})
                                collector67.on("collect", (message43) => {
                                    if(message43.content.toLowerCase() == "pick") {
                                        var lolgf = getRandomInt(10,100)
                                        api.changeBal(message43.author.id, lolgf)
                                        .then((user) => {
                                            const embed111 = new Discord.MessageEmbed()
                                            .setColor('#0099ff')
                                            .setTitle(user.name+" found some money")
                                            .setDescription(`${user.name} found \`${lolgf}\` coins!\nYour new total is \`${user.bal}\` coins!`)
                                            .setFooter("spam pick for more money xD")
                                            message.channel.send(embed111)
            
                                        })
                                        .catch((err) => {
                                            if(err.type != 0) {
                                                message43.channel.send("something went wrong.")
                                            }
                                        })
                                    }
                                })
                                collector67.on("end", () => {
                                    const embedkkk = embed111
                                    .setDescription("Nobody catched the moneybag and the money spills on the ground!\nEVERYONE Spam `pick` to pick up some money\nThis event has ended :(")
                                    .setFooter("This event has ended")
                                    jdjg.edit(embedkkk)
                                    var ownerearn = getRandomInt(1500,3000)
                                    user.inv.moneybag.amount = userItem.amount -1;
                                    if(user.inv.moneybag.amount == 0) {
                                        delete user.inv.moneybag
                                    }
                                    user.bal += ownerearn
                                    api.modUser(message.author.id, user)
                                    .then((user) => {
                                        const embed = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle("Moneybag Empty")
                                        .setDescription(`The moneybag was emptied...\n ${user.name} gets \`${ownerearn}\` extra coins for being a nice person!`)
                                        .setFooter("\" we got some free money ay\" -"+user.name)
                                        message.channel.send(embed)
                                        
                                    })

                                })
                            })
            


                    }
            
                    })
                })
            }

        })
        .catch(() => {
            message.channel.send("Something error")
        })

    }
}