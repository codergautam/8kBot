const canvacord = require("canvacord")
const Discord = require("discord.js")
module.exports = {
    
	name: 'comment',
	async execute(message, args) {
        yee = false
        message.channel.startTyping()
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.youtube({
            username: message.author.username,
            content: args.join(' '),
            avatar: avatar
        }).catch((err) => {
            yee = true
            message.channel.stopTyping()
            return message.channel.send(err.toString())
  
        });
        if(!yee) {
            let attachment = new Discord.MessageAttachment(image, "triggered.gif");
            message.channel.send(attachment);
            message.channel.stopTyping()
        }



}
}