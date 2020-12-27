


const Discord = require('discord.js')

const jobs = require('../json/jobs.json')
datatt = "*To apply for a job, please type* `8k!apply <jobname>`\n\n**Available Jobs: **\n"
for(job in jobs) {
  datatt = datatt + jobs[job][0]+" - "+jobs[job][1]+"- *Up to* `"+jobs[job][2]+"` *coins/hr*\n";
}


module.exports = {
    name: 'jobs',
    aliases: ["jobs", "job", "joblist"],
    secret: false,
    category: "currency",
    format: "",
    usage: [""],
    description: "This command shows the list of available 8k jobs!\nYou can apply for one by typing `8k!apply <jobname>`", 
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Job list")
        .setDescription(datatt)
        message.channel.send(embed)
    }
}