const request = require('node-superfetch');
const Discord = require('discord.js');
module.exports = {
    name: 'search',
   async execute(message, args) {

        let query = args.join(" ");

        if(!query) return message.channel.send(`Please enter something to search ${message.member}`)
    
        href = await search(query);
        if (!href) return message.channel.send(`Unknown search ${message.member}`)
        const embed = new Discord.MessageEmbed()
        .setTitle(href.title)
        .setDescription(href.snippet)
        .setImage(href.pagemap ? (href.pagemap.cse_image?href.pagemap.cse_image[0].src:null) : null)
        .setURL(href.link)
        .setFooter("Powered by Google")
        message.channel.send(embed)
        


        }
    }

    async function search(query) {

        const { body } = await request.get('https://www.googleapis.com/customsearch/v1').query({
            key: "AIzaSyDg80oYfhaSj9VqUsVRsAcdSuookro16pM", cx:  "10318cbc076a8ae1a", safe: "off", q: query
        });

        if (!body.items) return null;
        return body.items[0];
    }