const Discord = require('discord.js')
const autocomplete = require('google-search-autocomplete');
const simpleCommand = require("../../core/simpleCommand")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var query = args.join(' ')
        if (query == "") return message.channel.send("**No Query Entered**\nUse command like \n`8k!autocomplete` <query>")
        autocomplete(query, 'chrome').then(response => {
            if (!response.resultArray) return message.channel.send("**Failed**\nSearch not found!")

            var autocompleted = response.resultArray.join('\n')
            const embed = new Discord.MessageEmbed()
                .setTitle("Autocompletion for " + query)
                .setDescription(autocompleted)
            message.channel.send(embed)
                .then(() => {
                    addCD()
                })

        });


    }, {
        name: "autocomplete",
        aliases: ["autocomplete"],
        usage: "{prefix}{cmd} <searchterm>",
        description: "See what google autocompletes for provided search term!",
        cooldown: 1000,
        cooldownMessage: "Bruh you just ran this command. You can see run it again in **{timeleft}**!",
        perms: ["SEND_MESSAGES", "ATTACH_FILES"]
    }
)