


const Discord = require('discord.js')

const jobs = require('../json/jobs.json')
datatt = "*To apply for a job, please type* `8k!apply <jobname>`\n\n**Available Jobs: **\n"
for(job in jobs) {
  datatt = datatt + jobs[job][0]+" - "+jobs[job][1]+"- *Up to* `"+jobs[job][2]+"` *coins/hr*\n";
}


module.exports = {
    name: 'jobs',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Job list")
        .setDescription(datatt)
        message.channel.send(embed)
    }
}