const request = require('postman-request')

const weatherStack = (latitude, longitide, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dff504e6e66b1deafcfe935367963104&query='+latitude+','+longitide
    
    request({url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect Weather Stack API!', undefined)
        } else if (response.body.error) {
            callback('Invalid coordinates. Please provide valid coordinates!', undefined)
        } else {
            callback(undefined , response)
        }
    })
}

module.exports = weatherStack