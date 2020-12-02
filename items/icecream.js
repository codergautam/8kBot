const Discord = require('discord.js');
const api = require('../api')
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//"ice cream": ["Ice cream", "Some tasty ice cream🍨", 900, {"custom": true}, {"custombuy": false, "shop": true}],
module.exports = {
    
	name: 'ice cream',

    async use(message, userItem, user)
    {
		api.checkCool(message.author.id, "ice cream")
        .then((cooldown) => {
            if(cooldown.cooldown) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Cooldown")
                .setDescription("You just had an ice cream!\n Too much ice cream is not good for health\nYou can have another one in `"+api.convertMS(cooldown.msleft)+"`")
                message.channel.send(embed)
            }  else {
        api.getUser(user.id)
        .then((user) => {
            if(ofog ==1 ) {
                user.bal += 1000
                message.channel.send("You got a yummy ice cream and gained another **1000** coins.\nYour new balance is **"+user.bal+"** coins")
                api.addCool(user.id, "ice cream", 10000)
                
            } else {
                user.bal += 300                
                message.channel.send("Oops ! You got a melted icecream and gained only **300** Coins.\nYour new balance is **"+user.bal+"** coins")                               
                api.addCool(user.id, "ice cream", 10000)
            }
           user.inv["ice cream"].amount -= 1
           if(user.inv["ice cream"].amount == 0) {
               delete user.inv["ice cream"]
           }
           
           api.modUser(user.id, user)
           .then(() => {
           })
           .catch(() => {
            message.channel.send("Error")
           })
        })
        .catch(() => {
            message.channel.send("Error")
        })
        var ofog = getRandomInt(1,2)
    }
    })
    },
    async sell(message) {
        message.channel.send("You cant sell your Ice cream!!!")
    }
}