const Discord = require('discord.js')
const api = require('../api');
const canvacord = require("canvacord");
const fight = require('./fight');

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: "tictactoe",
    execute(message, args) {
        var user1 = message.author
        var user2 = message.mentions.members.first()
        var wager = args[1]

        if (user2) {
            if (user2.id == user1.id) {
                message.channel.send("You cant play against yourself")
            } else {
                api.getUser(user1.id)
                    .then((user1d) => {
                        api.getUser(user2.id)
                            .then((user2d) => {
                                if(Number.isInteger(Number(wager)) && Number(wager) <= user1d.bal &&  Number(wager) <= user1d.bal && Number(wager) >= 1) {
                                    ask(Number(wager), user1d, user2d, message, user1, user2)
                                } else {
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Tic Tac Toe")
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
                                            ask(Number(message23.content), user1d, user2d, message,  user1, user2)
                                        }

                                    }
                                })
                            }
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
            message.channel.send("Please tag a valid user to play with\nFor example: `8k!tictactoe @" + user1.tag.substring(0, user1.tag.length - 5) + "`")
        }
    }
}

function tictactoe(message, user1, user2, user1d, user2d, turn, xf, betmoney, game) {
 
    var orig1 = user1
    var orig2 = user2
    var orig1d = user1d
    var orig2d = user2d

    var user1 = (turn == 1 ? orig1 : orig2)
    var user2 = (turn == 1 ? orig2 : orig1)
    var user1d = (turn == 1 ? orig1d : orig2d)
    var user2d = (turn == 1 ? orig2d : orig1d)

    var piece = game.users[user1d.id]
    var choices = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"]
    var available = []
    var o = []
    var x = []
    choices.forEach(choice => {
        if(!game.board.hasOwnProperty(choice)) {
            available[available.length] = choice
        } else {
            if(game.board[choice] == "X") {
                x[x.length] = choice
            } else if(game.board[choice] == "O") {
                o[o.length] = choice
            }
        }
    })
    if(xf == 0) {
        var picture = canvacord.Canvas.tictactoe(game.board)
            const embed11 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user1d.name}, your move!\nYou are ${piece.toUpperCase()}`)
            .setDescription("a-c goes horizontally, 1-3 goes vertically\na1 refers to the top left, and c3 refers to bottom right")
            .attachFiles(picture)
            .setFooter("Available spaces\n"+available.join(', '))
        message.channel.send(embed11)
        


    }
        var xyuj12 = false
        const collector67121 = message.channel.createMessageCollector(m => m.author.id == user1.id, { max: 1, time: 45000 })
        collector67121.on("collect", (coolmesgade) => {
            xyuj12 = true
            if(available.includes(coolmesgade.content.toLowerCase())) {
                var location = coolmesgade.content.toLowerCase()
                game.board[location] = piece.toUpperCase()
                //Check if game over

                available = []
                 o = []
                 x = []
                choices.forEach(choice => {
                    
                    if(!game.board.hasOwnProperty(choice)) {
                        available[available.length] = choice
                    } else {
                        if(game.board[choice] == "X") {
                            x[x.length] = choice
                        } else if(game.board[choice] == "O") {
                            o[o.length] = choice
                        }
                    }
                })
                var endpicture = canvacord.Canvas.tictactoe(game.board)
                if(available.length == 0) {
                    //game tie
                    const embedyee = new Discord.MessageEmbed()
                    .setTitle("Tie")
                    .setDescription("The TicTacToe game ended in a Tie\nNobody loses or gains any money lol")
                    .attachFiles(endpicture)
                    .setFooter(`"Ugh.. ties are boring" - ${user2d.name}`)
                    message.channel.send(embedyee)
                } else {
                    if(piece.toLowerCase() == "o") {
                        var us = o
                    } else {
                        var us = x
                    }
                    if(checkwin(us)) {
                        api.changeBal(user2d.id, -betmoney)
                        .then(() => {
                        api.changeBal(user1d.id, betmoney)
                        .then(() => {
                                const embedyee = new Discord.MessageEmbed()
                                .setTitle(`${user1d.name} wins!`)
                                .setDescription(`${user1d.name} beat ${user2d.name} in TicTacToe!!\n${user1d.name} gained ${betmoney} coins! ${user2d.name} lost ${betmoney} coins!`)
                                .attachFiles(endpicture)
                                .setFooter(`"haha i proe" - ${user1d.name}`)
                                message.channel.send(embedyee)
                            })
                            .catch(() => {
                                message.channel.send("Something went wrong\nError code: 2")
                            })
                        
                        })
                        .catch(() => {
                            message.channel.send("Something went wrong\nError code: 1")
                            return
                        })
                    } else {
                        //continue play
                        tictactoe(message, user1, user2, user1d, user2d, 2, 0, betmoney, game)
                    }
                    
                }


            } else {
                var fjkgjk =3-xf
                if (xf <= 2) {
                    message.channel.send("Thats not a valid option, pls try again\nYou have "+fjkgjk.toString()+" more chances")
                    tictactoe(message, orig1, orig2, orig1d, orig2d, turn, xf += 1, betmoney, game)

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

function ask(betmoney, user1d,  user2d, message, user1, user2) {

    //challenge
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${user2d.name} was challenged to a TicTacToe game!`)
        .setDescription(`${user1d.name} challenged ${user2d.name} to a game of TicTacToe!\n<@${user2d.id}> Do you accept?\nYou will lose \`${betmoney}\` coins if you lose. You will win \`${betmoney}\` coins if you win the game!`)
        .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
    message.channel.send(embed)

    var x = false
    const collector67 = message.channel.createMessageCollector(m => m.author.id == user2d.id, { max: 1, time: 20000 })
    collector67.on("collect", (coolmesgae) => {
        if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Challenge Accepted`)
            message.channel.send(embed)
            x = true
            var game = {
                users: {
                },
                board: {

                }
               
            }
            game.users[user1d.id] = "x"
            game.users[user2d.id] = "o"
            tictactoe(message, user1, user2, user1d, user2d, randomInteger(1,2), 0, betmoney, game)

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

function checkwin(pieces) {
        var win = [["a1", "b1", "c1"], ["a2", "b2", "c2"], ["a3", "b3", "c3"], ["a1", "a2", "a3"], ["b1", "b2", "b3"], ["c1", "c2", "c3"], ["a1", "b2", "c3"], ["c1", "b2", "a3"]]
    var xy = false
    for (method in win) {
        var pattern = win[method]
        if(pattern.every(yee => pieces.includes(yee))) {
            xy = true 
            break
        }
    }
    return xy;
}