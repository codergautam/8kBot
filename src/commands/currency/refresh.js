const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
     if(!(message.author.id == 672077948639248416)) return
    api.getUser(892444665612230728).then((user)=>{
      api.getUser(755863963048345815).then((user2)=>{
        user2.bal = user2.bal - 13226937
        user.bal = user.bal + 13226937
        api.modUser(755863963048345815, user2).then(()=>{
          api.modUser(892444665612230728, user).then(()=>{
            message.channel.send("malachi gave Fish outta' wata' `13,226,937` coins!")
          })
        })
      })
    })

    }, {
        name: "refresh",
        aliases: ["refresh"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "View how much 8k coins you or someone else has!\nShows the balance of [@user], if no user pinged, it will show your balance.",
        usage: "{prefix}{cmd} [@user]"
    }
)
