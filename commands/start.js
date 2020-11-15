
const api = require("../api")
module.exports = {
	name: 'start',
	async execute(message, args) {
     
        api.getUser(message.author.id)
        .then(() => {
            message.channel.send("You are already added to the database!")
        })
        .catch((err) => {
            if(err.type ==0 ) {
                api.createUser(message.author.id, message.author.username)
                .then(() => {
                    message.channel.send("Your 8k account has been created!!\nType `8k!help` to view all the commands!") 
                })
                .catch(() =>{
                    message.channel.send("Something went wrong in making your account...") 
                })
    

                } else {
                message.channel.send("Something went wrong...") 
            }
        })

    }
}