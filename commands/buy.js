const Discord = require('discord.js')
const api = require('../api')
//Name, Description, price

const items = require('../json/items.json')
module.exports = {
	name: 'buy',
	async execute(message, args) {
        api.getUser(message.author.id)
        .then((user) => {
            var item = args.join(' ').toLowerCase()
            if(items.hasOwnProperty(item)) {
                message.channel.send("How many "+item+"s do you want? \n Please respond within 20 seconds");
                const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
                collector.on("collect", (message23) => {
                    if(isNaN(parseInt(message23.content)) || parseInt(message23.content) < 1) {
                        message23.channel.send("Pls enter a valid number... \n Run the command again")
                    } else {
                        var amount = parseInt(message23.content)
                        var price = items[item][2] * amount
                        //add inventory if does not exist
                       if(!user.hasOwnProperty("inv")) {
                           user.inv = {}
                       }

                       //check if user has enough money to buy item
                       if(user.bal-price < 0) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle("Not Enough Coins")
                        .setDescription("You need `"+(user.bal-price)*-1+"` more coins to buy "+amount+" "+item+"s")
                        message.channel.send(embed)
                       } else {
                        //BUY THE ITEM
                        user.inv[item] = {amount: amount}
                        user.bal = user.bal - price
                        //Save their new data
                        api.modUser(message.author.id, user)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setTitle("Purchase Successful!")
                            .setDescription("Congrats! You bought `"+amount+"` "+item+"s for `"+price+"`!\nYour remaining balance is `"+user.bal+"`")
                            message.channel.send(embed)
                        })
                        .catch((err) => {
                            message.channel.send("Something went wrong...")
                            console.log(err)
                        })
                       }
                        
                    }
                    
                })
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("Not found")
                .setDescription("The item `"+item+"` was not found\nType `8k!shop` for a list of items")
                message.channel.send(embed)
            }


        })
        .catch((err) => {
            if(err.type == 0) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("This user doesnt have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            } else {
                message.channel.send("Something went wrong....")
            }
        })
    }
}