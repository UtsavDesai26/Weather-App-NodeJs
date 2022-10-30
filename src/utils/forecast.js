const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c468b99d7882e9211ffa10aeea27a86a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast