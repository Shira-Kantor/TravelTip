import { utilService } from "./util.service.js";

export const locService = {
    getLocs
}

const STORAGE_KEY_LOCS = 'locsDB'

const locs = [
    { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) },
    { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) }
]


console.log('locs',locs)
function creatEmptyLoc() {
    return {
        id: utilService.makeId(),
        name: '',
        lat: '',
        lng: '',
        createdAt: Date.now(),
        updatedAt: ''
    }
}


function getLocs() {
    // if()
    const termlocsMap = utilService.load(STORAGE_KEY_LOCS) || {}
    if (termlocsMap[locs]) return Promise.resolve(termlocsMap[locs])

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


