const api = require('./api');
const { database } = require('./db');

const setup = async (log) => {
    // Return User Info from Bkmark
    let user = await api.getUser()
    // Return User's collections from first Organisation.
    let collections = await api.getCollections(user.organisations[0].uuid)

    // Write User's first Org to database.
    await database.write('organisationId', user.organisations[0].uuid)

    // Write Organisation's collections to database.
    let collectionsData = []
    for (let i = 0; i < collections.length; i++) {
        const element = collections[i];
        collectionsData.push({
            uuid: element.uuid,
            name: element.name.toLowerCase()
        })
    }
    
    log.send(`Setting default collection to ${collectionsData[0].name}`)
    await database.write('defaultCollection', collectionsData[0].uuid)


    await database.write('collections', collectionsData)
    log.send("Setup complete, you're good to go :)")

    // Finish setup. 
    await database.write('setup', "true");
}

module.exports = {
    setup: setup
}