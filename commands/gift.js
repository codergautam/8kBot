const api = require("../api")
const Discord = require('discord.js')
const items = require('../json/items.json')

const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync('./items/').filter(file => file.endsWith('.js'));
for (const file of itemarray) {
	const itemdata = require(`../items/${file}`);
	itemfiles.set(itemdata.name, itemdata);
} 

module.exports = {
    name: 'gift',
    execute(message, args) {
        var user1 = message.author
        var user2 = message.mentions.users.first()
        var amount = Number(args[args.length-2])
        var item = args
        item.pop()
        item.pop()
        item = item.join(' ')
        console.log(amount)
if(isNaN(amount) || amount < 1 || !Number.isInteger(amount)) {
    
    message.channel.send("Please use command like this `8k!gift <itemname> <amount> <@user>`\n**Remember, 8k!gift is for giving ITEMS, while 8k!give is for giving COINS**")
} else {
        if(user2) {
            var user2id = user2.id
            if(user2.id == user1.id) {
                message.channel.send("You cant gift items to yourself!")
            } else {
                api.getUser(user1.id)
                .then((user) => {
                    if(items.hasOwnProperty(item)) {

                    if(user.inv.hasOwnProperty(item)) {


                        if(items[item][5].customgive) {
                            itemfiles.get(item).gift(message,args, user, {user1: user1, user2: user2, amount: amount})
                        } else {
                    if(user.inv[item].amount-amount<0) {
                        message.channel.send(user.name+" doesn't have this much "+item+"s left to give...")
                    } else {
                        api.getUser(user2.id)
                        .then((user2) => {
                            user.inv[item].amount =user.inv[item].amount- amount;
                            if(user.inv[item].amount == 0) {
                                delete user.inv[item]
                            }
                            api.modUser(user1.id, user)
                            .then(() => {
                                if(!user2.inv.hasOwnProperty(item)) {
                                    user2.inv[item] = {amount: 0}
                                }
                                user2.inv[item].amount += amount

                                api.modUser(user2id, user2)
                                .then(() => {
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Success!")
                                    .setDescription(`${user.name} gave \`${amount} ${item}s\` to ${user2.name}`)
                                    message.channel.send(embed)
                                })
                                .catch(() => {
                                    message.channel.send("Arrrrggghhhh... big ooof something glitched")
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                message.channel.send("Something happened...")
                            })
                        })
                      
                            .catch(() => {
                                const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle("This user doesnt have an account!")
                                message.channel.send(embed)
                            })
                      
                    }
                }

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(` You do not have the item \`${item}\``)
                    message.channel.send(embed)
                }
                
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`\`${item}\` is not a valid item in the shop!`)
                    message.channel.send(embed)
                }
                })
                .catch(() => {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("You dont have an account! Create one by running `8k!start`")
                    message.channel.send(embed)
                })
            }
        } else {
            message.channel.send("Please tag a user to give items to")
        }
    }
    }
}

