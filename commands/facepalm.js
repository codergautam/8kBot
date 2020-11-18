const canvacord = require("canvacord")
const Discord = require("discord.js")
module.exports = {
    
	name: 'facepalm',
	async execute(message, args) {
        message.channel.startTyping()
        if(message.mentions.users.first()) {
            let avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.facepalm(avatar);
let attachment = new Discord.MessageAttachment(image, "triggered.gif");
 message.channel.send(attachment);
 message.channel.stopTyping()
        } else {
            
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await canvacord.Canvas.facepalm(avatar);
let attachment = new Discord.MessageAttachment(image, "triggered.gif");
message.channel.send(attachment);
message.channel.stopTyping()
        
        }


}
}