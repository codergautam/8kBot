const commands = require('fs').readdirSync(__dirname)
    .filter(c => c !== 'index.js')
    .map(c => require(`${__dirname}/${c}`))

module.exports = {
    commands,
    name: '👑 Other',
    id: 'other',
    desc: "These commands dont fit into any other category!"
}