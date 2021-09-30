
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")
const akinator = require("discord.js-akinator");

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
      var nsfw = false;
      if(message.channel.nsfw) nsfw = true;
        akinator(message, {
            childMode: nsfw, 
        });
    }, {
        name: "akinator",
        aliases: ["akinator", "aki"],
        cooldown: 5000,
        cooldownMessage: "Dont play Akinator too much!\nYou can play Akinator again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "Play Akinator lol!"
    }
)
