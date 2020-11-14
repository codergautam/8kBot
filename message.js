function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//This code will be run on every message
const talkedRecently = new Set();
const api = require("./api")
const Discord = require("discord.js")
module.exports = (message) => {
    
    if (!talkedRecently.has(message.author.id)) {
        api.getUser(message.author.id)
        .then((user) => {
            if(!user.hasOwnProperty("pets")) return;
            var array = Object.keys(user.pets)
            if(array.length > 0) {

    const pet = array[Math.floor(Math.random() * array.length)];
    const xpGain = randomInteger(1,15)
    user.pets[pet].exp += xpGain
    var oldlevel = user.pets[pet].level
    user.pets[pet].level = Math.floor(user.pets[pet].exp/250)
    if(oldlevel != user.pets[pet].level) {
        var moneyGain = randomInteger(user.pets[pet].level * 10, user.pets[pet].level*100)
        user.bal += moneyGain
    }
    api.modUser(message.author.id, user)
    .then(() => {
        if(oldlevel != user.pets[pet].level) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(user.name, message.author.avatarURL())
            .setTitle(`${user.pets[pet].name} leveled up!`)
            .setDescription(`${user.pets[pet].name} is now level ${user.pets[pet].level}!\nYou gained \`${moneyGain}\` coins!`)
            message.channel.send(embed)
        }
    })
    .catch(() => {

    })


    
            }
        })
        .catch(() => {
        })

    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 30000);
}

}