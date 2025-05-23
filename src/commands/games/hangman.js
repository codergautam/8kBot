const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require('discord.js')

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        // Check if there's already a game running in this channel
        if (activeGames.has(message.channel.id)) {
            return message.channel.send("There's already a hangman game running in this channel!")
        }
        
        await addCD()
        startHangman(message)
    }, {
        name: "hangman",
        aliases: ["hm"],
        cooldown: 30000,
        cooldownMessage: "You just started a hangman game!\nYou can start another game in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd}",
        description: "Start a hangman game where anyone in the channel can guess letters! Winner gets 1000 coins. You have 7 incorrect guesses before losing."
    }
)



const words = process.env.HANGMAN_WORDLIST ? JSON.parse(process.env.HANGMAN_WORDLIST) : [
  // Easy
  "APPLE", "BANANA", "CAT", "DOG", "ELEPHANT", "FISH", "GOAT", "HAT", "ICE", "JOKE",
  "KITE", "LAMP", "MILK", "NOSE", "OWL", "PIG", "QUEEN", "ROSE", "SUN", "TREE",
  "UMBRELLA", "VAN", "WATER", "XRAY", "YARN", "ZEBRA", "BALL", "CAKE", "DRUM", "EGG",
  "FROG", "GRAPE", "HILL", "INK", "JAM", "KEY", "LION", "MOON", "NET", "ORANGE",

  // Medium
  "PARROT", "QUILT", "ROCKET", "SUGAR", "TURTLE", "UNICORN", "VIOLIN", "WINDOW", "XYLOPHONE", "YOGURT",
  "ANCHOR", "BUTTER", "CIRCLE", "DESERT", "ENGINE", "FOREST", "GUITAR", "HAMMER", "ISLAND", "JUNGLE",

  // Hard
  "AWKWARD", "BAGPIPES", "CROQUET", "DWARVES", "ESPIONAGE", "FUCHSIA", "GAZEBO", "HAIKU", "INJURY", "JINX",
  "KNAPSACK", "LARYNX", "MNEMONIC", "NIGHTCLUB", "OSTRACIZE", "PNEUMONIA", "QUARTZ", "RHYTHMIC", "SPHINX", "TWELFTH",
  "UNKNOWN", "VORTEX", "WALTZ", "XENOPHOBIA", "YACHTSMAN", "ZIGZAG", "BUCKAROO", "COBWEB", "FLAPJACK", "GROGGINESS",
  "HAPHAZARD", "IVORY", "JUKEBOX", "KILOBYTE", "LUCKY", "MYSTIFY", "NOWADAYS", "OXIDIZE", "PIXEL", "QUIZZICAL"
];


const lastGuessTime = new Map()
const activeGames = new Set()

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function createHangmanDisplay(incorrectGuesses) {
    const hangmanStages = [
        "```\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========```",
        "```\n  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========```"
    ]
    return hangmanStages[incorrectGuesses] || hangmanStages[0]
}

function displayWord(word, guessedLetters) {
    return word.split('').map(letter => guessedLetters.includes(letter) ? letter : '\\_').join(' ')
}

