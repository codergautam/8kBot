const Discord = require('discord.js')
const api = require('../core/api')

module.exports = {

    name: 'mask',
    use(message, userItem, user) {
      if(user.mask == true) return message.channel.send("You already have a mask on!\nNow go `8k!rob` someone!")
      user.mask = true
      user.inv.mask.amount -= 1
      if(user.inv.mask.amount == 0) delete user.inv.mask
      api.modUser(message.author.id, user).then(()=>{
        message.channel.send("You put your mask on...\nThis gives you a better chance at robbing people\n\n*lasts for one rob!*")
      })
    }
}
