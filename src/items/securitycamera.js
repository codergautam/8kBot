
const Discord = require('discord.js')
const api = require('../core/api')

module.exports = {

    name: 'security camera',
    use(message, userItem, user) {
      api.checkCool(message.author.id, "security").then((cooldown)=> {
      if(cooldown.cooldown) return message.channel.send("You already have a security camera!\nIt expires in `"+api.convertMS(cooldown.msleft)+"`")
      
      
      user.inv["security camera"].amount -= 1
      if(user.inv["security camera"].amount == 0) delete user.inv["security camera"]
      api.modUser(message.author.id, user).then(()=>{
        api.addCool(message.author.id, "security", 7200000).then(()=>{
        message.channel.send("You connect your security camera...\nNow nobody can rob you!\n\n*lasts for 2 hours!*")
        })
      })
      })
    }
}
