const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require('discord.js')

module.exports = new simpleCommand(
    async (message, args, client, addCD) => {
        const user = await api.getUser(message.author.id)

        const bet = parseInt(args[0])
        if (isNaN(bet) || bet < 1 || bet > user.bal) {
            return message.channel.send(`Invalid bet. Command usage: \`8k!bet [amount]\` Include an amount between 1 and ${user.bal}`);
        }

        user.bal -= bet
        await api.modUser(message.author.id, user)

        const deck = shuffleDeck(createDeck())
        const player = [deck.pop(), deck.pop()]
        const dealer = [deck.pop(), deck.pop()]

        const embed = new Discord.MessageEmbed()
            .setTitle("🃏 Blackjack")
            .setDescription(displayGame(player, dealer, false))
            .setFooter("Type `hit` to draw a card, or `stand` to hold.")
        message.channel.send(embed)

        const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 60000 })
        collector.on("collect", async (m) => {
            const cmd = m.content.toLowerCase()
            if (cmd === "hit") {
                player.push(deck.pop())
                if (handValue(player) > 21) {
                    collector.stop("bust")
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("🃏 Blackjack")
                        .setDescription(displayGame(player, dealer, false))
                        .setFooter("Type `hit` to draw a card, or `stand` to hold.")
                    message.channel.send(embed)
                }
            } else if (cmd === "stand") {
                collector.stop("stand")
            } else {
                message.channel.send("Invalid option. Type `hit` or `stand`.")
            }
        })

        collector.on("end", async (_collected, reason) => {
            let result = ""
            let winnings = 0

            if (reason === "bust") {
                result = `💥 You busted with ${handValue(player)}! You lost ${bet} coins.`
            } else {
                while (handValue(dealer) < 17) {
                    dealer.push(deck.pop())
                }

                const pVal = handValue(player)
                const dVal = handValue(dealer)

                if (pVal > 21) {
                    result = `💥 You busted with ${pVal}! You lost ${bet} coins.`
                } else if (dVal > 21 || pVal > dVal) {
                    winnings = bet * (isBlackjack(player) ? 3 : 2)
                    await api.changeBal(message.author.id, winnings)
                    result = `🎉 You win with ${pVal} against dealer's ${dVal}! You earned ${winnings} coins.`
                } else if (pVal === dVal) {
                    user.bal += bet
                    await api.modUser(message.author.id, user)
                    result = `🤝 It's a tie! You got your ${bet} coins back.`
                } else {
                    result = `😢 Dealer wins with ${dVal} against your ${pVal}. You lost ${bet} coins.`
                }
            }

            const finalEmbed = new Discord.MessageEmbed()
                .setTitle("🎰 Blackjack Result")
                .setDescription(displayGame(player, dealer, true) + `\n\n${result}`)
            message.channel.send(finalEmbed)
        })

    }, {
        name: "blackjack",
        aliases: ["bj"],
        cooldown: 0,
        cooldownMessage: "You just played Blackjack!\nTry again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} [bet]",
        description: "Play a fun game of blackjack against the dealer! Double your coins if you win, Triple if you get a blackjack!"
    }
)

// ===== Blackjack Logic =====

function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const deck = []
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ value, suit })
        }
    }
    return deck
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
}

function handValue(hand) {
    let value = 0
    let aces = 0
    for (const card of hand) {
        if (["J", "Q", "K"].includes(card.value)) value += 10
        else if (card.value === "A") {
            aces++
            value += 11
        } else {
            value += parseInt(card.value)
        }
    }
    while (value > 21 && aces > 0) {
        value -= 10
        aces--
    }
    return value
}

function isBlackjack(hand) {
    return hand.length === 2 && handValue(hand) === 21
}

function displayGame(player, dealer, revealDealer) {
    const showDealer = revealDealer ? dealer : [dealer[0], { value: "?", suit: "?" }]
    const format = (cards) => cards.map(c => `[\`${c.value}${c.suit}\`]`).join(" ")

    return `**Your Hand (${handValue(player)}):** ${format(player)}\n**Dealer's Hand (${revealDealer ? handValue(dealer) : "?"}):** ${format(showDealer)}`
}
