import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

export const locService = {
    getLocs,
    deleteLoc,
    addLoc,
}

const STORAGE_KEY_LOCS = 'locsDB'
// FOR EXAMPLE DATA : -------------
const locs = [
    { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) },
    { id: 2, name: 'Neveragain', lat: 32.5201, lng: 34.832581, createdAt: utilService.formatDate(new Date()), updatedAt: utilService.formatDate(new Date()) }
]
utilService.saveToStorage(STORAGE_KEY_LOCS, locs)
// ---------------------------------

function _creatEmptyLoc() {
    return {
        id: utilService.makeId(),
        name: '',
        lat: '',
        lng: '',
        createdAt: utilService.formatDate(new Date()),
        updatedAt: utilService.formatDate(new Date())
    }
}

function addLoc(loc, name) {
    const newLoc = _creatEmptyLoc()
    console.log('ADDLOC:', loc, name)
    const { lat, lng } = loc
    newLoc.lat = lat
    newLoc.lng = lng
    newLoc.name = name
    storageService.post(STORAGE_KEY_LOCS, newLoc)
}

function getLocs() {

    storageService.query(STORAGE_KEY_LOCS) /* || [] */
        .then(locs => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(locs)
            }, 2000)
        })
        )
}

function deleteLoc(id) {
    console.log('im from deleteLoc');
    storageService.remove(STORAGE_KEY_LOCS, id)
}