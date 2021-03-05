const api = require("./api")
const {
    version,
    maintanence,
    self
} = require("../../package.json")

module.exports = (client) => {
    var stats = [`on v${version}`, `on ${client.guilds.cache.size} guilds`]

        console.log("Logging on!")
        if (!maintanence && !self) {
            api.log(`**ONLINE!** 8k bot is now back online! RUNNING \`v${version}\`!`, client)
        } else {
            api.log(`**8k bot is down for maintanence!! Commands wont work sryyy**`, client)
        }
        if (maintanence) return client.user.setPresence({
            activity: {
                name: "Maintainance Mode...",
                type: "WATCHING"
            },
            status: "dnd"
        });

        setInterval(function() {

            let status = stats[Math.floor(Math.random() * stats.length)];
            api.numOfUsers()
                .then((data) => {
                    stats = [`on v${version}`, `on ${client.guilds.cache.size} guilds`, `with ${api.numberWithCommas(data)} users!`]
                    client.user.setPresence({
                        activity: {
                            name: "8k!help " + status,
                            type: "WATCHING"
                        },
                        status: "available"
                    });
                })
                .catch(() => {
                    client.user.setPresence({
                        activity: {
                            name: status,
                            type: "WATCHING"
                        },
                        status: "available"
                    });
                })
        }, 5000)

    client.on("guildCreate", (guild) => {
        api.log(`**NEW GUILD!** 8k Bot was added to \`${guild.name}\`, which has \`${api.numberWithCommas(guild.memberCount)}\` members! 8k is now in \`${api.numberWithCommas(client.guilds.cache.size)}\` guilds!`, client)
    })
    client.on("guildDelete", (guild) => {
        api.log(`**GUILD REMOVED!** 8k Bot was removed from \`${guild.name}\`, sucks to be them lol! 8k is now in \`${api.numberWithCommas(client.guilds.cache.size)}\` guilds!`, client)
    })
}