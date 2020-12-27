const Discord = require("discord.js")

var commands = new Discord.Collection();

//get all category folders
const api = require("./api");
const { owners } = require("../../package.json")



function isAO(val) {
    return val instanceof Array || val instanceof Object ? true : false;
}

module.exports = (message, client) => {
    var prefix = "8k!"

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const commands = client.commands
    try {
        if (commands.has(command)) {

            var commandobj = commands.get(command)

            if (!message.guild.me.hasPermission("SEND_MESSAGES")) return console.log("dont have send msg perms")
            if (commandobj.ownerOnly && !owners.includes(message.author.id)) return message.channel.send("This command is only available for the owner of 8k bot! Sorry!")
            if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("Make sure I have `Embed Links` permission!\nYou can give me this by click Server settings > My role and check Embed Links!")
            if (commandobj.props.perms.some(perm => !message.guild.me.hasPermission(perm))) {
                const neededPerms = commandobj.props.perms.filter(perm => !message.guild.me.hasPermission(perm))
                message.channel.send(neededPerms.join(" "))
            } else {
                message.channel.startTyping()
                api.checkCool(message.author.id, commandobj.props.name)
                    .then((cooldown) => {

                        if (cooldown.cooldown) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')

                            .setTitle("Cooldown")
                                .setDescription(commandobj.props.cooldownMessage.replace("{timeleft}", api.convertMS(cooldown.msleft)))
                            message.channel.send(embed)
                            message.channel.stopTyping()
                        } else {
                            const addCD = () => {
                                return api.addCool(message.author.id, commandobj.props.name, commandobj.props.cooldown)
                            }
                            try {
                                commandobj.run(message, args, client, addCD)
                                    .catch(e => {
                                        message.channel.send(new Discord.MessageEmbed().setTitle("oh noe").setDescription(`An error has occured, if this keeps coming again and again contact the owner\n\`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``))
                                        message.channel.stopTyping()
                                    })
                                message.channel.stopTyping()
                            } catch (e) {


                                message.channel.send(new Discord.MessageEmbed().setTitle("oh noe").setDescription(`An error has occured, if this keeps coming again and again contact the owner\n\`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``))
                                message.channel.stopTyping()
                            }


                        }
                    })
                    .catch((e) => {
                        message.channel.stopTyping()
                        message.channel.send(new Discord.MessageEmbed().setTitle("oh noe").setDescription(`An error has occured, if this keeps coming again and again contact the owner\n\`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``))

                    })

            }

        }
    } catch (e) {
        message.channel.send(new Discord.MessageEmbed().setTitle("oh noe").setDescription(`An error has occured, if this keeps coming again and again contact the owner\n\`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``))
        message.channel.stopTyping()
    }
}