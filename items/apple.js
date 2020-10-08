const Discord = require('discord.js')
const api = require('../api')
module.exports = {
    
	name: 'apple',
	use(message, userItem, user) {
		if(Math.floor(Math.random()*50+1 == 30)) {
			var moneyEarn = 50000
			var type = "LEGENDARY GOLDEN APPLE. YUM!"
		} else {
			var dfgd = Math.floor(Math.random()*8+1)
			if(dfgd == 1) {
			var	moneyEarn = 0
			var	type = "Rotten apple *bleh*"
			} else if(dfgd == 2) {
			var	moneyEarn = 500
			var	type = "Old apple.. "
			} else if(dfgd == 3 || dfgd == 4 || dfgd == 5 || dfgd == 6) {
			var	moneyEarn = 1100
			var	type = "Sour apple. 🍏*nice* "
			} else if(dfgd == 7 || dfgd == 8) {
			var	moneyEarn = 2000
			var	type = "Red apple. 🍎*yum* "
			}
		}
			user.inv.apple.amount = userItem.amount - 1
			user.bal = user.bal + moneyEarn
			if(user.inv.apple.amount == 0) {
				delete user.inv.apple
			}
api.modUser(message.author.id, user)
.then(() =>{ 
	const embed = new Discord.MessageEmbed()
		.setTitle("Ate apple")
		.setDescription("That was a "+type+"\nYou got `"+moneyEarn+"` coins!")
	
		message.channel.send(embed)
})
.catch(() => {
	message.channel.send("Something went wrongg")
})

		
		}
    }
