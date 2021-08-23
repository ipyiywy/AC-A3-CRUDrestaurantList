const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const restaurantsList = require('./restaurants.json')
const RestautantSchema = require('./models/restaurant')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//setup database
mongoose.connect('mongodb://localhost/restaurants-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
res.render('index', { restaurants: restaurantsList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
res.render('details', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
const keyword = req.query.keyword
const restaurants = restaurantsList.results.filter(restaurant => { return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())})
res.render('index', {restaurants: restaurants, keyword: keyword })
})


app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})


