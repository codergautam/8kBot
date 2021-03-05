module.exports = class simpleCommand {
    /**
     * 
     * @param {function(message, args, client, addCool):void} fn The command function
     * @param {Object} props Extra details for command
     * @param {Array} props.aliases Extra aliases for the command, for example 8k!shop can also be written as 8k!market
     * @param {Boolean} props.ownerOnly Sets a command to owner only
     * @param {Array} props.perms Permissions a command needs, such as attachFiles
     * @param {Number} props.cooldown cooldown ms
     * @param {String} props.cooldownMessage Message to show when cooldown is active
     * @param {String} props.description Command description showed in help page
     * @param {String} props.usage Usage for command
     * @param {String} props.name Name of command
     * @param {Boolean} props.hidden If true command will not be shown on help page
     */
    constructor(fn, props) {
        this.fn = fn
        this.passedProps = props
    }

    get props() {
        return Object.assign({
            usage: '{prefix}{command}',
            cooldown: 3000,
            ownerOnly: false,
            cooldownMessage: "This command is in cooldown try again in **{timeleft}**"
        }, this.passedProps, {
            perms: ['SEND_MESSAGES', 'EMBED_LINKS'].concat(this.passedProps.perms || [])
        })
    }
}