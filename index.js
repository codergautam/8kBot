


const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let stats = ["8k bot", "8k!help"]
let myArray = ["dnd", "available", "idle"]

var cooldowns = {
}


client.on("ready", () => {

setInterval(function() {
  let status = stats[Math.floor(Math.random()*stats.length)];
  var test = myArray[Math.floor(Math.random()*myArray.length)];
  client.user.setPresence({ activity: { name: status , type: "WATCHING"},  status: test});
  
}, 5000)
})

client.on("ready", () => {
console.log("ready!")
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

var prefix = "8k!"

client.on("message", (message) => {
  if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
  if(message.author.id !== client.user.id) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
if(message.content.startsWith("8k!") || message.content.startsWith("8K!")) {
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
    client.commands.get('start').execute(message, args, client);
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
  if(command === 'rich' || command === 'leaderboard' || command === 'top') {
    client.commands.get('leaderboard').execute(message, args);
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

} 
  }
})

//ORIGINAL
client.login("NzU1MTQ2OTUxODU4ODQ3Nzk2.X1_DZw.HVvPsLDXyLz41H3Qf6myItytYEs");
//BETA
//client.login("NzYxMjI5MTM5MzczMzI2MzM4.X3Xj4Q.0cNK_LtkvVL1MGVFvpFO2pjpZXo")