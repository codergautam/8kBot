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
const process = require("process");
const { Intents } = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_VOICE_STATES);

const client = new Discord.Client({ intents: myIntents });


const {
    production,
    maintanence,
    self
} = require("./package.json")


//Importing core modules
const msgcli = require('./src/core/messagecli');
const processHandler = require("./src/core/processhandler")
const clientHandler = require("./src/core/clienthandler");
const messagecli = require('./src/core/messagecli');
const api = require('./src/core/api');

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
    if (message.author.bot) return;
    api.getUser(message.author.id)
        .then((user) => {
            var prefix = "8k!"
            if (maintanence && message.author.id != 875067761557127178) return
            if (!message.content.toLowerCase().startsWith(prefix)) return
            
            messagecli(message, client, user)

        })
        .catch((err) => {
            console.log(err)
            if (err.type == 0) {
                api.createUser(message.author.id, message.author.username)
                    .then((user) => {
                        messagecli(message, client, user)
                        api.numOfUsers()
                            .then((count) => {
                                api.log(`**NEW USER!** Welcome to 8k bot, **${message.author.username}**! They are our \`${api.numberWithCommas(count)}${api.ordinal_suffix(count)} user!\``, client)
                            })

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
})

//Logging bot with token
//client.login(production ? process.env.TOKENMAIN : process.env.TOKENBETA2);
