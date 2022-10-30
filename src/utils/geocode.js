const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiMjBpdDAyNiIsImEiOiJjbDhnNThwZjQwM2l5M29ubHcyMHJjNTA5In0.mAQ2pHKuBx9ZwrP7_DODOg&limit=1'
    request({ url: url, json: true }, (error, reponse) => {

        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (reponse.body.features.length === 0) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, {
                latitude: reponse.body.features[0].center[0],
                longitude: reponse.body.features[0].center[1],
                place_name: reponse.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode