const commands = require('fs').readdirSync(__dirname)
    .filter(c => c !== 'index.js')
    .map(c => require(`${__dirname}/${c}`))

module.exports = {
    commands,
    name: '⚙️ General',
    id: 'general',
    desc: "These commands help make using the bot easier!"
}