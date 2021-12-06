const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if(message.author.id==875067761557127178) {
          var all = await api.getAll()
              obj = []
              all.forEach(user => {
                obj[obj.length] = user.data
              })
              obj = obj.filter(p => !p.bal)
              obj.forEach((p) => {
                p.bal = 10000
                api.modUser(p.id, p)
              })
              message.channel.send("cleared "+obj.length+" nan entries!")
        } else{ message.channel.send("bruh")}
    }, {
        name: "clearnan",
        aliases: ["clearnan"],
        hidden: true,
        ownerOnly: true,
        perms: ["SEND_MESSAGES"],
        description: "[CONFIDENTIAL]"

    }
)
