module.exports = {
    name: 'say',
    execute(message, args) {
        if(message.author.id == 566662215457964043 || message.author.id == 412262013033512960) {
            message.delete()
            message.channel.send(args.join(' '))

        }
    }
}
