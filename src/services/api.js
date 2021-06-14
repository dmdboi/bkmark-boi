const axios = require('axios');
const { database } = require('./db');

const baseURL = process.env.SERVER_URL
const bkmark = axios.create({
    baseURL: baseURL
})

const getUser = async () => {
    try {
        const token = await database.read('jwt_token')
        let response = await bkmark({
            method: 'get',
            url: '/users/me',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data.user
    } catch(e) {
        console.log(e)
        return e
    }

};

const getOrganisations = async () => {
    try {
        const token = await database.read('jwt_token')
        let response = await bkmark({
            method: 'get',
            url: '/users/organisations',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(e) {
        console.log(e)
        return e
    }
}

const getCollections = async (organisationId) => {
    try {
        const token = await database.read('jwt_token')
        let response = await bkmark({
            method: 'get',
            url: `bkmark/collections?organisationId=${organisationId}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data.data.collections
    } catch(e) {
        console.log(e)
        return e
    }
}

const postBookmark = async (data) => {
    try {
        const token = await database.read('jwt_token')
        let response = await bkmark({
            method: 'post',
            url: '/bkmark/bookmarks',
            data: data,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(e) {
        console.log(e)
        return e
    }
}

module.exports = {
    getUser: getUser,
    getCollections: getCollections,
    getOrganisations: getOrganisations,
    postBookmark: postBookmark
}