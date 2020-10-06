const Discord = require('discord.js')
const api = require('../api')
const fs = require('fs')
const items = require('../json/items.json');
const { isDeepStrictEqual } = require('util');
//Name, Description, price
const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync('./items/').filter(file => file.endsWith('.js'));
for (const file of itemarray) {
	const itemdata = require(`../items/${file}`);
	itemfiles.set(itemdata.name, itemdata);
} 



module.exports = {
	name: 'use',
	async execute(message, args) {
        var item = args.join(' ').toLowerCase()
        if(item != 0) {

        
        if(items.hasOwnProperty(item)) {
api.getUser(message.author.id)
.then((user) => {
    if(!user.hasOwnProperty("inv")) {
        user.inv = {}
    }

    if(user.inv.hasOwnProperty(item)) {

        var userItem = user.inv[item]
        var itemData = items[item]
        itemfiles.get(item).use(message,userItem, itemData, user)


    } else {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("You dont have the item `"+item+"`. You can buy it by typing `8k!buy "+item+"`")
        message.channel.send(embed)
    }

})
/*.catch((err) => {
if(err.type == 0) {
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("This user doesnt have an account! Create one by running `8k!start`")
    message.channel.send(embed)
} else {
    message.channel.send("Something went wrong.")
}
})*/
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Not found")
            .setDescription("The item `"+item+"` was not found\nType `8k!shop` for a list of items")
            message.channel.send(embed)
        }
    } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("No item entered")
        .setDescription("Please use the command like `8k!use <itemname>`\nType `8k!inv` for a list of your items")
        message.channel.send(embed)
    }

    }

}