const Discord = require('discord.js')
const autocomplete = require('google-search-autocomplete');

module.exports = {
    name: 'autocomplete',
    aliases: ["autocomplete"],
    secret: false,
    category: "fun",
    format: "8k!autocomplete <searchterm>",
    usage: ["8k!autocomplete coder ga", "8k!autocomplete Mrbeast"],
    description: "See what google autocompletes for provided search term!", 
	async execute(message, args) {
        var query = args.join(' ')
        if(query == "") return message.channel.send("**No Query Entered**\nUse command like \n`8k!autocomplete` <query>")
        autocomplete(query, 'chrome').then(response => {
            if(!response.resultArray) return message.channel.send("**Failed**\nSearch not found!")

            var autocompleted =  response.resultArray.join('\n')
            const embed = new Discord.MessageEmbed()
            .setTitle("Autocompletion for "+query)
            .setDescription(autocompleted)
            message.channel.send(embed)
           
        });
        
    }
}