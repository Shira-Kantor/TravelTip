import { utilService } from "./util.service.js";

export const locService = {
    getLocs
}

const STORAGE_KEY_LOCS = 'locsDB'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function creatEmptyLoc(){
return {id: utilService.makeId(),
     name: '',
      lat: '', 
      lng: '', 
       createdAt: '',
        updatedAt}
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


