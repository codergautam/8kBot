var faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];
const Discord = require("discord.js")
function OwoifyText(v){
    v = v.replace(/(?:r|l)/g, "w");
    v = v.replace(/(?:R|L)/g, "W");
    v = v.replace(/n([aeiou])/g, 'ny$1');
    v = v.replace(/N([aeiou])/g, 'Ny$1');
    v = v.replace(/N([AEIOU])/g, 'Ny$1');
    v = v.replace(/ove/g, "uv");
    v = v.replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");
    return v
};

module.exports = {
    name: "owoify",
    aliases: ["owo", "uwuify", "owofy", "owoify"],
    secret: false,
    category: "fun",
    format: "8k!owoify <message>",
    usage: ["8k!chat Hello!", "8k!chat I am really bored"],
    description: "Makes <message> into a cute owo message. For example, Hello will be something like Hewwo.", 

    execute(message, args) {
        message.channel.send(OwoifyText(Discord.Util.cleanContent(args.join(" "), message)))
    }
}