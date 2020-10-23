const { data } = require("jquery");
var package = require("../package.json")

commands = {
  invite: ["8k!invite", "Link to add 8k bot to your server!"],


    transfer: ["8k!give <amount> <@user>", "Gives <amount> of your coins to <@user>"],
    gift: ["8k!gift <itemname> <amount> <@user>", "Gives <amount> <itemname>s to <@user>"],
    ask: ["8k!ask", "Kindly asks random people for coins"],
    bal: ["8k!bal <@user>", "See balance of <@user>"],
    inv: ["8k!inv <@user>", "See inventory of <@user>"],
    shop: ["8k!shop", "View the shop"],
    buy: ["8k!buy <item>", "Buy <item> from shop"],
    sell: ["8k!sell <item>", "Sell <item>"],
    use: ["8k!use <item>", "Use <item>"],
    rich: ["8k!leaderboard", "See Top 10 users with the most money"],
    job: ["8k!jobs", "View available jobs!"],
    work: ["8k!work", "Work at your job for coins"],
    resign: ["8k!resign", "Resign from your current job"],
    rob: ["8k!rob <@user>", "Rob money from <@user>"],
    fight: ["8k!fight <@user>", "Fight <@user>"],
}
genral = {
  start: ["8k!start", "Creates a 8k Currency Account"],
  translate: ["8k!translate <language> <text>", "Translates <text> to <language>"]
}
datajjk = "Sup peeps \n I am 8kBot, an awesome currency bot! \n Created by Coder Gautam YT \n**You are using __v"+package.version+"__**\n\n ⚙️**General Commands**⚙️\n" 
for(genr in genral) {
  datajjk = datajjk + "`"+genral[genr][0]+"` - "+genral[genr][1]+"\n";
}
datajjk = datajjk + "\n💰**Currency Commands**💰\n"
for(command in commands) {
  datajjk = datajjk + "`"+commands[command][0]+"` - "+commands[command][1]+"\n";
}

module.exports = {
	name: 'help',
	execute(message) {
        const Discord = require('discord.js'); // We need Discord for our next RichEmbeds
        const banConfirmationEmbed = new Discord.MessageEmbed(data)
        .setColor('PINK')
        .setDescription(datajjk);

        message.channel.send({
        embed: banConfirmationEmbed
        });
    }
};