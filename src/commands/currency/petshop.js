const Discord = require('discord.js')
const simpleCommand = require("../../core/simpleCommand")
const pets = require('../../json/pets.json')

datatt1 = "*To adopt a pet, please type* `8k!adopt <petname>`\n\n**Available Pets: **\n"
for (pet in pets) {
    datatt1 = datatt1 + pets[pet][0] + " - " + pets[pet][1] + "- Price:  `" + pets[pet][2] + "` *coins*\n";
}


module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Pet shop")
            .setDescription(datatt1)
        message.channel.send(embed)
    }, {
        name: "petshop",
        aliases: ["petmarket", "petstore", "petshop"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "",
        description: "View the list of available pets!"
    }
)