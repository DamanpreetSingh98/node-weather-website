const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weatherstack = require('./utils/weatherStack')

const app = express()

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Configuring Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daman',
        message: 'We are here for you!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        weatherstack(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                searchedAddress: req.query.address,
                location: location,
                weatherInfo : response.body.current
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daman',
        errorMessage: 'Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daman',
        errorMessage: 'Page Not Found!'
    })
})

// Setting Up the Port
app.listen(3000, () => {
    console.log('Server started at port 3000')
})