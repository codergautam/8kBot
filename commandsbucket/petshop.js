


const Discord = require('discord.js')

const pets = require('../json/pets.json')
datatt1 = "*To adopt a pet, please type* `8k!adopt <petname>`\n\n**Available Pets: **\n"
for(pet in pets) {
  datatt1 = datatt1 + pets[pet][0]+" - "+pets[pet][1]+"- Price:  `"+pets[pet][2]+"` *coins*\n";
}


module.exports = {
    name: 'petshop',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Pet shop")
        .setDescription(datatt1)
        message.channel.send(embed)
    }
}