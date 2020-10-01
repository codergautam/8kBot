const fs = require('fs')

module.exports = {
	name: 'start',
	async execute(message, args) {
    fs.readFile('./json/main.json', (err, data) => {
        var json = JSON.parse(data)
        if(json.hasOwnProperty(message.author.id)) {
            message.channel.send("You are already added to our database!")
        } else {
            json[message.author.id] = {
                bal: 1000,
                name: message.author.tag,
                cooldown: {},
                inv: {}
            }
            fs.writeFile('./json/main.json', JSON.stringify(json), (err) => {
                
                if(!err) {
                    message.channel.send("You have been added to the database!\nWelcome to 8k Currency Game! ")
                } else {
                    console.log(err)
                }
                
            })
            
        }
    })

    }
}