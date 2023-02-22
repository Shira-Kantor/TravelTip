import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/async-storage.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onDelete = onDelete

window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
// window.renderPlaces = renderPlaces


function onInit() {
    mapService.initMap()
        .then(locService.getLocs)
        .then(renderPlaces)

        // })
        // .then(() => {
        //     console.log('Map is ready')
        //     return locService.getLocs().then((locs) =>  renderPlaces(locs))
           
        // })
        .catch((err) => console.log('Error: cannot init map', err))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    // ev.preventDefault()
    console.log('hi');
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                onPanTo(pos.coords.latitude,pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat,lng) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function onDelete(id){
    console.log('hi');
    storageService.remove(STORAGE_KEY_LOCS,id)
    .then(renderPlaces)
}

function renderPlaces(locs){
var strHTMLs = locs.map(loc => {
    return `
   <tr> <td> <h4>${loc.name}</h4></td>
    <td> <h4>${loc.lat}</h4></td>
    <td> <h4>${loc.lng}</h4></td>
    <td> <h4>creaded: ${loc.createdAt}</h4></td>
    <td> <h4>Last update: ${loc.updatedAt}</h4></td>
    <td>  <button onclick="onPanTo(${loc.lat},${loc.lng})">Go</button> </td>
    <td> <button onclick="onDelete(${loc.id})">Delete</button> </td>
    </tr>
   `
})
 document.querySelector('.bla').innerHTML = strHTMLs.join('')
}