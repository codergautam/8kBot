function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateRequired(level) {
    answer = 0
    for (var i = 0; i < level; i++) {
        answer += 250 + (10 * i)
    }
    return answer
}
//This code will be run on every message
const talkedRecently = new Set();
const levels = new Set();
const api = require("./api")
const Discord = require("discord.js");
const { getRandomInt } = require("./api");
const moneyGrab = require("../extras/moneygrab")
const commandHandler = require("./commandhandler")
module.exports = (message, client, user) => {

    commandHandler(message, client)
        //make sure name is current name
    if (user.name.replace("*", "\\*").replace("_", "\\_").replace("`", "\\`") != message.author.username.replace("*", "\\*").replace("_", "\\_").replace("`", "\\`")) {
        var oldname = user.name
        user.name = message.author.username.replace("*", "\\*").replace("_", "\\_").replace("`", "\\`")
        api.modUser(message.author.id, user)
            .then(() => {
                api.log(`**NAME CHANGE!** **${oldname}** has changed their 8k name to **${message.author.username}**!`, client)
            })
            .catch((err) => {

            })
    }

    //Money on the ground thing
    if (getRandomInt(1, 100) == 69) {
        moneyGrab(message)
    }
    //levels

    if (!levels.has(message.author.id)) {

        const xpGain = randomInteger(1, 15)
        if (!user.hasOwnProperty("levels")) {
            user.levels = {
                xp: 0,
                level: 0
            }
        }

        user.levels.xp += xpGain
        if (user.levels.xp >= calculateRequired(user.levels.level + 1)) {

            const moneyGain = 1000 + (randomInteger(1 * user.levels.level, 100 * user.levels.level))
            user.bal += moneyGain
                //lvl up
            user.levels.level += 1
            const embed = new Discord.MessageEmbed()
                .setAuthor(user.name, message.author.avatarURL())
                .setTitle(`You leveled up!`)
                .setDescription(`You are now level ${user.levels.level}!\nYou gained \`${moneyGain}\` coins!`)
            message.channel.send(embed)
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 10000)
                })


        }
        api.modUser(message.author.id, user)
            .then(() => {
                levels.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    levels.delete(message.author.id);
                }, 30000);
            })
            .catch((err) => {
                console.log(err)
            })



    }
    if (!talkedRecently.has(message.author.id)) {

        if (!user.hasOwnProperty("pets")) return;
        var array = Object.keys(user.pets)
        if (array.length > 0) {
            const pet = array[Math.floor(Math.random() * array.length)];
            const xpGain = randomInteger(1, 15)
            user.pets[pet].exp += xpGain
            var oldlevel = user.pets[pet].level
            user.pets[pet].level = Math.floor(user.pets[pet].exp / 250)
            if (oldlevel != user.pets[pet].level) {
                var moneyGain = randomInteger(user.pets[pet].level * 10, user.pets[pet].level * 1000)
                user.bal += moneyGain
            }
            api.modUser(message.author.id, user)
                .then(() => {
                    if (oldlevel != user.pets[pet].level) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(user.name, message.author.avatarURL())
                            .setTitle(`Your pet ${user.pets[pet].name} leveled up!`)
                            .setDescription(`${user.pets[pet].name} is now level ${user.pets[pet].level}!\nYou gained \`${moneyGain}\` coins!`)
                        message.channel.send(embed)
                            .then((msg) => {
                                setTimeout(() => {
                                    msg.delete()
                                }, 5000)
                            })
                    }
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        // Removes the user from the set after a minute
                        talkedRecently.delete(message.author.id);
                    }, 60000 - array.length);
                })
                .catch(() => {

                })



        }




    }



}
