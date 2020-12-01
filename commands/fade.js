const Discord = require('discord.js')
const canvas = require('canvas');

module.exports = {
    name: 'autocomplete',
    aliases: ["autocomplete"],
    secret: false,
    category: "fun",
    format: "8k!fade [@user]",
    usage: ["8k!fade", "8k!fade @8k bot"],
    description: "Display a fading gif of you or [@user]", 
	async execute(message, args) {
        if(message.mentions.users.first()) {
            var user = message.mentions.members.first()
        } else {
            var user = message.author
        }
       await user.displayAvatarURL({ dynamic: false, format: 'png' })
        
    }
}