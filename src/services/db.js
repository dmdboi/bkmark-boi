const JSONdb = require('simple-json-db');
const db = new JSONdb('./db.json');

const database = {
    
    read: async function(key) {
        return db.get(key)
    },

    write: async function(key, value) {
        return db.set(key, value)
    },

    check: async function(key) {
        return db.has(key)
    },

    delete: async function(key) {
        return db.delete(key)
    },

    // Returns the Id of Collection where key matches collection's name.
    collectionId: async function(key) {
        let collections = db.get('collections')
        let collection = collections.find(i => i.name == key.toLowerCase())
        return collection['uuid']
    },

    // Returns the Name of Collection where key matches collection's uuid.
    collectionName: async function(key) {
        let collections = db.get('collections')
        let collection = collections.find(i => i.uuid == key)
        return collection['name']
    }
}

module.exports = {
    database
}

// Write value
// db.set('key', 'value');

// Read value
// db.get('key');

// Check a key
// db.has('key');