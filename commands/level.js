function calculateRequired(level) {
    answer = 0
    for(var i=0; i < level; i++){
        answer += 250+(10*i)
    }
    return answer
}
const canvacord = require("canvacord");
const Discord = require("discord.js");
        const api = require("../api")
        module.exports = {
            
            name: 'level',
            execute(message, args) {
                if(message.mentions.users.first()) {
                    var id = message.mentions.users.first()
                    
                } else {
                    var id = message.author
                }
                api.getUser(id.id)
                .then((user) => {
                    if(!user.hasOwnProperty("levels")) {
                        user.levels = {
                            xp: 0,
                            level: 0
                        }

                    }
                    api.getAll()
                    .then((obj) => {
                    
                    const sorted = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp) ).reverse()
                   var ranknum = sorted.findIndex(user => user.id == id.id)+1
                    const rank = new canvacord.Rank()
                    .setAvatar(id.displayAvatarURL({ dynamic: false, format: 'png' }))
                    .setCurrentXP(user.levels.xp)
                    .setRequiredXP( calculateRequired(user.levels.level+1))
                    .setStatus("dnd")
                    .setProgressBar("#FFFFFF", "COLOR")
                    .setUsername(user.name)
                    .setDiscriminator(message.author.discriminator)
                    .setLevel(user.levels.level)
                    .setRank(ranknum)
                    
                 
                rank.build()
                    .then(data => {
                        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                        message.channel.send(attachment);
                    });
                })
            })
                .catch((err) => {
                    message.channel.send("You or the mentioned user doesnt have an 8k account!\n```"+err.toString()+"```")
                })
        }
        }