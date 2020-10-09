const api = require("../api")
const Discord = require("discord.js")
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function leaderboard(obj) {
    const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice(0,10)
    
    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = numberWithCommas(entry.bal)
        if(i+1==1) {
            leaderboard = leaderboard+`🥇 **${entry.name}**- \`${dk}\` coins\n`
        } else if(i+1 ==2) {
            leaderboard = leaderboard+`🥈 ${entry.name}- \`${dk}\` coins\n`
        } else if(i+1 ==3) {
            leaderboard = leaderboard+`🥉 ${entry.name}- \`${dk}\` coins\n`
        } else {
            leaderboard = leaderboard+`#${i+1}: ${entry.name}- \`${dk}\` coins\n`
        }
 
    })
    return(leaderboard)
    }
    function localleaderboard(obj, guild) {
        const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice(0,10)
        
        var leaderboard = ""
        i=-1;
        sorted.forEach((entry) => {
            if(guild.member(entry.id)) {
                i+=1
                dk = numberWithCommas(entry.bal)
                if(i+1==1) {
                    leaderboard = leaderboard+`🥇 **${entry.name}**- \`${dk}\` coins\n`
                } else if(i+1 ==2) {
                    leaderboard = leaderboard+`🥈 ${entry.name}- \`${dk}\` coins\n`
                } else if(i+1 ==3) {
                    leaderboard = leaderboard+`🥉 ${entry.name}- \`${dk}\` coins\n`
                } else {
                    leaderboard = leaderboard+`#${i+1}: ${entry.name}- \`${dk}\` coins\n`
                }
            }
        })
        return(leaderboard)
        }

module.exports = {
	name: 'leaderboard',
	async execute(message, args) {
        if((args[0] ? args[0].toLowerCase() : "") == "local") {
            api.getAll()
            .then((all) => {
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(message.guild.name+"'s Leaderboard")
            .setDescription(localleaderboard(all, message.guild))
            message.channel.send(embed)
            })
            .catch((err) => {
                console.log(err)
                message.channel.send("Leaderboard couldnt be generated")
            })
        } else if((args[0] ? args[0].toLowerCase() : "") == "global"){
            api.getAll()
            .then((all) => {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Global Leaderboard")
                .setDescription(leaderboard(all))
                message.channel.send(embed)
            })
            .catch(() => {
                message.channel.send("Leaderboard couldnt be generated")
            })
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle("Leaderboards")
            .setDescription("Which leaderboard do you want?\n\nType `local` for **"+message.guild.name+"'s** leaderboard\nType `global` for the world-wide leaderboard!")
            message.channel.send(embed)
            const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id,{max:1,time: 20000})
            collector.on("collect", (msg) => {
                if(msg.content.toLowerCase() == "local") {
                    api.getAll()
                    .then((all) => {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(message.guild.name+"'s Leaderboard")
                    .setDescription(localleaderboard(all, message.guild))
                    message.channel.send(embed)
                    })
                    .catch((err) => {
                        console.log(err)
                        message.channel.send("Leaderboard couldnt be generated")
                    })
                } else if(msg.content.toLowerCase() == "global") {
                    api.getAll()
                    .then((all) => {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Global Leaderboard")
                        .setDescription(leaderboard(all))
                        message.channel.send(embed)
                    })
                    .catch(() => {
                        message.channel.send("Leaderboard couldnt be generated")
                    })
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("Invalid type.")
                    message.channel.send(embed)
                }
            })
    
        }

    }
}