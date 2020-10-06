commands = {
    start: ["8k!start", "Creates a 8k Currency Account"],
    transfer: ["8k!give <amount> <@user>", "Gives <amount> of your coins to <@user>"],
    ask: ["8k!ask", "Kindly asks random people for coins"],
    bal: ["8k!bal <@user>", "See balance of <@user>"],
    inv: ["8k!inv <@user>", "See inventory of <@user>"],
    shop: ["8k!shop", "View the shop"],
    buy: ["8k!buy <item>", "Buy <item> from shop"],
    use: ["8k!use <item>", "Use <item>"],
    rich: ["8k!leaderboard", "See Top 10 users with the most money"],
    job: ["8k!jobs", "View available jobs!"],
    work: ["8k!work", "Work at your job for coins"],
}
datajjk = "Sup peeps <3 \n I am 8kBot \n Created by Coder Gautam YT \n\n **Fun Commands:**\n`8k!question <question>` - asks a yes or no question to the 8k gods\n\n**Currency Commands**\n"
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