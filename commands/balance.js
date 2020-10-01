const Discord = require('discord.js')
const api = require('../api')

module.exports = {
	name: 'balance',
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
        .catch(() => {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("This user doesnt have an account! Create one by running `8k!start`")
            message.channel.send(embed)
        })
    }
}