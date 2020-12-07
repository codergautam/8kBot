


const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const msgcli = require('./message');
const {version, production, maintanence, self} = require("./package.json")
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const process = require("process");
const api = require('./api');
var stats = [`Version ${version}`, "8k!help"]
const dbl = require("./extras/dbl")
require('dotenv').config();
client.on("ready", () => {
  dbl(client)
  if(maintanence) return client.user.setPresence({ activity: { name: "Maintainance Mode..." , type: "WATCHING"},  status: "dnd"});

setInterval(function() {
 
  let status = stats[Math.floor(Math.random()*stats.length)];
  api.numOfUsers()
  .then((data) => {
    stats = [`Version ${version}`, "8k!help", `${api.numberWithCommas(data)} users!`]
    client.user.setPresence({ activity: { name: status , type: "WATCHING"},  status: "available"});
  })
  .catch(() => {
    client.user.setPresence({ activity: { name: status , type: "WATCHING"},  status: "available"});
  })
}, 5000)
})

process.on('SIGINT', () => {
  if(!maintanence && !self) {
  //console.log('Goodbye, bot');
    //Goodbye, bot! sounds creepy
    //7 y/o girl voice: goodbye!
    //demon voice: **BOT!**
    //my imagination is weird
    api.log(`**OFFLINE!** 8k bot is going offline! Probably down for maintainance or updates. I'll be back soon!`, client)
    .then(() => {
      console.log('Logging off');
      process.exit()
    })
  } else {
    process.exit()
  }

});

process.on("uncaughtException", (err) => {
  if(!maintanence && !self) {
  console.log(err)
  api.log(`**OFFLINE!** 8k bot is going offline! **UNCAUGHT EXCEPTION**\n\`${err.toString()}\``, client)
  .then(() => {
    process.exit()
  })
  .catch(() => {
    process.exit()
  })
}else {
  process.exit()
}
})

process.on('SIGUSR1', () => {
    api.log(`**OFFLINE!** 8k bot is going offline! Probably down for updates. I'll be back soon!`, client)
    .then(() => {
      console.log('Logging off');
      process.exit()
    })

});
process.on('SIGUSR2', () => {
    api.log(`**OFFLINE!** 8k bot is going offline! Probably down for updates. I'll be back soon!`, client)
    .then(() => {
      console.log('Logging off');
      process.exit()
    })

});
//It keeps freaking me out of how it keeps saying 1 UNSAVED or 2 UNSAVED; It's like it's saying that if I don save, the world goes kaboom
client.on("ready", () => {
console.log("Logging on!")
if(!maintanence && !self) {
api.log(`**ONLINE!** 8k bot is now back online! RUNNING \`v${version}\`!`, client)
} else {
  api.log(`**8k bot is down for maintanence!! Commands wont work sryyy**`, client)
}
})
process.on("exit", () => {
  api.log(`**OFFLINE!** 8k bot is going offline! Probably down for updates. I'll be back soon!`, client)
  .then(() => {
    console.log('Logging off');
    process.exit()
  })

});


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log("Initialized "+`./commands/${file}`)
}

var prefix = "8k!"

client.on("guildCreate", (guild) => {
  //bot added to new guild yey
  api.log(`**NEW GUILD!** 8k Bot was added to \`${guild.name}\`, which has \`${api.numberWithCommas(guild.memberCount)}\` members! 8k is now in \`${api.numberWithCommas(client.guilds.cache.size)}\` guilds!`, client)
})

