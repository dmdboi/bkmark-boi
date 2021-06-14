const { database } = require('../services/db');

module.exports = {
    name: 'Token',
    description: 'Sets your JWT Auth token to authenticate requests.',
    command: 'token',
    fn: async msg => {
        let token = msg.content.split(' ')[2]

        database.write('jwt_token', token)

        msg.reply(`Your JWT token has been set :)`)
    }
}