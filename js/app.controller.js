import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { searchService } from "./services/search.service.js";
// import { storageService } from './services/async-storage.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onDelete = onDelete
window.onSearch = onSearch
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
// window.renderPlaces = renderPlaces


function onInit() { // do render map by query params if they exist
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

function renderPlaces() {
    locService.getLocs()
        .then(locs => {
            var strHTMLs = locs.map(({ id, name, lat, lng, createdAt, updatedAt }) => 
            `<div class="location" onclick="onSelect(${id})">
        <div class="loc-infos">
            <div class="loc-name">${name}</div>
            <div class="loc-lat">lat: ${lat}</div>
            <div class="loc-lng">lng: ${lng}</div>  
            <div class="loc-created">Created at: ${createdAt}</div>  
            <div class="loc-updated">Last Update: ${updatedAt}</div>
        </div>
        <div class="btns">
            <button class="loc-btn-go" onclick="onPanTo(${lat},${lng})">Go</button>
            <button class="loc-btn-delete" onclick="onDelete(${id})">Delete</button>
        </div>
    </div>`)
            document.querySelector('.locations-list').innerHTML = strHTMLs.join('')
        })
}

function onSearch() {
    const keyWord = document.querySelector('.text-input').value
    console.log('keyWord:', keyWord)

    searchService.getGeocode(keyWord)
    // .then(console.log)
        .then(({ lat, lng }) => mapService.panTo(lat, lng))
        .then((res) => locService.addLoc(res, keyWord))
        .then(()=> renderPlaces())
        .then(() => renderLoc(keyWord))
        .catch(err => console.log('error in searching: ', err))

    // onPanTo(lat, lng)
    // addLoc

}

function renderLoc(keyWord) {
    document.querySelector('.searched-location').innerText = keyWord
}

function onGetUserPos() {
    // ev.preventDefault()
    console.log('Hi from onGetUserPos')
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            onPanTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function getPosition() { // This function provides a Promise API to the callback-based-api of getCurrentPosition
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function onDelete(id) {
    console.log('hi from onDelete');
    locService.deleteLoc(id)

        .then(renderPlaces)
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