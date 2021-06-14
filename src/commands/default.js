const { database } = require('../services/db');

module.exports = {
    name: 'Default',
    description: 'Sets your default collection.',
    command: 'default',
    fn: async msg => {
        let colName = msg.content.split(' ')[2].toLowerCase()
        let collectionId = await database.collectionId(colName)
        let organisationId = await database.read('organisationId')
        await database.write('defaultCollection', collectionId)

        let embed = {
            title: "Default Collection Set",
                description: `Your default collection has been set to ${colName}.`,
                url: `https://app.bkmark.io/o/${organisationId}/${collectionId}`,
                footer: {
                    text: "Bkmark Boi by Diamond Boi",
                    icon_url: "https://avatars.githubusercontent.com/u/23747483?v=4"
                }
            }

        return msg.channel.send({ embed })
    }
}