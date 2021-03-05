/*

                                                                                                       
                                                                                                       
     888888888      kkkkkkkk                BBBBBBBBBBBBBBBBB                             tttt          
   88:::::::::88    k::::::k                B::::::::::::::::B                         ttt:::t          
 88:::::::::::::88  k::::::k                B::::::BBBBBB:::::B                        t:::::t          
8::::::88888::::::8 k::::::k                BB:::::B     B:::::B                       t:::::t          
8:::::8     8:::::8 k:::::k    kkkkkkk       B::::B     B:::::B   ooooooooooo   ttttttt:::::ttttttt    
8:::::8     8:::::8 k:::::k   k:::::k        B::::B     B:::::B oo:::::::::::oo t:::::::::::::::::t    
 8:::::88888:::::8  k:::::k  k:::::k         B::::BBBBBB:::::B o:::::::::::::::ot:::::::::::::::::t    
  8:::::::::::::8   k:::::k k:::::k          B:::::::::::::BB  o:::::ooooo:::::otttttt:::::::tttttt    
 8:::::88888:::::8  k::::::k:::::k           B::::BBBBBB:::::B o::::o     o::::o      t:::::t          
8:::::8     8:::::8 k:::::::::::k            B::::B     B:::::Bo::::o     o::::o      t:::::t          
8:::::8     8:::::8 k:::::::::::k            B::::B     B:::::Bo::::o     o::::o      t:::::t          
8:::::8     8:::::8 k::::::k:::::k           B::::B     B:::::Bo::::o     o::::o      t:::::t    tttttt
8::::::88888::::::8 k::::::k k:::::k        BB:::::BBBBBB::::::Bo:::::ooooo:::::o      t::::::tttt:::::t
 88:::::::::::::88  k::::::k  k:::::k       B:::::::::::::::::B o:::::::::::::::o      tt::::::::::::::t
   88:::::::::88    k::::::k   k:::::k      B::::::::::::::::B   oo:::::::::::oo         tt:::::::::::tt
     888888888      kkkkkkkk    kkkkkkk     BBBBBBBBBBBBBBBBB      ooooooooooo             ttttttttttt  
     
     Rewrite v2 - By CoderGautamYT
*/
//Initializing everything
const Discord = require('discord.js');
const client = new Discord.Client();

const process = require("process");

const {
    production,
    maintanence,
    self
} = require("./package.json")


//Importing core modules
const msgcli = require('./src/core/messagecli');
const processHandler = require("./src/core/processhandler")
const clientHandler = require("./src/core/clienthandler")

//Getting values from .env file
require('dotenv').config();

//Storing a collection of commands in the client
client.commands = new Discord.Collection();
client.categories = new Discord.Collection();

const getDirectories = source =>
    require('fs').readdirSync(source, {
        withFileTypes: true
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

getDirectories("./src/commands").forEach(category => {
    const categoryobj = require(`./src/commands/${category}`)
    client.categories.set(categoryobj.id, categoryobj)

    categoryobj.commands.forEach(command => {
        try {
            client.commands.set(command.props.name, command)
            if (command.props.hasOwnProperty("aliases")) {
                command.props.aliases.forEach(alias => {
                    if (!client.commands.has(alias)) {
                        client.commands.set(alias, command)
                    }
                })
            }
            console.log(`${command.props.name} command initialized!`)
        } catch (e) {
            console.log("-------------ERROR----------")
            console.log(command)
            console.log("Failed to load")
            console.log(e)
            console.log("-------------ERROR----------")
        }
    })
})

//Ready event
client.on("ready", () => {
    console.log("8k bot is ready!")

    clientHandler(client)
    processHandler(client)
})

//Message event
client.on("message", (message) => {
    var prefix = "8k!"
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return
    if (maintanence && message.guild.id.toString() != "769597572410900500" && !self) return message.channel.send("8k bot is in maintainance mode sry")
    if (maintanence && message.guild.id.toString() != "769597572410900500" && self) return
    msgcli(message, client)
})

//Logging bot with token
client.login(production ? process.env.TOKENMAIN : process.env.TOKENBETA2);