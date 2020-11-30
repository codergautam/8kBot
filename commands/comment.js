const canvacord = require("canvacord")
const Discord = require("discord.js")
module.exports = {
    
    name: 'comment',
    aliases: ["ytcomment", "youtube", "comment"],
    secret: false,
    category: "fun",
    format: "8k!comment <text>",
    usage: ["8k!comment Hello", "8k!comment sub to coder gautam lol"],
    description: "This command shows a youtube comment image with <text> in it!", 
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
            let attachment = new Discord.MessageAttachment(image, "comment.png");
            message.channel.send(attachment);
            message.channel.stopTyping()
        }



}
}