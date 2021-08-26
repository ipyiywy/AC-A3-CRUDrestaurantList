const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000

const Restaurant = require('./models/restaurant')

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//show all the data in index page
app.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.log(error))
})

//CREATE FUNCTION
//Create new page route
app.get('/restaurant/new', (req, res) => {
    return res.render('new')
})

//Create new item in database
app.post('/restaurant', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map  = req.body.google_map
    const rating  = req.body.rating
    const description  = req.body.description

    return Restaurant.create({name,
    name_en,
    category,
    image, 
    location,
    phone,
    google_map,
    rating,
    description})
    .then(() => res.redirect('/'))
.catch(error => console.log(error))
})

//Create detail page route
app.get('/restaurant/detail/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
    })

//route to edit page
app.get('/restaurant/detail/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch((error) => console.log(error))
})

//Update function
app.put('/restaurant/detail/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map  = req.body.google_map
    const rating  = req.body.rating
    const description  = req.body.description

    return Restaurant.findById(id)
    .then(restaurant => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/detail/${id}`))
    .catch(error => console.log(error))
})

//Delete function
app.delete('/restaurant/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Search function 
app.get('/search', (req, res) => {
const keyword = req.query.keyword
Restaurant.find()
    .lean()
    .then( item => { 
        const allitems = item.filter(restaurant => { 
            return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())})
        res.render('index', {restaurant: allitems, keyword: keyword })
})
})
    


app.listen(port, () => {
console.log(`Express is running on http://localhost:${port}`)
})


