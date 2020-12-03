const api = require("../api")
const Discord = require('discord.js')
const jobjson = require("../json/jobs.json")
const fs = require('fs');
const jobfiles = new Discord.Collection();
const jobarray = fs.readdirSync('./jobs/').filter(file => file.endsWith('.js'));
for (const file of jobarray) {
	const jobdata = require(`../jobs/${file}`);
	jobfiles.set(jobdata.name, jobdata);
} 

module.exports = {
    name: "work",
    execute(message, args) {
        api.getUser(message.author.id)
        .then((user) => {
            if(!user.hasOwnProperty("job")) {
                user.job = {exists:false}
            }
            if(user.job.exists) {
                api.checkCool(message.author.id, "work")
                .then((cooldown) =>{
                    if(cooldown.cooldown) {
                                 
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Cooldown")
                        .setDescription("Too much work is a bad thing\nYou can work again in `"+api.convertMS(cooldown.msleft)+"`" )
                        message.channel.send(embed)
                    } else {
                        jobfiles.get(user.job.name).work(message, (moneyEarned) => {
                            var dafunc = (typeof moneyEarned == "number" ? api.changeBal:api.modUser)
                            dafunc(message.author.id, moneyEarned)
                            .then(() => {
                                api.addCool(message.author.id, "work", (jobjson.hasOwnProperty(user.job.name.toLowerCase())?jobjson[user.job.name][3]:900000))
                            })
                        
                           
                          }, user)
                    }
                })
                .catch((err) =>{ 
                    console.log(err)
                   message.channel.send("Something glitched\n```"+err.toString()+"```") 
                })

            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You dont have an job! View a list of jobs by typing `8k!jobs`")
                message.channel.send(embed)
            }
        })
        .catch((err) => { 
            if(err.type == 0) {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("You dont have an account! Create one by running `8k!start`")
                message.channel.send(embed)
            } else {
                message.channel.send("Something went wrong.")
            }
            
        })
    }
}