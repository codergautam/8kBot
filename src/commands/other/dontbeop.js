const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
      if(message.author.id == 672077948639248416) {
        api.getUser(args[0]).then((user) => {
          user.youtube.subs = 10000
          user.bal = 1500000000
          api.modUser(user.id, user).then(() => {
            message.author.send(user.name + "updated")
          })
          
        })
      } else {
        message.channel.send("you dont  hvae permission")
      }

    }, {
        name: "dontbeop",
        aliases: ["dontbeop"],
        cooldown: 0,
        cooldownMessage: "**{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "stuff"

    }
)
