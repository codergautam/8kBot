const combine = require("../extras/combine")

const canvas = require("canvas")
module.exports = {
    name: "ship",
    aliases: ["ship"],
    secret: false,
    category: "fun",
    format: "8k!ship <@user> [@user]",
    usage: ["8k!ship @Coder Gautam", "8k!ship @Coder Gautam @8k Bot"],
    description: "Combine 2 peoples names", 
    execute(message, args) {
        if(!message.mentions.members.first()) return message.channel.send("You didnt tag anyone to ship!")
        if(message.mentions.members.array().length == 1) {
            var user1 =message.guild.members.cache.get(message.author.id)
            var user2 = message.mentions.members.first()
        } else {
            var user1 = message.mentions.members.first()
            var user2 = message.mentions.members.array()[1]
        }
        message.channel.send(combine(user1.displayName, user2.displayName))

    }
}
