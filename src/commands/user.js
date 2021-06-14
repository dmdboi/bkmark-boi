const api = require('../services/api');

module.exports = {
    name: 'User',
    description: 'Gets the currently authenticated user.',
    command: 'user',
    fn: async msg => {
        try {
            let response = await api.getUser()
            msg.reply(`Hello, ${response.forename} 😉`)
        } catch (e) {
            console.log(e)
            return msg.reply("Oops, something went wrong 😥")
        }

    }
}