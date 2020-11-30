const Discord = require('discord.js')
const api = require('../api')

module.exports = {
    name: 'balance',
    aliases: ["bal", "balance"],
    secret: false,
    category: "currency",
    format: "8k!bal [@user]",
    usage: ["8k!bal", "8k!bal @pokeski"],
    description: "View how many coins @user has, if no user mentioned, it will show your balance", 
	async execute(message, args) {

        if(message.mentions.users.first()) {
            var id = message.mentions.users.first()
            
        } else {
            var id = message.author
        }
        api.getUser(id.id)
        .then((user) => {
            x=true
        
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(user.name+"'s Balance")
            .setDescription('This user has `'+user.bal+"` coins!")
            message.channel.send(embed)
        })
        .catch((err) => {
            console.log(err)
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("This user doesnt have an account! Create one by running `8k!start`")
            message.channel.send(embed)
        })
    }
}