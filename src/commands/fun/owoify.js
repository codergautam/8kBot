var faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")

function OwoifyText(v) {
    v = v.replace(/(?:r|l)/g, "w");
    v = v.replace(/(?:R|L)/g, "W");
    v = v.replace(/n([aeiou])/g, 'ny$1');
    v = v.replace(/N([aeiou])/g, 'Ny$1');
    v = v.replace(/N([AEIOU])/g, 'Ny$1');
    v = v.replace(/ove/g, "uv");
    v = v.replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");
    return v
};



module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (args.length < 1) {
            return message.channel.send("You didnt enter a message to owofy!\n for more info, type `8k!help owoify`")
        }
        message.channel.send(OwoifyText(Discord.Util.cleanContent(args.join(" "), message)))
    }, {
        name: "owoify",
        aliases: ["owo", "uwuify", "owofy", "owoify"],
        cooldown: 0,
        cooldownMessage: "",
        description: "Makes <message> into a cute owo message. For example, Hello will be something like Hewwo."
    }
)