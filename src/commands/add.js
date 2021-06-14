const api = require('../services/api');
var getUnixTime = require('date-fns/getUnixTime');
const { database } = require('../services/db');

module.exports = {
    name: 'Add',
    description: 'Adds a new Bookmark to a Collection.',
    command: 'add',
    fn: async msg => {
        let url = msg.content.split(' ')[2]
        let colName = msg.content.split(' ')[3]
        let collectionId = await database.read('defaultCollection')

        if (colName) {
            collectionId = await database.collectionId(colName)
        }

        let organisationId = await database.read('organisationId')

        let unixTime = getUnixTime(new Date())

        try {
            let response = await api.postBookmark({
                uuid: unixTime,
                url: url,
                organisationId: organisationId,
                tags: [],
                notes: "",
                collectionId: collectionId,
                title: "",
                favourite: false,
                mentions: [],
                origin: "WEB"
            })
            let responseColName = await database.collectionName(response.data.collection.uuid)

            let embed = {
                title: "Bkmark Added",
                description: `Your bookmark has been added to ${responseColName} collection`,
                url: `https://app.bkmark.io/o/${organisationId}/${collectionId}`,
                footer: {
                    text: "Bkmark Boi by Diamond Boi",
                    icon_url: "https://avatars.githubusercontent.com/u/23747483?v=4"
                }
            }

            return msg.channel.send({ embed })
        } catch (e) {
            return msg.channel.send("Oops, something went wrong 😥")
        }
    }
}