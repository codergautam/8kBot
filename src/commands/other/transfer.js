const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const e = require("express");
const request = require("node-superfetch")
require('dotenv').config()
const { Database } = require("quickmongo");
const db = new Database(process.env.MONGO);
db.on("ready", () => {
    console.log("Connected to MongoDB!")
})
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var xd = 0
        request.get("https://www.bdpastudents.com/~s9344101/8k-bot/getall.php").then((u) => {
            var json = JSON.parse(u.body.toString())
            Object.keys(json).forEach(player => {
                var playerId = player
                var playerObj = json[player]
                db.has(playerId)
                    .then((has) => {
                        console.log(has)
                        if (!has) {
                            db.set(playerId, playerObj)
                                .then(() => {

                                    console.log(playerObj.name + " successfully transported")
                                    xd += 1
                                })
                        }
                    })


            })
            message.channel.send(`${xd} users were migrated successfully`)

        })
    }, {
        name: "transfer",
        aliases: [""],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "",
        description: ""
    }
)