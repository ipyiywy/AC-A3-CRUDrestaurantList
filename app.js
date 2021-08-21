const express = require('express')
const app = express()
const port = 3000
const restaurantsList = require('./restaurants.json')

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
res.render('index', { restaurants: restaurantsList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
const keyword = req.query.keyword
const restaurants = restaurantsList.results.filter(restaurant => { return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())})
res.render('index', {restaurants: restaurants, keyword: keyword })
})


app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})