client.on("guildDelete", (guild) => {
  api.log(`**GUILD REMOVED!** 8k Bot was removed from \`${guild.name}\`, sucks to be them lol! 8k is now in \`${api.numberWithCommas(client.guilds.cache.size)}\` guilds!`, client)
})
client.on("message", (message) => {
/*
  var check = ["coder gautam", "gautam", "eightk", "8k!bot", "gautam", "8k bot", "bot", "lol", "xd", "lmao", "yeet", "js", "javascript", "coding", "code", "program", "halloween", "pumpkin", "haloween", "pumkin", "scary", "scare", "spooktober","ghost", "zombie", "witch", "spook", "spooky", "october", "sword", "spider", "candy", "trick", "or", "treat"]
  var emojis = ["😨", "😰", "😱", "🤡", "😈", "👿", "👹", "👺", "💀", "☠️", "👻", "👽", "👾", "🤖", "🧙‍", "🧚‍", "🧛‍", "🧜‍", "🧝‍", "🧞‍", "🧟‍", "🕴", "💚", "🖤", "🦄", "🦇", "🦉", "🕷", "🕸", "🥀", "🍫", "🍬", "🍭", "🏚", "🌃", "🛸", "🌕", "🌚", "🌩", "⚡️", "🎃", "🔮", "🎭", "🕯", "🗡", "⛓", "⚰️", "⚱️"]
  for(str in check) {
    if(message.content.toLowerCase().includes(check[str])) {
      message.react( emojis[Math.floor(Math.random() * emojis.length)])
      .catch(() => {

      })
    }
  }
*/
if(message.author.bot) return;
  if(message.author.id !== client.user.id) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
if(message.content.startsWith("8k!") || message.content.startsWith("8K!")) {
if(maintanence && message.guild.id.toString() != "769597572410900500" && !self) return message.channel.send("8k bot is in maintainance mode sry")
if(maintanence && message.guild.id.toString() != "769597572410900500" && self ) return
  if(command === 'question') {
    client.commands.get('question').execute(message, args, client);
  }
  if(command === 'say') {
    client.commands.get('say').execute(message, args, client);
  }
  if(command === 'help') {
    client.commands.get('help').execute(message, args, client);
  }
  //Currency game
  if(command === 'start') {
    message.channel.send("8k!start has been deprecated..\nIf you got an error saying to use this command it means:\n1- An error occured in the code\n2- You havent been added to the database\n\nUsually running the command again will fix this issue... Ty!")
  }
  if(command === 'transfer'|| command === 'give') {
    client.commands.get('transfer').execute(message, args, client);
  }
  if(command === 'balance'|| command === 'bal') {
    client.commands.get('balance').execute(message, args, client);
  }
  if(command === 'beg' || command === 'ask') {
      
      client.commands.get('beg').execute(message, args);

  }
  if(command === 'rich') {
    client.commands.get('rich').execute(message, args);
  }
  if(command === 'shop' || command === 'market' || command === 'store') {
    client.commands.get('shop').execute(message, args);
  }
  if(command === 'buy' || command === 'purchase') {
    client.commands.get('buy').execute(message, args);
  }
  if(command === 'inv' ||command === 'inventory') {

    client.commands.get('inv').execute(message, args);
   
  }
  if(command === 'job' ||command === 'jobs') {
    client.commands.get('jobs').execute(message, args);
  }
  if(command === 'apply') {
    client.commands.get('apply').execute(message, args);
  }
  if(command === 'work') {
    client.commands.get('work').execute(message, args);
  }
  if(command === 'use') {
    client.commands.get('use').execute(message, args);
  }
  if(command === 'sell') {
    client.commands.get('sell').execute(message, args);
  }
  if(command === 'rob' || command === 'steal' || command === 'take') {
    client.commands.get('rob').execute(message, args);
  }
  if(command === 'invite') {
    client.commands.get('invite').execute(message, args);
  }
  if(command === 'resign'||command === 'quir') {
    client.commands.get('resign').execute(message, args);
  }
  if(command === 'fight'||command === 'brawl') {
    client.commands.get('fight').execute(message, args);
  }
  if(command === 'gift'||command === 'giveitem') {
    client.commands.get('gift').execute(message, args);
  }
  if(command === 'translate') {
    client.commands.get('translate').execute(message, args);
  }
  if(command === 'meme') {
    client.commands.get('meme').execute(message, args);
  }
  if(command === 'one2ten' ||command === 'onetoten') {
    client.commands.get('one2ten').execute(message, args);
  }
  
  if(command === 'petshop' ||command === 'petstore' || command === 'buypet') {
    client.commands.get('petshop').execute(message, args);
  }
  if(command === 'adopt') {
    client.commands.get('adopt').execute(message, args);
  }

  if(command === 'pet'||command === 'pets') {
    client.commands.get('pet').execute(message, args);
  }
  if(command === 'json') {
    client.commands.get('viewjson').execute(message, args);
  }
  if(command === 'modjson') {
    client.commands.get('modjson').execute(message, args);
  }
  if(command === 'quote') {
    client.commands.get('quote').execute(message, args);
  }
  if(command === 'trigger' || command === 'triggered' ||command === 'triggerd') {
    client.commands.get('trigger').execute(message, args);
  }
  if(command === 'facepalm') {
    client.commands.get('facepalm').execute(message, args);
  }
  if(command === 'comment') {
    client.commands.get('comment').execute(message, args);
  }

  if(command === 'level' ||command === 'xp'  ) {
    client.commands.get('level').execute(message, args);
  }
  if(command === 'play') {
    client.commands.get('play').execute(message, args);
  }
  if(command === 'leave' || command === 'stop' ||command === 'disconnect') {
    client.commands.get('leave').execute(message, args, client);
  }
  if(command === 'active' || command === 'xplb') {
    client.commands.get('active').execute(message, args);
  }
  if(command === 'leaderboard' || command === 'lb' || command === 'top' ) {
    client.commands.get('leaderboard').execute(message, args);
  }
  if(command === 'loop') {
    client.commands.get('loop').execute(message, args);
  }
  if(command === 'rank') {
    client.commands.get('rank').execute(message, args);
  }
  if(command === 'disown') {
    client.commands.get('disown').execute(message, args);
  }
  if(command === 'autocomplete') {
    client.commands.get('autocomplete').execute(message, args);
  }
  if(command === 'search') {
    client.commands.get('search').execute(message, args);
  }
  if(command === 'tictactoe' || command === 'ttt') {
    client.commands.get('tictactoe').execute(message, args);
  }
  if(command === 'doubleornothing' || command === 'don') {
    client.commands.get('doubleornothing').execute(message, args);
  }
  if(command === 'ping' || command === 'ms') {
    client.commands.get('ping').execute(message, args, client);
  }
  if(command === 'trivia') {
    client.commands.get('trivia').execute(message, args);
  }
  if(command === 'triviastats') {
    client.commands.get('triviastats').execute(message, args);
  }
  if(command === 'chat') {
    client.commands.get('chat').execute(message, args);
  }
  if(command === 'connect4' || command === 'connectfour' || command === 'c4') {
    client.commands.get('connect4').execute(message, args);
  }
  if(command === 'daily') {
    client.commands.get('daily').execute(message, args);
  }
  //fun random stuff
  
  if(command == "owo" || command == "uwuify" || command ==  "owofy" || command == "owoify") {
    client.commands.get('owoify').execute(message, args)
  }
  if(command == "ph" || command == "programmerhumor" || command ==  "programmerjoke") {
    client.commands.get('ph').execute(message, args)
  }
  if(command == "ship") {
    client.commands.get('ship').execute(message, args)
  }

} 
msgcli(message, client)
  }
})

if(production) {
client.login(process.env.TOKENMAIN);
} else {
  client.login(process.env.TOKENBETA2);
}