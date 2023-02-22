import { locService } from "./loc.service.js";
import { utilService } from "./util.service.js";
export const searchService = {
    getGeocode
}

const SEARCH_RES_KEY = 'searchResultsDB'

// const API_KEY = 'AIzaSyDgGsNfc1GApxz60GCtmZHkaitLUxgGVpI'
const API_KEY = 'AIzaSyCbrdwS7nOKBdOhxxLPfavq31v5NnX8I70'

function getGeocode(keyword) {
    console.log('Hi from getGeocode')

    const locs = utilService.loadFromStorage(SEARCH_RES_KEY) || {}
    if (locs[keyword]) return Promise.resolve(locs[keyword])

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${keyword}&key=` + API_KEY)
        .then(res => {
            console.log('hi from .then', res)
            const searchRes = utilService.loadFromStorage(SEARCH_RES_KEY) || {}
            searchRes[keyword] = res.data.results[0].geometry.location
            utilService.saveToStorage(SEARCH_RES_KEY, searchRes)
            return res.data.results[0].geometry.location
        })
        .catch(err => console.log('Had a problem in request...', err))
}