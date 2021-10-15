const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        var user1 = message.author
        var user2 = message.mentions.users.first()
        if (args.length < 1) return message.channel.send("You didnt mention anyone to give a shoutout to!\nFor more info, type `8k!help shoutout`")

        api.getUser(user1.id).then((user1) => {
            api.getUser(user2.id).then((user2) => {
                if (!(user1.hasOwnProperty("youtube") && user1.youtube.hasOwnProperty("subs"))) return message.channel.send("You don't have a youtube channel! \n You can be one by typing `8k!apply youtuber`")
                if (!(user2.hasOwnProperty("youtube") && user2.youtube.hasOwnProperty("subs"))) return message.channel.send(user2.name + " is not a youtuber!")
            //    if (user1.youtube.subs < user2.youtube.subs) return message.channel.send("You can't give a shoutout to someone who has more subs than you!")
                    if(user1.id == user2.id) {
                        return message.channel.send("nope!")
                    }
                var subsToGive = Math.ceil(getRandomInt(user1.youtube.subs / 100, user1.youtube.subs / 10))

                user2.youtube.subs += Math.floor(subsToGive)

                api.modUser(user2.id, user2).then(async() => {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0000FF')
                        .setTitle("Shoutout!")
                        .setDescription(user2.name + " gained `" + api.numberWithCommas(subsToGive) + "` subscribers!");

                    message.channel.send(embed)
                    await addCD()
                })
            }).catch(() => {
                message.channel.send("The person you tagged doesn't have an account!\nTell them to type something then try again!")
            })
        })


    }, {
        name: "shoutout",
        aliases: ["shoutout", "promote"],
        cooldown: 1800000,
        cooldownMessage: "You just gave someone a shoutout! You can do it again in **{timeleft}**.",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} <@user>",
        description: "Give @user a YouTube shoutout! (gets them some free subs)"
    }
)
