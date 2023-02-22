import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

export const locService = {
    getLocs,
    deleteLoc
}

const STORAGE_KEY_LOCS = 'locsDB'

const locs = [
    { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) },
    { id: 2, name: 'Neveragain', lat: 32.5201, lng: 34.832581, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) }
]


console.log('locs',locs)
function creatEmptyLoc() {
    return {
        id: utilService.makeId(),
        name: '',
        lat: '',
        lng: '',
        createdAt: utilService.formatDate(new Date()),
        updatedAt: ''
    }
}

function getLocs() {
    
    const locsMap = storageService.query(STORAGE_KEY_LOCS) || []
    // if (!termlocsMap.length) storageService.post(STORAGE_KEY_LOCS,locs[0])

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locsMap)
        }, 2000)
    })
}

function deleteLoc(id){
    console.log('im from deleteLoc');
    storageService.remove(STORAGE_KEY_LOCS,id)
}