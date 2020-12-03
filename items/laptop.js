const Discord = require('discord.js');
const api = require('../api')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

    name: 'laptop',

    async use(message, userItem, user) {

        api.checkCool(message.author.id, "laptop")
            .then((cooldown) => {
                if (cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Cooldown")
                        .setDescription("Too much screentime is bad lol\nYou can use the laptop again in `" + api.convertMS(cooldown.msleft) + "`")
                    message.channel.send(embed)
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Laptop")
                        .setDescription("What do you want to do on your laptop?\n\n**Options:**\n`soccer` - Play some online soccer\n`code` - Code something\n`movie` - Watch a movie")
                        .setFooter("Please respond with one of the above options\nPls respond within 20 seconds")

                    message.channel.send(embed)
                    const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, {
                        max: 1,
                        time: 20000
                    })
                    collected = false
                    xc = false
                    collector.on("collect", (message) => {
                        if (message.content.toLowerCase() == "videogame" || message.content.toLowerCase() == "soccer" || message.content.toLowerCase() == "game" || message.content.toLowerCase() == "computer game" | message.content.toLowerCase() == "video game" || message.content.toLowerCase() == "soccergame") {
                            collected = true
                            var int = getRandomInt(0, 2)
                            message.channel.send("**⚽Soccer!⚽**\n Type `left`, `middle`, or `right` to hit the ball into the goal!")
                                .then(() => {
                                    message.channel.send(soccer(int))
                                        .then((msg) => {
                                            time = 20

                                            const intevr = setInterval(() => {
                                                int -= 1
                                                if (int == -1) {
                                                    int = 2
                                                }
                                                if (!xc) {
                                                    if (time > 0) {
                                                        time -= 2
                                                        msg.edit(soccer(int))

                                                    } else {
                                                        msg.edit("Game ended")
                                                        clearInterval()
                                                        api.addCool(user.id, "laptop", 300000)
                                                            .then(() => {

                                                            })
                                                            .catch((err) => {
                                                                console.log(err)
                                                            })
                                                        
                                                        
                                                    }

                                                } else {

                                                    msg.edit("Game ended")
                                                    clearInterval(intevr)
                                                    api.addCool(user.id, "laptop", 300000)
                                                        .then(() => {

                                                        })
                                                        .catch((err) => {
                                                            console.log(err)
                                                        })
                                                    
                                                    

                                                }
                                            }, 2000)
                                            const collector2 = message.channel.createMessageCollector(m => m.author.id == message.author.id, {
                                                time: 20000
                                            })

                                            collector2.on("collect", (msg) => {

                                                if (msg.content.toLowerCase() == "left") {
                                                    collector2.stop(true)
                                                    xc = true
                                                    if (int != 0) {
                                                        //good
                                                        good(msg, user)
                                                    } else {
                                                        //oof
                                                        
                                                        oof(msg, user)

                                                    }
                                                } else if (msg.content.toLowerCase() == "middle" || msg.content.toLowerCase() == "center" || msg.content.toLowerCase() == "midle") {

                                                    collector2.stop(true)
                                                    xc = true
                                                    if (int != 1) {
                                                        //good
                                                        good(msg, user)
                                                    } else {
                                                        //oof
                                                        oof(msg, user)

         
                                                    }
                                                } else if (msg.content.toLowerCase() == "right") {
                                                    collector2.stop(true)
                                                    xc = true
                                                    if (int != 2) {
                                                        //good
                                                        good(msg, user)
                                                    } else {
                                                        //oof
                                                        oof(msg, user)

                                                    }
                                                } else {
                                                    message.channel.send("Invalid option, pls try again")
                                                }

                                            })

                                        })

                                })

                        } else if (message.content.toLowerCase() == "code" || message.content.toLowerCase() == "program" || message.content.toLowerCase() == "programming" || message.content.toLowerCase() == "coding") {
                            collected = true
                            var coded = ["A social media app", "A video game", "An operating system", "A chatting app"][Math.floor(Math.random() * 4)];
                            var users = getRandomInt(10000, 100000)
                            var moneyEarn = Math.round(users / 20)

                            api.changeBal(user.id, moneyEarn)
                                .then(() => {
                                    message.channel.send(`You made **${coded}** and gained **${users}** users!\nYou gained \`${moneyEarn}\` coins! Niceee application bro!`)
                                    api.addCool(user.id, "laptop", 300000)
                                        .then(() => {

                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })

                                })
                                .catch(() => {
                                    message.channel.send("Error")
                                })



                        } else if (message.content.toLowerCase() == "movie" || message.content.toLowerCase() == "watch" || message.content.toLowerCase() == "tv" || message.content.toLowerCase() == "watch a movie" || message.content.toLowerCase() == "a movie") {
                            collected = true
                            collected = true
                            var coded = [{
                                name: "An awesome movie",
                                money: 500
                            }, {
                                name: "A good movie",
                                money: 350
                            }, {
                                name: "An ok movie",
                                money: 250
                            }, {
                                name: "A bad movie",
                                money: 0
                            }][Math.floor(Math.random() * 4)];

                            api.changeBal(user.id, coded.money)
                                .then(() => {
                                    message.channel.send(`You watched **${coded.name}** and gained \`${coded.money}\` coins!`)
                                    api.addCool(user.id, "laptop", 300000)
                                        .then(() => {

                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                    
                                })
                        } else {
                            collected = true
                            message.channel.send("**Invalid option.** \nPls use a laptop again by typing `8k!use laptop`")
                        }
                    })
                    collector.on("end", () => {
                        if (!collected) {
                            message.channel.send("**Too late.** \nPls use a laptop again by typing `8k!use laptop`")
                        }
                    })
                }
            })
    }
}

