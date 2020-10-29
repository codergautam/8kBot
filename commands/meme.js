const { memeAsync } = require('memejs');
const Discord = require('discord.js')
module.exports = {
	name: 'meme',
	async execute(message, args) {
 
        memeAsync() // Use memeAsync('subredditname') to filter subreddits
        .then(m => {
          // Do stuff with the JSON
         const embed = new Discord.MessageEmbed()
         .setTitle(m.title)
         .setImage(m.url)
         .setFooter('Author: '+m.author)

         message.channel.send(embed)
        })
        .catch(e => {
          // Handle the error
          console.log(e);
        })
    }
}