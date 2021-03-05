/*        */


const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const got = require("got")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const embed = new Discord.MessageEmbed()
        got('https://meme-api.herokuapp.com/gimme').then(response => {
            let content = JSON.parse(response.body);
            let memeUrl = content.postLink;
            let memeImage = content.url;
            let memeTitle = content.title;
            let memeUpvotes = content.ups;
            let creator = content.author
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes}\nCreator: u/${creator}\nSubreddit: r/${content.subreddit}`)
            message.channel.send(embed)
                .then(async() => {
                    await addCD()
                })
        })


    }, {
        name: "meme",
        aliases: ["meme", "memes", "redditmeme"],
        cooldown: 2000,
        cooldownMessage: "Bruh you just looked at a meme. You can see one again in **{timeleft}**!",
        description: "View a random meme from reddit!",
        perms: ["SEND_MESSAGES", "ATTACH_FILES"]
    }
)