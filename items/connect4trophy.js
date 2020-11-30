const Discord = require('discord.js');
const api = require('../api');
const gift = require('../commands/gift');
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//"ice cream": ["Ice cream", "Some tasty ice cream🍨", 900, {"custom": true}, {"custombuy": false, "shop": true}],
module.exports = {
    
	name: 'connect 4 trophy',

    async use(message, userItem, user)
    {
    message.channel.send("Wow so shinyyy🏆🏆\n"+user.name+" is pretty awesome at connect 4")
    },
    async sell(message) {
        message.channel.send("imagine selling the rarest trophy")
    },
    async gift(message) {
        message.channel.send("imagine giving away the rarest trophy")
    },
    async buy(message, userItem, user)
    {
    message.channel.send("Money cant buy everything!\nMoney cant buy friendship..\nMoney cant buy love..\nAND MONEY ALSO CANT BUY THIS AWESOME TROPHY")
    },
}