function startHangman(message) {
    const channelId = message.channel.id
    activeGames.add(channelId)
    
    const word = getRandomWord()
    const guessedLetters = []
    const incorrectGuesses = []
    let incorrectCount = 0
    const maxIncorrect = 6
    let gameActive = true

    const embed = new Discord.MessageEmbed()
        .setTitle("🎯 Hangman Game Started!")
        .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${displayWord(word, guessedLetters)}\n\n**Incorrect letters:** None\n**Remaining guesses:** ${maxIncorrect - incorrectCount}\n\nGuess a letter or the whole word! Winner gets 1000 coins!`)
        .setColor('#0099ff')
        .setFooter("Anyone can guess! Type a single letter or the full word")

    message.channel.send(embed).then(() => {
        const collector = message.channel.createMessageCollector(
            m => m.content.length >= 1 && !m.author.bot,
            { time: 300000 } // 5 minutes
        )

        collector.on("collect", async (msg) => {
            if (!gameActive) return

            const userId = msg.author.id
            const now = Date.now()
            
            // Check spam protection (1 second cooldown per user)
            if (lastGuessTime.has(userId) && now - lastGuessTime.get(userId) < 1000) {
                return
            }
            lastGuessTime.set(userId, now)

            const guess = msg.content.toUpperCase().trim()
            
            // Check if guess is valid (single letter or full word)
            if (guess.length === 1 && /[A-Z]/.test(guess)) {
                // Single letter guess
                if (guessedLetters.includes(guess)) {
                    msg.react('❌')
                    return
                }

                guessedLetters.push(guess)

                if (word.includes(guess)) {
                    // Correct letter
                    msg.react('✅')
                    
                    // Check if word is complete
                    if (word.split('').every(letter => guessedLetters.includes(letter))) {
                        gameActive = false
                        collector.stop()
                        activeGames.delete(channelId)
                        
                        try {
                            const user = await api.getUser(userId)
                            await api.changeBal(userId, 1000)
                            
                            const winEmbed = new Discord.MessageEmbed()
                                .setTitle("🎉 Congratulations!")
                                .setAuthor(user.name, msg.author.avatarURL())
                                .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${word}\n\n**${user.name}** guessed the word correctly and won **1000 coins**!`)
                                .setColor('#00ff00')
                            
                            message.channel.send(winEmbed)
                        } catch (error) {
                            message.channel.send("Error awarding coins!")
                        }
                        return
                    }
                } else {
                    // Incorrect letter
                    msg.react('❌')
                    incorrectGuesses.push(guess)
                    incorrectCount++
                    
                    if (incorrectCount >= maxIncorrect) {
                        gameActive = false
                        collector.stop()
                        activeGames.delete(channelId)
                        
                        const loseEmbed = new Discord.MessageEmbed()
                            .setTitle("💀 Game Over!")
                            .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${word}\n\nThe word was **${word}**! Better luck next time!`)
                            .setColor('#ff0000')
                        
                        message.channel.send(loseEmbed)
                        return
                    }
                }

                // Update game status
                const gameEmbed = new Discord.MessageEmbed()
                    .setTitle("🎯 Hangman Game")
                    .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${displayWord(word, guessedLetters)}\n\n**Incorrect letters:** ${incorrectGuesses.join(', ') || 'None'}\n**Remaining guesses:** ${maxIncorrect - incorrectCount}`)
                    .setColor('#0099ff')
                    .setFooter("Keep guessing! Type a letter or the full word")

                message.channel.send(gameEmbed)

            } else if (guess.length > 1 && /^[A-Z]+$/.test(guess)) {
                // Full word guess
                if (guess === word) {
                    gameActive = false
                    collector.stop()
                    activeGames.delete(channelId)
                    
                    try {
                        const user = await api.getUser(userId)
                        await api.changeBal(userId, 1000)
                        
                        const winEmbed = new Discord.MessageEmbed()
                            .setTitle("🎉 Congratulations!")
                            .setAuthor(user.name, msg.author.avatarURL())
                            .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${word}\n\n**${user.name}** guessed the word correctly and won **1000 coins**!`)
                            .setColor('#00ff00')
                        
                        message.channel.send(winEmbed)
                    } catch (error) {
                        message.channel.send("Error awarding coins!")
                    }
                } else {
                    msg.react('❌')
                    incorrectCount++
                    
                    if (incorrectCount >= maxIncorrect) {
                        gameActive = false
                        collector.stop()
                        activeGames.delete(channelId)
                        
                        const loseEmbed = new Discord.MessageEmbed()
                            .setTitle("💀 Game Over!")
                            .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${word}\n\nThe word was **${word}**! Better luck next time!`)
                            .setColor('#ff0000')
                        
                        message.channel.send(loseEmbed)
                        return
                    }

                    // Update game status after wrong word guess
                    const gameEmbed = new Discord.MessageEmbed()
                        .setTitle("🎯 Hangman Game")
                        .setDescription(`${createHangmanDisplay(incorrectCount)}\n\n**Word:** ${displayWord(word, guessedLetters)}\n\n**Incorrect letters:** ${incorrectGuesses.join(', ') || 'None'}\n**Remaining guesses:** ${maxIncorrect - incorrectCount}\n\n❌ Wrong word guess!`)
                        .setColor('#0099ff')
                        .setFooter("Keep guessing! Type a letter or the full word")

                    message.channel.send(gameEmbed)
                }
            }
        })

        collector.on("end", () => {
            activeGames.delete(channelId)
            if (gameActive) {
                const timeoutEmbed = new Discord.MessageEmbed()
                    .setTitle("⏰ Game Timeout!")
                    .setDescription(`Game ended due to inactivity.\n\nThe word was: **${word}**`)
                    .setColor('#ffaa00')
                
                message.channel.send(timeoutEmbed)
            }
            // Clear spam protection for this game
            lastGuessTime.clear()
        })
    })
}
