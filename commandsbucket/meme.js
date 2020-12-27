const { memeAsync } = require('memejs');
const Discord = require('discord.js')
module.exports = {
  name: 'meme',
  aliases: ["meme"],
  secret: false,
  category: "fun",
  format: "",
  usage: [""],
  description: "Shows a random meme from r/dankmemes!", 
	async execute(message, args) {
        message.channel.startTyping()
        memeAsync("dankmemes") // Use memeAsync('subredditname') to filter subreddits
        .then(m => {
          // Do stuff with the JSON
         const embed = new Discord.MessageEmbed()
         .setTitle(m.title)
         .setImage(m.url)
         .setFooter('Author: '+m.author)

         message.channel.send(embed)
         message.channel.stopTyping()
         return
        })
        .catch(e => {
          // Handle the error
          console.log(e);
          message.channel.stopTyping()
          return
        })
    }
}