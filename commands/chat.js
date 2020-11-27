const fetch = require("node-superfetch")

module.exports = {
    name: "chat",
    execute(message, args) {
        var msg = args.join(" ")
        if(msg == "") return message.reply("**No message entered**\nPlease use the command like `8k!chat <message>`")
        message.channel.startTyping()
        chat(msg)
        .then((response) => {
            message.channel.stopTyping()
            return message.reply(response)
        })
        .catch((err) => {
            message.channel.stopTyping()
            return message.reply(err)
        })
    }
}
async function chat(message) {
    return new Promise(async (resolve, reject) => {
        if(message.toLowerCase() == "download") resolve("Download what?")
        if(message.toLowerCase() == "8k bot") resolve("Thats me!!! lol")
        if(message.toLowerCase() == "coder gautam") resolve("best youtuber ever xd")
        try {
        await fetch.get("https://api.snowflakedev.xyz/chatbot?message="+message)
        } catch(e) {
            reject(e.toString())
        }
        const {body} = await fetch.get("https://api.snowflakedev.xyz/chatbot?message="+message)
        if(body.error) {
            reject(body.error)
        } else {
            resolve(body.message)
        }
    })
}
