const { memeAsync } = require('memejs');
const Discord = require('discord.js')
module.exports = {
	name: 'ph',
	async execute(message, args) {
        message.channel.startTyping()
        memeAsync("ProgrammerHumor") // Use memeAsync('subredditname') to filter subreddits
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