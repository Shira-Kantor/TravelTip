import { locService } from "./loc.service.js";
import { utilService } from "./util.service";
export const searchService = {
    getGeocode
}

const SEARCH_RES_KEY = 'searchResultsDB'
// const API_KEY = 'AIzaSyDgGsNfc1GApxz60GCtmZHkaitLUxgGVpI'
const API_KEY = 'AIzaSyCbrdwS7nOKBdOhxxLPfavq31v5NnX8I70'

function getGeocode(keyword) {

    // need to create a DB for keywords search results to prevent blocking key and unnecessary requests
    const locs = utilService.loadFromStorage(SEARCH_RES_KEY) || [] // modify here
    if (locs[keyword]) return promise.resolve(locs[keyword])

    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + API_KEY)
        .then(res => {
            console.log('hi from .then')
            utilService.saveToStorage(SEARCH_RES_KEY, )
            return res.data.results[0].geometry.location
        })
        .catch(err => console.log('Had a problem in request...', err))
}