function soccer(position) {

    var base = "🥅🥅🥅\n"
    if (position == 0) {
        //left
        var keeper = "🏃  "
    } else
    if (position == 1) {
        //middle
        var keeper = "               🏃 "
    } else
    if (position == 2) {
        var keeper = "                              🏃"
    } else {
        return ("err")
    }
    return (base + keeper)
}

function good(message, user) {
    var moneyEarn = getRandomInt(1, 1000)
    api.changeBal(message.author.id, moneyEarn)
        .then(() => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Soccer Results")
                .setDescription("Nice goal! You got `" + moneyEarn + '` coins!')
                .setFooter("\"I am a pro esports player :D\"- " + user.name)
            message.channel.send(embed)
            api.addCool(user.id, "laptop", 300000)
                .then(() => {

                })
                .catch((err) => {
                    console.log(err)
                })
            
        })
        .catch((err) => {
            console.log(err)
            message.channel.send("An error occured.")
        })
}

function oof(message, user) {
    if (getRandomInt(1,3) == 2) {
        user.inv.laptop.amount = user.inv.laptop.amount - 1
        if (user.inv.laptop.amount == 0) {
            delete user.inv.laptop
        }
        api.modUser(message.author.id, user)
            .then(() => {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Soccer Results")
                    .setDescription("The goalkeeper blocked your shot!\nYou get 0 coins oof.\n**AND your laptop broke *sigh***")
                    .setFooter("\"I didn't lose!! It was lag bruh\"- " + user.name)
                message.channel.send(embed)
                api.addCool(user.id, "laptop", 300000)
                    .then(() => {

                    })
                    .catch((err) => {
                        console.log(err)
                    })
                
            })
            .catch(() => {
                message.channel.send("An error occured.")
            })

    } else {


        const embed = new Discord.MessageEmbed()
            .setTitle("Soccer Results")
            .setDescription("The goalkeeper blocked your shot!\nYou get 0 coins oof.")
            .setFooter("\"I didn't lose!! It was lag bruh\"- " + user.name)
        message.channel.send(embed)
        api.addCool(user.id, "laptop", 300000)
            .then(() => {

            })
            .catch((err) => {
                console.log(err)
            })
        


    }
}