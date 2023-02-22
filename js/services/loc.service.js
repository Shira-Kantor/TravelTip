import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

export const locService = {
    getLocs,
    deleteLoc,
    addLoc,
    
    
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
        updatedAt: utilService.formatDate(new Date())
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

function addLoc(loc,name) {
   const newLoc = creatEmptyLoc()
   const {lat,lng} =loc
   newLoc.lat = lat
   newLoc.lng = lng
   newLoc.name = name
    storageService.post(STORAGE_KEY_LOCS,newLoc)
}