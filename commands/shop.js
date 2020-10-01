


const Discord = require('discord.js')

const items = require('../json/items.json')
data = "*To buy an Item, please type* `8k!buy <itemname>`\n\n**Shop Items: **\n"
for(item in items) {
  data = data + items[item][0]+" - "+items[item][1]+"-`"+items[item][2]+"` coins\n";
}


module.exports = {
    name: 'shop',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Shop")
        .setDescription(data)
        message.channel.send(embed)
    }
}