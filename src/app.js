const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

var express = require('express')
var app = express()


// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Utsav Desai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Utsav Desai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Utsav Desai',
        text: 'This Some Important Information'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide a address tems"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: place_name,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search tems"
        })
    }

    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Utsav Desai',
        errorMsg: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Utsav Desai',
        errorMsg: 'Page Not Found'
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
