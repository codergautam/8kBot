const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")


var prefix = "8k!"
module.exports = new simpleCommand(
        async(message, args, client, addCD) => {

            if (!args[0]) {
                var home = "Hello! I am 8k Bot!\n An awesome Currency and Fun bot made by CoderGautamYT\nTo view my commands please select a category below!\n\n"
                client.categories.forEach(category => {
                    home += `**${category.name}**\n\`${prefix}help ${category.id}\`\n\n`
                });
                await addCD()
                const embed = new Discord.MessageEmbed()
                    .setTitle("8k bot!")
                    .setDescription(home)
                    .setThumbnail("https://cdn.discordapp.com/avatars/783346270290968606/6e44e1005203e027988f9bb2c6deb462.png?size=1024")
                message.channel.send(embed)
            } else {
                var term = args.join(" ").toLowerCase().trim()
                if (client.categories.has(term)) {
                    var category = client.categories.get(term)
                    var desc = `${(category.desc?category.desc:`Here are a list of the **${category.id}** commands!`)}\nView more details of a command by typing **8k!help <commandname>**\n\n`
               var arr = []
               category.commands.forEach(command => {
               arr[arr.length] = command.props.name
               })
               desc= desc+`\`${arr.join("`, `")}\``
            const embed = new Discord.MessageEmbed()
            .setTitle(`${category.name} commands!`)
            .setDescription(desc)


            message.channel.send(embed)
            
           } else if(client.commands.has(term)){
               var command = client.commands.get(term)
               const embed = new Discord.MessageEmbed()
            .setTitle(`${prefix}${term}`)
            .setDescription(`${(
                command.props.description ?
                `**Description**:\n${command.props.description}\n` :
                ""
            )}
            ${(command.props.usage ?
                `**Usage**:\n${command.props.usage.replace("{prefix}", prefix).replace("{cmd}", term).replace("{command}", term)}\n` :
                ""
                )}  
                ${(command.props.aliases ?
                    `**Aliases**:\n${command.props.aliases.join(", ")}\n` :
                    ""
                    )}
                    ${(command.props.perms ?
                        `**Needed Permissions**:\n${[...new Set(command.props.perms)].join(", ")}` :
                        ""
                        )}
                        `)
                        message.channel.send(embed)
           } else {
               message.channel.send(`There is no command or category \`${term}\`\nTry running 8k!help for a list of categories`)
           }


        }
        
        
    },
    {
        name: "help",
        aliases: ["help", "commands", "command"],
        cooldown: 0,
        cooldownMessage: "Glitch i think",
        perms:["SEND_MESSAGES"]   
    }
)