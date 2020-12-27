const process = require("process")
const api = require("./api")
const {
    version,
    maintanence,
    self
} = require("../../package.json")
module.exports = (client) => {
    process.on('SIGTERM', () => {
        api.log(`**OFFLINE!** 8k bot is going offline! Probably down for maintainance or updates. I'll be back soon!`, client)
            .then(() => {
                console.log('Logging off');
                process.exit()
            })

    });
    process.on('SIGINT', () => {
        if (!maintanence && !self) {
            api.log(`**OFFLINE!** 8k bot is going offline! Probably down for maintainance or updates. I'll be back soon!`, client)
                .then(() => {
                    console.log('Logging off');
                    process.exit()
                })
        } else {
            process.exit()
        }

    });
    process.on("uncaughtException", (err) => {
        if (!maintanence && !self) {
            console.log(err)
            api.log(`**OFFLINE!** 8k bot is going offline! **UNCAUGHT EXCEPTION**\n\`${err.toString()}\``, client)
                .then(() => {
                    process.exit()
                })
                .catch(() => {
                    process.exit()
                })
        } else {
            process.exit()
        }
    })
    process.on("unhandledRejection", (err, origin) => {
        console.log("UNHANDLED REJECTION!")
        console.log(err)
        console.log(origin)
    })

    process.on("exit", () => {
        api.log(`**OFFLINE!** 8k bot is going offline! Probably down for updates. I'll be back soon!`, client)
            .then(() => {
                console.log('Logging off');
                process.exit()
            })

    });
}