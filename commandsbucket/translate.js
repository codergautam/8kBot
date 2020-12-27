
const Discord = require('discord.js');
const translate = require('translation-google');
const ISO6391 = require('iso-639-1');

module.exports = {
    name: 'translate',
    execute(message, args) {
        
        var language = ((ISO6391.getCode(args[0]) == ""?args[0] : ISO6391.getCode(args[0]) ) == 'zh' ? 'zh-cw' : (ISO6391.getCode(args[0]) == ""?args[0] : ISO6391.getCode(args[0]) ))
        console.log(language)
        var text = args
        text.shift()
        text = text.join(' ')
        translate(text, {to: language}).then(res => {
       
            const embed = new Discord.MessageEmbed()
            .setDescription(res.text)
            .setFooter(`Translated from ${(ISO6391.getNativeName(res.from.language.iso) == ISO6391.getName(res.from.language.iso) ? ISO6391.getName(res.from.language.iso): `${ISO6391.getNativeName(res.from.language.iso)}(${ISO6391.getName(res.from.language.iso)})`)} to ${(ISO6391.getNativeName(language) == ISO6391.getName(language) ? ISO6391.getName(language): `${ISO6391.getNativeName(language)}(${ISO6391.getName(language)})`)}`)
            message.channel.send(embed)
            //=> en
        }).catch(err => {
            const embed = new Discord.MessageEmbed()
            .setDescription(`\`\`\`${err.toString()}\`\`\`\nPlease use the command like \`8k!translate <language> <text>\``)
            message.channel.send(embed)
        });
    }
}